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
                Button {
                    selectedSheetID = nil
                } label: {
                    Label("Home", systemImage: "house.fill")
                        .font(.headline)
                }

                ForEach(ChapterCategory.allCases) { category in
                    let sheets = sheets(for: category)
                    if !sheets.isEmpty {
                        Section(category.title) {
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
            .navigationTitle("Logic Pro Book")
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
        .navigationTitle("Logic Pro Book")
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("📚")
                .font(.system(size: 56))
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
            categoryCard("DAW", icon: "🎛️", subtitle: "Routing, workflow, automation, plugins, and gain.", target: "audio-routing")
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
            Label("Use DAW chapters to set up routing, automation, plugins, and levels.", systemImage: "2.circle.fill")
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
