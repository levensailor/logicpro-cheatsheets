import SwiftUI
import UIKit
import CryptoKit

struct SectionView: View {
    let section: SheetSection

    var body: some View {
        switch section {
        case .chain(let section):
            ChainSectionView(section: section)
        case .cards(let section):
            CardsSectionView(section: section)
        case .table(let section):
            TableSectionView(title: section.title, table: section.table)
        case .checklist(let section):
            ChecklistSectionView(section: section)
        case .image(let section):
            ImageSectionView(section: section)
        case .pluginChooser(let section):
            PluginChooserSectionView(section: section)
        case .article(let section):
            ArticleSectionView(section: section)
        case .unknown(let section):
            ContentUnavailableView(
                "Update Required",
                systemImage: "exclamationmark.triangle",
                description: Text("This app cannot render the \(section.type) section yet.")
            )
            .padding()
        }
    }
}

private struct SectionCard<Content: View>: View {
    let title: String
    @ViewBuilder let content: Content

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title)
                .font(.title3.bold())
            content
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.background, in: RoundedRectangle(cornerRadius: 16))
        .overlay {
            RoundedRectangle(cornerRadius: 16)
                .stroke(.quaternary)
        }
    }
}

private struct ChainSectionView: View {
    let section: ChainSection

    var body: some View {
        SectionCard(title: section.title) {
            VStack(alignment: .leading, spacing: 10) {
                ForEach(section.steps) { step in
                    VStack(alignment: .leading, spacing: 4) {
                        Text(step.name)
                            .font(.headline)
                        Text(step.goal)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 4)
                }
            }
        }
    }
}

private struct CardsSectionView: View {
    let section: CardsSection

    var body: some View {
        SectionCard(title: section.title) {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 220), spacing: 12)], spacing: 12) {
                ForEach(section.cards) { card in
                    VStack(alignment: .leading, spacing: 8) {
                        Text(card.title)
                            .font(.headline)
                        ForEach(card.items) { item in
                            cardLineItemView(item)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 12))
                }
            }
        }
    }

    @ViewBuilder
    private func cardLineItemView(_ item: CardLineItem) -> some View {
        switch item {
        case .text(let value):
            Label(value, systemImage: "checkmark.circle.fill")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        case .rich(let value):
            VStack(alignment: .leading, spacing: 8) {
                if let imageSrc = value.imageSrc, !imageSrc.isEmpty {
                    CachedRemoteImage(
                        source: imageSrc,
                        altText: value.imageAlt ?? value.text,
                        height: 130
                    )
                }

                Label(value.text, systemImage: "checkmark.circle.fill")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
    }
}

private struct TableSectionView: View {
    let title: String
    let table: SheetTable

    var body: some View {
        SectionCard(title: title) {
            switch table.layout {
            case "compact":
                compactGrid
            case "detailCards":
                detailCards
            default:
                standardRows
            }
        }
    }

    private var compactGrid: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 150), spacing: 10)], spacing: 10) {
            ForEach(Array(table.rows.enumerated()), id: \.offset) { _, row in
                VStack(alignment: .leading, spacing: 4) {
                    Text(row.first ?? "")
                        .font(.caption.bold())
                        .foregroundStyle(.secondary)
                        .textCase(.uppercase)
                    Text(row.dropFirst().first ?? "")
                        .font(.headline)
                        .foregroundStyle(.primary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()
                .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 12))
            }
        }
    }

    private var detailCards: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 240), spacing: 12)], spacing: 12) {
            ForEach(Array(table.rows.enumerated()), id: \.offset) { _, row in
                VStack(alignment: .leading, spacing: 8) {
                    Text(row.first ?? "")
                        .font(.headline)

                    ForEach(Array(row.dropFirst().enumerated()), id: \.offset) { columnIndex, value in
                        HStack(alignment: .top, spacing: 8) {
                            let column = table.columns.indices.contains(columnIndex + 1) ? table.columns[columnIndex + 1] : "Detail"

                            Image(systemName: iconName(for: column))
                                .font(.caption.bold())
                                .foregroundStyle(.secondary)
                                .frame(width: 22, height: 22)
                                .background(.background, in: Circle())
                                .accessibilityLabel(column)

                            Text(value)
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()
                .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 12))
            }
        }
    }

    private func iconName(for column: String) -> String {
        let normalized = column.lowercased()

        if normalized.contains("why") { return "sparkles" }
        if normalized.contains("look") || normalized.contains("does") || normalized.contains("approach") { return "magnifyingglass" }
        if normalized.contains("use") || normalized.contains("best") || normalized.contains("fit") { return "target" }
        if normalized.contains("example") || normalized.contains("tip") { return "lightbulb" }
        if normalized.contains("routing") || normalized.contains("standard") { return "arrow.triangle.branch" }
        if normalized.contains("peak") || normalized.contains("lufs") || normalized.contains("recommended") { return "ruler" }
        if normalized.contains("watch") { return "exclamationmark.triangle" }

        return "circle.fill"
    }

    private var standardRows: some View {
        VStack(alignment: .leading, spacing: 10) {
            ForEach(Array(table.rows.enumerated()), id: \.offset) { _, row in
                VStack(alignment: .leading, spacing: 6) {
                    ForEach(Array(row.enumerated()), id: \.offset) { columnIndex, value in
                        VStack(alignment: .leading, spacing: 2) {
                            Text(table.columns.indices.contains(columnIndex) ? table.columns[columnIndex] : "Value")
                                .font(.caption.bold())
                                .foregroundStyle(.secondary)
                            Text(value)
                        }
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()
                .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 12))
            }
        }
    }
}

