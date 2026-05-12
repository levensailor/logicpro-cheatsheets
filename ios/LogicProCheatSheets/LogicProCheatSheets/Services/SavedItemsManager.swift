import Foundation
import SwiftUI

enum SavedItemType: String, Codable {
    case cheatSheet
    case trainingLesson
}

struct SavedItem: Codable, Identifiable, Equatable {
    let id: String
    let type: SavedItemType
    let title: String
    let subtitle: String
    let icon: String
    let savedAt: Date
    let isAutoSaved: Bool
    
    /// Stable identity for mixed item types in SwiftUI collections.
    var stableID: String {
        "\(type.rawValue)::\(id)"
    }
    
    static func == (lhs: SavedItem, rhs: SavedItem) -> Bool {
        lhs.id == rhs.id && lhs.type == rhs.type
    }
}

@MainActor
class SavedItemsManager: ObservableObject {
    static let shared = SavedItemsManager()
    
    @Published private(set) var savedItems: [SavedItem] = []
    @Published private(set) var lastViewedItem: SavedItem?
    
    private let savedItemsKey = "savedItems"
    private let lastViewedItemKey = "lastViewedItem"
    
    private init() {
        loadSavedItems()
    }
    
    private func loadSavedItems() {
        if let data = UserDefaults.standard.data(forKey: savedItemsKey),
           let items = try? JSONDecoder().decode([SavedItem].self, from: data) {
            savedItems = deduplicated(items).sorted { $0.savedAt > $1.savedAt }
        }
        
        if let data = UserDefaults.standard.data(forKey: lastViewedItemKey),
           let item = try? JSONDecoder().decode(SavedItem.self, from: data) {
            lastViewedItem = item
        }
    }
    
    private func saveToDisk() {
        if let data = try? JSONEncoder().encode(savedItems) {
            UserDefaults.standard.set(data, forKey: savedItemsKey)
        }
        if let lastViewed = lastViewedItem,
           let data = try? JSONEncoder().encode(lastViewed) {
            UserDefaults.standard.set(data, forKey: lastViewedItemKey)
        }
    }
    
    func toggleSave(id: String, type: SavedItemType, title: String, subtitle: String, icon: String) {
        if let index = savedItems.firstIndex(where: { $0.id == id && $0.type == type }) {
            savedItems.remove(at: index)
        } else {
            let newItem = SavedItem(
                id: id,
                type: type,
                title: title,
                subtitle: subtitle,
                icon: icon,
                savedAt: Date(),
                isAutoSaved: false
            )
            savedItems.insert(newItem, at: 0)
        }
        saveToDisk()
    }
    
    func isSaved(id: String, type: SavedItemType) -> Bool {
        savedItems.contains { $0.id == id && $0.type == type }
    }
    
    func autoSaveLastViewed(id: String, type: SavedItemType, title: String, subtitle: String, icon: String) {
        let newItem = SavedItem(
            id: id,
            type: type,
            title: title,
            subtitle: subtitle,
            icon: icon,
            savedAt: Date(),
            isAutoSaved: true
        )

        // Keep pinned entries intact; this only tracks recency.
        lastViewedItem = newItem
        saveToDisk()
    }
    
    func removeSavedItem(_ item: SavedItem) {
        if let index = savedItems.firstIndex(where: { $0.stableID == item.stableID }) {
            savedItems.remove(at: index)
            saveToDisk()
        }
    }
    
    var pinnedItems: [SavedItem] {
        savedItems.filter { !$0.isAutoSaved }
    }

    private func deduplicated(_ items: [SavedItem]) -> [SavedItem] {
        var seen = Set<String>()
        var unique: [SavedItem] = []
        for item in items {
            if seen.insert(item.stableID).inserted {
                unique.append(item)
            }
        }
        return unique
    }
}
