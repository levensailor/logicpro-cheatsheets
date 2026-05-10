import SwiftUI

@main
struct LogicProCheatSheetsApp: App {
    @StateObject private var repository = ContentRepository()
    @StateObject private var savedContentStore = SavedContentStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(repository)
                .environmentObject(savedContentStore)
        }
    }
}
