import Foundation

@MainActor
final class ContentRepository: ObservableObject {
    @Published private(set) var bundle: ContentBundle?
    @Published private(set) var statusMessage = "Loading content..."
    @Published private(set) var isRefreshing = false

    private let bundledProvider = BundledContentProvider()
    private let fileStore = ContentFileStore()
    private let syncService = ContentSyncService()

    func load() async {
        if bundle != nil {
            return
        }

        do {
            if let cached = try fileStore.loadCachedBundle() {
                bundle = cached
                statusMessage = "Offline content loaded."
            } else {
                bundle = try bundledProvider.loadBundle()
                statusMessage = "Bundled content loaded."
            }
        } catch {
            statusMessage = error.localizedDescription
        }

        await refresh()
    }

    func refresh() async {
        guard !isRefreshing else {
            return
        }

        isRefreshing = true
        defer { isRefreshing = false }

        do {
            if let latest = try await syncService.fetchLatestContent(currentVersion: bundle?.contentVersion) {
                bundle = latest
                statusMessage = "Updated \(latest.generatedAt)."
            } else if bundle != nil {
                statusMessage = "Content is up to date."
            }
        } catch {
            if bundle == nil {
                statusMessage = error.localizedDescription
            } else {
                statusMessage = "Using offline content."
            }
        }
    }
}
