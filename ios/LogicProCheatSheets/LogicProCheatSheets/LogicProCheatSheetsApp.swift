import SwiftUI

@main
struct LogicProCheatSheetsApp: App {
    @StateObject private var repository = ContentRepository()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(repository)
        }
    }
}
