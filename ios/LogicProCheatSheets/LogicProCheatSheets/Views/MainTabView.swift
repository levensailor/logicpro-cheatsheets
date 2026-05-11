import Foundation
import SwiftUI
import Textual

struct MainTabView: View {
    let bundle: ContentBundle
    @State private var selectedTab: AppTab = .home
    @State private var selectedSheetID: CheatSheet.ID?
    @AppStorage(SettingsPreferences.themeStorageKey) private var preferredTheme: String = SettingsPreferences.systemTheme
    @AppStorage(SettingsPreferences.textSizeStorageKey) private var preferredTextSize: String = SettingsPreferences.mediumTextSize
    private var trainingLessons: [TrainingLesson] {
        bundle.training.lessons
    }

    var body: some View {
        TabView(selection: $selectedTab) {
            HomeTabView(
                bundle: bundle,
                selectedTab: $selectedTab,
                selectedSheetID: $selectedSheetID
            )
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
                .tag(AppTab.home)

            SheetListView(bundle: bundle, selectedSheetID: $selectedSheetID)
                .tabItem {
                    Label("Library", systemImage: "books.vertical.fill")
                }
                .tag(AppTab.library)

            TrainingTabView(lessons: trainingLessons)
            .tabItem {
                Label("Train", systemImage: "graduationcap.fill")
            }
            .tag(AppTab.train)

            AssistantTabView()
            .tabItem {
                Label("Ask", systemImage: "bubble.left.and.bubble.right.fill")
            }
            .tag(AppTab.assistant)

            SettingsTabView(bundle: bundle, selectedTab: $selectedTab)
            .tabItem {
                Label("Settings", systemImage: "gearshape.fill")
            }
            .tag(AppTab.settings)
        }
        .preferredColorScheme(SettingsPreferences.colorScheme(for: preferredTheme))
        .dynamicTypeSize(SettingsPreferences.dynamicTypeSize(for: preferredTextSize))
    }
}

enum AppTab: Hashable {
    case home
    case library
    case train
    case assistant
    case settings
}

private struct AssistantTabView: View {
    @StateObject private var viewModel = AssistantChatViewModel()

    var body: some View {
        NavigationStack {
            AssistantChatView(viewModel: viewModel)
                .navigationTitle("AI Assistant")
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .navigationBarTrailing) {
                        Button("Clear") {
                            viewModel.clearConversation()
                        }
                        .disabled(viewModel.messages.isEmpty || viewModel.isLoading)
                    }
                }
        }
    }
}

private struct AssistantChatView: View {
    @ObservedObject var viewModel: AssistantChatViewModel
    @State private var draft = ""

    private let suggestionPrompts = [
        "How do I build a good vocal chain in Logic Pro?",
        "What stock plugins should I use for punchy drums?",
        "How can I avoid clipping while keeping my mix loud?"
    ]

    var body: some View {
        VStack(spacing: 0) {
            if viewModel.messages.isEmpty {
                welcomeView
            } else {
                conversationView
            }

            if let errorMessage = viewModel.errorMessage {
                Text(errorMessage)
                    .font(.caption)
                    .foregroundStyle(.red)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                    .padding(.top, 4)
            }

            composer
        }
        .background(Color(.systemGroupedBackground))
    }

