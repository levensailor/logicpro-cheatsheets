# Saved Pages Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Logic Pro GURU iOS App                    │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                         MainTabView                              │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐      │
│  │  Home    │ Library  │  Train   │  Saved   │ Settings │      │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘      │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
        ┌────────────────┬───────────────┬───────────────┐
        │  SheetDetail   │  LessonDetail │  SavedTabView │
        │     View       │     View      │               │
        └────────────────┴───────────────┴───────────────┘
                    │            │            │
                    │   Uses     │   Uses     │   Uses
                    └────────────┼────────────┘
                                 ▼
                    ┌────────────────────────┐
                    │  SavedItemsManager     │
                    │  (Singleton Service)   │
                    └────────────────────────┘
                                 │
                                 │ Persists to
                                 ▼
                    ┌────────────────────────┐
                    │     UserDefaults       │
                    │  - savedItems          │
                    │  - lastViewedItem      │
                    └────────────────────────┘
```

## Component Responsibilities

### MainTabView
- Root container for tab navigation
- Manages selected tab state
- Provides bundle data to child views
- Makes AppTab enum public for cross-view access

### SheetDetailView (Chapter Pages)
- Displays chapter content and sections
- Bookmark button in toolbar
- Auto-saves on `onDisappear`
- Uses `@StateObject` to access SavedItemsManager

### TrainingLessonDetailView (Lesson Pages)
- Displays training lesson steps
- Bookmark button in toolbar
- Auto-saves on `onDisappear`
- Uses `@StateObject` to access SavedItemsManager

### SavedTabView
- Displays "Pick up where you left off" section
- Displays pinned items section
- Handles empty state
- Provides navigation to saved content
- Shows time-ago for last viewed items
- Remove buttons for pinned items

### SavedItemsManager
**Singleton Service** - Central state management
- Manages array of saved items
- Tracks last viewed item separately
- Provides methods:
  - `toggleSave()` - Add/remove bookmarks
  - `autoSaveLastViewed()` - Update last viewed
  - `isSaved()` - Check if item is bookmarked
  - `removeSavedItem()` - Delete a saved item
- Publishes state changes via `@Published`
- Persists to UserDefaults automatically

### UserDefaults
- System-provided key-value storage
- Two keys:
  - `savedItems`: Array of user-bookmarked items
  - `lastViewedItem`: Most recently viewed page
- JSON encoding/decoding for SavedItem structs

## Data Flow Diagrams

### Bookmark Flow
```
User taps bookmark button
         │
         ▼
SheetDetailView/LessonDetailView
         │
         ▼
SavedItemsManager.toggleSave()
         │
         ├─── Check if already saved
         │    │
         │    ├─── Yes: Remove from savedItems
         │    └─── No:  Add to savedItems
         │
         ▼
Encode to JSON
         │
         ▼
Write to UserDefaults
         │
         ▼
Publish update (@Published)
         │
         ▼
SwiftUI automatically refreshes:
- Bookmark button (fills/unfills)
- SavedTabView (adds/removes item)
```

### Auto-Save Flow
```
User navigates away from content
         │
         ▼
onDisappear fires
         │
         ▼
SavedItemsManager.autoSaveLastViewed()
         │
         ▼
Create SavedItem (isAutoSaved=true)
         │
         ▼
Update lastViewedItem property
         │
         ▼
Encode to JSON
         │
         ▼
Write to UserDefaults
         │
         ▼
Publish update (@Published)
         │
         ▼
SavedTabView automatically refreshes:
- "Pick up where you left off" section
```

### App Launch Flow
```
App launches
         │
         ▼
SavedItemsManager.init()
         │
         ▼
Read from UserDefaults
         │
         ├─── savedItems key
         │    │
         │    ▼
         │    Decode JSON → [SavedItem]
         │
         └─── lastViewedItem key
              │
              ▼
              Decode JSON → SavedItem?
         │
         ▼
Set @Published properties
         │
         ▼
SavedTabView renders with data
```

### Remove Item Flow
```
User taps X button in SavedTabView
         │
         ▼
SavedTabView calls onRemove closure
         │
         ▼
SavedItemsManager.removeSavedItem()
         │
         ▼
Find item in savedItems array
         │
         ▼
Remove from array
         │
         ▼
Encode to JSON
         │
         ▼
Write to UserDefaults
         │
         ▼
Publish update (@Published)
         │
         ▼
SavedTabView automatically refreshes
(Item disappears with animation)
```

## State Management Pattern

### Publisher-Subscriber Model
```
SavedItemsManager (@MainActor)
    │
    ├─── @Published var savedItems
    │         │
    │         └─── Observed by: SavedTabView, SheetDetailView, LessonDetailView
    │
    └─── @Published var lastViewedItem
              │
              └─── Observed by: SavedTabView
