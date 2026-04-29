# Screenshot Specifications for "Your First Mix" Guide

This document specifies the 8 annotated screenshots needed for the expanded iOS training lesson. Each screenshot should be captured from Logic Pro, annotated with arrows and callouts, and saved to the appropriate assets folder.

## Screenshot Storage Location
- **iOS**: `ios/LogicProCheatSheets/LogicProCheatSheets/Assets.xcassets/TrainingScreenshots.imageset/`
- **Web**: `public/assets/training/`

## Annotation Style Guide
- Use red arrows to point to specific controls
- Use yellow callout boxes with black text for labels
- Keep text concise (2-5 words per label)
- Use a consistent font (San Francisco or system font)
- Ensure text is readable at iPhone display size
- Use dark mode compatible colors (avoid pure white backgrounds)

---

## Screenshot 1: Goal Setting (step1_goal_setting)
**Display in Step**: 1 - Understand Your Goal

### Content
Split-screen comparison showing:
- **Left side**: Clean, organized Logic Pro session
  - Well-named tracks (Kick, Snare, Bass, etc.)
  - Color-coded tracks by group
  - Clear arrangement with markers
  - Clean mixer view

- **Right side**: Cluttered, disorganized session
  - Tracks named "Audio 1", "Audio 2", etc.
  - No color coding
  - Messy arrangement
  - Overloaded mixer

### Annotations
- Left side: Label "Organized = Mixable"
- Right side: Label "Cluttered = Confusing"
- Arrow pointing to clean track headers: "Clear names"
- Arrow pointing to colored tracks: "Color groups"

### Capture Instructions
1. Create two duplicate Logic projects
2. Organize one perfectly, leave the other messy
3. Use Split View or capture side-by-side
4. Export at 1200x800 minimum resolution

---

## Screenshot 2: Project Settings (step2_project_settings)
**Display in Step**: 2 - Project Setup

### Content
Logic Pro Project Settings dialog showing:
- File > Project Settings > Audio window
- Sample Rate dropdown showing 44.1 kHz selected
- Bit Depth dropdown showing 24-bit selected
- I/O Buffer Size showing 256 samples

### Annotations
- Arrow to Sample Rate: "44.1 kHz (CD standard)"
- Arrow to Bit Depth: "24-bit (better dynamic range)"
- Callout box: "Match your source files!"
- Text at bottom: "Higher isn't always better"

### Capture Instructions
1. Open Logic Pro
2. Go to File > Project Settings > Audio (Option+Command+J)
3. Set Sample Rate to 44.1 kHz
4. Set Bit Depth to 24-bit
5. Capture the dialog window

---

## Screenshot 3: Organized Tracks (step3_organized_tracks)
**Display in Step**: 3 - Import & Organize

### Content
Logic Pro Track Headers showing:
- Yellow tracks: Kick, Snare, Hi-Hat, Toms (drums)
- Orange track: Bass
- Green tracks: Gtr L, Gtr R, Acoustic
- Blue tracks: Lead Vox, BVox L, BVox R
- Purple tracks: Synth, Piano

### Annotations
- Yellow section: "Drums = Yellow"
- Orange track: "Bass = Orange"
- Green section: "Guitars = Green"
- Blue section: "Vocals = Blue"
- Overall label: "Colors tell the story"

### Capture Instructions
1. Create a session with 12-15 tracks
2. Name them clearly with the specified names
3. Color by group (Option+C for color picker)
4. Capture the track headers area only
5. Ensure track names are clearly visible

---

## Screenshot 4: Gain Staging (step4_gain_staging)
**Display in Step**: 4 - Gain Staging

### Content
Logic Pro Mixer view showing:
- Multiple tracks with faders at unity (0 dB)
- Track meters showing activity
- Stereo Out meter showing -6 dBFS peak
- No red clipping indicators

### Annotations
- Arrow to track meters: "-12 to -6 dBFS per track"
- Arrow to Stereo Out: "-6 dBFS on master"
- Green zone indicator: "Safe zone"
- Red zone indicator: "Avoid clipping!"
- Text: "Headroom = creative space"

### Capture Instructions
1. Open Mixer (Command+2)
2. Set all faders to 0 dB (Option+Click to reset)
3. Play a section with good level balance
4. Capture when Stereo Out shows around -6 dBFS
5. Highlight the master meter prominently

---

## Screenshot 5: Anchor Mixing (step5_anchor_mixing)
**Display in Step**: 5 - The Anchor Method

### Content
Logic Pro Mixer view highlighting the anchor instruments:
- Kick drum fader raised (foundation level)
- Snare fader raised to match
- Bass fader positioned
- Vocal fader prominent
- Other instruments lower in the background

### Annotations
- Arrow to Kick: "Start here (foundation)"
- Arrow to Snare: "Lock with kick"
- Arrow to Bass: "Harmonic anchor"
- Arrow to Vocal: "Lead anchor"
- Dotted lines showing: "Build around these"

### Capture Instructions
1. In Mixer view, pull all faders down
2. Raise kick to reference level
3. Balance snare, bass, and vocal against it
4. Keep other instruments subtly present
5. Capture the fader positions clearly

---

## Screenshot 6: Panning (step6_panning)
**Display in Step**: 6 - Creating Width