    private var welcomeView: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                HStack(spacing: 10) {
                    Image(systemName: "bubble.left.and.bubble.right.fill")
                        .font(.title2)
                        .foregroundStyle(.tint)
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Logic Pro Guru")
                            .font(.headline.bold())
                        Text("Ask anything about recording, mixing, and mastering.")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                }
                .padding()
                .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 16))

                Text("Try one of these:")
                    .font(.caption.bold())
                    .foregroundStyle(.secondary)

                ForEach(suggestionPrompts, id: \.self) { suggestion in
                    Button {
                        viewModel.send(text: suggestion)
                    } label: {
                        Text(suggestion)
                            .font(.subheadline)
                            .foregroundStyle(.primary)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding()
                            .background(.background, in: RoundedRectangle(cornerRadius: 14))
                            .overlay {
                                RoundedRectangle(cornerRadius: 14)
                                    .stroke(Color.secondary.opacity(0.2))
                            }
                    }
                    .buttonStyle(.plain)
                    .disabled(viewModel.isLoading)
                }
            }
            .padding()
        }
    }

    private var conversationView: some View {
        ScrollViewReader { proxy in
            ScrollView {
                LazyVStack(spacing: 10) {
                    ForEach(viewModel.messages) { message in
                        MessageBubble(message: message)
                            .id(message.id)
                    }

                    if viewModel.isLoading {
                        HStack(spacing: 8) {
                            ProgressView()
                                .controlSize(.small)
                            Text("Thinking...")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                            Spacer()
                        }
                        .padding(.horizontal)
                    }
                }
                .padding()
            }
            .onChange(of: viewModel.messages.count) { _ in
                if let last = viewModel.messages.last {
                    withAnimation(.easeOut(duration: 0.2)) {
                        proxy.scrollTo(last.id, anchor: .bottom)
                    }
                }
            }
        }
    }

    private var composer: some View {
        HStack(alignment: .bottom, spacing: 8) {
            TextField("Ask about Logic Pro...", text: $draft, axis: .vertical)
                .lineLimit(1...5)
                .padding(.horizontal, 12)
                .padding(.vertical, 10)
                .background(.background, in: RoundedRectangle(cornerRadius: 14))

            Button {
                let text = draft.trimmingCharacters(in: .whitespacesAndNewlines)
                guard !text.isEmpty else { return }
                draft = ""
                viewModel.send(text: text)
            } label: {
                Image(systemName: "arrow.up.circle.fill")
                    .font(.system(size: 28))
            }
            .disabled(viewModel.isLoading || draft.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        }
        .padding()
        .background(.ultraThinMaterial)
    }
}

private struct MessageBubble: View {
    let message: AssistantMessage

    var body: some View {
        HStack(alignment: .top, spacing: 0) {
            if message.role == .assistant {
                bubbleContent
                Spacer(minLength: 36)
            } else {
                Spacer(minLength: 36)
                bubbleContent
            }
        }
    }

