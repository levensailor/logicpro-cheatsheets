import SwiftUI

struct MainTabView: View {
    let bundle: ContentBundle
    @State private var selectedTab: AppTab = .home
    private let trainingLessons = TrainingLesson.featured

    var body: some View {
        TabView(selection: $selectedTab) {
            HomeTabView(bundle: bundle, trainingLessons: trainingLessons, selectedTab: $selectedTab)
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
                .tag(AppTab.home)

            SheetListView(bundle: bundle)
                .tabItem {
                    Label("Library", systemImage: "books.vertical.fill")
                }
                .tag(AppTab.library)

            TrainingTabView(lessons: trainingLessons)
            .tabItem {
                Label("Train", systemImage: "graduationcap.fill")
            }
            .tag(AppTab.train)

            MockTabView(
                title: "Saved",
                subtitle: "Your most useful handbook pages in one place.",
                symbolName: "bookmark.fill",
                cards: [
                    MockTabCard(title: "Pinned chapters", detail: "Save the sheets you open every session."),
                    MockTabCard(title: "Favorite settings", detail: "Keep notes on plugin chains, target levels, and routing choices."),
                    MockTabCard(title: "Offline queue", detail: "Prepare saved references for studio sessions without a connection.")
                ]
            )
            .tabItem {
                Label("Saved", systemImage: "bookmark.fill")
            }
            .tag(AppTab.saved)

            MockTabView(
                title: "Settings",
                subtitle: "Tune the app for your studio workflow.",
                symbolName: "gearshape.fill",
                cards: [
                    MockTabCard(title: "Content updates", detail: "Manage cached handbook content and refresh behavior."),
                    MockTabCard(title: "Display", detail: "Adjust reading preferences for light and dark sessions."),
                    MockTabCard(title: "Support", detail: "Find privacy, terms, contact, and app support links.")
                ]
            )
            .tabItem {
                Label("Settings", systemImage: "gearshape.fill")
            }
            .tag(AppTab.settings)
        }
    }
}

private enum AppTab: Hashable {
    case home
    case library
    case train
    case saved
    case settings
}

private struct HomeTabView: View {
    let bundle: ContentBundle
    let trainingLessons: [TrainingLesson]
    @Binding var selectedTab: AppTab

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    hero
                    quickActions
                    newAndPopular
                    todaysFocus
                }
                .padding()
            }
        }
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 14) {
            Image("HeaderLogo")
                .resizable()
                .scaledToFit()
                .clipShape(RoundedRectangle(cornerRadius: 18))
                .shadow(color: .blue.opacity(0.2), radius: 16, y: 8)
                .accessibilityLabel("Logic Pro Guru")

            Text("Record, mix, and master with a studio-ready reference book.")
                .font(.title.bold())

            Text("Jump into the handbook, train your ears, save repeat settings, and keep your Logic Pro workflow close at hand.")
                .font(.headline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }

    private var quickActions: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 150), spacing: 12)], spacing: 12) {
            HomeActionCard(title: "Library", detail: "\(bundle.cheatSheets.count) chapters", symbolName: "books.vertical.fill") {
                selectedTab = .library
            }
            HomeActionCard(title: "Train", detail: "Practice paths", symbolName: "graduationcap.fill") {
                selectedTab = .train
            }
            HomeActionCard(title: "Saved", detail: "Pinned pages", symbolName: "bookmark.fill") {
                selectedTab = .saved
            }
            HomeActionCard(title: "Settings", detail: "App controls", symbolName: "gearshape.fill") {
                selectedTab = .settings
            }
        }
    }

    private var newAndPopular: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("New & Popular")
                    .font(.title2.bold())
                Spacer()
                Button("Open Train") {
                    selectedTab = .train
                }
                .font(.caption.bold())
            }

            ForEach(trainingLessons.filter { $0.isFeatured }) { lesson in
                NavigationLink {
                    TrainingLessonDetailView(lesson: lesson)
                } label: {
                    FeaturedLessonCard(lesson: lesson)
                }
                .buttonStyle(.plain)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.background, in: RoundedRectangle(cornerRadius: 20))
        .overlay {
            RoundedRectangle(cornerRadius: 20)
                .stroke(.quaternary)
        }
    }

    private var todaysFocus: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Start Here")
                .font(.title2.bold())

            VStack(alignment: .leading, spacing: 10) {
                FocusRow(symbolName: "mic.fill", title: "Capture clean performances", detail: "Begin with tracking and gain structure before mixing.")
                FocusRow(symbolName: "slider.horizontal.3", title: "Shape the mix", detail: "Use the instrument and bus chapters as fast decision guides.")
                FocusRow(symbolName: "waveform", title: "Finish with confidence", detail: "Check loudness, delivery targets, and reference terms before export.")
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.background, in: RoundedRectangle(cornerRadius: 20))
        .overlay {
            RoundedRectangle(cornerRadius: 20)
                .stroke(.quaternary)
        }
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

