import Foundation

struct ContentFileStore {
    private let fileManager = FileManager.default

    private var cacheRootDirectory: URL {
        let base = fileManager.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
        return base.appendingPathComponent("ContentCache", isDirectory: true)
    }

    private var legacyCacheDirectory: URL {
        cacheRootDirectory.appendingPathComponent("current", isDirectory: true)
    }

    private var legacyCachedContentURL: URL {
        legacyCacheDirectory.appendingPathComponent("content.json")
    }

    private func cacheDirectory(for locale: String) -> URL {
        cacheRootDirectory
            .appendingPathComponent(sanitizedLocale(locale), isDirectory: true)
            .appendingPathComponent("current", isDirectory: true)
    }

    private func cachedContentURL(for locale: String) -> URL {
        cacheDirectory(for: locale).appendingPathComponent("content.json")
    }

    private func sanitizedLocale(_ locale: String) -> String {
        locale.replacingOccurrences(of: "/", with: "-")
    }

    func loadCachedBundle(localeChain: [String]) throws -> (bundle: ContentBundle, locale: String)? {
        for locale in localeChain {
            let url = cachedContentURL(for: locale)
            guard fileManager.fileExists(atPath: url.path) else {
                continue
            }

            let data = try Data(contentsOf: url)
            return (try JSONDecoder().decode(ContentBundle.self, from: data), locale)
        }

        // Legacy cache path (pre-locale support), treated as default locale.
        guard fileManager.fileExists(atPath: legacyCachedContentURL.path) else {
            return nil
        }

        let legacyData = try Data(contentsOf: legacyCachedContentURL)
        return (try JSONDecoder().decode(ContentBundle.self, from: legacyData), ContentConfiguration.defaultContentLocale)
    }

    func saveVerifiedContent(_ data: Data, locale: String) throws {
        let destinationDirectory = cacheDirectory(for: locale)
        let temporaryDirectory = destinationDirectory
            .deletingLastPathComponent()
            .appendingPathComponent("next-\(UUID().uuidString)", isDirectory: true)
        let temporaryContentURL = temporaryDirectory.appendingPathComponent("content.json")

        try fileManager.createDirectory(at: temporaryDirectory, withIntermediateDirectories: true)
        try data.write(to: temporaryContentURL, options: .atomic)

        if fileManager.fileExists(atPath: destinationDirectory.path) {
            try fileManager.removeItem(at: destinationDirectory)
        }

        try fileManager.moveItem(at: temporaryDirectory, to: destinationDirectory)
    }
}
