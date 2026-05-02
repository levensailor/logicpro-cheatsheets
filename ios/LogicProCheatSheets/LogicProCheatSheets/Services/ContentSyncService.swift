import Foundation

struct ContentSyncService {
    struct FetchResult {
        let bundle: ContentBundle
        let locale: String
    }

    private let session: URLSession
    private let fileStore: ContentFileStore
    private let hashVerifier: HashVerifier

    init(
        session: URLSession = .shared,
        fileStore: ContentFileStore = ContentFileStore(),
        hashVerifier: HashVerifier = HashVerifier()
    ) {
        self.session = session
        self.fileStore = fileStore
        self.hashVerifier = hashVerifier
    }

    func fetchLatestContent(
        currentVersion: String?,
        currentLocale: String?,
        localeChain: [String]
    ) async throws -> FetchResult? {
        for locale in localeChain {
            for manifestURL in manifestURLs(for: locale) {
                guard let manifest = try await fetchManifest(at: manifestURL) else {
                    continue
                }

                guard manifest.schemaVersion <= ContentConfiguration.supportedSchemaVersion else {
                    throw ContentError.incompatibleSchema(manifest.schemaVersion)
                }

                guard manifest.minAppVersion <= ContentConfiguration.appVersion else {
                    throw ContentError.unsupportedAppVersion(manifest.minAppVersion)
                }

                let isSameVersion = manifest.contentVersion == currentVersion
                let isSameLocale = locale == currentLocale
                guard !(isSameVersion && isSameLocale) else {
                    return nil
                }

                guard let bundleURL = URL(string: manifest.bundle.url, relativeTo: ContentConfiguration.remoteBaseURL) else {
                    throw ContentError.invalidRemoteURL
                }

                let (contentData, contentResponse) = try await dataAndHTTPResponse(from: bundleURL)
                guard (200...299).contains(contentResponse.statusCode) else {
                    continue
                }
                guard hashVerifier.verifySHA256(data: contentData, expectedHex: manifest.bundle.sha256) else {
                    throw ContentError.hashMismatch
                }

                let decoded = try JSONDecoder().decode(ContentBundle.self, from: contentData)
                try fileStore.saveVerifiedContent(contentData, locale: locale)
                return FetchResult(bundle: decoded, locale: locale)
            }
        }

        return nil
    }

    private func manifestURLs(for locale: String) -> [URL] {
        var urls = [contentURL(pathComponents: ["content", locale, "manifest.json"])]

        // Keep legacy path for backwards compatibility and default locale delivery.
        if locale == ContentConfiguration.defaultContentLocale {
            urls.append(contentURL(pathComponents: ["content", "manifest.json"]))
        }

        return urls
    }

    private func contentURL(pathComponents: [String]) -> URL {
        pathComponents.reduce(ContentConfiguration.remoteBaseURL) { partial, component in
            partial.appendingPathComponent(component)
        }
    }

    private func fetchManifest(at url: URL) async throws -> ContentManifest? {
        let (manifestData, response) = try await dataAndHTTPResponse(from: url)
        if response.statusCode == 404 {
            return nil
        }
        guard (200...299).contains(response.statusCode) else {
            return nil
        }
        return try JSONDecoder().decode(ContentManifest.self, from: manifestData)
    }

    private func dataAndHTTPResponse(from url: URL) async throws -> (Data, HTTPURLResponse) {
        let (data, response) = try await session.data(from: url)
        guard let httpResponse = response as? HTTPURLResponse else {
            throw ContentError.network("Invalid HTTP response from \(url.absoluteString)")
        }
        return (data, httpResponse)
    }
}
