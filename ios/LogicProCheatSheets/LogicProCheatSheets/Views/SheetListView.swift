import SwiftUI

struct SheetListView: View {
    @EnvironmentObject private var repository: ContentRepository
    let bundle: ContentBundle
    @State private var selectedSheetID: CheatSheet.ID?

    private var selectedSheet: CheatSheet? {
        guard let selectedSheetID else { return nil }
        return bundle.cheatSheets.first { $0.id == selectedSheetID }
    }

    var body: some View {
        NavigationSplitView {
            List(selection: $selectedSheetID) {
                Image("HeaderLogo")
                    .resizable()
                    .scaledToFit()
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                    .listRowInsets(EdgeInsets(top: 10, leading: 12, bottom: 10, trailing: 12))
                    .listRowBackground(Color.clear)
                    .accessibilityLabel("Logic Pro Guru")

                ForEach(ChapterCategory.allCases) { category in
                    let sheets = sheets(for: category)
                    if !sheets.isEmpty {
                        Section(category.title) {
                            if category == .mixing {
                                MixingChapterGrid(
                                    sheets: sheets,
                                    navItems: bundle.navItems,
                                    selectedSheetID: $selectedSheetID
                                )
                                .listRowInsets(EdgeInsets(top: 8, leading: 12, bottom: 8, trailing: 12))
                                .listRowBackground(Color.clear)
                            } else {
                                ForEach(sheets) { sheet in
                                    NavigationLink(value: sheet.id) {
                                        Label {
                                            VStack(alignment: .leading, spacing: 2) {
                                                Text(bundle.navItems.first { $0.id == sheet.id }?.label ?? sheet.header.title)
                                                    .font(.headline)
                                                Text(sheet.header.subtitle)
                                                    .font(.caption)
                                                    .foregroundStyle(.secondary)
                                            }
                                        } icon: {
                                            Text(sheet.header.icon)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                Section {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(repository.statusMessage)
                        Text("Content version \(bundle.contentVersion)")
                    }
                    .font(.caption)
                    .foregroundStyle(.secondary)
                } header: {
                    Text("Content")
                }
            }
            .navigationTitle("Chapters")
            .toolbar {
                Button("Refresh") {
                    Task { await repository.refresh() }
                }
                .disabled(repository.isRefreshing)
            }
        } detail: {
            if let selectedSheet {
                SheetDetailView(sheet: selectedSheet, sheets: bundle.cheatSheets, selectedSheetID: $selectedSheetID)
            } else {
                HomeView(bundle: bundle, selectedSheetID: $selectedSheetID)
            }
        }
    }

    private func sheets(for category: ChapterCategory) -> [CheatSheet] {
        let ids = category.sheetIDs
        return ids.compactMap { id in
            bundle.cheatSheets.first { $0.id == id }
        }
    }
}

private struct MixingChapterGrid: View {
    let sheets: [CheatSheet]
    let navItems: [ContentNavItem]
    @Binding var selectedSheetID: CheatSheet.ID?

    private let columns = Array(
        repeating: GridItem(.flexible(minimum: 62), spacing: 6),
        count: 4
    )

    var body: some View {
        LazyVGrid(columns: columns, spacing: 6) {
            ForEach(sheets) { sheet in
                Button {
                    selectedSheetID = sheet.id
                } label: {
                    VStack(spacing: 5) {
                        Text(sheet.header.icon)
                            .font(.title2)
                        Text(navItems.first { $0.id == sheet.id }?.label ?? sheet.header.title)
                            .font(.system(size: 11, weight: .bold, design: .rounded))
                            .lineLimit(3)
                            .multilineTextAlignment(.center)
                            .minimumScaleFactor(0.68)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                    .foregroundStyle(selectedSheetID == sheet.id ? .white : .primary)
                    .frame(maxWidth: .infinity)
                    .frame(height: 76)
                    .padding(5)
                    .background(
                        RoundedRectangle(cornerRadius: 14)
                            .fill(selectedSheetID == sheet.id ? Color.accentColor : Color.white)
                    )
                    .overlay {
                        RoundedRectangle(cornerRadius: 14)
                            .stroke(selectedSheetID == sheet.id ? Color.accentColor : Color.secondary.opacity(0.18))
                    }
                }
                .buttonStyle(.plain)
                .accessibilityLabel(navItems.first { $0.id == sheet.id }?.label ?? sheet.header.title)
            }
        }
    }
}

private enum ChapterCategory: String, CaseIterable, Identifiable {
    case tracking
    case daw
    case mixing
    case mastering
    case reference

    var id: String { rawValue }

    var title: String {
        switch self {
        case .tracking: return "Tracking"
        case .daw: return "DAW"
        case .mixing: return "Mixing"
        case .mastering: return "Mastering"
        case .reference: return "Reference"
        }
    }

    var sheetIDs: [String] {
        switch self {
        case .tracking:
            return ["tracking-band"]
        case .daw:
            return [
                "audio-routing",
                "interfaces",
                "monitoring",
                "logic-pro-workflow",
                "automation",
                "plugins-reference",
                "gain-staging-lufs"
            ]
        case .mixing:
            return [
                "bass-guitar-mixing",
                "kick-drum-mixing",
                "snare-drum-mixing",
                "electric-guitar-mixing",
                "vocal-mixing",
                "toms-mixing-guide",
                "room-mic-mixing-guide",
                "overheads-mixing-guide",
                "drum-bus-mixing",
                "vocal-bus-mixing",
                "guitar-bus-mixing",
                "main-bus-pre-master"
            ]
        case .mastering:
            return ["mastering-final-mix"]
        case .reference:
            return ["appendix-audio-terms"]
        }
    }
}

private struct HomeView: View {
    let bundle: ContentBundle
    @Binding var selectedSheetID: CheatSheet.ID?

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                hero
                categoryGrid
                gettingStarted
            }
            .padding()
        }
        .navigationTitle("Handbook")
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 12) {
            Image("HeaderLogo")
                .resizable()
                .scaledToFit()
                .clipShape(RoundedRectangle(cornerRadius: 18))
                .overlay {
                    RoundedRectangle(cornerRadius: 18)
                        .stroke(.white.opacity(0.18))
                }
                .shadow(color: .blue.opacity(0.24), radius: 18, y: 8)
                .accessibilityLabel("Logic Pro Guru")
            Text("Record, mix, and master your band in Logic Pro.")
                .font(.largeTitle.bold())
            Text("A native, offline-ready handbook that pulls fresh chapter content from the web and keeps the latest version cached on your device.")
                .font(.headline)
                .foregroundStyle(.secondary)

            Button {
                selectedSheetID = "tracking-band"
            } label: {
                Label("Start with Tracking", systemImage: "mic.fill")
                    .font(.headline)
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.large)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(
            LinearGradient(
                colors: [.blue.opacity(0.22), .green.opacity(0.16), .purple.opacity(0.12)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            ),
            in: RoundedRectangle(cornerRadius: 24)
        )
    }

    private var categoryGrid: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 220), spacing: 12)], spacing: 12) {
            categoryCard("Tracking", icon: "🎙️", subtitle: "Capture clean performances.", target: "tracking-band")
            categoryCard("DAW", icon: "🎛️", subtitle: "Routing, interfaces, monitoring, plugins, and gain.", target: "audio-routing")
            categoryCard("Mixing", icon: "🎚️", subtitle: "Instrument and bus cheat sheets.", target: "bass-guitar-mixing")
            categoryCard("Mastering", icon: "💿", subtitle: "Final loudness, polish, and delivery.", target: "mastering-final-mix")
            categoryCard("Reference", icon: "📘", subtitle: "Beginner audio terms and definitions.", target: "appendix-audio-terms")
        }
    }