    private var bubbleContent: some View {
        Group {
            if message.role == .assistant {
                StructuredText(markdown: Self.assistantMarkdownSource(from: message.text))
                    .textual.structuredTextStyle(.gitHub)
                    .tint(Color.accentColor)
                    .textual.textSelection(.enabled)
                    .frame(maxWidth: .infinity, alignment: .leading)
            } else {
                Text(message.text)
                    .font(.body)
                    .foregroundStyle(Color.white)
                    .multilineTextAlignment(.leading)
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .background(
            message.role == .assistant
            ? AnyShapeStyle(Color(.secondarySystemBackground))
            : AnyShapeStyle(Color.accentColor),
            in: RoundedRectangle(cornerRadius: 14)
        )
    }

    /// Prepares raw assistant text for [Textual](https://github.com/gonzalezreal/textual) `StructuredText`: heal common LLM glue, then paragraph breaks outside ``` fences.
    private static func assistantMarkdownSource(from source: String) -> String {
        normalizeMarkdownPreservingCodeFences(source)
    }

    /// CommonMark treats a single newline as a space. Double newlines create paragraphs. This expands lone `\n` to `\n\n` only outside fenced code blocks.
    private static func normalizeMarkdownPreservingCodeFences(_ raw: String) -> String {
        let unified = raw.replacingOccurrences(of: "\r\n", with: "\n")
        let pieces = unified.components(separatedBy: "```")
        guard pieces.count > 1 else {
            let healed = insertParagraphBreaksForCommonLLMPatterns(unified)
            return expandSingleNewlinesToParagraphBreaks(healed)
        }
        var built = ""
        for (index, piece) in pieces.enumerated() {
            if index % 2 == 0 {
                let healed = insertParagraphBreaksForCommonLLMPatterns(piece)
                built += expandSingleNewlinesToParagraphBreaks(healed)
            } else {
                built += "```" + piece + "```"
            }
        }
        return built
    }

    /// Models often omit newlines before numbered lists (`mix:1. Channel`) or after bold labels (`**EQ**Purpose`), or glue list items (`EQ.2. Item`).
    private static func insertParagraphBreaksForCommonLLMPatterns(_ chunk: String) -> String {
        var s = chunk
        // **Channel EQ**Purpose -> **Channel EQ**\n\nPurpose
        if let re = try? NSRegularExpression(pattern: #"(\*\*[^*]+\*\*)([A-Za-z])"#, options: []) {
            let range = NSRange(s.startIndex..<s.endIndex, in: s)
            s = re.stringByReplacingMatches(in: s, options: [], range: range, withTemplate: "$1\n\n$2")
        }
        // **Channel EQ** 1. Next — optional space before list after bold block
        if let re = try? NSRegularExpression(pattern: #"(\*\*[^*]+\*\*)\s+(\d{1,2}\.\s+[A-Z])"#, options: []) {
            let range = NSRange(s.startIndex..<s.endIndex, in: s)
            s = re.stringByReplacingMatches(in: s, options: [], range: range, withTemplate: "$1\n\n$2")
        }
        // mix:1. Channel / step;2. Next — colon/semicolon then ordered list
        if let re = try? NSRegularExpression(pattern: #"([:;])\s*(\d{1,2}\.\s+[A-Z])"#, options: []) {
            let range = NSRange(s.startIndex..<s.endIndex, in: s)
            s = re.stringByReplacingMatches(in: s, options: [], range: range, withTemplate: "$1\n\n$2")
        }
        // Channel EQ.2. Compressor — period after word, then next list item
        if let re = try? NSRegularExpression(pattern: #"([A-Za-z])\.(\d{1,2}\.\s+[A-Z])"#, options: []) {
            let range = NSRange(s.startIndex..<s.endIndex, in: s)
            s = re.stringByReplacingMatches(in: s, options: [], range: range, withTemplate: "$1.\n\n$2")
        }
        return s
    }

    private static func expandSingleNewlinesToParagraphBreaks(_ chunk: String) -> String {
        guard let regex = try? NSRegularExpression(pattern: "\n(?!\n)", options: []) else {
            return chunk
        }
        let range = NSRange(chunk.startIndex..<chunk.endIndex, in: chunk)
        return regex.stringByReplacingMatches(in: chunk, options: [], range: range, withTemplate: "\n\n")
    }
}

private enum AssistantRole: String {
    case user
    case assistant
}

private struct AssistantMessage: Identifiable {
    let id: UUID
    let role: AssistantRole
    let text: String
}

private struct AssistantApiMessagePart: Encodable {
    let type: String
    let text: String
}

private struct AssistantApiMessage: Encodable {
    let id: String
    let role: String
    let parts: [AssistantApiMessagePart]
}

private struct AssistantApiRequest: Encodable {
    let messages: [AssistantApiMessage]
}

@MainActor
private final class AssistantChatViewModel: ObservableObject {
    @Published private(set) var messages: [AssistantMessage] = []
    @Published private(set) var isLoading = false
    @Published var errorMessage: String?

    private var chatTask: Task<Void, Never>?

    func send(text: String) {
        guard !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            return
        }

        chatTask?.cancel()
        errorMessage = nil

        let userMessage = AssistantMessage(id: UUID(), role: .user, text: text)
        messages.append(userMessage)

        chatTask = Task {
            await requestAssistantReply()
        }
    }

    func clearConversation() {
        chatTask?.cancel()
        messages = []
        errorMessage = nil
        isLoading = false
    }

    private func requestAssistantReply() async {
        isLoading = true
        defer { isLoading = false }

        do {
            let requestMessages = messages.map { message in
                AssistantApiMessage(
                    id: message.id.uuidString.lowercased(),
                    role: message.role.rawValue,
                    parts: [AssistantApiMessagePart(type: "text", text: message.text)]
                )
            }

            let payload = AssistantApiRequest(messages: requestMessages)
            let data = try JSONEncoder().encode(payload)

            let endpoint = ContentConfiguration.remoteBaseURL.appendingPathComponent("api/chat")
            var request = URLRequest(url: endpoint)
            request.httpMethod = "POST"
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = data

            let (responseData, response) = try await URLSession.shared.data(for: request)
            guard let httpResponse = response as? HTTPURLResponse else {
                throw AssistantChatError.invalidResponse
            }

            guard (200...299).contains(httpResponse.statusCode) else {
                let serverText = String(data: responseData, encoding: .utf8) ?? "Unknown server error."
                throw AssistantChatError.serverError("Status \(httpResponse.statusCode): \(serverText)")
            }

            let assistantText = String(data: responseData, encoding: .utf8)?
                .trimmingCharacters(in: .whitespacesAndNewlines) ?? ""

            guard !assistantText.isEmpty else {
                throw AssistantChatError.emptyReply
            }

            messages.append(
                AssistantMessage(
                    id: UUID(),
                    role: .assistant,
                    text: assistantText
                )
            )
        } catch is CancellationError {
            // Ignore cancellation to avoid flashing stale errors.
        } catch {
            errorMessage = "Assistant unavailable right now. Please try again."
        }
    }
}

private enum AssistantChatError: Error {
    case invalidResponse
    case emptyReply
    case serverError(String)
}

private struct HomeTabView: View {
    let bundle: ContentBundle
    @Binding var selectedTab: AppTab
    @Binding var selectedSheetID: CheatSheet.ID?

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    homeHeroBanner
                    askAICallout
                    chaptersSection
                }
                .padding()
            }
        }
    }

    private var homeHeroBanner: some View {
        VStack(alignment: .leading, spacing: 14) {
            Image("HeaderLogo")
                .resizable()
                .scaledToFit()
                .clipShape(RoundedRectangle(cornerRadius: 18))
                .shadow(color: .blue.opacity(0.2), radius: 16, y: 8)
                .accessibilityLabel("Logic Pro Guru")

            Text("Record, mix, and master with a studio-ready reference book.")
                .font(.title.bold())
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }

    private var askAICallout: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .top, spacing: 8) {
                Image(systemName: "sparkles")
                    .font(.title3)
                    .foregroundStyle(.tint)
                VStack(alignment: .leading, spacing: 6) {
                    Text("New: Ask AI")
                        .font(.subheadline.weight(.bold))
                    Text("The assistant is tuned on Logic Pro, documentation from popular plugin vendors, and common industry standards—so answers stay practical for real sessions.")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
            Button {
                selectedTab = .assistant
            } label: {
                Label("Open Ask", systemImage: "bubble.left.and.bubble.right.fill")
                    .font(.subheadline.weight(.semibold))
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.regular)
        }
        .padding(14)
        .background(
            LinearGradient(
                colors: [Color.accentColor.opacity(0.14), Color.purple.opacity(0.08)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            ),
            in: RoundedRectangle(cornerRadius: 16)
        )
        .overlay {
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.secondary.opacity(0.2))
        }
    }

    private var chaptersSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Chapters")
                .font(.title3.bold())
            ForEach(ChapterCategory.allCases) { category in
                let sheets = sheets(for: category)
                if !sheets.isEmpty {
                    VStack(alignment: .leading, spacing: 6) {
                        Text(category.title)
                            .font(.caption2.weight(.bold))
                            .foregroundStyle(.secondary)
                            .textCase(.uppercase)
                        ForEach(sheets) { sheet in
                            Button {
                                selectedSheetID = sheet.id
                                selectedTab = .library
                            } label: {
                                HStack(alignment: .top, spacing: 10) {
                                    Text(sheet.header.icon)
                                        .font(.title3)
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(navLabel(for: sheet))
                                            .font(.subheadline.weight(.semibold))
                                            .foregroundStyle(.primary)
                                            .multilineTextAlignment(.leading)
                                        if category != .mixing {
                                            Text(sheet.header.subtitle)
                                                .font(.caption2)
                                                .foregroundStyle(.secondary)
                                                .lineLimit(2)
                                                .multilineTextAlignment(.leading)
                                        }
                                    }
                                    Spacer(minLength: 4)
                                    Image(systemName: "chevron.right")
                                        .font(.caption.weight(.bold))
                                        .foregroundStyle(.tertiary)
                                }
                                .padding(.vertical, 8)
                                .padding(.horizontal, 10)
                                .background(Color(.secondarySystemGroupedBackground), in: RoundedRectangle(cornerRadius: 10))
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }
            }
        }
    }

    private func navLabel(for sheet: CheatSheet) -> String {
        bundle.navItems.first { $0.id == sheet.id }?.label ?? sheet.header.title
    }

    private func sheets(for category: ChapterCategory) -> [CheatSheet] {
        category.sheetIDs.compactMap { id in bundle.cheatSheets.first { $0.id == id } }
    }
}

