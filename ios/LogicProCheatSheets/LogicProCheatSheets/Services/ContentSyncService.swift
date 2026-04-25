import Foundation

struct ContentSyncService {
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

    func fetchLatestContent(currentVersion: String?) async throws -> ContentBundle? {
        let manifestURL = ContentConfiguration.remoteBaseURL.appendingPathComponent("content/manifest.json")
        let (manifestData, _) = try await session.data(from: manifestURL)
        let manifest = try JSONDecoder().decode(ContentManifest.self, from: manifestData)

        guard manifest.schemaVersion <= ContentConfiguration.supportedSchemaVersion else {
            throw ContentError.incompatibleSchema(manifest.schemaVersion)
        }

        guard manifest.minAppVersion <= ContentConfiguration.appVersion else {
            throw ContentError.unsupportedAppVersion(manifest.minAppVersion)
        }

        guard manifest.contentVersion != currentVersion else {
            return nil
        }

        guard let bundleURL = URL(string: manifest.bundle.url, relativeTo: ContentConfiguration.remoteBaseURL) else {
            throw ContentError.invalidRemoteURL
        }

        let (contentData, _) = try await session.data(from: bundleURL)
        guard hashVerifier.verifySHA256(data: contentData, expectedHex: manifest.bundle.sha256) else {
            throw ContentError.hashMismatch
        }

        let decoded = try JSONDecoder().decode(ContentBundle.self, from: contentData)
        try fileStore.saveVerifiedContent(contentData)
        return decoded
    }
}
