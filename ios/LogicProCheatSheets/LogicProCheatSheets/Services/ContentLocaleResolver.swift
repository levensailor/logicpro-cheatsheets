import Foundation

enum ContentLocaleResolver {
    static func preferredLocaleChain(
        preferredLanguages: [String] = Locale.preferredLanguages,
        defaultLocale: String = ContentConfiguration.defaultContentLocale
    ) -> [String] {
        var chain: [String] = []

        for preferred in preferredLanguages {
            let canonical = canonicalLocaleIdentifier(preferred)
            guard !canonical.isEmpty else { continue }

            appendIfMissing(canonical, to: &chain)

            if let languageCode = canonical.split(separator: "-").first {
                appendIfMissing(String(languageCode), to: &chain)
            }
        }

        appendIfMissing(canonicalLocaleIdentifier(defaultLocale), to: &chain)
        return chain
    }

    static func canonicalLocaleIdentifier(_ identifier: String) -> String {
        identifier
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .replacingOccurrences(of: "_", with: "-")
            .lowercased()
    }

    private static func appendIfMissing(_ locale: String, to chain: inout [String]) {
        guard !locale.isEmpty, !chain.contains(locale) else { return }
        chain.append(locale)
    }
}
