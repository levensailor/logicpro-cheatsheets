import SwiftUI

@main
struct LogicProCheatSheetsApp: App {
    @StateObject private var repository = ContentRepository()
    @StateObject private var savedPagesStore = SavedPagesStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(repository)
                .environmentObject(savedPagesStore)
        }
    }
}