private struct ChecklistSectionView: View {
    let section: ChecklistSection

    var body: some View {
        SectionCard(title: section.title) {
            VStack(alignment: .leading, spacing: 8) {
                ForEach(section.items, id: \.self) { item in
                    Label(item, systemImage: "checkmark.circle.fill")
                        .foregroundStyle(.secondary)
                }
            }
        }
    }
}

private struct ImageSectionView: View {
    let section: ImageSection

    var body: some View {
        SectionCard(title: section.title) {
            VStack(alignment: .leading, spacing: 8) {
                CachedRemoteImage(
                    source: section.src,
                    altText: section.alt,
                    height: 220
                )
                Text(section.alt)
                    .foregroundStyle(.secondary)
                if let caption = section.caption {
                    Text(caption)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
    }
}

private struct ArticleSectionView: View {
    let section: ArticleSection

    var body: some View {
        SectionCard(title: section.title) {
            VStack(alignment: .leading, spacing: 16) {
                if let dek = section.dek {
                    Text(dek)
                        .font(.callout.weight(.semibold))
                        .foregroundStyle(.secondary)
                }

                if let visualReferences = section.visualReferences, !visualReferences.isEmpty {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 150), spacing: 10)], spacing: 10) {
                        ForEach(visualReferences) { reference in
                            VStack(alignment: .leading, spacing: 8) {
                                CachedRemoteImage(
                                    source: reference.src,
                                    altText: reference.alt,
                                    height: 90
                                )
                                Text(reference.title)
                                    .font(.caption.bold())
                                Text(reference.caption)
                                    .font(.caption2)
                                    .foregroundStyle(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(10)
                            .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 12))
                        }
                    }
                }

                ForEach(section.blocks) { block in
                    VStack(alignment: .leading, spacing: 8) {
                        Text(block.heading)
                            .font(.headline)
                        ForEach(block.paragraphs, id: \.self) { paragraph in
                            Text(paragraph)
                                .font(.body)
                                .foregroundStyle(.secondary)
                        }
                    }
                }
            }
        }
    }
}

private struct PluginChooserSectionView: View {
    let section: PluginChooserSection
    @State private var selectedInstrument = "All"
    @State private var selectedType = "All"

    private let instrumentOptions = [
        "All",
        "Bass",
        "Guitar",
        "Kick",
        "Snare",
        "Toms",
        "Overheads",
        "Room Mic",
        "Vocals",
        "Drums",
        "Synths",
        "Keys",
        "Mix Bus",
        "Master Bus"
    ]

    private var pluginTypes: [String] {
        ["All"] + Array(Set(section.entries.map(\.type))).sorted()
    }

    private var filteredEntries: [PluginChooserEntry] {
        section.entries
            .filter { selectedInstrument == "All" || matchesInstrument($0.bestOn, instrument: selectedInstrument) }
            .filter { selectedType == "All" || $0.type == selectedType }
            .sorted { lhs, rhs in
                if lhs.popularity == rhs.popularity {
                    return lhs.name < rhs.name
                }
                return lhs.popularity > rhs.popularity
            }
    }

    var body: some View {
        SectionCard(title: section.title) {
            Picker("Instrument / Bus", selection: $selectedInstrument) {
                ForEach(instrumentOptions, id: \.self) { instrument in
                    Text(instrument).tag(instrument)
                }
            }
            .pickerStyle(.menu)

            Picker("Plugin Type", selection: $selectedType) {
                ForEach(pluginTypes, id: \.self) { type in
                    Text(type).tag(type)
                }
            }
            .pickerStyle(.menu)

            Text(resultsSummary)
                .font(.caption)
                .foregroundStyle(.secondary)

            ForEach(filteredEntries) { plugin in
                VStack(alignment: .leading, spacing: 4) {
                    HStack {
                        Text(plugin.name)
                            .font(.headline)
                        Spacer()
                        StarRatingView(popularity: plugin.popularity)
                    }
                    Text(plugin.type)
                        .font(.subheadline.bold())
                    Text(plugin.bestOn)
                        .foregroundStyle(.secondary)
                    Text(plugin.knownFor)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .padding()
                .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 12))
            }
        }
    }

    private var resultsSummary: String {
        var summary = "Showing \(filteredEntries.count) recommended plugin"
        summary += filteredEntries.count == 1 ? "" : "s"

        if selectedInstrument != "All" {
            summary += " for \(selectedInstrument)"
        }

        if selectedType != "All" {
            summary += " in \(selectedType)"
        }

        return summary
    }

    private func matchesInstrument(_ bestOn: String, instrument: String) -> Bool {
        let value = bestOn.lowercased()
        let aliases: [String: [String]] = [
            "Bass": ["bass", "sub"],
            "Guitar": ["guitar", "guitars"],
            "Kick": ["kick"],
            "Snare": ["snare"],
            "Toms": ["tom", "toms"],
            "Overheads": ["overhead", "overheads"],
            "Room Mic": ["room mic", "room mics", "room"],
            "Vocals": ["vocal", "vocals", "voice", "voiceover"],
            "Drums": ["drum", "drums"],
            "Synths": ["synth", "synths"],
            "Keys": ["keys", "piano", "keyboard"],
            "Mix Bus": ["mix bus", "bus", "buses", "full mix"],
            "Master Bus": ["master bus", "mastering"]
        ]

        return (aliases[instrument] ?? [instrument.lowercased()]).contains { value.contains($0) }
    }
}

