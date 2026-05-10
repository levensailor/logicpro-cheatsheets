import SwiftUI

struct SheetDetailView: View {
    @EnvironmentObject private var savedContentStore: SavedContentStore
    let sheet: CheatSheet
    let sheets: [CheatSheet]
    @Binding var selectedSheetID: CheatSheet.ID?

    private var savedReference: SavedContentReference {
        .sheet(sheet.id)
    }

    private var isSaved: Bool {
        savedContentStore.isSaved(savedReference)
    }

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
            Button {
                savedContentStore.toggleSaved(savedReference)
            } label: {
                Label(isSaved ? "Remove from Saved" : "Save", systemImage: isSaved ? "bookmark.fill" : "bookmark")
            }
            .accessibilityLabel(isSaved ? "Remove \(sheet.header.title) from Saved" : "Save \(sheet.header.title)")
        }
        .onAppear {
            savedContentStore.recordViewed(savedReference)
        }
        .onChange(of: sheet.id) { newSheetID in
            savedContentStore.recordViewed(.sheet(newSheetID))
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