```

When a `@Published` property changes:
1. SwiftUI automatically detects the change
2. Only affected views re-render
3. No manual notification code needed
4. Type-safe updates guaranteed

### @StateObject vs @ObservedObject
We use `@StateObject` because:
- Ensures the manager survives view re-renders
- Only one instance per view lifecycle
- Prevents accidental deallocation
- Correct for singleton services

## Data Models

### SavedItem Structure
```
struct SavedItem: Codable, Identifiable, Equatable {
    let id: String           // "bass-guitar-mixing" or "lesson-1"
    let type: SavedItemType  // .cheatSheet or .trainingLesson
    let title: String        // "Bass Guitar Mixing"
    let subtitle: String     // "Low-end control and clarity"
    let icon: String         // "🎸" or "graduationcap.fill"
    let savedAt: Date        // When saved (for sorting)
    let isAutoSaved: Bool    // true = last viewed, false = user pinned
}
```

### SavedItemType Enum
```
enum SavedItemType: String, Codable {
    case cheatSheet
    case trainingLesson
}
```

Type safety ensures:
- Can't mix up chapters and lessons
- Switch statements are exhaustive
- Refactoring is safe (compiler catches errors)

## Persistence Strategy

### UserDefaults Choice
**Pros:**
- Simple API (one line read/write)
- Automatic synchronization
- Built into iOS (no dependencies)
- Perfect for small amounts of data
- Synchronous (no async complexity)

**Cons:**
- Not designed for large datasets (>1MB)
- Not queryable like a database
- Device-local only (no auto cloud sync)

**Why it's sufficient:**
- Our data is small (~1KB per item)
- Typical user saves 10-50 items
- No complex queries needed
- Simple filtering in Swift is fast enough

### JSON Encoding
```swift
// Save
let data = try JSONEncoder().encode(savedItems)
UserDefaults.standard.set(data, forKey: "savedItems")

// Load
let data = UserDefaults.standard.data(forKey: "savedItems")
let items = try JSONDecoder().decode([SavedItem].self, from: data)
```

**Pros:**
- Type-safe (Codable protocol)
- Handles nested objects
- Standard Swift pattern
- Easy to debug (readable JSON)

## Threading Model

### @MainActor
```swift
@MainActor
class SavedItemsManager: ObservableObject { ... }
```

This ensures:
- All methods run on main thread
- No race conditions on @Published properties
- UI updates are safe and immediate
- Matches SwiftUI's threading model

Without `@MainActor`, we'd need:
```swift
DispatchQueue.main.async {
    self.savedItems = newItems  // Manual thread switching
}
```

## Navigation Pattern

### Type-Safe Navigation
```swift
NavigationLink {
    SheetDetailViewWrapper(sheet: sheet, sheets: sheets)
} label: {
    SavedItemCardContent(...)
}
```

**Wrappers** provide:
- State initialization (`@State` variables)
- Binding creation
- Clean separation from saved state
- Reusable navigation destinations

## Performance Considerations

### Efficient Re-Renders
SwiftUI only re-renders when:
1. A `@Published` property changes
2. That property is read by the view
3. The value actually changed (not just set)

Example:
- User bookmarks item A → SavedTabView updates (adds A)
- User views item B → SavedTabView updates (last viewed)
- User bookmarks item A again → SavedTabView updates (removes A)
- User switches tabs → No update (no data changed)

### Memory Efficiency
- One SavedItemsManager instance for entire app
- SavedItem structs are value types (copy-on-write)
- Views only hold references to manager
- UserDefaults data loaded once at startup

### Scalability
Current design handles:
- **Typical**: 10-50 saved items (instant)
- **Heavy**: 100-200 saved items (still fast)
- **Extreme**: 500+ saved items (might see lag)

If needed in future:
- Migrate to CoreData for queries
- Add pagination to SavedTabView
- Implement search/filter
- Use lazy loading

## Error Handling

### Graceful Degradation
```swift
if let data = UserDefaults.standard.data(forKey: savedItemsKey),
   let items = try? JSONDecoder().decode([SavedItem].self, from: data) {
    savedItems = items
} else {
    savedItems = []  // Start empty if load fails
}
```

**Philosophy:**
- Never crash from bad saved data
- Log errors but don't throw
- Default to empty state
- Let user rebuild their saved items

### Data Corruption
If UserDefaults contains invalid JSON:
1. Decode fails with `try?`
2. Returns `nil`
3. Manager starts with empty arrays
4. User can save new items
5. Old corrupted data is overwritten

## Testing Strategy

### Unit Tests
Test SavedItemsManager in isolation:
```swift
func testToggleSave() {
    let manager = SavedItemsManager()
    manager.toggleSave(id: "test", type: .cheatSheet, ...)
    XCTAssertEqual(manager.savedItems.count, 1)
    manager.toggleSave(id: "test", type: .cheatSheet, ...)
    XCTAssertEqual(manager.savedItems.count, 0)
}
```

### Integration Tests
Test UI interaction:
```swift
func testBookmarkButton() {
    // Tap bookmark button
    // Verify icon changes
    // Navigate to Saved tab
    // Verify item appears
}
```

### Manual Tests
See TESTING_SAVED_PAGES.md for comprehensive scenarios.

## Security & Privacy

### Data Privacy
- All data stored locally on device
- No network transmission
- No analytics tracking
- No third-party services
- User can delete anytime

### Data Contents
What we store:
- Item IDs (non-sensitive)
- Titles and subtitles (public content)
- Icons (emoji or SF Symbol names)
- Timestamps (when saved)

What we DON'T store:
- User identity
- Location data
- Usage patterns
- Personal information

## Summary

The saved pages feature uses a clean, maintainable architecture:
- **Singleton service** for centralized state
- **UserDefaults** for simple persistence
- **@Published** for reactive updates
- **SwiftUI** for declarative UI
- **Type-safe** models and enums
- **Thread-safe** with @MainActor
- **Testable** with clear boundaries

This architecture is:
- ✅ Simple to understand
- ✅ Easy to maintain
- ✅ Performant for typical use
- ✅ Extensible for future features
- ✅ Following iOS best practices

---

*Architecture designed for Logic Pro GURU iOS app*  
*Feature implemented: 2026-05-10*