private struct TrainingTabView: View {
    let lessons: [TrainingLesson]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    header

                    ForEach(lessons) { lesson in
                        NavigationLink {
                            TrainingLessonDetailView(lesson: lesson)
                        } label: {
                            FeaturedLessonCard(lesson: lesson)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding()
            }
            .navigationTitle("Train")
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 12) {
            Image(systemName: "graduationcap.fill")
                .font(.system(size: 36, weight: .bold))
                .foregroundStyle(.tint)
                .frame(width: 64, height: 64)
                .background(Color.accentColor.opacity(0.12), in: RoundedRectangle(cornerRadius: 18))

            Text("Train")
                .font(.largeTitle.bold())

            Text("Guided Logic Pro lessons for building repeatable recording, mixing, and mastering habits.")
                .font(.headline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }
}

struct TrainingLessonDetailView: View {
    let lesson: TrainingLesson
    @StateObject private var savedItemsManager = SavedItemsManager.shared
    
    private var isSaved: Bool {
        savedItemsManager.isSaved(id: lesson.id, type: .trainingLesson)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                lessonHeader

                ForEach(lesson.steps) { step in
                    TrainingStepCard(step: step)
                }

                troubleshootingSection
                checklist
            }
            .padding()
        }
        .navigationTitle(lesson.title)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    savedItemsManager.toggleSave(
                        id: lesson.id,
                        type: .trainingLesson,
                        title: lesson.title,
                        subtitle: lesson.summary,
                        icon: lesson.symbolName
                    )
                } label: {
                    Image(systemName: isSaved ? "bookmark.fill" : "bookmark")
                        .foregroundStyle(isSaved ? .yellow : .primary)
                }
            }
        }
        .onDisappear {
            savedItemsManager.autoSaveLastViewed(
                id: lesson.id,
                type: .trainingLesson,
                title: lesson.title,
                subtitle: lesson.summary,
                icon: lesson.symbolName
            )
        }
    }

    private var lessonHeader: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(lesson.series.uppercased())
                .font(.caption.bold())
                .foregroundStyle(.secondary)
            Text(lesson.title)
                .font(.largeTitle.bold())
            Text(lesson.summary)
                .font(.headline)
                .foregroundStyle(.secondary)
            HStack {
                Label(lesson.duration, systemImage: "clock.fill")
                Spacer()
                Label("\(lesson.steps.count) steps", systemImage: "list.number")
            }
            .font(.caption.bold())
            .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }

    private var troubleshootingSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Troubleshooting Quick Reference")
                .font(.title3.bold())

            VStack(alignment: .leading, spacing: 8) {
                TroubleshootingRow(problem: "Mix sounds muddy", solution: "Check 200-400 Hz buildup on multiple tracks. Use high-pass filters.")
                TroubleshootingRow(problem: "Vocals get lost", solution: "Try a gentle boost around 2-5 kHz. Check for masking by guitars/keys.")
                TroubleshootingRow(problem: "Drums lack punch", solution: "Check compression attack time. Slower attack preserves transients.")
                TroubleshootingRow(problem: "Master bus clips", solution: "Pull individual track faders down, not the master fader.")
                TroubleshootingRow(problem: "Harsh or fatiguing sound", solution: "Check for over-compression and excessive high-frequency boost.")
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(
            LinearGradient(
                colors: [Color.orange.opacity(0.08), Color.red.opacity(0.04)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            ),
            in: RoundedRectangle(cornerRadius: 18)
        )
        .overlay {
            RoundedRectangle(cornerRadius: 18)
                .stroke(Color.secondary.opacity(0.2))
        }
    }

    private var checklist: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("First Mix Completion Checklist")
                .font(.title3.bold())

            ForEach(lesson.checklist, id: \.self) { item in
                Label(item, systemImage: "checkmark.circle.fill")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.background, in: RoundedRectangle(cornerRadius: 18))
        .overlay {
            RoundedRectangle(cornerRadius: 18)
                .stroke(Color.secondary.opacity(0.2))
        }
    }
}

