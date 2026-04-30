import SwiftUI

struct MainTabView: View {
    let bundle: ContentBundle
    @State private var selectedTab: AppTab = .home
    private var trainingLessons: [TrainingLesson] {
        bundle.training.lessons
    }

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
