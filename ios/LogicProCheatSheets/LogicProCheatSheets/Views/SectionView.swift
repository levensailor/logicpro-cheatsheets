import SwiftUI

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
                            Label(item.displayText, systemImage: "checkmark.circle.fill")
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 12))
                }
            }
        }
    }
}

private struct TableSectionView: View {
    let title: String
    let table: SheetTable

    var body: some View {
        SectionCard(title: title) {
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

private struct PluginChooserSectionView: View {
    let section: PluginChooserSection
    @State private var selectedType = "All"

    private var pluginTypes: [String] {
        ["All"] + Array(Set(section.entries.map(\.type))).sorted()
    }

    private var filteredEntries: [PluginChooserEntry] {
        section.entries
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
            Picker("Plugin Type", selection: $selectedType) {
                ForEach(pluginTypes, id: \.self) { type in
                    Text(type).tag(type)
                }
            }
            .pickerStyle(.menu)

            ForEach(filteredEntries) { plugin in
                VStack(alignment: .leading, spacing: 4) {
                    HStack {
                        Text(plugin.name)
                            .font(.headline)
                        Spacer()
                        Text("\(plugin.popularity)/10")
                            .font(.caption.bold())
                            .foregroundStyle(.secondary)
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
}
