import SwiftUI

struct SheetDetailView: View {
    let sheet: CheatSheet
    let sheets: [CheatSheet]
    @Binding var selectedSheetID: CheatSheet.ID?
    @StateObject private var savedItemsManager = SavedItemsManager.shared

    private var currentIndex: Int? {
        sheets.firstIndex { $0.id == sheet.id }
    }

    private var previousSheet: CheatSheet? {
        guard let currentIndex, currentIndex > 0 else { return nil }
        return sheets[currentIndex - 1]
    }

    private var nextSheet: CheatSheet? {
        guard let currentIndex, currentIndex < sheets.count - 1 else { return nil }
        return sheets[currentIndex + 1]
    }
    
    private var isSaved: Bool {
        savedItemsManager.isSaved(id: sheet.id, type: .cheatSheet)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                header

                ForEach(sheet.sections) { section in
                    SectionView(section: section)
                }

                chapterPager
            }
            .padding()
        }
        .navigationTitle(sheet.header.title)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    savedItemsManager.toggleSave(
                        id: sheet.id,
                        type: .cheatSheet,
                        title: sheet.header.title,
                        subtitle: sheet.header.subtitle,
                        icon: sheet.header.icon
                    )
                } label: {
                    Image(systemName: isSaved ? "bookmark.fill" : "bookmark")
                        .foregroundStyle(isSaved ? .yellow : .primary)
                }
            }
        }
        .onDisappear {
            savedItemsManager.autoSaveLastViewed(
                id: sheet.id,
                type: .cheatSheet,
                title: sheet.header.title,
                subtitle: sheet.header.subtitle,
                icon: sheet.header.icon
            )
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(sheet.header.icon)
                .font(.largeTitle)
            Text(sheet.header.title)
                .font(.largeTitle.bold())
            Text(sheet.header.subtitle)
                .font(.headline)
                .foregroundStyle(.secondary)
            if !sheet.summary.isEmpty {
                Text(sheet.summary)
                    .foregroundStyle(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 18))
    }

    private var chapterPager: some View {
        HStack(spacing: 12) {
            if let previousSheet {
                Button {
                    selectedSheetID = previousSheet.id
                } label: {
                    pagerCard(label: "Previous", sheet: previousSheet)
                }
                .buttonStyle(.plain)
            }
            if let nextSheet {
                Button {
                    selectedSheetID = nextSheet.id
                } label: {
                    pagerCard(label: "Next", sheet: nextSheet)
                }
                .buttonStyle(.plain)
            }
        }
    }

    private func pagerCard(label: String, sheet: CheatSheet) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label.uppercased())
                .font(.caption.bold())
                .foregroundStyle(.secondary)
            Text("\(sheet.header.icon) \(sheet.header.title)")
                .font(.headline)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.background, in: RoundedRectangle(cornerRadius: 14))
        .overlay {
            RoundedRectangle(cornerRadius: 14)
                .stroke(.quaternary)
        }
    }
}
