import Foundation
import Combine

struct SavedContentReference: Codable, Hashable, Identifiable {
    enum ContentType: String, Codable {
        case sheet
        case lesson
    }

    let type: ContentType
    let contentID: String
    let savedAt: Date

    var id: String {
        "\(type.rawValue):\(contentID)"
    }

    static func sheet(_ contentID: String) -> SavedContentReference {
        SavedContentReference(type: .sheet, contentID: contentID)
    }

    static func lesson(_ contentID: String) -> SavedContentReference {
        SavedContentReference(type: .lesson, contentID: contentID)
    }

    init(type: ContentType, contentID: String, savedAt: Date = Date()) {
        self.type = type
        self.contentID = contentID
        self.savedAt = savedAt
    }

    func matches(_ reference: SavedContentReference) -> Bool {
        type == reference.type && contentID == reference.contentID
    }

    func updated(at date: Date = Date()) -> SavedContentReference {
        SavedContentReference(type: type, contentID: contentID, savedAt: date)
    }
}

@MainActor
final class SavedContentStore: ObservableObject {
    static let storageKey = "savedContent.store.v1"

    @Published private(set) var savedReferences: [SavedContentReference]
    @Published private(set) var lastViewedReference: SavedContentReference?

    private let defaults: UserDefaults
    private let storageKey: String

    init(defaults: UserDefaults = .standard, storageKey: String = SavedContentStore.storageKey) {
        self.defaults = defaults
        self.storageKey = storageKey

        let state = Self.loadState(defaults: defaults, storageKey: storageKey)
        savedReferences = state.savedReferences
        lastViewedReference = state.lastViewedReference
    }

    func isSaved(_ reference: SavedContentReference) -> Bool {
        savedReferences.contains { $0.matches(reference) }
    }

    func toggleSaved(_ reference: SavedContentReference) {
        if isSaved(reference) {
            remove(reference)
        } else {
            save(reference)
        }
    }

    func save(_ reference: SavedContentReference) {
        let updatedReference = reference.updated()
        savedReferences.removeAll { $0.matches(updatedReference) }
        savedReferences.insert(updatedReference, at: 0)
        persist()
    }

    func remove(_ reference: SavedContentReference) {
        savedReferences.removeAll { $0.matches(reference) }
        persist()
    }

    func recordViewed(_ reference: SavedContentReference) {
        lastViewedReference = reference.updated()
        persist()
    }

    private func persist() {
        let state = SavedContentState(
            savedReferences: savedReferences,
            lastViewedReference: lastViewedReference
        )

        guard let data = try? JSONEncoder().encode(state) else {
            return
        }

        defaults.set(data, forKey: storageKey)
    }

    private static func loadState(defaults: UserDefaults, storageKey: String) -> SavedContentState {
        guard let data = defaults.data(forKey: storageKey),
              let state = try? JSONDecoder().decode(SavedContentState.self, from: data) else {
            return .empty
        }

        return state
    }
}

private struct SavedContentState: Codable {
    let savedReferences: [SavedContentReference]
    let lastViewedReference: SavedContentReference?

    static let empty = SavedContentState(savedReferences: [], lastViewedReference: nil)
}
