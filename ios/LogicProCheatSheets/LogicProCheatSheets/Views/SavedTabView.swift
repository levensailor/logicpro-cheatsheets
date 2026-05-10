import SwiftUI

struct SavedTabView: View {
    let bundle: ContentBundle
    @StateObject private var savedItemsManager = SavedItemsManager.shared
    @Binding var selectedTab: AppTab
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    header
                    
                    if let lastViewed = savedItemsManager.lastViewedItem {
                        pickUpWhereYouLeftOff(lastViewed)
                    }
                    
                    if !savedItemsManager.pinnedItems.isEmpty {
                        pinnedSection
                    } else {
                        emptyState
                    }
                }
                .padding()
            }
            .navigationTitle("Saved")
        }
    }
    
    private var header: some View {
        VStack(alignment: .leading, spacing: 12) {
            Image(systemName: "bookmark.fill")
                .font(.system(size: 36, weight: .bold))
                .foregroundStyle(.tint)
                .frame(width: 64, height: 64)
                .background(Color.accentColor.opacity(0.12), in: RoundedRectangle(cornerRadius: 18))
            
            Text("Saved")
                .font(.largeTitle.bold())
            
            Text("Your bookmarked chapters and lessons in one place.")
                .font(.headline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 24))
    }
    
    private func pickUpWhereYouLeftOff(_ item: SavedItem) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "clock.arrow.circlepath")
                    .foregroundStyle(.tint)
                Text("Pick up where you left off")
                    .font(.headline.bold())
                Spacer()
            }
            
            savedItemCard(item, isLastViewed: true)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(
            LinearGradient(
                colors: [Color.accentColor.opacity(0.12), Color.purple.opacity(0.08)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            ),
            in: RoundedRectangle(cornerRadius: 20)
        )
    }
    
    private var pinnedSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "pin.fill")
                    .foregroundStyle(.tint)
                Text("Pinned")
                    .font(.headline.bold())
                Spacer()
                Text("\(savedItemsManager.pinnedItems.count)")
                    .font(.caption.bold())
                    .foregroundStyle(.secondary)
            }
            
            ForEach(savedItemsManager.pinnedItems) { item in
                savedItemCard(item, isLastViewed: false)
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
    
    private func savedItemCard(_ item: SavedItem, isLastViewed: Bool) -> some View {
        Group {
            if item.type == .cheatSheet {
                if let sheet = bundle.cheatSheets.first(where: { $0.id == item.id }) {
                    NavigationLink {
                        SheetDetailViewWrapper(sheet: sheet, sheets: bundle.cheatSheets)
                    } label: {
                        SavedItemCardContent(
                            item: item,
                            isLastViewed: isLastViewed,
                            onRemove: {
                                savedItemsManager.removeSavedItem(item)
                            }
                        )
                    }
                    .buttonStyle(.plain)
                }
            } else if item.type == .trainingLesson {
                if let lesson = bundle.training.lessons.first(where: { $0.id == item.id }) {
                    NavigationLink {
                        TrainingLessonDetailViewWrapper(lesson: lesson)
                    } label: {
                        SavedItemCardContent(
                            item: item,
                            isLastViewed: isLastViewed,
                            onRemove: {
                                savedItemsManager.removeSavedItem(item)
                            }
                        )
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }
    
    private var emptyState: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("No pinned items yet")
                .font(.headline)
            Text("Tap the bookmark button on any chapter or lesson to save it here for quick access.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
            
            Button {
                selectedTab = .library
            } label: {
                Label("Browse Library", systemImage: "books.vertical.fill")
                    .font(.headline)
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.large)
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

private struct SavedItemCardContent: View {
    let item: SavedItem
    let isLastViewed: Bool
    let onRemove: () -> Void
    
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Text(item.icon)
                .font(.title2)
                .frame(width: 48, height: 48)
                .background(Color.accentColor.opacity(0.12), in: RoundedRectangle(cornerRadius: 12))
            
            VStack(alignment: .leading, spacing: 4) {
                Text(item.title)
                    .font(.headline)
                    .foregroundStyle(.primary)
                Text(item.subtitle)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                if isLastViewed {
                    HStack(spacing: 4) {
                        Image(systemName: "clock.fill")
                            .font(.caption2)
                        Text(timeAgo(from: item.savedAt))
                            .font(.caption)
                    }
                    .foregroundStyle(.secondary)
                }
            }
            
            Spacer()
            
            if !isLastViewed {
                Button(action: onRemove) {
                    Image(systemName: "xmark.circle.fill")
                        .font(.title3)
                        .foregroundStyle(.secondary)
                }
                .buttonStyle(.plain)
            }
        }
        .padding()
        .background(.background, in: RoundedRectangle(cornerRadius: 14))
        .overlay {
            RoundedRectangle(cornerRadius: 14)
                .stroke(isLastViewed ? Color.accentColor.opacity(0.3) : Color.quaternary)
        }
    }
    
    private func timeAgo(from date: Date) -> String {
        let now = Date()
        let interval = now.timeIntervalSince(date)
        
        if interval < 60 {
            return "Just now"
        } else if interval < 3600 {
            let minutes = Int(interval / 60)
            return "\(minutes)m ago"
        } else if interval < 86400 {
            let hours = Int(interval / 3600)
            return "\(hours)h ago"
        } else {
            let days = Int(interval / 86400)
            return "\(days)d ago"
        }
    }
}

private struct SheetDetailViewWrapper: View {
    let sheet: CheatSheet
    let sheets: [CheatSheet]
    @State private var selectedSheetID: CheatSheet.ID?
    
    var body: some View {
        SheetDetailView(sheet: sheet, sheets: sheets, selectedSheetID: $selectedSheetID)
    }
}

private struct TrainingLessonDetailViewWrapper: View {
    let lesson: TrainingLesson
    
    var body: some View {
        TrainingLessonDetailView(lesson: lesson)
    }
}