private struct TrainingStepCard: View {
    let step: TrainingLessonStep
    @State private var isExpanded = false

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            stepHeader

            StepVisualCard(step: step)

            conceptSection

            actionsSection

            if let settings = step.settings {
                settingsSection(settings)
            }

            expandButton

            if isExpanded {
                expandedContent
            }

            if let screenshot = step.stepScreenshot {
                screenshotThumbnail(screenshot)
            }

            checkYourWorkSection
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.background, in: RoundedRectangle(cornerRadius: 22))
        .overlay {
            RoundedRectangle(cornerRadius: 22)
                .stroke(Color.secondary.opacity(0.2))
        }
    }

    private var stepHeader: some View {
        HStack(alignment: .top, spacing: 12) {
            Text("\(step.number)")
                .font(.headline.bold())
                .foregroundStyle(.white)
                .frame(width: 38, height: 38)
                .background(
                    LinearGradient(
                        colors: [.blue, .purple],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    in: Circle()
                )

            VStack(alignment: .leading, spacing: 4) {
                Text("Step \(step.number)")
                    .font(.caption.bold())
                    .foregroundStyle(.secondary)
                Text(step.title)
                    .font(.title3.bold())
            }

            Spacer()
        }
    }

    private var conceptSection: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Why This Matters")
                .font(.caption.bold())
                .foregroundStyle(.tint)
            Text(step.concept)
                .font(.body)
                .foregroundStyle(.secondary)
        }
    }

    private var actionsSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("What To Do")
                .font(.caption.bold())
                .foregroundStyle(.tint)

            VStack(alignment: .leading, spacing: 6) {
                ForEach(Array(step.actions.enumerated()), id: \.offset) { index, action in
                    HStack(alignment: .top, spacing: 8) {
                        Text("\(index + 1)")
                            .font(.caption2.bold())
                            .foregroundStyle(.white)
                            .frame(width: 18, height: 18)
                            .background(Color.accentColor, in: Circle())

                        Text(action)
                            .font(.subheadline)
                            .foregroundStyle(.primary)
                    }
                }
            }
        }
    }

    private func settingsSection(_ settings: [String: String]) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Recommended Settings")
                .font(.caption.bold())
                .foregroundStyle(.tint)

            VStack(alignment: .leading, spacing: 4) {
                ForEach(Array(settings.sorted(by: { $0.key < $1.key })), id: \.key) { key, value in
                    HStack {
                        Text(key)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                        Spacer()
                        Text(value)
                            .font(.caption.bold())
                            .foregroundStyle(.primary)
                    }
                }
            }
            .padding(8)
            .background(Color.accentColor.opacity(0.08), in: RoundedRectangle(cornerRadius: 8))
        }
    }

    private var expandButton: some View {
        Button {
            withAnimation(.easeInOut(duration: 0.2)) {
                isExpanded.toggle()
            }
        } label: {
            HStack {
                Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                Text(isExpanded ? "Show Less" : "Pro Tips & Common Mistakes")
                    .font(.caption.bold())
            }
            .foregroundStyle(.tint)
        }
        .buttonStyle(.plain)
    }

    private var expandedContent: some View {
        VStack(alignment: .leading, spacing: 12) {
            if let proTip = step.proTip {
                ProTipCard(text: proTip)
            }

            if let avoidThis = step.avoidThis {
                WarningCard(text: avoidThis)
            }
        }
    }

    private func screenshotThumbnail(_ source: String) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: "photo.fill")
                    .foregroundStyle(.tint)
                Text("Step Screenshot")
                    .font(.caption.bold())
                    .foregroundStyle(.tint)
                Spacer()
            }

            CachedRemoteImage(
                source: source,
                altText: "Screenshot for \(step.title)",
                height: 170
            )
        }
    }

    private var checkYourWorkSection: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("How to Verify")
                .font(.caption.bold())
                .foregroundStyle(.green)
            Text(step.checkYourWork)
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .padding(10)
        .background(Color.green.opacity(0.08), in: RoundedRectangle(cornerRadius: 12))
    }
}

