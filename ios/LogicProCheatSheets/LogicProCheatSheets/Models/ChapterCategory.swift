import Foundation

/// Canonical chapter grouping for handbook navigation (Library sidebar + Home chapter index).
enum ChapterCategory: String, CaseIterable, Identifiable {
    case fundamentals
    case tracking
    case mixing
    case mastering
    case reference

    var id: String { rawValue }

    var title: String {
        switch self {
        case .fundamentals: return "Fundamentals"
        case .tracking: return "Tracking"
        case .mixing: return "Mixing"
        case .mastering: return "Mastering"
        case .reference: return "Reference"
        }
    }

    var sheetIDs: [String] {
        switch self {
        case .fundamentals:
            return [
                "audio-routing",
                "interfaces",
                "monitoring",
                "logic-pro-workflow",
                "automation",
                "plugins-reference",
                "gain-staging-lufs"
            ]
        case .tracking:
            return ["tracking-band"]
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
