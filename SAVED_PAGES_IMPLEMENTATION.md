# Saved Pages Feature Implementation

## Overview

This document describes the technical implementation of the saved pages feature for the Logic Pro GURU iOS app, addressing Linear issue LEV-16.

## Architecture

### Data Layer: SavedItemsManager

The `SavedItemsManager` is a singleton service class that manages all saved state:

```swift
@MainActor
class SavedItemsManager: ObservableObject {
    static let shared = SavedItemsManager()
    
    @Published private(set) var savedItems: [SavedItem] = []
    @Published private(set) var lastViewedItem: SavedItem?
}
```

**Key Responsibilities:**
- Persist saved items to UserDefaults
- Manage both user-pinned items and auto-saved "last viewed" items
- Provide reactive updates via `@Published` properties
- Handle add/remove operations with deduplication
- Maintain chronological ordering

**Storage:**
- Uses UserDefaults for simple, persistent storage
- Two separate keys: `savedItems` and `lastViewedItem`
- JSON encoding/decoding for type-safe persistence

### Data Models

#### SavedItem
```swift
struct SavedItem: Codable, Identifiable, Equatable {
    let id: String
    let type: SavedItemType
    let title: String
    let subtitle: String
    let icon: String
    let savedAt: Date
    let isAutoSaved: Bool
}
```

#### SavedItemType
```swift
enum SavedItemType: String, Codable {
    case cheatSheet
    case trainingLesson
}
```

### UI Layer: SavedTabView

The `SavedTabView` replaces the previous `MockTabView` and provides the complete saved pages interface.

**Structure:**
1. **Header Section**: Consistent branding with icon, title, and description
2. **Pick Up Where You Left Off**: Displays the most recently viewed item
3. **Pinned Section**: Shows user-bookmarked items with count
4. **Empty State**: Friendly message when no items are saved

**Features:**
- Time-ago display for recently viewed items
- Remove buttons for pinned items
- Navigation to full content views
- Gradient backgrounds for visual hierarchy
- Responsive layout with SF Symbols

### Integration Points

#### SheetDetailView (Chapters)
Added bookmark functionality:
- Toolbar button with bookmark icon
- Visual feedback (filled yellow when saved)
- Auto-save on `onDisappear`
- Uses `@StateObject` for manager access

#### TrainingLessonDetailView (Lessons)
Similar bookmark functionality:
- Toolbar button with bookmark icon
- Visual feedback (filled yellow when saved)
- Auto-save on `onDisappear`
- Uses `@StateObject` for manager access

#### MainTabView
Updated to use new SavedTabView:
- Replaced `MockTabView` with `SavedTabView`
- Made `AppTab` enum public for cross-view access
- Passed bundle and selectedTab binding

## Technical Decisions

### Why UserDefaults?
- **Simplicity**: Perfect for small amounts of structured data
- **Performance**: Fast read/write operations
- **Built-in**: No additional dependencies
- **Synchronous**: Immediate persistence without async complexity

**Trade-offs:**
- Not designed for large datasets (but our use case is small)
- Not queryable like a database
- Device-local only (no automatic cloud sync)

### Why Singleton Pattern?
The `SavedItemsManager.shared` singleton provides:
- **Global State**: Consistent view of saved items across all views
- **Single Source of Truth**: No state synchronization issues
- **SwiftUI Integration**: Works seamlessly with `@StateObject`
- **Memory Efficiency**: One instance for the entire app

### Why @MainActor?
- All UI updates must happen on the main thread
- Prevents race conditions in SwiftUI
- Simplifies async/await patterns
- Required for `@Published` properties used in views

### Auto-Save Implementation
Uses SwiftUI's `onDisappear` lifecycle method:
- Triggers when user navigates away from a page
- Captures the "last viewed" state automatically
- Doesn't require explicit user action
- Updates even if the item was already saved

**Alternative Considered:**
- `onBackground`: Too coarse-grained, misses in-app navigation
- Timer-based: Unnecessary complexity and battery drain
- Manual buttons: Poor UX, users forget to save

## Data Flow

### Saving an Item (User Action)
```
User taps bookmark button
    ↓
SavedItemsManager.toggleSave()
    ↓
Check if item already exists
    ↓
Add to savedItems (if new) or remove (if exists)
    ↓
Encode to JSON
    ↓
Write to UserDefaults
    ↓
Publish update
    ↓
SwiftUI refreshes views automatically
```

### Auto-Saving Last Viewed
```
User navigates away from chapter/lesson
    ↓
onDisappear fires
    ↓
SavedItemsManager.autoSaveLastViewed()
    ↓
Create SavedItem with isAutoSaved=true
    ↓
Update lastViewedItem
    ↓
Encode to JSON
    ↓
Write to UserDefaults
    ↓
Publish update
    ↓
SavedTabView refreshes "Pick up where you left off"
```