private struct TrainingLessonDetailView: View {
    let lesson: TrainingLesson
    @State private var selectedImage: String? = nil

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                lessonHeader

                ForEach(lesson.steps) { step in
                    TrainingStepCard(step: step, selectedImage: $selectedImage)
                }

                troubleshootingSection
                checklist
            }
            .padding()
        }
        .navigationTitle(lesson.title)
        .navigationBarTitleDisplayMode(.inline)
        .sheet(item: $selectedImage) { imageName in
            ScreenshotViewer(imageName: imageName)
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
                .stroke(.quaternary)
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
                .stroke(.quaternary)
        }
    }
}

private struct TrainingStepCard: View {
    let step: TrainingLessonStep
    @Binding var selectedImage: String?
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
                .stroke(.quaternary)
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

    private func screenshotThumbnail(_ name: String) -> some View {
        Button {
            selectedImage = name
        } label: {
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Image(systemName: "photo.fill")
                        .foregroundStyle(.tint)
                    Text("View Screenshot")
                        .font(.caption.bold())
                        .foregroundStyle(.tint)
                    Spacer()
                    Image(systemName: "arrow.up.right")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                RoundedRectangle(cornerRadius: 8)
                    .fill(Color.secondary.opacity(0.12))
                    .frame(height: 80)
                    .overlay {
                        Image(systemName: "photo")
                            .font(.title2)
                            .foregroundStyle(.secondary.opacity(0.5))
                    }
            }
        }
        .buttonStyle(.plain)
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

private struct ScreenshotViewer: View {
    let imageName: String
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            ZStack {
                Color.black.opacity(0.9).ignoresSafeArea()

                VStack {
                    Image(systemName: "photo")
                        .font(.system(size: 60))
                        .foregroundStyle(.white.opacity(0.5))

                    Text("Screenshot: \(imageName)")
                        .font(.headline)
                        .foregroundStyle(.white)

                    Text("Add the annotated screenshot to assets with this name")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                }
            }
            .navigationTitle("Step Screenshot")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                    .foregroundStyle(.white)
                }
            }
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
                                .stroke(.quaternary)
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

private struct HomeActionCard: View {
    let title: String
    let detail: String
    let symbolName: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 10) {
                Image(systemName: symbolName)
                    .font(.title2.bold())
                    .foregroundStyle(.tint)
                Text(title)
                    .font(.headline)
                Text(detail)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
            .background(.background, in: RoundedRectangle(cornerRadius: 18))
            .overlay {
                RoundedRectangle(cornerRadius: 18)
                    .stroke(.quaternary)
            }
        }
        .buttonStyle(.plain)
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
                .stroke(.quaternary)
        }
    }
}

private struct FocusRow: View {
    let symbolName: String
    let title: String
    let detail: String

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: symbolName)
                .font(.headline)
                .foregroundStyle(.tint)
                .frame(width: 28, height: 28)
                .background(Color.accentColor.opacity(0.12), in: Circle())

            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(.headline)
                Text(detail)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
    }
}

private struct MockTabCard: Identifiable {
    var id: String { title }
    let title: String
    let detail: String
}

private struct TrainingLesson: Identifiable {
    let id: String
    let title: String
    let series: String
    let summary: String
    let duration: String
    let symbolName: String
    let badges: [String]
    let isFeatured: Bool
    let steps: [TrainingLessonStep]
    let checklist: [String]

