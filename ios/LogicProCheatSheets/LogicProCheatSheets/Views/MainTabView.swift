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
                Button {
                    selectedTab = .train
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
                        VStack(alignment: .leading, spacing: 14) {
                            FeaturedLessonCard(lesson: lesson)

                            VStack(alignment: .leading, spacing: 10) {
                                Text("Lesson Outline")
                                    .font(.headline)

                                ForEach(lesson.steps) { step in
                                    TrainingStepRow(step: step)
                                }
                            }
                        }
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

            HStack {
                Label(lesson.duration, systemImage: "clock.fill")
                Spacer()
                Label("\(lesson.steps.count) steps", systemImage: "list.bullet.rectangle.fill")
            }
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

private struct TrainingStepRow: View {
    let step: TrainingStep

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Text("\(step.order)")
                .font(.caption.bold())
                .foregroundStyle(.white)
                .frame(width: 28, height: 28)
                .background(Color.accentColor, in: Circle())

            VStack(alignment: .leading, spacing: 4) {
                Text(step.title)
                    .font(.headline)
                Text(step.detail)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.background, in: RoundedRectangle(cornerRadius: 16))
        .overlay {
            RoundedRectangle(cornerRadius: 16)
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
    let steps: [TrainingStep]

    static let featured = [
        TrainingLesson(
            id: "your-first-mix",
            title: "Your First Mix",
            series: "Beginner Mixing Series",
            summary: "A beginner-friendly Logic Pro walkthrough from raw tracks to a clean, bounce-ready mix.",
            duration: "5-page guide",
            symbolName: "slider.horizontal.3",
            badges: ["New", "Popular"],
            isFeatured: true,
            steps: [
                TrainingStep(order: 1, title: "Set the project correctly", detail: "Match the source sample rate and use 24-bit WAV/BWF as the beginner default."),
                TrainingStep(order: 2, title: "Import and organize tracks", detail: "Line up files, confirm timing, rename tracks clearly, and color related parts."),
                TrainingStep(order: 3, title: "Build the rough balance", detail: "Set levels before plugins, check mono, and leave mix-bus headroom."),
                TrainingStep(order: 4, title: "Clean tone and dynamics", detail: "Use Channel EQ for obvious problems and Logic Compressor for controlled movement."),
                TrainingStep(order: 5, title: "Monitor and bounce", detail: "Use the right buffer for recording or mixing, then export and verify the finished file.")
            ]
        )
    ]
}

private struct TrainingStep: Identifiable {
    var id: Int { order }
    let order: Int
    let title: String
    let detail: String
}