private struct StepVisualCard: View {
    let step: TrainingLessonStep

    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: step.symbolName)
                .font(.system(size: 30, weight: .bold))
                .foregroundStyle(.white)
                .frame(width: 64, height: 64)
                .background(
                    LinearGradient(
                        colors: [.cyan, .blue, .purple],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    in: RoundedRectangle(cornerRadius: 18)
                )

            VStack(alignment: .leading, spacing: 5) {
                Text(step.visualTitle.uppercased())
                    .font(.caption.bold())
                    .foregroundStyle(.secondary)
                Text(step.visualCaption)
                    .font(.subheadline.bold())
            }

            Spacer()
        }
        .padding()
        .background(
            LinearGradient(
                colors: [Color.accentColor.opacity(0.14), Color.purple.opacity(0.08)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            ),
            in: RoundedRectangle(cornerRadius: 18)
        )
    }
}

private struct ProTipCard: View {
    let text: String

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: "lightbulb.fill")
                .foregroundStyle(.yellow)
            VStack(alignment: .leading, spacing: 2) {
                Text("Pro Tip")
                    .font(.caption.bold())
                    .foregroundStyle(.yellow)
                Text(text)
                    .font(.subheadline)
                    .foregroundStyle(.primary)
            }
        }
        .padding(10)
        .background(Color.yellow.opacity(0.12), in: RoundedRectangle(cornerRadius: 12))
    }
}

