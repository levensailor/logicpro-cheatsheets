import Foundation

struct BundledContentProvider {
    func loadBundle(localeChain: [String]) throws -> (bundle: ContentBundle, locale: String) {
        for locale in localeChain {
            let localizedResourceName = "SeedContent_\(locale.replacingOccurrences(of: "-", with: "_"))"
            if let localizedURL = Bundle.main.url(forResource: localizedResourceName, withExtension: "json") {
                let localizedData = try Data(contentsOf: localizedURL)
                return (try JSONDecoder().decode(ContentBundle.self, from: localizedData), locale)
            }
        }

        guard let url = Bundle.main.url(forResource: "SeedContent", withExtension: "json") else {
            throw ContentError.missingBundledContent
        }

        let data = try Data(contentsOf: url)
        return (try JSONDecoder().decode(ContentBundle.self, from: data), ContentConfiguration.defaultContentLocale)
    }
}