private struct StarRatingView: View {
    let popularity: Int

    private var rating: Double {
        Double(popularity) / 2.0
    }

    var body: some View {
        HStack(spacing: 1) {
            ForEach(1...5, id: \.self) { star in
                Image(systemName: symbolName(for: star))
                    .foregroundStyle(Color.yellow)
            }
        }
        .font(.caption)
        .accessibilityLabel(String(format: "%.1f out of 5 stars", rating))
    }

    private func symbolName(for star: Int) -> String {
        let value = Double(star)

        if rating >= value {
            return "star.fill"
        }

        if rating >= value - 0.5 {
            return "star.leadinghalf.filled"
        }

        return "star"
    }
}

struct CachedRemoteImage: View {
    let source: String
    let altText: String
    var height: CGFloat = 180

    @StateObject private var loader = CachedRemoteImageLoader()

    var body: some View {
        Group {
            if let image = loader.image {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFit()
            } else if loader.isLoading {
                RoundedRectangle(cornerRadius: 10)
                    .fill(Color.secondary.opacity(0.12))
                    .overlay {
                        ProgressView()
                    }
            } else {
                RoundedRectangle(cornerRadius: 10)
                    .fill(Color.secondary.opacity(0.12))
                    .overlay(alignment: .center) {
                        VStack(spacing: 6) {
                            Image(systemName: "photo")
                                .font(.title3)
                                .foregroundStyle(.secondary)
                            Text(altText)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .multilineTextAlignment(.center)
                                .padding(.horizontal, 10)
                        }
                    }
            }
        }
        .frame(maxWidth: .infinity)
        .frame(height: height)
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .task(id: source) {
            await loader.load(source: source)
        }
    }
}

@MainActor
private final class CachedRemoteImageLoader: ObservableObject {
    @Published var image: UIImage?
    @Published var isLoading = false

    func load(source: String) async {
        guard !source.isEmpty else {
            image = nil
            isLoading = false
            return
        }

        isLoading = true
        image = await RemoteImageCache.shared.image(for: source)
        isLoading = false
    }
}

private actor RemoteImageCache {
    static let shared = RemoteImageCache()
    private let fileManager = FileManager.default

    func image(for source: String) async -> UIImage? {
        guard let url = resolveURL(from: source) else {
            return nil
        }

        let cacheURL = cacheFileURL(for: url)

        if let cachedData = try? Data(contentsOf: cacheURL),
           let cachedImage = UIImage(data: cachedData) {
            print("Image cache hit: \(url.absoluteString)")
            return cachedImage
        }

        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode),
                  let image = UIImage(data: data) else {
                print("Image fetch failed (status/data): \(url.absoluteString)")
                return nil
            }

            try prepareImageCacheDirectoryIfNeeded()
            try data.write(to: cacheURL, options: .atomic)
            print("Image cache store: \(url.absoluteString)")
            return image
        } catch {
            print("Image fetch error: \(url.absoluteString) (\(error.localizedDescription))")
            return nil
        }
    }

    private func resolveURL(from source: String) -> URL? {
        if let absolute = URL(string: source), absolute.scheme != nil {
            return absolute
        }

        return URL(string: source, relativeTo: ContentConfiguration.remoteBaseURL)
    }

    private func cacheFileURL(for url: URL) -> URL {
        let ext = url.pathExtension.isEmpty ? "img" : url.pathExtension
        return imageCacheDirectory().appendingPathComponent("\(hashedFileName(url.absoluteString)).\(ext)")
    }

    private func imageCacheDirectory() -> URL {
        let applicationSupport = fileManager.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
        return applicationSupport
            .appendingPathComponent("ContentCache", isDirectory: true)
            .appendingPathComponent("images", isDirectory: true)
    }

    private func prepareImageCacheDirectoryIfNeeded() throws {
        try fileManager.createDirectory(
            at: imageCacheDirectory(),
            withIntermediateDirectories: true
        )
    }

    private func hashedFileName(_ value: String) -> String {
        let digest = SHA256.hash(data: Data(value.utf8))
        return digest.map { String(format: "%02x", $0) }.joined()
    }
}