private struct WarningCard: View {
    let text: String

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: "exclamationmark.triangle.fill")
                .foregroundStyle(.orange)
            VStack(alignment: .leading, spacing: 2) {
                Text("Common Mistake to Avoid")
                    .font(.caption.bold())
                    .foregroundStyle(.orange)
                Text(text)
                    .font(.subheadline)
                    .foregroundStyle(.primary)
            }
        }
        .padding(10)
        .background(Color.orange.opacity(0.12), in: RoundedRectangle(cornerRadius: 12))
    }
}

private struct TroubleshootingRow: View {
    let problem: String
    let solution: String

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(alignment: .top, spacing: 6) {
                Image(systemName: "questionmark.circle.fill")
                    .foregroundStyle(.secondary)
                    .font(.caption)
                Text(problem)
                    .font(.subheadline.bold())
                    .foregroundStyle(.primary)
            }
            Text(solution)
                .font(.caption)
                .foregroundStyle(.secondary)
                .padding(.leading, 22)
        }
    }
}

private struct MockTabView: View {
    let title: String
    let subtitle: String
    let symbolName: String
    let cards: [MockTabCard]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    header

                    ForEach(cards) { card in
                        VStack(alignment: .leading, spacing: 8) {
                            Text(card.title)
                                .font(.headline)
                            Text(card.detail)
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding()
                        .background(.background, in: RoundedRectangle(cornerRadius: 18))
                        .overlay {
                            RoundedRectangle(cornerRadius: 18)
                                .stroke(Color.secondary.opacity(0.2))
                        }
                    }
                }
                .padding()
            }
            .navigationTitle(title)
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 12) {
            Image(systemName: symbolName)
                .font(.system(size: 36, weight: .bold))
                .foregroundStyle(.tint)
                .frame(width: 64, height: 64)
                .background(Color.accentColor.opacity(0.12), in: RoundedRectangle(cornerRadius: 18))

            Text(title)
                .font(.largeTitle.bold())

            Text(subtitle)
                .font(.headline)
                .foregroundStyle(.secondary)

            Text("Mocked for now, polished screens coming next.")
                .font(.caption.bold())
                .foregroundStyle(.secondary)
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(.secondary.opacity(0.12), in: Capsule())
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }
}

private enum SettingsPreferences {
    static let themeStorageKey = "settings.preferredTheme"
    static let textSizeStorageKey = "settings.preferredTextSize"

    static let systemTheme = "system"
    static let lightTheme = "light"
    static let darkTheme = "dark"

    static let smallTextSize = "small"
    static let mediumTextSize = "medium"
    static let largeTextSize = "large"

    static func colorScheme(for theme: String) -> ColorScheme? {
        switch theme {
        case lightTheme:
            return .light
        case darkTheme:
            return .dark
        default:
            return nil
        }
    }

    static func dynamicTypeSize(for textSize: String) -> DynamicTypeSize {
        switch textSize {
        case smallTextSize:
            return .small
        case largeTextSize:
            return .large
        default:
            return .medium
        }
    }
}

private struct SettingsTabView: View {
    let bundle: ContentBundle
    @Binding var selectedTab: AppTab
    private let privacyURL = URL(string: "https://logicpro.guru/privacy")
    private let termsURL = URL(string: "https://logicpro.guru/terms")
    private let contactURL = URL(string: "https://logicpro.guru/contact")

