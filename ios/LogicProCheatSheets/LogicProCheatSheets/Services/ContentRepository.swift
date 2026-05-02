import Foundation

@MainActor
final class ContentRepository: ObservableObject {
    @Published private(set) var bundle: ContentBundle?
    @Published private(set) var statusMessage = "Loading content..."
    @Published private(set) var isRefreshing = false
    @Published private(set) var activeLocale = ContentConfiguration.defaultContentLocale

    private let bundledProvider = BundledContentProvider()
    private let fileStore = ContentFileStore()
    private let syncService = ContentSyncService()

    func load() async {
        if bundle != nil {
            return
        }

        let localeChain = ContentLocaleResolver.preferredLocaleChain()

        do {
            if let cached = try fileStore.loadCachedBundle(localeChain: localeChain) {
                bundle = cached.bundle
                activeLocale = cached.locale
                statusMessage = "Offline content loaded\(localeStatusSuffix(selectedLocale: cached.locale, localeChain: localeChain))."
            } else {
                let bundled = try bundledProvider.loadBundle(localeChain: localeChain)
                bundle = bundled.bundle
                activeLocale = bundled.locale
                statusMessage = "Bundled content loaded\(localeStatusSuffix(selectedLocale: bundled.locale, localeChain: localeChain))."
            }
        } catch {
            statusMessage = error.localizedDescription
        }

        await refresh(localeChain: localeChain)
    }

    func refresh() async {
        await refresh(localeChain: ContentLocaleResolver.preferredLocaleChain())
    }

    private func refresh(localeChain: [String]) async {
        guard !isRefreshing else {
            return
        }

        isRefreshing = true
        defer { isRefreshing = false }

        do {
            if let latest = try await syncService.fetchLatestContent(
                currentVersion: bundle?.contentVersion,
                currentLocale: activeLocale,
                localeChain: localeChain
            ) {
                bundle = latest.bundle
                activeLocale = latest.locale
                statusMessage = "Updated \(latest.bundle.generatedAt)\(localeStatusSuffix(selectedLocale: latest.locale, localeChain: localeChain))."
            } else if bundle != nil {
                statusMessage = "Content is up to date (\(activeLocale))."
            }
        } catch {
            if bundle == nil {
                statusMessage = error.localizedDescription
            } else {
                statusMessage = "Using offline content (\(activeLocale))."
            }
        }
    }

    private func localeStatusSuffix(selectedLocale: String, localeChain: [String]) -> String {
        guard let requestedLocale = localeChain.first else {
            return " (\(selectedLocale))"
        }

        if requestedLocale == selectedLocale {
            return " (\(selectedLocale))"
        }

        return " (\(selectedLocale), fallback from \(requestedLocale))"
    }
}
