import SwiftUI

struct MainTabView: View {
    let bundle: ContentBundle
    @State private var selectedTab: AppTab = .home

    var body: some View {
        TabView(selection: $selectedTab) {
            HomeTabView(bundle: bundle, selectedTab: $selectedTab)
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
                .tag(AppTab.home)

            SheetListView(bundle: bundle)
                .tabItem {
                    Label("Library", systemImage: "books.vertical.fill")
                }
                .tag(AppTab.library)

            MockTabView(
                title: "Train",
                subtitle: "Build repeatable Logic Pro habits.",
                symbolName: "graduationcap.fill",
                cards: [
                    MockTabCard(title: "Guided sessions", detail: "Step through focused practice paths for tracking, mixing, and mastering."),
                    MockTabCard(title: "Ear training", detail: "Practice hearing EQ moves, compression timing, and level changes."),
                    MockTabCard(title: "Progress streaks", detail: "Track completed drills and revisit weak spots.")
                ]
            )
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
    @Binding var selectedTab: AppTab

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    hero
                    quickActions
                    todaysFocus
                }
                .padding()
            }
            .navigationTitle("Logic Pro.Guru")
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