    static let featured = [
        TrainingLesson(
            id: "your-first-mix",
            title: "Your First Mix",
            series: "Beginner Mixing Series",
            summary: "A comprehensive 13-step guide from raw tracks to a clean, bounce-ready mix. Perfect for beginners who want to understand the full mixing workflow.",
            duration: "20 min read",
            symbolName: "slider.horizontal.3",
            badges: ["New", "Popular", "Beginner"],
            isFeatured: true,
            steps: [
                TrainingLessonStep(
                    number: 1,
                    title: "Understand Your Goal",
                    concept: "A first mix isn't about radio-ready perfection. It's about creating a balanced, exportable version of your song that sounds good on any device.",
                    actions: [
                        "Set realistic expectations: your first mix should be 'balanced and exportable,' not Grammy-winning",
                        "Focus on organization over plugins—clean sessions beat fancy processing every time",
                        "Remember that restraint is a superpower: small moves add up to great results"
                    ],
                    body: "Your first mix journey starts with the right mindset. Professional mixes take years to master, but your first mix can still sound great if you focus on fundamentals. Think of it like learning to cook: you don't need molecular gastronomy techniques to make a delicious meal.",
                    symbolName: "target",
                    visualTitle: "Goal Setting",
                    visualCaption: "Balance over perfection. Organization over plugins.",
                    settings: nil,
                    proTip: "Save your project as 'SongName_FirstMix_v1' before starting. This gives you a clean fallback point and removes the pressure of 'messing up' your only version.",
                    avoidThis: "Don't aim for 'radio ready' on your first attempt. That standard involves mastering, which is a separate process. Focus on clarity and balance instead.",
                    checkYourWork: "Can you explain your mix goal in one sentence? If not, simplify it. 'Make everything audible and balanced' is a perfect first-mix goal.",
                    stepScreenshot: "step1_goal_setting"
                ),
                TrainingLessonStep(
                    number: 2,
                    title: "Project Setup: Sample Rate & Bit Depth",
                    concept: "Your project's technical foundation determines audio quality and compatibility. Getting this right prevents headaches later.",
                    actions: [
                        "Open File > Project Settings > Audio (or press Option+Command+J)",
                        "Check the Sample Rate: 44.1 kHz for music, 48 kHz for video",
                        "Set Bit Depth to 24-bit for all new projects",
                        "Match imported audio's sample rate—never upsample just because you can"
                    ],
                    body: "Sample rate is like image resolution for audio—higher isn't always better, but wrong settings cause problems. 44.1 kHz is the CD standard and works for most music. 48 kHz is common for video work. The key is matching your source files, not arbitrarily choosing the highest number available.",
                    symbolName: "gearshape.2",
                    visualTitle: "Project Settings",
                    visualCaption: "Match source files. Use 24-bit. Don't upsample.",
                    settings: [
                        "Sample Rate": "44.1 kHz (music) or 48 kHz (video)",
                        "Bit Depth": "24-bit",
                        "I/O Buffer": "128-256 samples (mixing)"
                    ],
                    proTip: "If you receive tracks at 48 kHz but your project is at 44.1 kHz, Logic can convert on import. But for best results, set the project to match the majority of your source files before importing.",
                    avoidThis: "Don't record at 96 kHz or 192 kHz 'just because.' These rates use significantly more CPU and storage with minimal audible benefit for most music. Master 44.1/48 kHz first.",
                    checkYourWork: "Look at your track headers. If you see a clock icon with an exclamation mark, you have sample rate mismatches that need attention.",
                    stepScreenshot: "step2_project_settings"
                ),
                TrainingLessonStep(
                    number: 3,
                    title: "Import & Organize Your Tracks",
                    concept: "A well-organized session lets you focus on mixing instead of hunting for tracks. Colors and names tell the story of your song at a glance.",
                    actions: [
                        "Create audio tracks first: Option+Command+N, then select Audio",
                        "Import via drag-and-drop from Finder or File > Import > Audio File",
                        "Name tracks clearly: 'Kick In' not 'Audio 1', 'Lead Vox' not 'Audio 7'",
                        "Color by group: Drums yellow, Bass orange, Guitars green, Vocals blue",
                        "Press Option+C to open the color picker"
                    ],
                    body: "Track organization is the most important 'mixing' step that nobody talks about. When you can see that your drums are all yellow, you instantly understand your session structure. When tracks have names like 'Audio 1', you waste mental energy figuring out what's what.",
                    symbolName: "folder.fill",
                    visualTitle: "Organization",
                    visualCaption: "Name clearly. Color by group. Think visually.",
                    settings: [
                        "Drums": "Yellow/Gold",
                        "Bass": "Orange/Red",
                        "Guitars": "Green",
                        "Keys": "Purple",
                        "Vocals": "Blue"
                    ],
                    proTip: "Use Broadcast Wave (BWF) files with embedded timestamps? Logic can place them at their original timeline position automatically. Look for the 'Place at Original Position' option during import.",
                    avoidThis: "Don't import everything into one stereo track. While it seems simpler, you lose all mixing control. Individual mono or stereo tracks for each instrument are essential.",
                    checkYourWork: "Show your session to someone who doesn't know the song. Can they identify the drums, bass, and vocals just by looking at the track names and colors?",
                    stepScreenshot: "step3_organized_tracks"
                ),
                TrainingLessonStep(
                    number: 4,
                    title: "Gain Staging: The Foundation",
                    concept: "Gain staging is managing volume at every point in the signal chain. Proper levels give you headroom, prevent distortion, and make plugins work correctly.",
                    actions: [
                        "Reset all faders to unity (0 dB): Option+Click each fader",
                        "Check individual track meters: aim for peaks around -12 to -6 dBFS",
                        "Watch the Stereo Out meter: should peak around -6 dBFS before mastering",
                        "Use clip gain (not the fader) to adjust hot or quiet recordings",
                        "Remember: faders are for mixing balance, not fixing recording levels"
                    ],
                    body: "Think of gain staging like water pressure in a house. You want consistent, moderate pressure at every faucet—not a trickle at some and a fire hose at others. When every track hits the mix at a sensible level, combining them doesn't overload your master bus.",
                    symbolName: "waveform",
                    visualTitle: "Level Management",
                    visualCaption: "-12 to -6 dBFS per track. -6 dBFS on master.",
                    settings: [
                        "Track Peaks": "-12 to -6 dBFS",
                        "Master Bus": "-6 dBFS peak",
                        "Headroom": "6-12 dB below clipping"
                    ],
                    proTip: "The 'Goldilocks' zone for analog-modeled plugins is around -18 dBFS RMS (average level). This makes compressors and EQs behave like their hardware counterparts. Use a VU meter plugin if you want to dial this in precisely.",
                    avoidThis: "Don't pull down the master fader to fix clipping. This just hides the problem. Instead, lower individual track levels. The master fader should stay at or near unity throughout mixing.",
                    checkYourWork: "Play the loudest section of your song. Is the Stereo Out meter staying below -3 dBFS? If it's hitting 0 dBFS (red), you need to pull track faders down, not the master.",
                    stepScreenshot: "step4_gain_staging"
                ),
                TrainingLessonStep(
                    number: 5,
                    title: "The Anchor Method: Setting Levels",
                    concept: "Starting with 'anchor' instruments—kick, snare, bass, vocal—gives your mix a solid foundation. Everything else arranges around these core elements.",
                    actions: [
                        "Pull ALL faders down to silence",
                        "Start with the kick drum: bring it up to a comfortable level",
                        "Add the snare: should sit naturally with the kick",
                        "Bring in bass: should lock with the kick drum rhythmically",
                        "Add the main vocal or lead instrument",
                        "Fill in supporting instruments around these anchors",
                        "Check in mono for 30 seconds to expose balance problems"
                    ],
                    body: "The anchor method is like building a house: you start with the foundation, not the decorations. Kick and snare give you the rhythmic foundation. Bass provides the harmonic foundation. Lead vocals or instruments give you the melodic foundation. Once these are balanced, everything else finds its place naturally.",
                    symbolName: "anchor",
                    visualTitle: "Anchor Mixing",
                    visualCaption: "Kick, snare, bass, vocal first. Everything else follows.",
                    settings: [
                        "Kick": "Foundation level (0 dB reference)",
                        "Snare": "Similar to kick or slightly lower",
                        "Bass": "Lock with kick, not compete",
                        "Vocal": "Should sit on top naturally"
                    ],
                    proTip: "Mixing in mono (use the Mono button on your Stereo Out or a Gain plugin set to mono) reveals problems that stereo hides. If two guitars clash in mono, they'll clash in stereo too—you just might not notice as easily.",
                    avoidThis: "Don't solo tracks to set their level. A bass that sounds perfect solo might disappear when the kick enters. Always set levels in context of the full mix, using solo only for brief problem-solving.",
                    checkYourWork: "Can you still hear every anchor element when all tracks play? Kick, snare, bass, and vocal should all be clearly audible without one overpowering the others.",
                    stepScreenshot: "step5_anchor_mixing"
                ),
                TrainingLessonStep(
                    number: 6,
                    title: "Panning: Creating Width",
                    concept: "Panning places sounds in the stereo field. Strategic placement creates space, clarity, and a sense of dimension in your mix.",
                    actions: [
                        "Keep anchors centered: kick, snare, bass, lead vocal at 0 (center)",
                        "Pan guitars left and right: try -30 and +30 as starting points",
                        "Spread backing vocals: pan some left, some right",
                        "Use narrow panning (10-20) for elements that need subtle width",
                        "Reserve extreme panning (45+) for special effects and ear candy"
                    ],
                    body: "Think of your stereo field like a stage. The most important performers (lead singer, drummer) stand center stage. Supporting players (guitarists, background singers) spread out to the sides. You wouldn't put the drummer in the wings and the backup singer center stage—apply the same logic to your mix.",
                    symbolName: "arrow.left.arrow.right",
                    visualTitle: "Stereo Placement",
                    visualCaption: "Anchors center. Guitars wide. Vocals focused.",
                    settings: [
                        "Kick/Snare": "Center (0)",
                        "Bass": "Center (0) or slight spread",
                        "Rhythm Guitars": "-30 / +30",
                        "Overheads": "100% L/R (already stereo)",
                        "Lead Vocal": "Center (0)"
                    ],
                    proTip: "The 'LCR' approach (Left-Center-Right) can speed up your workflow: place elements hard left, center, or hard right only. This creates a wide, clear mix quickly. Add intermediate panning only when needed.",
                    avoidThis: "Don't pan randomly just because you can. Every panning decision should serve the song. And don't pan the bass or kick drum significantly—low frequencies need to be centered for mono compatibility.",
                    checkYourWork: "Listen in mono (use the Mono button). Does your mix still sound balanced? Good panning choices should survive the mono test.",
                    stepScreenshot: "step6_panning"
                ),
                TrainingLessonStep(
                    number: 7,
                    title: "Buses & Sends: Shared Processing",
                    concept: "Buses group tracks for collective control. Sends route audio to shared effects. Both create cohesion and save CPU.",
                    actions: [
                        "Create aux tracks for groups: drums, guitars, vocals, etc.",
                        "Route similar tracks to buses: select tracks, choose output to your bus",
                        "Set up reverb sends: create aux with reverb, send tracks to it",
                        "Keep send levels lower than you think—you want subtle space, not a cave",
                        "Use the bus faders for group control—bring all drums up or down together"
                    ],
                    body: "Imagine a choir where each singer had their own personal bathroom for reverb. It would sound disjointed and waste resources. Instead, they sing in the same space, sharing the room's acoustics. Buses and sends do the same for your mix—create a shared space that makes everything sound like it belongs together.",
                    symbolName: "point.3.filled.connected.trianglepath.dotted",
                    visualTitle: "Routing",
                    visualCaption: "Groups share effects. Sends create space. Buses control sections.",
                    settings: [
                        "Drum Bus": "All drum tracks",
                        "Guitar Bus": "All guitar tracks",
                        "Vocal Reverb Send": "20-30% send level",
                        "Drum Room Send": "15-25% for depth"
                    ],
                    proTip: "Start with just two reverbs: a short room (1-2 seconds) for drums and guitars, and a longer plate or hall (3-4 seconds) for vocals. Two well-chosen reverbs beat eight random ones every time.",
                    avoidThis: "Don't put reverb as an insert on every track. This creates a muddy mess and uses tons of CPU. Use sends to share one reverb across multiple tracks—it's how the pros do it.",
                    checkYourWork: "Solo your reverb aux track. Can you hear contributions from multiple instruments? Good. If only one instrument appears, you might have inserted reverb directly instead of using sends.",
                    stepScreenshot: "step7_buses_sends"
                ),
                TrainingLessonStep(
                    number: 8,
                    title: "Critical Listening Check",
                    concept: "Before adding processing, verify your rough mix works. A great rough mix needs minimal processing; a bad one can't be fixed with plugins.",
                    actions: [
                        "Listen at low volume (conversation level). Can you hear everything?",
                        "Check the loudest section (usually chorus). Any clipping?",
                        "Listen in mono. Does the balance hold up?",
                        "Compare verse and chorus levels. Is the energy change natural?",
                        "Note what needs fixing: too muddy? too harsh? too quiet?"
                    ],
                    body: "This is your 'before' snapshot. A rough mix that sounds 70% good at this stage will sound great with minimal processing. A rough mix that sounds 30% good will require surgery. The goal isn't perfection—it's identifying what actually needs help versus what you're fixing just because you think you should.",
                    symbolName: "ear",
                    visualTitle: "Critical Listen",
                    visualCaption: "Low volume. Mono check. Problem spotting.",
                    settings: nil,
                    proTip: "Use a reference track: import a professionally mixed song in a similar style. Solo it, listen, then solo your mix. Don't try to match their polish—just notice the balance. Where is their bass? Their vocals? Use this as a compass, not a target.",
                    avoidThis: "Don't start adding plugins just because you think you should. If the rough mix sounds balanced, you might only need minor EQ and compression. Processing for processing's sake is a beginner trap.",
                    checkYourWork: "Can you listen to your rough mix all the way through without wincing? If yes, your foundation is solid. If no, fix the balance before touching plugins.",
                    stepScreenshot: nil
                ),
                TrainingLessonStep(
                    number: 9,
                    title: "EQ: Channel EQ Basics",
                    concept: "EQ shapes tone by cutting or boosting frequencies. For beginners, cutting problems is more effective than boosting everything.",
                    actions: [
                        "Start with the Analyzer on (button in Channel EQ). See where energy lives",
                        "Use high-pass filters (Band 1) to remove rumble: 80-120 Hz for vocals, 40-60 Hz for bass instruments",
                        "Cut 'mud' around 200-400 Hz if tracks sound boxy or unclear",
                        "Check for harshness at 2-5 kHz, especially on vocals and guitars",
                        "Make small moves: 2-3 dB cuts are often enough",
                        "Use the Q control: wider Q for gentle cuts, narrow Q for surgical removal"
                    ],
                    body: "EQ is like a photography darkroom: you can enhance what's there, but you can't create what isn't. If a vocal was recorded harshly, EQ can reduce the harshness but can't make it silky. Think of EQ as problem-solving first, enhancement second.",
                    symbolName: "waveform.path.ecg",
                    visualTitle: "Tone Shaping",
                    visualCaption: "Cut problems first. Small moves. Trust your ears.",
                    settings: [
                        "High-Pass (Vocals)": "80-120 Hz",
                        "High-Pass (Guitars)": "100-150 Hz",
                        "Mud Cut": "200-400 Hz, -2 to -4 dB",
                        "Harshness": "2-5 kHz, narrow Q, -2 to -3 dB"
                    ],
                    proTip: "Use the 'Frequency Sweep' technique: set a narrow boost (+10 dB or so), sweep it across the spectrum to find offensive frequencies, then change it to a cut. This finds problem spots your ears might miss.",
                    avoidThis: "Don't boost everything 'just because.' A mix with every track boosted in the highs sounds harsh and tiring. Cut the mud from tracks that have it—everything else will naturally sound clearer without boosts.",
                    checkYourWork: "Bypass your EQ (click the power button on the plugin). Can you hear the problem you were fixing? If not, you might be over-processing. Turn the EQ back on—does it improve things or just make it different?",
                    stepScreenshot: "step9_channel_eq"
                ),
                TrainingLessonStep(
                    number: 10,
                    title: "Compression: Controlling Dynamics",
                    concept: "Compression reduces the difference between loud and quiet parts. It adds consistency, punch, and can make tracks sit better in the mix.",
                    actions: [
                        "Start with Logic's Compressor on Platinum Digital or VCA mode",
                        "Set Ratio first: 2:1 for gentle, 4:1 for more control",
                        "Lower Threshold until you see 2-6 dB of gain reduction on the meter",
                        "Set Attack: slower (20-40ms) preserves punch, faster catches transients",
                        "Set Release: start around 60-100ms, adjust by feel",
                        "Use Makeup Gain to compensate for volume lost to compression"
                    ],
                    body: "Compression is like an automatic volume rider. When the signal gets loud, it pulls it down. When it's quiet, it lets it through. The result is a more consistent, 'forward' sound. But too much compression makes things sound squashed and lifeless—subtlety is key.",
                    symbolName: "arrow.down.circle.fill",
                    visualTitle: "Dynamic Control",
                    visualCaption: "2-6 dB reduction. Moderate ratio. Makeup gain.",
                    settings: [
                        "Ratio (Vocals)": "2:1 to 3:1",
                        "Ratio (Drums)": "3:1 to 4:1",
                        "Attack": "20-40ms (preserves punch)",
                        "Release": "60-150ms",
                        "Gain Reduction": "2-6 dB on peaks"
                    ],
                    proTip: "The 'Gain Reduction' meter is your guide. You want to see it moving with the music—compressing on loud parts, releasing on quiet parts. If it's constantly pinned (always compressing), your threshold is too low or your ratio is too high.",
                    avoidThis: "Don't crush everything. Heavy compression (10+ dB of reduction) on every track makes a mix sound small and fatiguing. Use just enough to control dynamics—usually 2-6 dB on most sources.",
                    checkYourWork: "Bypass the compressor. Does the track suddenly jump up in volume and dynamics? If yes, your compression was working. If there's barely any change, you might not be compressing enough—or your settings need adjustment.",
                    stepScreenshot: "step10_compressor"
                ),
                TrainingLessonStep(
                    number: 11,
                    title: "Fix Common Problems",
                    concept: "Every mix has trouble spots. Knowing how to identify and fix the most common issues saves hours of frustration.",
                    actions: [
                        "Low-end buildup: High-pass everything except kick and bass (80-150 Hz)",
                        "Vocal sibilance: Use Logic's De-Esser or a narrow EQ cut at 6-10 kHz",
                        "Masking (instruments hiding each other): Pan conflicting elements apart or cut conflicting frequencies",
                        "Drum phase issues: Check overheads and room mics—flip polarity (Ø button) if kick sounds weak",
                        "Automation vs. compression: Use automation for level rides, compression for overall control"
                    ],
                    body: "Mixing problems are like weeds—they're easier to spot and remove early. Low-end buildup is the most common issue in beginner mixes. When kick, bass, guitars, and vocals all have energy below 200 Hz, it becomes mud. The fix is surgical: remove what doesn't belong from each track.",
                    symbolName: "wrench.and.screwdriver.fill",
                    visualTitle: "Problem Solving",
                    visualCaption: "High-pass for clarity. De-ess for smoothness. Automation for control.",
                    settings: [
                        "High-Pass (Guitars/Keys)": "100-150 Hz",
                        "High-Pass (Vocals)": "80-120 Hz",
                        "De-Esser": "6-10 kHz, gentle reduction",
                        "Phase Check": "Listen to kick with overheads"
                    ],
                    proTip: "The '3 dB Rule': if you cut or boost more than 3 dB and it still doesn't sound right, the problem isn't EQ—it's probably the source recording, arrangement, or a different frequency range entirely.",
                    avoidThis: "Don't try to EQ away a bad performance or recording. If the vocal was recorded too quietly with a bad mic, no amount of EQ will make it sound like a studio recording. Fix what you can, accept what you can't, and note lessons for next time.",
                    checkYourWork: "Solo your kick and bass together. Do they sound like one cohesive low-end unit, or are they fighting? If fighting, check for overlapping frequencies and use EQ to give each its own space.",
                    stepScreenshot: nil
                ),
                TrainingLessonStep(
                    number: 12,
                    title: "Final Verification Checklist",
                    concept: "Before bouncing, verify everything is in order. A 2-minute check prevents discovering problems after you've shared the file.",
                    actions: [
                        "Listen at low volume. Can you still hear vocals and main instruments?",
                        "Listen at moderate volume. Is anything painful or harsh?",
                        "Switch to mono. Does the mix still work? Any phase cancellation?",
                        "Check your master meter. Is there headroom (-6 dBFS or lower)?",
                        "Set the cycle range to include the entire song PLUS the reverb tail",
                        "Listen through once more without touching anything—just observe"
                    ],
                    body: "This is your pre-flight check. Pilots don't skip the checklist because they've flown a thousand times—they do it because the one time they skip it is when something goes wrong. Treat your final check the same way. Two minutes of verification beats two hours of fixing a bounced mix.",
                    symbolName: "checklist",
                    visualTitle: "Final Checks",
                    visualCaption: "Multiple volumes. Mono test. Headroom verified.",
                    settings: [
                        "Low Volume": "Conversation level test",
                        "Master Peak": "-6 dBFS or lower",
                        "Mono Check": "No disappearing elements",
                        "Cycle Range": "Full song + tails"
                    ],
                    proTip: "Export a test bounce at 30 seconds in. Listen to that 30-second clip on your phone, car speakers, and headphones. If it works everywhere, proceed with the full bounce. If not, fix the issues before committing to a full export.",
                    avoidThis: "Don't assume your mix is perfect because it sounds good on your studio monitors. Translation is key—how it sounds on earbuds, in a car, and on a phone matters just as much.",
                    checkYourWork: "Your master meter never hits red during the loudest section. Your vocals are audible at low volume. Nothing sounds painful at moderate volume. The mix works in mono. If all true, you're ready to bounce.",
                    stepScreenshot: "step12_final_check"
                ),
                TrainingLessonStep(
                    number: 13,
                    title: "Bounce: Export Your Mix",
                    concept: "Bouncing (exporting) creates the final audio file. Proper settings ensure quality and compatibility wherever your music is played.",
                    actions: [
                        "Set Cycle Range to include entire song plus reverb/delay tails (2-4 seconds extra)",
                        "Choose File > Bounce > Project or Section (Command+B)",
                        "Select PCM format: WAV or AIFF, 24-bit, at your project sample rate",
                        "Use offline bounce for faster processing (unless using external hardware)",
                        "Enable 'Include Audio Tail' if available",
                        "After bouncing, re-import and listen to the full file"
                    ],
                    body: "Think of bouncing like developing a photo—this is the final step that creates your actual image. All your mixing decisions get 'printed' to the file. The goal is a clean, unclipped export that preserves all the work you've done.",
                    symbolName: "square.and.arrow.up",
                    visualTitle: "Export",
                    visualCaption: "24-bit PCM. Include tails. Verify after export.",
                    settings: [
                        "Format": "WAV or AIFF",
                        "Bit Depth": "24-bit",
                        "Sample Rate": "Match project (44.1 or 48 kHz)",
                        "Mode": "Offline (faster)",
                        "Include Tail": "Enabled"
                    ],
                    proTip: "Create a 'Mixes' folder with subfolders by date. Name your bounces descriptively: 'SongName_Mix_v1_YYYYMMDD'. When you make revisions, increment the version number. This organization saves massive confusion later.",
                    avoidThis: "Don't bounce to MP3 for your archive. MP3 is a delivery format, not an archival format. Always keep a 24-bit WAV/AIFF master. Create MP3 copies only for specific sharing purposes.",
                    checkYourWork: "Open the bounced file in QuickTime or your music player. Listen to the start, middle, and end. Check that nothing is clipped, cut off, or obviously broken. If it sounds good, you've successfully completed your first mix!",
                    stepScreenshot: "step13_bounce"
                )
            ],
            checklist: [
                "Set realistic goals: balanced and exportable, not radio-ready",
                "Configure project: sample rate matches source, 24-bit depth",
                "Organize tracks: clear names and color coding by instrument group",
                "Gain stage properly: -12 to -6 dBFS per track, -6 dBFS on master",
                "Anchor mix: kick, snare, bass, vocal balanced first",
                "Pan thoughtfully: anchors center, supporting elements spread",
                "Route efficiently: buses for groups, sends for shared reverb",
                "Listen critically at low volume and in mono",
                "EQ problems: high-pass non-bass tracks, cut mud at 200-400 Hz",
                "Compress moderately: 2-6 dB reduction, 2:1 to 4:1 ratio",
                "Fix common issues: low-end buildup, sibilance, masking",
                "Verify before bouncing: multiple volumes, mono test, headroom",
                "Bounce correctly: 24-bit WAV/AIFF, include tails, verify after"
            ]
        )
    ]
}

private struct TrainingLessonStep: Identifiable {
    var id: Int { number }
    let number: Int
    let title: String
    let concept: String
    let actions: [String]
    let body: String
    let symbolName: String
    let visualTitle: String
    let visualCaption: String
    let settings: [String: String]?
    let proTip: String?
    let avoidThis: String?
    let checkYourWork: String
    let stepScreenshot: String?
}

extension String: Identifiable {
    public var id: String { self }
}