    var body: some View {
        NavigationStack {
            List {
                Section("Preferences") {
                    NavigationLink {
                        DisplaySettingsView()
                    } label: {
                        SettingsRow(
                            title: "Display",
                            detail: "Adjust theme and reading size for studio sessions.",
                            symbolName: "textformat.size"
                        )
                    }
                }

                Section("Library") {
                    NavigationLink {
                        SavedTabView(bundle: bundle, selectedTab: $selectedTab)
                    } label: {
                        SettingsRow(
                            title: "Saved",
                            detail: "Open your pinned chapters and lessons.",
                            symbolName: "bookmark.fill"
                        )
                    }
                }

                Section("Support") {
                    if let privacyURL {
                        Link(destination: privacyURL) {
                            SettingsRow(
                                title: "Privacy",
                                detail: "Review how the app handles data and syncing.",
                                symbolName: "hand.raised.fill"
                            )
                        }
                    }
                    if let termsURL {
                        Link(destination: termsURL) {
                            SettingsRow(
                                title: "Terms",
                                detail: "Read the app terms of use.",
                                symbolName: "doc.text.fill"
                            )
                        }
                    }
                    if let contactURL {
                        Link(destination: contactURL) {
                            SettingsRow(
                                title: "Support",
                                detail: "Contact support for app and content questions.",
                                symbolName: "questionmark.bubble.fill"
                            )
                        }
                    }
                }
            }
            .navigationTitle("Settings")
            .listStyle(.insetGrouped)
        }
    }
}

private struct DisplaySettingsView: View {
    @AppStorage(SettingsPreferences.themeStorageKey) private var preferredTheme: String = SettingsPreferences.systemTheme
    @AppStorage(SettingsPreferences.textSizeStorageKey) private var preferredTextSize: String = SettingsPreferences.mediumTextSize

    var body: some View {
        List {
            Section("Theme") {
                Picker("Appearance", selection: $preferredTheme) {
                    Label("System", systemImage: "gearshape.fill")
                        .tag(SettingsPreferences.systemTheme)
                    Label("Light", systemImage: "sun.max.fill")
                        .tag(SettingsPreferences.lightTheme)
                    Label("Dark", systemImage: "moon.fill")
                        .tag(SettingsPreferences.darkTheme)
                }
                .pickerStyle(.segmented)
            }

            Section("Text size") {
                Picker("Reading size", selection: $preferredTextSize) {
                    Text("Small").tag(SettingsPreferences.smallTextSize)
                    Text("Medium").tag(SettingsPreferences.mediumTextSize)
                    Text("Large").tag(SettingsPreferences.largeTextSize)
                }
                .pickerStyle(.segmented)

                Text("Display changes are applied immediately across the app.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .navigationTitle("Display")
        .navigationBarTitleDisplayMode(.inline)
        .listStyle(.insetGrouped)
    }
}

private struct SettingsRow: View {
    let title: String
    let detail: String
    let symbolName: String

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: symbolName)
                .foregroundStyle(.tint)
                .font(.headline)
                .frame(width: 24, alignment: .center)

            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                    .foregroundStyle(.primary)
                Text(detail)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 4)
    }
}

private struct FeaturedLessonCard: View {
    let lesson: TrainingLesson

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                Image(systemName: lesson.symbolName)
                    .font(.title2.bold())
                    .foregroundStyle(.tint)
                    .frame(width: 42, height: 42)
                    .background(Color.accentColor.opacity(0.12), in: RoundedRectangle(cornerRadius: 12))

                Spacer()

                HStack(spacing: 6) {
                    ForEach(lesson.badges, id: \.self) { badge in
                        Text(badge)
                            .font(.caption2.bold())
                            .foregroundStyle(.secondary)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(.secondary.opacity(0.12), in: Capsule())
                    }
                }
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(lesson.series.uppercased())
                    .font(.caption.bold())
                    .foregroundStyle(.secondary)
                Text(lesson.title)
                    .font(.title3.bold())
                Text(lesson.summary)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }

            Label(lesson.duration, systemImage: "clock.fill")
            .font(.caption.bold())
            .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 20))
        .overlay {
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color.secondary.opacity(0.2))
        }
    }
}

private struct MockTabCard: Identifiable {
    var id: String { title }
    let title: String
    let detail: String
}
