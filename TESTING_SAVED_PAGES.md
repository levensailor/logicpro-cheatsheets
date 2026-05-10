# Testing the Saved Pages Feature

This document provides testing instructions for the new saved pages functionality in the Logic Pro GURU iOS app.

## Feature Overview

The saved pages feature allows users to:
1. **Bookmark** chapters and lessons for quick access
2. **Auto-save** the last viewed page when exiting
3. **Quick resume** with "Pick up where you left off" section
4. **Manage** saved items with easy removal

## Testing Instructions

### Prerequisites
- Open the project in Xcode
- Run the app on a simulator or physical device

### Test Case 1: Bookmark a Chapter
1. Launch the app
2. Navigate to the **Library** tab
3. Select any chapter (e.g., "Bass Guitar Mixing")
4. Tap the **bookmark icon** in the top-right corner
5. The icon should fill with yellow color
6. Navigate to the **Saved** tab
7. Verify the chapter appears in the "Pinned" section

**Expected Result**: The bookmarked chapter appears in the Saved tab with its icon, title, and subtitle.

### Test Case 2: Bookmark a Training Lesson
1. Navigate to the **Train** tab
2. Select any lesson (e.g., "Your First Mix")
3. Tap the **bookmark icon** in the top-right corner
4. The icon should fill with yellow color
5. Navigate to the **Saved** tab
6. Verify the lesson appears in the "Pinned" section

**Expected Result**: The bookmarked lesson appears in the Saved tab alongside any previously bookmarked chapters.

### Test Case 3: Auto-Save Last Viewed Page
1. Navigate to the **Library** tab
2. Open any chapter
3. Scroll through the content
4. Navigate back or switch to another tab
5. Go to the **Saved** tab
6. Look for the "Pick up where you left off" section

**Expected Result**: The chapter you just viewed appears in the "Pick up where you left off" section with a timestamp (e.g., "Just now", "5m ago").

### Test Case 4: Remove a Saved Item
1. Go to the **Saved** tab
2. Find a pinned item
3. Tap the **X button** on the right side of the item
4. The item should be removed from the list

**Expected Result**: The item is immediately removed from the Pinned section.

### Test Case 5: Navigate from Saved Tab
1. Go to the **Saved** tab
2. Tap on any saved item (from either section)
3. Verify you're navigated to the full chapter/lesson view
4. The bookmark icon should show as filled (yellow)

**Expected Result**: Seamless navigation to the bookmarked content with the bookmark state preserved.

### Test Case 6: Persistence Across App Launches
1. Bookmark several chapters and lessons
2. View a chapter to trigger auto-save
3. **Force quit** the app (swipe up from app switcher)
4. Relaunch the app
5. Navigate to the **Saved** tab

**Expected Result**: All bookmarked items and the last viewed page should persist across app launches.

### Test Case 7: Unbookmark an Item
1. Navigate to a bookmarked chapter or lesson
2. Tap the **bookmark icon** in the toolbar
3. The icon should change from filled to outline
4. Navigate to the **Saved** tab
5. Verify the item is removed from the Pinned section

**Expected Result**: Unbookmarking removes the item from the Saved tab.

### Test Case 8: Empty State
1. Remove all pinned items from the Saved tab
2. Verify the empty state appears with:
   - "No pinned items yet" message
   - Helpful description text
   - "Browse Library" button

**Expected Result**: Friendly empty state with a call-to-action to browse the library.

### Test Case 9: Multiple Items Management
1. Bookmark 5-10 different chapters and lessons
2. View several different items to update "last viewed"
3. Go to the Saved tab
4. Verify all items are displayed correctly
5. Test scrolling if needed

**Expected Result**: All saved items display correctly with proper icons, titles, and organization.

### Test Case 10: Time Display Accuracy
1. View a chapter to save it
2. Immediately check the Saved tab (should show "Just now")
3. Wait 2 minutes and refresh by navigating away and back
4. Check the time display (should show "2m ago")

**Expected Result**: Time-ago display updates appropriately based on when the item was last viewed.

## Known Behaviors

- **Last Viewed Priority**: The most recently viewed item appears in "Pick up where you left off", even if it was already pinned
- **Duplicate Prevention**: Bookmarking an already-bookmarked item will unbookmark it
- **Icon Display**: Training lessons show their symbol icon, chapters show their emoji icon
- **Sort Order**: Pinned items appear in reverse chronological order (most recently saved first)

## Potential Edge Cases

1. **Rapid Navigation**: Quickly switching between multiple pages
2. **Background App**: What happens when app goes to background
3. **Memory Warnings**: Behavior under low memory conditions
4. **iCloud Sync**: Currently saves locally only, not synced across devices
5. **Large Numbers**: Performance with 50+ saved items

## Reporting Issues

If you encounter any bugs or unexpected behavior, please note:
- Device/simulator used
- iOS version
- Exact steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

Report issues to the Linear issue tracker with tag `saved-pages`.