### Loading Saved State
```
App launch
    ↓
SavedItemsManager.init()
    ↓
Load savedItemsKey from UserDefaults
    ↓
Decode JSON to [SavedItem]
    ↓
Sort by savedAt (most recent first)
    ↓
Load lastViewedItemKey from UserDefaults
    ↓
Decode JSON to SavedItem
    ↓
Publish loaded data
    ↓
SavedTabView displays content
```

## Error Handling

### Graceful Degradation
- If UserDefaults read fails: Start with empty arrays
- If JSON decode fails: Log error, use empty state
- If navigation fails: Item appears but doesn't navigate (shouldn't happen)

### Data Validation
- `SavedItem` uses Codable for type safety
- IDs and types validated at compile time
- Dates always valid (system-generated)

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Navigation views created on-demand
2. **Minimal Storage**: Only essential item metadata saved
3. **Efficient Updates**: SwiftUI only re-renders changed views
4. **No Network**: All operations are local and fast

### Scalability
Current design handles:
- **Expected**: 10-50 saved items per user
- **Maximum**: ~1000 items before UserDefaults becomes slow
- **Mitigation**: Could migrate to CoreData if needed

## Future Enhancements

### Potential Improvements
1. **iCloud Sync**: Sync saved items across user devices
2. **Notes**: Allow users to add personal notes to saved items
3. **Tags**: Categorize saved items with custom tags
4. **Export**: Share saved items list with others
5. **Search**: Filter saved items by title or content
6. **Reordering**: Manual drag-to-reorder pinned items
7. **Smart Collections**: "Frequently Accessed", "Recently Added", etc.

### Technical Debt
- Consider CoreData for more complex querying
- Add analytics to track feature usage
- Implement undo/redo for accidental removals
- Add haptic feedback for bookmark actions

## Testing Strategy

### Unit Tests (Recommended)
- Test `SavedItemsManager.toggleSave()` logic
- Test `autoSaveLastViewed()` behavior
- Test persistence and loading from UserDefaults
- Test deduplication logic

### UI Tests (Recommended)
- Test bookmark button interaction
- Test navigation from SavedTabView
- Test remove functionality
- Test empty state display

### Manual Testing
See `TESTING_SAVED_PAGES.md` for comprehensive manual test cases.

## Related Files

### New Files
- `ios/LogicProCheatSheets/LogicProCheatSheets/Services/SavedItemsManager.swift`
- `ios/LogicProCheatSheets/LogicProCheatSheets/Views/SavedTabView.swift`

### Modified Files
- `ios/LogicProCheatSheets/LogicProCheatSheets/Views/MainTabView.swift`
- `ios/LogicProCheatSheets/LogicProCheatSheets/Views/SheetDetailView.swift`
- `ios/LogicProCheatSheets/LogicProCheatSheets.xcodeproj/project.pbxproj`

## Dependencies

### System Frameworks
- SwiftUI (UI framework)
- Foundation (UserDefaults, JSON encoding)
- Combine (via @Published properties)

### Project Dependencies
- ContentModels (CheatSheet, TrainingLesson types)
- Existing view components (navigation, cards)

No external third-party dependencies required.

## Security & Privacy

### Data Privacy
- All data stored locally on device
- No data transmitted to servers
- No sensitive information stored (only titles and IDs)
- User can delete saved items at any time

### Permissions
- No special iOS permissions required
- No access to user's photos, contacts, etc.
- No background app refresh needed

## Localization

### Current Status
- All UI strings in English
- Time-ago display in English ("5m ago", "2h ago")

### Future Localization
If localizing:
- Use `NSLocalizedString` for all user-facing text
- Format dates/times with locale-aware formatters
- Consider RTL layout for Arabic/Hebrew

## Accessibility

### Current Support
- Uses SF Symbols for icons (automatically scaled)
- Semantic labels on navigation elements
- SwiftUI's built-in accessibility features
- Dynamic Type support via `.font()` modifiers

### Recommendations
- Add custom `.accessibilityLabel()` to bookmark buttons
- Add `.accessibilityHint()` for remove buttons
- Test with VoiceOver
- Ensure sufficient color contrast

## Code Style

### Conventions Used
- SwiftUI declarative syntax
- Computed properties for derived state
- Private helper methods for view composition
- Consistent naming: `saved`, `pinned`, `lastViewed`
- 4-space indentation
- Clear separation of concerns

### Swift Features Used
- Codable for serialization
- Enums with associated values
- Property wrappers (@Published, @StateObject)
- Optionals with guard/if-let
- Computed properties
- Closures for button actions

## Summary

This implementation provides a complete, production-ready saved pages feature that:
- ✅ Allows users to bookmark chapters and lessons
- ✅ Auto-saves the last viewed page
- ✅ Provides quick resume with "Pick up where you left off"
- ✅ Persists across app launches
- ✅ Integrates seamlessly with existing UI
- ✅ Follows iOS design patterns and SwiftUI best practices
- ✅ Requires no external dependencies
- ✅ Is performant and scalable for typical usage

The feature is ready for testing and deployment to TestFlight or App Store.