    private func categoryCard(_ title: String, icon: String, subtitle: String, target: String) -> some View {
        Button {
            selectedSheetID = target
        } label: {
            VStack(alignment: .leading, spacing: 8) {
                Text(icon)
                    .font(.largeTitle)
                Text(title)
                    .font(.title3.bold())
                Text(subtitle)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                Text("\(chapterCount(for: title)) chapters")
                    .font(.caption.bold())
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

    private var gettingStarted: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("How to use the book")
                .font(.title2.bold())
            Label("Start with Tracking before mixing decisions.", systemImage: "1.circle.fill")
            Label("Use DAW chapters to set up routing, interfaces, monitoring, plugins, and levels.", systemImage: "2.circle.fill")
            Label("Open Mixing chapters for each instrument or bus.", systemImage: "3.circle.fill")
            Label("Finish with Mastering and check the Reference appendix when terms are unclear.", systemImage: "4.circle.fill")
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 18))
    }

    private func chapterCount(for title: String) -> Int {
        switch title {
        case "Tracking": return ChapterCategory.tracking.sheetIDs.count
        case "DAW": return ChapterCategory.daw.sheetIDs.count
        case "Mixing": return ChapterCategory.mixing.sheetIDs.count
        case "Mastering": return ChapterCategory.mastering.sheetIDs.count
        case "Reference": return ChapterCategory.reference.sheetIDs.count
        default: return bundle.cheatSheets.count
        }
    }
}

private struct LogoMark: View {
    let size: CGFloat

    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: size * 0.22)
                .fill(
                    LinearGradient(
                        colors: [.blue, .purple, .green],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
            VStack(spacing: size * 0.02) {
                Text("LP")
                    .font(.system(size: size * 0.34, weight: .black, design: .rounded))
                Text("GURU")
                    .font(.system(size: size * 0.15, weight: .heavy, design: .rounded))
                    .tracking(size * 0.012)
            }
            .foregroundStyle(.white)
        }
        .frame(width: size, height: size)
        .shadow(color: .blue.opacity(0.18), radius: size * 0.12, y: size * 0.06)
        .accessibilityLabel("Logic Pro.Guru logo")
    }
}
