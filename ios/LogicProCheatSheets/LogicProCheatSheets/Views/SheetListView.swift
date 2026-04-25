import SwiftUI

struct SheetListView: View {
    @EnvironmentObject private var repository: ContentRepository
    let bundle: ContentBundle
    @State private var selectedSheetID: CheatSheet.ID?

    private var selectedSheet: CheatSheet? {
        let selectedID = selectedSheetID ?? bundle.cheatSheets.first?.id
        return bundle.cheatSheets.first { $0.id == selectedID }
    }

    var body: some View {
        NavigationSplitView {
            List(selection: $selectedSheetID) {
                Section {
                    ForEach(bundle.cheatSheets) { sheet in
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
                } header: {
                    Text("Chapters")
                } footer: {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(repository.statusMessage)
                        Text("Content version \(bundle.contentVersion)")
                    }
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
                ContentUnavailableView("No Content", systemImage: "books.vertical")
            }
        }
        .onAppear {
            selectedSheetID = selectedSheetID ?? bundle.cheatSheets.first?.id
        }
    }
}
