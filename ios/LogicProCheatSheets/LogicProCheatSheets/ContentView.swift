import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var repository: ContentRepository
    @AppStorage(AppPreferenceKeys.appearance) private var appearance = AppAppearance.system.rawValue
    @AppStorage(AppPreferenceKeys.fontSize) private var fontSize = AppFontSize.system.rawValue

    var body: some View {
        Group {
            if let bundle = repository.bundle {
                MainTabView(bundle: bundle)
            } else {
                VStack(spacing: 12) {
                    ProgressView()
                    Text(repository.statusMessage)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .preferredColorScheme(AppAppearance(rawValue: appearance)?.colorScheme)
        .appDynamicTypeSize(AppFontSize(rawValue: fontSize)?.dynamicTypeSize)
        .task {
            await repository.load()
        }
    }
}

enum AppPreferenceKeys {
    static let appearance = "settings.appearance"
    static let fontSize = "settings.fontSize"
}

enum AppAppearance: String, CaseIterable, Identifiable {
    case system
    case light
    case dark

    var id: String { rawValue }

    var title: String {
        switch self {
        case .system: return "System"
        case .light: return "Light"
        case .dark: return "Dark"
        }
    }

    var symbolName: String {
        switch self {
        case .system: return "circle.lefthalf.filled"
        case .light: return "sun.max.fill"
        case .dark: return "moon.fill"
        }
    }

    var colorScheme: ColorScheme? {
        switch self {
        case .system: return nil
        case .light: return .light
        case .dark: return .dark
        }
    }
}

enum AppFontSize: String, CaseIterable, Identifiable {
    case system
    case compact
    case standard
    case large
    case extraLarge

    var id: String { rawValue }

    var title: String {
        switch self {
        case .system: return "System"
        case .compact: return "Compact"
        case .standard: return "Standard"
        case .large: return "Large"
        case .extraLarge: return "Extra Large"
        }
    }

    var detail: String {
        switch self {
        case .system: return "Follow the iOS text size setting."
        case .compact: return "Fit more handbook detail on screen."
        case .standard: return "Balanced reading size for most sessions."
        case .large: return "Larger chapter text for quick glances."
        case .extraLarge: return "Maximum in-app size for studio reading."
        }
    }

    var previewText: String {
        switch self {
        case .system: return "System"
        case .compact: return "Aa"
        case .standard: return "Aa"
        case .large: return "Aa"
        case .extraLarge: return "Aa"
        }
    }

    var dynamicTypeSize: DynamicTypeSize? {
        switch self {
        case .system: return nil
        case .compact: return .medium
        case .standard: return .large
        case .large: return .xLarge
        case .extraLarge: return .xxxLarge
        }
    }
}

private extension View {
    @ViewBuilder
    func appDynamicTypeSize(_ size: DynamicTypeSize?) -> some View {
        if let size {
            dynamicTypeSize(size)
        } else {
            self
        }
    }
}
