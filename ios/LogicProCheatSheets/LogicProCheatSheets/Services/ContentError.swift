import Foundation

enum ContentError: LocalizedError {
    case missingBundledContent
    case invalidRemoteURL
    case incompatibleSchema(Int)
    case unsupportedAppVersion(String)
    case hashMismatch

    var errorDescription: String? {
        switch self {
        case .missingBundledContent:
            return "Bundled seed content is missing."
        case .invalidRemoteURL:
            return "The remote content URL is invalid."
        case .incompatibleSchema(let version):
            return "Content schema \(version) is not supported by this app."
        case .unsupportedAppVersion(let minVersion):
            return "This content requires app version \(minVersion) or newer."
        case .hashMismatch:
            return "Downloaded content failed integrity verification."
        }
    }
}
