import SwiftUI

struct SheetListView: View {
    @EnvironmentObject private var repository: ContentRepository
    let bundle: ContentBundle
    @Binding var selectedSheetID: CheatSheet.ID?

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
        } detail: {
            if let selectedSheet {
                SheetDetailView(sheet: selectedSheet, sheets: bundle.cheatSheets, selectedSheetID: $selectedSheetID)
            } else {
                HomeView(selectedSheetID: $selectedSheetID)
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

private struct HomeView: View {
    @Binding var selectedSheetID: CheatSheet.ID?

    var body: some View {
        VStack(spacing: 16) {
            Text("Handbook")
                .font(.title2.bold())
            Text("Pick a chapter from the list, or use Home for a quick start and full chapter index.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
            Button {
                selectedSheetID = "tracking-band"
            } label: {
                Label("Start with Tracking", systemImage: "mic.fill")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(24)
        .navigationTitle("Handbook")
        .navigationBarTitleDisplayMode(.inline)
    }
}
