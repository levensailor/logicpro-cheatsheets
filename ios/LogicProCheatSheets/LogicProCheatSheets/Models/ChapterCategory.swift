import Foundation

/// Canonical chapter grouping for handbook navigation (Library sidebar + Home chapter index).
enum ChapterCategory: String, CaseIterable, Identifiable {
    case tracking
    case daw
    case mixing
    case mastering
    case reference

    var id: String { rawValue }

    var title: String {
        switch self {
        case .tracking: return "Tracking"
        case .daw: return "DAW"
        case .mixing: return "Mixing"
        case .mastering: return "Mastering"
        case .reference: return "Reference"
        }
    }

    var sheetIDs: [String] {
        switch self {
        case .tracking:
            return ["tracking-band"]
        case .daw:
            return [
                "audio-routing",
                "interfaces",
                "monitoring",
                "logic-pro-workflow",
                "automation",
                "plugins-reference",
                "gain-staging-lufs"
            ]
        case .mixing:
            return [
                "bass-guitar-mixing",
                "kick-drum-mixing",
                "snare-drum-mixing",
                "electric-guitar-mixing",
                "vocal-mixing",
                "toms-mixing-guide",
                "room-mic-mixing-guide",
                "overheads-mixing-guide",
                "drum-bus-mixing",
                "vocal-bus-mixing",
                "guitar-bus-mixing",
                "main-bus-pre-master"
            ]
        case .mastering:
            return ["mastering-final-mix"]
        case .reference:
            return ["appendix-audio-terms"]
        }
    }
}
