import Foundation
import Combine

enum SavedPageKind: String, Codable {
    case chapter
    case lesson
}

struct SavedPage: Codable, Equatable, Identifiable {
    let kind: SavedPageKind
    let contentID: String
    var title: String
    var subtitle: String
    var iconName: String
    var savedAt: Date

    var id: String {
        "\(kind.rawValue):\(contentID)"
    }
}

private struct SavedPagesState: Codable {
    var savedItems: [SavedPage]
    var lastViewedPage: SavedPage?

    static let empty = SavedPagesState(savedItems: [], lastViewedPage: nil)
}

final class SavedPagesStore: ObservableObject {
    private let storageKey = "savedPages.state.v1"
    private let userDefaults: UserDefaults

    @Published private var state: SavedPagesState

    var savedItems: [SavedPage] {
        state.savedItems.sorted { $0.savedAt > $1.savedAt }
    }

    var lastViewedPage: SavedPage? {
        state.lastViewedPage
    }

    init(userDefaults: UserDefaults = .standard) {
        self.userDefaults = userDefaults
        self.state = Self.loadState(from: userDefaults, storageKey: storageKey)
    }

    func isSaved(kind: SavedPageKind, contentID: String) -> Bool {
        state.savedItems.contains { $0.kind == kind && $0.contentID == contentID }
    }

    func toggleSaved(_ page: SavedPage) {
        if isSaved(kind: page.kind, contentID: page.contentID) {
            removeSaved(kind: page.kind, contentID: page.contentID)
        } else {
            save(page)
        }
    }

    func save(_ page: SavedPage) {
        var updatedPage = page
        updatedPage.savedAt = Date()

        state.savedItems.removeAll { $0.id == updatedPage.id }
        state.savedItems.append(updatedPage)
        persist()
    }

    func removeSaved(kind: SavedPageKind, contentID: String) {
        state.savedItems.removeAll { $0.kind == kind && $0.contentID == contentID }
        persist()
    }

    func markLastViewed(_ page: SavedPage) {
        var updatedPage = page
        updatedPage.savedAt = Date()
        state.lastViewedPage = updatedPage
        persist()
    }

    private func persist() {
        guard let data = try? JSONEncoder().encode(state) else { return }
        userDefaults.set(data, forKey: storageKey)
    }

    private static func loadState(from userDefaults: UserDefaults, storageKey: String) -> SavedPagesState {
        guard let data = userDefaults.data(forKey: storageKey),
              let state = try? JSONDecoder().decode(SavedPagesState.self, from: data)
        else {
            return .empty
        }

        return state
    }
}
