# Compression Article Summary (LEV-8)

## Article Metrics
- **Word Count**: ~3,781 words (requirement: 2,000+) ✅
- **Visual References**: 15 plugin images (requirement: 10+) ✅
- **Route**: `/articles/compression`

## Requirements Coverage

### Required Terms (All Covered ✅)
1. **Attack** - Comprehensive explanation with fast/medium/slow attack times and their effects
2. **Release** - Detailed coverage of release times and auto-release functionality
3. **Knee** - Hard vs. soft knee explained with compressor type examples
4. **Ratio** - Common ratio ranges (1.5:1 to 20:1+) with usage guidelines
5. **Threshold** - How threshold works and finding the sweet spot
6. **Dynamic Range** - Explanation of dynamic range reduction and modern loudness standards
7. **Makeup Gain** - Level compensation and matched loudness comparison
8. **Transient** - Transient response and compression relationship explained

### Popular Compression Plugins (Hardware Emulation vs. Net New)

#### Hardware Emulations:
- **UAD 1176** (FET) - Fast, aggressive, colorful
- **Waves CLA-76** (FET) - Chris Lord-Alge signature sound
- **LA-2A/LA-3A** (Optical) - Smooth, natural leveling
- **SSL Bus Compressor** (VCA) - Mix glue standard
- **UAD SSL 4000 G** (VCA) - Console channel compression
- **Waves SSL G-Master** (VCA) - Bus compression
- **API 2500** (VCA) - Punchy bus compression
- **Waves API 2500** - API tone emulation
- **Fairchild 670** (Variable-Mu) - Vintage tube warmth
- **Manley Variable Mu** (Variable-Mu) - Modern tube compression
- **Empirical Labs Distressor** - Modern hybrid

#### Net New Digital:
- **FabFilter Pro-C 2/3** - Multiple compression styles, visual feedback
- **FabFilter Pro-MB** - Multiband compression
- **Dynamic EQ** (Pro-Q 3) - Modern alternative to multiband
- **Waves MV2** - Upward compression

### Common Settings Per Instrument

#### Vocals
- First stage: Optical, 2-4:1, medium attack/release, 3-5 dB GR
- Second stage: FET, 3-6:1, faster attack, 2-4 dB GR
- De-essing: Multiband 5-8 kHz

#### Bass Guitar
- DI leveling: Optical/VCA, 3-6:1, medium attack, 3-6 dB GR
- Parallel compression: 8:1+, fast attack, fast release

#### Kick Drum
- Punch: 3-6:1, 10-30 ms attack, groove-timed release, 2-6 dB GR

#### Snare Drum
- Standard: 3-6:1, 10-30 ms attack, 50-150 ms release, 3-6 dB GR
- Parallel option: 10:1+, fast attack/release

#### Drum Overheads
- Gentle: 2-4:1, 20-40 ms attack, auto/medium release, 2-4 dB GR

#### Drum Bus
- SSL-style: 4:1, slow attack, auto release, 2-4 dB GR

#### Electric Guitar
- Light leveling: 2-4:1, medium attack, auto release, 2-3 dB GR

#### Mix Bus
- SSL VCA: 2-4:1, 30 ms attack, auto release, 1-3 dB GR max
- Variable-mu: 1.5-2:1, slower response, 1-2 dB GR

### Expert Opinions from Famous Engineers

#### Butch Vig (Nirvana, Garbage, Foo Fighters)
- Compress drums and bass heavily for foundation
- Leave guitars and vocals more dynamic
- Pioneer of parallel compression on drums
- Quote: "The best mixes breathe... contrast between controlled and dynamic elements creates impact"

#### Andrew Scheps (Red Hot Chili Peppers, Adele, Metallica)
- Minimal compression philosophy
- Surgical approach - solve specific problems
- Quote: "I use way less compression than people think"

#### Chris Lord-Alge (Green Day, Muse, Foo Fighters)
- Aggressive serial compression (3-4 stages on vocals)
- 3-5 dB GR per stage
- Quote: "Rock and pop vocals need to be in your face"

#### Bob Clearmountain (Bruce Springsteen, The Rolling Stones)
- Mix into SSL bus compressor
- 2-3 dB compression maximum on mix bus
- Quote: "The subtle pumping on the backbeat became part of my sound"

#### Sylvia Massy (Tool, System of a Down)
- Creative, unconventional compression techniques
- Use compression as effect
- Quote: "If it sounds good, it is good"

### Advanced Techniques Covered
1. **Parallel Compression** (New York style)
2. **Sidechain Compression** (ducking and rhythmic pumping)
3. **Serial Compression** (multiple stages)
4. **Upward Compression** (raising quiet signals)

### Common Mistakes Section
1. Compressing without reason
2. Comparing at unmatched levels
3. Over-compressing the mix bus
4. Ignoring attack and release
5. Using wrong type of compressor

## Visual References (15 Images)

### Main Article Images:
1. FabFilter Pro-C 3 (ratio/threshold controls)
2. UAD 1176 (FET hard-knee response)
3. Waves CLA-76 (classic 1176)
4. Waves API 2500 (bus compression)
5. Waves SSL G-Master (mix bus glue)
6. UAD SSL 4000 G (channel strip)
7. FabFilter Saturn 2 (saturation complement)
8. Soundtoys Decapitator (analog warmth)
9. UAD Precision Limiter (peak control)

### Recommended Plugins Grid:
10. FabFilter Pro-C 3
11. UAD 1176
12. Waves CLA-76
13. Waves API 2500
14. UAD SSL 4000 G
15. Waves SSL G-Master

## Technical Implementation

### File Structure
- `/app/articles/compression/page.tsx` - Article component
- `/app/globals.css` - Article styling (lines 1503-1777)
- `/app/page.tsx` - Added article link to home page

### Styling Features
- Responsive design (desktop/tablet/mobile)
- Dark mode support
- Article sections with proper hierarchy
- Image wrappers with captions
- Blockquote styling for engineer quotes
- Plugin grid layout
- Back navigation links

### Integration
- Added to home page feature grid as "In-Depth Articles"
- Internal links to related sheets (vocals, bass, kick, drums, plugins)
- Maintains site navigation and footer
- SEO metadata included

## Build Status
✅ Successfully builds with Next.js 16.2.4 Turbopack
✅ Static page generation confirmed
✅ All dependencies installed
✅ No TypeScript errors

## PR Information
- **Branch**: `cursor/compression-article-d532`
- **PR**: #5
- **Status**: Ready for review
- **Link**: https://github.com/levensailor/logicpro-cheatsheets/pull/5

## Testing Checklist
- [x] Article renders at `/articles/compression`
- [x] All 15 plugin images load properly
- [x] Article styling matches site aesthetic
- [x] Responsive design works
- [x] Dark mode styling applied
- [x] Internal links functional
- [x] Navigation works correctly
- [x] Build succeeds without errors
- [x] Static generation confirmed