### Content
Logic Pro Mixer or Track view showing pan positions:
- Kick: Center (0)
- Snare: Center (0)
- Bass: Center (0)
- Lead Vocal: Center (0)
- Gtr L: -30 (left)
- Gtr R: +30 (right)
- Overheads: Full stereo (L/R)

### Visual Overlay
Add a stereo field visualization:
- Left edge: "L"
- Right edge: "R"
- Center: "CENTER"
- Positions marked with dots for each instrument

### Annotations
- Center cluster: "Anchors stay center"
- Left guitar: "Rhythm left"
- Right guitar: "Rhythm right"
- Text: "Think stage, not random"

### Capture Instructions
1. Show the pan knobs in Mixer view
2. Position as specified
3. Add stereo field diagram as overlay
4. Use visual lines to connect pans to field positions

---

## Screenshot 7: Channel EQ (step9_channel_eq)
**Display in Step**: 9 - EQ Basics

### Content
Logic Pro Channel EQ plugin showing:
- High-pass filter enabled (Band 1) at 100 Hz
- Analyzer turned on showing frequency spectrum
- Possible gentle cut around 300 Hz
- HQ button visible
- Analyzer display showing frequency curve

### Annotations
- Arrow to Band 1: "High-pass filter (100 Hz)"
- Arrow to Analyzer: "See the frequencies"
- Callout on curve: "Cut mud here (200-400 Hz)"
- Text: "Cut problems, don't boost everything"

### Capture Instructions
1. Open Channel EQ on a vocal or guitar track
2. Enable high-pass filter, set to 100 Hz
3. Turn on Analyzer
4. Show gentle cuts rather than boosts
5. Capture the EQ interface clearly

---

## Screenshot 8: Compressor (step10_compressor)
**Display in Step**: 10 - Compression

### Content
Logic Pro Compressor plugin showing:
- Circuit Type: Platinum Digital
- Ratio: 3:1
- Threshold set for 4 dB gain reduction
- Attack: 25 ms
- Release: 100 ms
- Gain Reduction meter showing activity
- Visual graph display enabled

### Annotations
- Arrow to Ratio: "3:1 (moderate)"
- Arrow to Gain Reduction meter: "4 dB reduction"
- Arrow to Attack: "25ms (preserves punch)"
- Text overlay: "Watch the meter move with the music"

### Capture Instructions
1. Open Compressor on a vocal or drum track
2. Set Platinum Digital mode
3. Configure settings as specified
4. Play audio to show gain reduction meter moving
5. Capture at a moment where meter shows activity

---

## Screenshot 9: Final Check (step12_final_check)
**Display in Step**: 12 - Final Verification

### Content
Multi-panel showing verification checks:
- Top: Master meter at safe level (-6 dBFS)
- Middle left: Mono button engaged
- Middle right: Different volume levels indicated
- Bottom: Checklist items visible

### Annotations
- "Low volume test"
- "Mono check"
- "Headroom verified"
- "No clipping"
- Green checkmarks next to each

### Capture Instructions
1. Create composite image showing multiple verification states
2. Show master meter in green zone
3. Show mono button engaged
4. Include visual checklist
5. Use green checkmarks for passed items

---

## Screenshot 10: Bounce Dialog (step13_bounce)
**Display in Step**: 13 - Bounce

### Content
Logic Pro Bounce dialog showing:
- File > Bounce > Project or Section window
- PCM selected
- 24-bit depth selected
- Sample rate matching project
- Include Audio Tail checkbox enabled
- Offline mode selected

### Annotations
- Arrow to Format: "PCM (not MP3)"
- Arrow to Bit Depth: "24-bit archive quality"
- Arrow to Include Tail: "Capture reverb!"
- Text: "Verify after bouncing"

### Capture Instructions
1. Set cycle range to include song plus tails
2. Open Bounce dialog (Command+B)
3. Select PCM, 24-bit
4. Enable Include Audio Tail
5. Capture the dialog clearly

---

## Total Screenshots Required

| Number | Filename | Step | Priority |
|--------|----------|------|----------|
| 1 | step1_goal_setting | Step 1 | High |
| 2 | step2_project_settings | Step 2 | High |
| 3 | step3_organized_tracks | Step 3 | High |
| 4 | step4_gain_staging | Step 4 | High |
| 5 | step5_anchor_mixing | Step 5 | Medium |
| 6 | step6_panning | Step 6 | Medium |
| 7 | step9_channel_eq | Step 9 | High |
| 8 | step10_compressor | Step 10 | High |
| 9 | step12_final_check | Step 12 | Medium |
| 10 | step13_bounce | Step 13 | High |

**Note**: The guide references 8 screenshots, but the specification includes 10. Use the 8 high/medium priority first (excluding step5 and step12 if needed).

## Tools for Annotation
- **Mac**: Preview (built-in), Skitch, or Affinity Designer
- **Annotation colors**:
  - Red arrows: `#FF3B30`
  - Yellow callouts: `#FFCC00`
  - Green highlights: `#34C759`
  - Text: Black on light backgrounds, white on dark

## Final Checklist
- [ ] All screenshots captured at 2x resolution (Retina)
- [ ] Annotations are readable at iPhone display size
- [ ] File names match exactly (case-sensitive)
- [ ] Both PNG versions created (iOS assets + web)
- [ ] Dark mode compatibility verified
- [ ] No personal or copyrighted material visible
