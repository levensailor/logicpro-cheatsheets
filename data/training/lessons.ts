import type { TrainingLesson } from "@/lib/sheet-schema";

export const trainingLessons: TrainingLesson[] = [
  {
    id: "your-first-mix",
    title: "Your First Mix",
    series: "Beginner Mixing Series",
    summary:
      "A comprehensive step-by-step guide from raw tracks to a clean, bounce-ready mix. Built for beginners who want a repeatable first-mix workflow.",
    duration: "20 min read",
    symbolName: "slider.horizontal.3",
    badges: ["New", "Popular", "Beginner"],
    isFeatured: true,
    checklist: [
      "Set a realistic goal: balanced and exportable beats perfect.",
      "Match sample rate/bit depth to your session needs.",
      "Organize and color-code tracks before mixing.",
      "Gain stage for headroom before processing.",
      "Build balances with anchors first: kick, snare, bass, vocal.",
      "Use panning and buses to create space and cohesion.",
      "Apply EQ/compression in small, intentional moves.",
      "Run mono and low-volume checks before bounce.",
      "Export 24-bit WAV/AIFF and verify the bounced file."
    ],
    steps: [
      {
        number: 1,
        title: "Set the Mix Goal",
        concept:
          "A first mix should be clear, balanced, and shareable. It does not need mastering-level loudness.",
        actions: [
          "Save a new version before you start mixing.",
          "Define success in one sentence (for example: 'all parts are audible and balanced').",
          "Plan to make small moves and compare often."
        ],
        body:
          "Starting with the right expectation keeps decision-making simple. Beginners improve faster by finishing clean mixes than by chasing perfection.",
        symbolName: "target",
        visualTitle: "Goal Setting",
        visualCaption: "Balance first. Polish later.",
        settings: null,
        proTip:
          "Name versions with dates so you can roll back confidently if an experiment goes wrong.",
        avoidThis:
          "Do not judge your first mix against mastered commercial references at matched loudness.",
        checkYourWork:
          "You can clearly explain what you are optimizing for before touching plugins.",
        stepScreenshot: "/assets/training/your-first-mix/step1_goal_setting.png"
      },
      {
        number: 2,
        title: "Project Setup",
        concept:
          "Correct sample rate and bit depth prevent avoidable quality and compatibility issues.",
        actions: [
          "Open Project Settings > Audio.",
          "Choose 44.1 kHz for music-first projects or 48 kHz for video workflows.",
          "Use 24-bit depth for tracking/mixing sessions."
        ],
        body:
          "Matching project settings to source material reduces conversion artifacts and confusion when exporting later.",
        symbolName: "gearshape.2",
        visualTitle: "Technical Setup",
        visualCaption: "Match source. Use 24-bit.",
        settings: {
          "Sample Rate": "44.1 kHz or 48 kHz",
          "Bit Depth": "24-bit",
          "Buffer (mixing)": "128-256 samples"
        },
        proTip: "Pick one sample rate per project and stay consistent through the session.",
        avoidThis: "Avoid upsampling recordings purely for bigger numbers.",
        checkYourWork: "No sample-rate mismatch warnings appear in the session.",
        stepScreenshot: "/assets/training/your-first-mix/step2_project_settings.png"
      },
      {
        number: 3,
        title: "Organize Tracks",
        concept:
          "Clean naming and color grouping reduce cognitive load and speed up every mixing decision.",
        actions: [
          "Rename tracks to musical roles.",
          "Color by group (drums, bass, guitars, vocals, FX).",
          "Place related tracks together."
        ],
        body:
          "A readable session is one of the highest-leverage improvements for beginner mixers.",
        symbolName: "folder.fill",
        visualTitle: "Session Layout",
        visualCaption: "Readable sessions mix faster.",
        settings: {
          "Drums": "Yellow",
          "Bass": "Orange",
          "Guitars": "Green",
          "Vocals": "Blue"
        },
        proTip: "Use group naming prefixes when sessions get large.",
        avoidThis: "Avoid generic names like 'Audio 14' in finished sessions.",
        checkYourWork: "Another person can quickly identify each track family by name/color.",
        stepScreenshot: "/assets/training/your-first-mix/step3_organized_tracks.png"
      },
      {
        number: 4,
        title: "Gain Staging",
        concept:
          "Healthy input levels preserve headroom and improve plugin behavior across the chain.",
        actions: [
          "Aim for track peaks around -12 to -6 dBFS.",
          "Keep the stereo output below clipping with working headroom.",
          "Use clip gain to tame hot recordings before inserts."
        ],
        body:
          "Fader balance is easier and cleaner when sources enter the mix bus at consistent, controlled levels.",
        symbolName: "waveform",
        visualTitle: "Level Foundation",
        visualCaption: "Headroom keeps mixes stable.",
        settings: {
          "Track Peaks": "-12 to -6 dBFS",
          "Master Peak Goal": "-6 dBFS pre-master"
        },
        proTip: "Fix level problems early with region gain before adding processors.",
        avoidThis: "Do not rely on the master fader to hide clipping on channel strips.",
        checkYourWork: "No red overload indicators appear during the loudest section.",
        stepScreenshot: "/assets/training/your-first-mix/step4_gain_staging.png"
      },
      {
        number: 5,
        title: "Build a Rough Balance",
        concept:
          "Anchoring the mix around key elements creates a stable center for all other decisions.",
        actions: [
          "Bring up kick, snare, bass, and lead vocal first.",
          "Add supporting parts around that anchor.",
          "Check rough balance in mono for 30 seconds."
        ],
        body:
          "A good rough balance dramatically reduces how much processing you need later.",
        symbolName: "anchor",
        visualTitle: "Anchor Method",
        visualCaption: "Core elements first.",
        settings: null,
        proTip: "Balance in context; avoid solo-based level decisions.",
        avoidThis: "Do not polish individual tracks before the whole mix works together.",
        checkYourWork: "Core elements remain audible and musical when all tracks play.",
        stepScreenshot: "/assets/training/your-first-mix/step5_anchor_mixing.png"
      },
      {
        number: 6,
        title: "Pan for Width",
        concept:
          "Thoughtful stereo placement improves clarity and separation without extra processing.",
        actions: [
          "Keep kick/snare/bass/lead vocal centered.",
          "Pan supporting instruments in complementary pairs.",
          "Re-check mono compatibility after big pan moves."
        ],
        body:
          "Stereo image should support arrangement roles and leave center space for foundational elements.",
        symbolName: "arrow.left.arrow.right",
        visualTitle: "Stereo Field",
        visualCaption: "Center anchors, spread support.",
        settings: {
          "Lead Vocal": "Center",
          "Rhythm Guitars": "Approx. -30 / +30"
        },
        proTip: "Use narrower panning first, then widen only where needed.",
        avoidThis: "Avoid extreme panning as a default choice.",
        checkYourWork: "Mono fold-down remains balanced and intelligible.",
        stepScreenshot: "/assets/training/your-first-mix/step6_panning.png"
      },
      {
        number: 7,
        title: "Route Buses and Sends",
        concept:
          "Shared processing creates cohesion and saves CPU compared to per-track duplicate effects.",
        actions: [
          "Create subgroup buses for major instrument families.",
          "Set up shared reverbs/delays on aux sends.",
          "Use bus faders for musical group control."
        ],
        body:
          "Bus routing helps your mix feel unified because elements share common spaces and dynamics behavior.",
        symbolName: "point.3.filled.connected.trianglepath.dotted",
        visualTitle: "Routing",
        visualCaption: "Groups + shared FX = cohesion.",
        settings: {
          "Drum Bus": "All drum channels",
          "Vocal Reverb Send": "Start low, increase to taste"
        },
        proTip: "Start with two reverbs max; expand only if the arrangement requires it.",
        avoidThis: "Avoid inserting separate reverbs on every channel by default.",
        checkYourWork: "Shared FX buses contain signal from multiple relevant sources.",
        stepScreenshot: null
      },
      {
        number: 8,
        title: "Critical Listening Pass",
        concept:
          "Audit before processing so your next moves solve real problems, not imagined ones.",
        actions: [
          "Listen quietly: can you still hear lead elements?",
          "Listen at moderate level: note harshness or mud zones.",
          "Capture a short written issue list."
        ],
        body:
          "Intentional listening turns mixing into clear problem-solving instead of random plugin usage.",
        symbolName: "ear",
        visualTitle: "Problem List",
        visualCaption: "Diagnose before treatment.",
        settings: null,
        proTip: "Use one reference track in the same genre as a tonal compass.",
        avoidThis: "Do not add processing without a specific listening reason.",
        checkYourWork: "You have a short list of concrete issues to address next.",
        stepScreenshot: null
      },
      {
        number: 9,
        title: "Apply Corrective EQ",
        concept:
          "Targeted cuts often produce more clarity than broad boosts across many channels.",
        actions: [
          "High-pass non-bass-heavy sources where appropriate.",
          "Reduce mud around 200-400 Hz on offending tracks.",
          "Use narrow cuts for isolated resonances."
        ],
        body:
          "Corrective EQ is most effective when subtle and contextual. Compare bypass frequently.",
        symbolName: "waveform.path.ecg",
        visualTitle: "EQ Cleanup",
        visualCaption: "Cut problems first.",
        settings: {
          "Mud Zone": "200-400 Hz",
          "Vocal HPF Start": "80-120 Hz"
        },
        proTip: "Sweep with a temporary narrow boost to find harsh frequencies, then cut gently.",
        avoidThis: "Avoid large boosts on every track as a default move.",
        checkYourWork: "Bypass comparison confirms increased clarity, not just loudness change.",
        stepScreenshot: "/assets/training/your-first-mix/step9_channel_eq.png"
      },
      {
        number: 10,
        title: "Control Dynamics with Compression",
        concept:
          "Compression shapes consistency and groove when applied with moderate settings.",
        actions: [
          "Set ratio and threshold for gentle gain reduction.",
          "Tune attack/release to preserve musical transients.",
          "Level-match before/after for honest judgment."
        ],
        body:
          "The goal is control and cohesion, not flattening life out of the performance.",
        symbolName: "arrow.down.circle.fill",
        visualTitle: "Dynamic Control",
        visualCaption: "Moderate reduction, musical timing.",
        settings: {
          "Typical Ratio": "2:1 to 4:1",
          "Gain Reduction": "2-6 dB peaks"
        },
        proTip: "Watch the gain-reduction meter move with phrasing, not constantly pinned.",
        avoidThis: "Avoid heavy compression on every track.",
        checkYourWork: "Track feels more consistent while retaining punch and movement.",
        stepScreenshot: "/assets/training/your-first-mix/step10_compressor.png"
      },
      {
        number: 11,
        title: "Resolve Common Mix Problems",
        concept:
          "Fix recurring beginner issues directly: masking, sibilance, muddy lows, and harsh buildup.",
        actions: [
          "Create low-end separation between kick and bass.",
          "Tame vocal sibilance with de-essing.",
          "Use automation for phrase-level intelligibility."
        ],
        body:
          "Efficient troubleshooting is a core skill that improves every future session.",
        symbolName: "wrench.and.screwdriver.fill",
        visualTitle: "Troubleshooting",
        visualCaption: "Identify, isolate, resolve.",
        settings: {
          "De-Esser Focus": "6-10 kHz",
          "Low-End Separation": "Kick/Bass complementary EQ"
        },
        proTip: "If large EQ moves fail, revisit arrangement overlap and automation first.",
        avoidThis: "Do not over-process to hide arrangement conflicts.",
        checkYourWork: "Problem sections improve without introducing new artifacts.",
        stepScreenshot: null
      },
      {
        number: 12,
        title: "Pre-Bounce Verification",
        concept:
          "A short final checklist catches translation and clipping issues before export.",
        actions: [
          "Run low and medium volume checks.",
          "Run mono compatibility check.",
          "Confirm master headroom and song range includes tails."
        ],
        body:
          "Two minutes of verification prevents avoidable re-exports and confidence loss.",
        symbolName: "checklist",
        visualTitle: "Final Check",
        visualCaption: "Volume, mono, headroom.",
        settings: {
          "Master Peak": "At or below -6 dBFS pre-master"
        },
        proTip: "Test a short bounce on phone earbuds before full delivery export.",
        avoidThis: "Avoid final decisions on a single playback system only.",
        checkYourWork: "Mix translates across at least two playback contexts before final bounce.",
        stepScreenshot: "/assets/training/your-first-mix/step12_final_check.png"
      },
      {
        number: 13,
        title: "Bounce and Verify Export",
        concept:
          "Correct export settings preserve your work and avoid delivery surprises.",
        actions: [
          "Bounce WAV/AIFF at project sample rate, 24-bit.",
          "Include full tail range.",
          "Re-import and audition the bounced file."
        ],
        body:
          "Your bounce is the deliverable artifact. Verify it immediately before sharing.",
        symbolName: "square.and.arrow.up",
        visualTitle: "Export",
        visualCaption: "24-bit PCM, include tails.",
        settings: {
          "Format": "WAV or AIFF",
          "Bit Depth": "24-bit"
        },
        proTip: "Keep master archives in lossless format; create MP3/AAC only for distribution needs.",
        avoidThis: "Do not archive only compressed formats.",
        checkYourWork: "Start/middle/end playback confirms no clipping, truncation, or routing mistakes.",
        stepScreenshot: "/assets/training/your-first-mix/step13_bounce.png"
      }
    ]
  },
  {
    id: "automation-beyond-volume",
    title: "Automation: Beyond Volume",
    series: "Creative Mixing Series",
    summary:
      "Move past static faders with practical automation for tone, space, energy, and impact across a full song.",
    duration: "18 min read",
    symbolName: "waveform.and.mic",
    badges: ["New", "Creative", "Intermediate"],
    isFeatured: true,
    checklist: [
      "Map your song sections before writing any lanes.",
      "Start with broad, section-level automation before detail edits.",
      "Automate EQ, sends, and delay feedback with clear intent.",
      "Use mutes and arrangement automation for transitions.",
      "A/B with automation bypassed at matched loudness.",
      "Verify no clicks, zipper noise, or abrupt jumps.",
      "Keep anchor elements stable while featured parts move."
    ],
    steps: [
      {
        number: 1,
        title: "Plan the Automation Story",
        concept:
          "Automation works best when it supports arrangement and emotional arc, not random movement.",
        actions: [
          "Mark intro, verse, chorus, bridge, and outro boundaries.",
          "Write one sentence per section describing desired energy.",
          "Decide what should evolve: level, width, brightness, or depth."
        ],
        body:
          "A section-first plan keeps your moves musical. It also prevents over-automation that makes a mix feel unstable.",
        symbolName: "map",
        visualTitle: "Section Map",
        visualCaption: "Automate with song intent.",
        settings: null,
        proTip:
          "Duplicate your un-automated mix pass to compare quickly after major writes.",
        avoidThis: "Do not start by drawing tiny moves on every track.",
        checkYourWork:
          "You can explain what each section should feel like before touching a lane.",
        stepScreenshot: null
      },
      {
        number: 2,
        title: "Write Macro Volume Passes",
        concept:
          "Large fader moves between sections usually create the biggest clarity improvements first.",
        actions: [
          "Automate lead vocal, drums, and harmonic beds by section.",
          "Lift choruses subtly (+0.5 to +1.5 dB where needed).",
          "Tuck busy support layers in dense moments."
        ],
        body:
          "Macro balances create consistent translation. Fine automation is easier once the section-level foundation is solid.",
        symbolName: "slider.horizontal.3",
        visualTitle: "Macro Dynamics",
        visualCaption: "Big moves before fine edits.",
        settings: {
          "Section Lift Range": "+0.5 to +1.5 dB",
          "Typical Vocal Ride Moves": "0.5-2 dB"
        },
        proTip: "Ride into transitions one beat early to feel more natural.",
        avoidThis: "Avoid over-riding every word before section balance is right.",
        checkYourWork:
          "Chorus impact improves without noticeably changing tone.",
        stepScreenshot: null
      },
      {
        number: 3,
        title: "Automate Tone and Presence",
        concept:
          "EQ automation can reveal detail only when needed and reduce masking in crowded sections.",
        actions: [
          "Use dynamic high-shelf or presence boosts for select phrases.",
          "Automate harsh-frequency reductions in loud moments.",
          "Reduce competing midrange on support tracks during leads."
        ],
        body:
          "Tone automation is often cleaner than static aggressive EQ because it only acts when context requires it.",
        symbolName: "waveform.path.ecg",
        visualTitle: "Tone Motion",
        visualCaption: "Contextual clarity moves.",
        settings: {
          "Presence Lift": "1-2 dB around 2-5 kHz",
          "Harshness Control": "-1 to -3 dB as needed"
        },
        proTip: "Automate broad bells or shelves first; narrow moves only when surgical.",
        avoidThis: "Do not leave aggressive boosts active for the entire song.",
        checkYourWork:
          "Lead elements stay intelligible in dense sections without sounding brittle.",
        stepScreenshot: null
      },
      {
        number: 4,
        title: "Automate Space and Width",
        concept:
          "Reverb and delay automation creates depth and excitement while preserving lyric clarity.",
        actions: [
          "Increase sends at line endings and transition points.",
          "Reduce ambience during dense passages to keep focus.",
          "Automate stereo width tools subtly between sections."
        ],
        body:
          "Space automation helps a mix breathe: drier where intelligibility matters, wetter where drama helps.",
        symbolName: "sparkles",
        visualTitle: "Depth Control",
        visualCaption: "Dry for focus, wet for drama.",
        settings: {
          "Delay Throw Send": "+2 to +6 dB on selected words",
          "Reverb Send Change": "Small, section-based adjustments"
        },
        proTip: "Automate return levels in addition to send levels for cleaner tails.",
        avoidThis: "Avoid constant high send levels that blur articulation.",
        checkYourWork:
          "Transitions feel larger without sacrificing center clarity.",
        stepScreenshot: null
      },
      {
        number: 5,
        title: "Use Automation for Ear Candy",
        concept:
          "Small feature moments make arrangements feel intentional and modern.",
        actions: [
          "Create delay throws on key words.",
          "Automate filter sweeps on intros or pre-choruses.",
          "Throw one-off mutes or stutters at turnarounds."
        ],
        body:
          "Tasteful, sparse ear-candy automation draws attention where it matters and avoids listener fatigue.",
        symbolName: "wand.and.stars",
        visualTitle: "Feature Moments",
        visualCaption: "Small moves, big identity.",
        settings: {
          "Throw Length": "1/8 to 1/2 note",
          "Filter Sweep Depth": "Gentle unless effect-driven"
        },
        proTip: "Print key effect moments to audio for easier arrangement edits.",
        avoidThis: "Do not stack multiple special effects in every section.",
        checkYourWork:
          "Feature moments are memorable but not distracting on repeat listens.",
        stepScreenshot: null
      },
      {
        number: 6,
        title: "Polish and Translate",
        concept:
          "Final automation cleanup prevents technical artifacts and keeps movement consistent across systems.",
        actions: [
          "Smooth abrupt points to avoid clicks and jumps.",
          "Check automation in mono and at low volume.",
          "Bypass all automation briefly to validate value."
        ],
        body:
          "Automation should feel like musical movement, not obvious edits. Final cleanup is essential for professional results.",
        symbolName: "checkmark.seal",
        visualTitle: "Final Pass",
        visualCaption: "Smooth, intentional, repeatable.",
        settings: null,
        proTip: "Use snapshots/screensets before major cleanup passes for safe rollback.",
        avoidThis: "Avoid leaving hidden inactive lanes with conflicting writes.",
        checkYourWork:
          "The automated mix feels more engaging and still translates cleanly.",
        stepScreenshot: null
      }
    ]
  },
  {
    id: "comprehensive-compression-guide",
    title: "Comprehensive Compression Guide",
    series: "Dynamics Mastery Series",
    summary:
      "A practical end-to-end framework for setting threshold, ratio, attack, release, and knee across vocals, drums, bass, and buses.",
    duration: "24 min read",
    symbolName: "arrow.down.circle",
    badges: ["New", "Core Skill", "Reference"],
    isFeatured: true,
    checklist: [
      "Set compression goals before touching controls.",
      "Dial threshold and ratio for targeted gain reduction.",
      "Tune attack/release to groove and transient intent.",
      "Choose compressor type based on tone and task.",
      "Level-match before/after to avoid loudness bias.",
      "Use serial or parallel only when single-stage falls short.",
      "Keep mix-bus compression subtle and intentional."
    ],
    steps: [
      {
        number: 1,
        title: "Define the Compression Job",
        concept:
          "Compression has different jobs: control peaks, add sustain, glue groups, or shape punch.",
        actions: [
          "Choose one primary objective per compressor instance.",
          "Identify whether issue is dynamics, tone, or arrangement.",
          "Set a gain-reduction target before tweaking."
        ],
        body:
          "Intent first prevents over-processing. If a track already sits well, you may not need compression at all.",
        symbolName: "target",
        visualTitle: "Purpose First",
        visualCaption: "Solve a specific problem.",
        settings: {
          "Typical GR (single stage)": "2-6 dB",
          "Mix Bus GR": "1-3 dB"
        },
        proTip: "Write down your intended result before dialing controls.",
        avoidThis: "Do not insert a compressor by default on every channel.",
        checkYourWork:
          "You can describe exactly what this compressor should improve.",
        stepScreenshot: null
      },
      {
        number: 2,
        title: "Set Threshold and Ratio",
        concept:
          "Threshold decides when compression starts; ratio decides how strongly it reacts.",
        actions: [
          "Start with moderate ratio (2:1 to 4:1) for most sources.",
          "Lower threshold until target gain reduction appears.",
          "Increase ratio only if control remains insufficient."
        ],
        body:
          "Most musical control comes from moderate settings. Extreme ratios are better reserved for effects or peak limiting.",
        symbolName: "dial.medium",
        visualTitle: "Amount of Control",
        visualCaption: "Use only what you need.",
        settings: {
          "Gentle Control": "1.5:1 to 3:1",
          "Medium Control": "4:1 to 6:1",
          "Aggressive/Parallel": "8:1+"
        },
        proTip: "If threshold is very low, reduce ratio before adding more gain reduction.",
        avoidThis: "Avoid max ratio as a first move.",
        checkYourWork:
          "Gain reduction is active but not pinned constantly unless effect-driven.",
        stepScreenshot: null
      },
      {
        number: 3,
        title: "Tune Attack and Release",
        concept:
          "Timing controls character: attack shapes transients, release shapes movement and groove.",
        actions: [
          "Use slower attack to preserve punch on drums.",
          "Use faster attack to tame sharp peaks or harsh transients.",
          "Adjust release so meter recovers musically between hits/phrases."
        ],
        body:
          "A good timing setup often matters more than ratio changes. Wrong release timing causes pumping and dullness.",
        symbolName: "metronome",
        visualTitle: "Timing = Tone",
        visualCaption: "Attack/release define feel.",
        settings: {
          "Attack (general)": "10-30 ms starting point",
          "Release (general)": "Auto or 60-200 ms"
        },
        proTip: "Set release in tempo context, not solo.",
        avoidThis: "Do not ignore timing while only chasing gain-reduction numbers.",
        checkYourWork:
          "Source feels steadier while keeping natural movement.",
        stepScreenshot: null
      },
      {
        number: 4,
        title: "Choose Topology and Knee",
        concept:
          "Compressor type changes color and behavior just as much as control settings.",
        actions: [
          "Use FET for speed/attitude, Opto for smooth leveling, VCA for punch/glue.",
          "Pick soft knee for transparent control.",
          "Use hard knee when deliberate grab is preferred."
        ],
        body:
          "Type selection narrows the sound quickly. Modern digital compressors can emulate multiple behaviors in one tool.",
        symbolName: "square.stack.3d.up.fill",
        visualTitle: "Character Choice",
        visualCaption: "Topology shapes response.",
        settings: {
          "Vocal Leveling": "Opto or soft-knee digital",
          "Drum Bus Glue": "VCA, moderate ratio"
        },
        proTip: "Swap topology before over-tweaking one unsuitable compressor.",
        avoidThis: "Avoid forcing one compressor model on every source.",
        checkYourWork:
          "The selected compressor character supports the arrangement style.",
        stepScreenshot: null
      },
      {
        number: 5,
        title: "Apply Advanced Workflows",
        concept:
          "Parallel, serial, sidechain, and multiband methods solve edge cases when single-stage compression is not enough.",
        actions: [
          "Use serial compression for controlled but natural vocals.",
          "Use parallel compression to add density without killing transients.",
          "Use sidechain or dynamic EQ for masking management."
        ],
        body:
          "Advanced methods are powerful but easy to overdo. Introduce one at a time and validate each move with bypass tests.",
        symbolName: "point.3.filled.connected.trianglepath.dotted",
        visualTitle: "Advanced Control",
        visualCaption: "Add complexity only when needed.",
        settings: {
          "Serial Stages": "2 stages x 2-4 dB GR",
          "Parallel Blend": "Bring in until effect just supports source"
        },
        proTip: "Parallel returns often need EQ filtering to avoid low-end buildup.",
        avoidThis: "Do not stack parallel and serial chains without a clear reason.",
        checkYourWork:
          "Advanced processing solves a real issue not fixed by basic settings.",
        stepScreenshot: null
      },
      {
        number: 6,
        title: "Level-Match and Final Validation",
        concept:
          "Without matched loudness, you cannot trust compression decisions.",
        actions: [
          "Set makeup gain so bypass and active levels are comparable.",
          "Check in context at low and moderate monitoring levels.",
          "Validate on earbuds/speakers and in mono."
        ],
        body:
          "Final translation checks catch over-compression early. Keep dynamics appropriate for style rather than chasing loudness myths.",
        symbolName: "checkmark.circle",
        visualTitle: "Reality Check",
        visualCaption: "Match level, then judge.",
        settings: {
          "A/B Method": "Matched loudness, equal monitoring level",
          "Mix Bus Compression": "Subtle, usually 1-3 dB GR"
        },
        proTip: "Take short ear breaks before final compression calls.",
        avoidThis: "Avoid deciding on compression at one playback level only.",
        checkYourWork:
          "Compressed version is clearly better at matched loudness across devices.",
        stepScreenshot: null
      }
    ]
  },
  {
    id: "stereo-tricks",
    title: "Stereo Tricks",
    series: "Spatial Mixing Series",
    summary:
      "A practical, mono-safe guide to creating width, movement, and depth in Logic Pro without phase problems or weak translation.",
    duration: "38 min read",
    symbolName: "arrow.left.arrow.right",
    badges: ["New", "Stereo", "Intermediate"],
    isFeatured: true,
    checklist: [
      "Keep kick, bass, snare focus, and lead vocal power anchored in the center.",
      "Map the stereo field before adding widening tools.",
      "Use arrangement, panning, and true double-tracking before artificial width.",
      "Treat Haas, micro-pitch, chorus, and wideners as effects that require mono checks.",
      "Keep sub-bass and low fundamentals controlled in mono.",
      "Use mid/side EQ to clear edges without hollowing out the center.",
      "Automate width so choruses and transitions feel larger than verses.",
      "Watch correlation and toggle mono after every major stereo move.",
      "Fix phase or polarity problems at the source before adding more processing.",
      "Print a reference bounce and test it on speakers, headphones, phone, and mono playback."
    ],
    steps: [
      {
        number: 1,
        title: "Start With a Mono-Safe Center",
        concept:
          "Stereo tricks only work when the core mix survives without them. The center carries power, groove, and lyric focus.",
        actions: [
          "Place kick, bass fundamentals, snare focus, and lead vocal near the center.",
          "Build the first balance with no widening plugins active.",
          "Toggle mono early so the song still feels complete before you create width."
        ],
        body:
          "Width is exciting, but the listener usually judges the song by what happens in the middle. The kick and bass define weight, the snare often defines backbeat, and the lead vocal or lead melody tells the story. If those elements are unstable, no stereo effect will make the mix feel professional. Start by creating a strong center image with simple levels, EQ, compression, and panning. Then collapse the mix to mono with Logic's Gain plugin or your monitor controller. The mix should become narrower, not smaller in an alarming way. If the vocal vanishes, the bass thins out, or drums lose punch, solve that before adding width. This habit prevents the classic beginner mistake of building an impressive headphone image that falls apart on phones, club systems, laptops, and social media playback.",
        symbolName: "scope",
        visualTitle: "Center Anchor",
        visualCaption: "Power in the middle, color on the sides.",
        settings: {
          "Center Elements": "Kick, bass, snare focus, lead vocal",
          "First Check": "Mono before width",
          "Goal": "Narrower in mono, not weaker"
        },
        proTip:
          "Use a reference track and listen only to its center image for 20 seconds. Notice how much important information lives there even in very wide mixes.",
        avoidThis:
          "Do not widen the lead vocal, bass, or master bus just because the mix feels small. The arrangement or balance may be the real issue.",
        checkYourWork:
          "When summed to mono, the groove, lyric, and song identity remain clear and emotionally convincing.",
        stepScreenshot: "/assets/training/stereo-tricks/step01_center_anchor.png"
      },
      {
        number: 2,
        title: "Read the Stereo Field Before You Widen",
        concept:
          "A stereo field is a map of musical roles. Diagnose empty areas and crowded areas before reaching for a stereo plugin.",
        actions: [
          "Listen once for left, center, and right placement without touching controls.",
          "Write down which elements feel too narrow, too wide, or disconnected.",
          "Use Logic's Multimeter or a correlation meter to watch the stereo relationship."
        ],
        body:
          "Before making stereo changes, learn what the existing recording is already doing. Some sources are naturally wide, such as overheads, room mics, stereo synths, piano, and doubled guitars. Others are naturally focused, such as bass DI, kick, snare close mic, lead vocal, or a mono guitar amp. A common mistake is adding width to everything because the mix feels flat. That often creates a blurry ring around a weak center. Instead, play the chorus and make a quick stereo map: what owns the center, what supports the left side, what supports the right side, and what creates depth behind the lead. If one side feels heavy, fix arrangement or panning first. If the whole mix is narrow but balanced, choose one or two supporting elements to widen. Stereo work becomes cleaner when each move has a location and purpose.",
        symbolName: "map",
        visualTitle: "Stereo Map",
        visualCaption: "Diagnose placement before processing.",
        settings: {
          "Meter": "Logic Multimeter correlation",
          "Map Zones": "Left / Center / Right / Depth",
          "Decision": "Widen only sources with a job"
        },
        proTip:
          "Close your eyes and point to each important part while the mix plays. If you cannot locate it, the image may be too blurry or masked.",
        avoidThis:
          "Avoid judging width from soloed tracks. A beautiful solo image can become a phasey mess once the full arrangement returns.",
        checkYourWork:
          "You can describe where every main instrument lives before adding a new stereo processor.",
        stepScreenshot: "/assets/training/stereo-tricks/step02_stereo_map.png"
      },
      {
        number: 3,
        title: "Pan With Arrangement Pairs",
        concept:
          "Panning is the safest stereo trick because it separates parts without changing their phase relationship.",
        actions: [
          "Pair similar supporting parts across left and right positions.",
          "Keep important one-of-one elements closer to center unless the arrangement needs a special effect.",
          "Balance the left and right energy by musical role, not by identical pan numbers."
        ],
        body:
          "The most reliable width often comes from old-fashioned panning. When two complementary parts answer each other, panning them apart can create a wide image that still folds to mono cleanly. Rhythm guitars, percussion layers, backing vocals, keys, and ear-candy parts are good candidates. The trick is to pan arrangement roles, not random tracks. If a guitar chord part lives left, give the right side another part with similar energy or a delay/reverb return that balances it. If a shaker is bright on one side, maybe a tambourine, acoustic guitar texture, or short ambience supports the other side. Avoid making pan decisions only by symmetry; a sparse arrangement may need 25 percent left and 45 percent right instead of hard left and hard right. Panning should make the song easier to understand, not merely wider.",
        symbolName: "slider.horizontal.3",
        visualTitle: "Pan Pairs",
        visualCaption: "Separate roles while balancing energy.",
        settings: {
          "Core": "Center or near-center",
          "Support": "Complementary left/right positions",
          "Hard Pan": "Use for confident pairs"
        },
        proTip:
          "If one side feels louder after panning, adjust level before changing pan. The problem may be energy balance rather than location.",
        avoidThis:
          "Do not hard-pan a single important part with no counterweight unless that imbalance is an intentional production choice.",
        checkYourWork:
          "The mix feels wider in stereo, but every part remains audible and balanced when mono collapses the pan positions.",
        stepScreenshot: "/assets/training/stereo-tricks/step03_panning_pairs.png"
      },
      {
        number: 4,
        title: "Use Real Double-Tracking First",
        concept:
          "Two genuine performances create width with fewer phase problems than copied tracks or artificial spreaders.",
        actions: [
          "Record a second performance instead of duplicating the same audio when possible.",
          "Pan true doubles apart and level them as one combined arrangement layer.",
          "Edit timing enough for tightness, but leave small human differences for width."
        ],
        body:
          "Real double-tracking is one of the best stereo tricks because it uses performance variation instead of phase manipulation. Two guitar takes playing the same part are never perfectly identical. Tiny timing, pick attack, tuning, and tone differences make the left and right sides feel wide while remaining musically related. The same approach works for backing vocals, gang vocals, claps, percussion, and some synth layers. In Logic, record the second take on a separate track, choose complementary tones if needed, and pan the pair apart. Tighten obvious mistakes, but do not edit every transient until both sides are identical; the differences are the width. If you only duplicate one region and pan the copies left and right, you have not created stereo. You have made louder mono unless you add delay, pitch, or processing, and those tools bring phase risks.",
        symbolName: "rectangle.stack",
        visualTitle: "True Doubles",
        visualCaption: "Performance differences create natural width.",
        settings: {
          "Best Sources": "Guitars, BGVs, claps, percussion",
          "Pan Starting Point": "50-100% apart",
          "Edit Goal": "Tight but not identical"
        },
        proTip:
          "For heavy guitars, try one brighter amp tone on one side and a slightly darker tone on the other. The contrast can sound bigger than identical tones.",
        avoidThis:
          "Avoid copying a mono take, panning it left and right, and expecting width. Identical copies still sum as mono.",
        checkYourWork:
          "The doubled part sounds wide in stereo and remains strong, though naturally denser, when checked in mono.",
        stepScreenshot: "/assets/training/stereo-tricks/step04_true_double_tracking.png"
      },
      {
        number: 5,
        title: "Build Haas Width Carefully",
        concept:
          "Very short left/right delays can create apparent width, but they can also cause comb filtering in mono.",
        actions: [
          "Duplicate or send a mono source to a short delay path.",
          "Delay one side roughly 8-20 ms and keep feedback off.",
          "Check mono immediately and reduce delay level if tone becomes hollow."
        ],
        body:
          "The Haas effect uses tiny timing differences to make a sound feel wide or shifted to one side. In Logic, you can experiment with Sample Delay, Delay Designer, Sample Delay on one side, or a short stereo delay with no feedback. Start conservatively: a delay between about 8 and 20 ms can widen a guitar, percussion hit, or background vocal without sounding like an obvious echo. The danger is mono compatibility. When the delayed side folds together with the dry side, the timing difference creates peaks and dips called comb filtering. The source may become nasal, hollow, or weaker. For that reason, Haas width works best on supporting parts that can tolerate tonal change. Keep important anchors dry, blend the effect low, and bypass it often. If the source sounds worse in mono, narrow the effect or choose true doubling instead.",
        symbolName: "timer",
        visualTitle: "Haas Delay",
        visualCaption: "Tiny delays create width with tradeoffs.",
        settings: {
          "Delay Range": "8-20 ms",
          "Feedback": "0%",
          "Risk": "Comb filtering in mono"
        },
        proTip:
          "Filter the delayed side slightly darker than the dry side. A softer delayed copy often widens without drawing attention to phase artifacts.",
        avoidThis:
          "Do not use Haas widening on bass fundamentals, kick, lead vocal, or the full mix unless you have a very specific effect in mind.",
        checkYourWork:
          "The widened source still supports the song in mono and does not sound hollow, nasal, or dramatically quieter.",
        stepScreenshot: "/assets/training/stereo-tricks/step05_haas_delay.png"
      },
      {
        number: 6,
        title: "Widen With Micro-Pitch, Not Guesswork",
        concept:
          "Small pitch differences between sides can create lush width when blended behind the dry signal.",
        actions: [
          "Create a stereo aux or duplicate return for the widening effect.",
          "Shift one side slightly up and the other slightly down, usually under 10 cents.",
          "Blend quietly under the dry track and check for chorus-like wobble."
        ],
        body:
          "Micro-pitch widening is common on vocals, synths, guitars, and effects returns because it creates width without relying only on timing delay. The classic idea is simple: one side is pitched a few cents up, the other a few cents down, sometimes with a very short delay. In Logic, you can approach this with Pitch Shifter, Vocal Transformer used subtly, or third-party pitch/doubler tools if available. The dry signal should usually remain centered and emotionally stable while the pitch-shifted return adds a halo around it. Keep the blend lower than you think. If the lead starts to sound seasick, detached, or out of tune, the effect is too loud or the pitch spread is too wide. Micro-pitch is a color, not a replacement for a good take. It works best when the listener feels size but does not notice the machine.",
        symbolName: "waveform.path",
        visualTitle: "Micro-Pitch Halo",
        visualCaption: "Small cents, low blend, stable dry center.",
        settings: {
          "Pitch Offset": "+/- 3 to 9 cents",
          "Blend": "Low under dry source",
          "Best Use": "Vocals, synths, guitars, FX"
        },
        proTip:
          "High-pass the pitch return so low mids do not smear the lead. Often the shine above 200-300 Hz is all you need.",
        avoidThis:
          "Do not tune the widened return so aggressively that it becomes a second melody fighting the original.",
        checkYourWork:
          "The source feels larger in stereo while pitch center, lyric focus, and mono tone remain reliable.",
        stepScreenshot: "/assets/training/stereo-tricks/step06_micropitch.png"
      },
      {
        number: 7,
        title: "Create Width With Short Stereo Delays",
        concept:
          "Tempo-aware left/right delays add size and rhythm while staying easier to manage than random widening.",
        actions: [
          "Set up a stereo delay aux instead of inserting delay directly on every track.",
          "Use different note values or milliseconds left and right.",
          "Filter the return so repeats leave room for the dry center."
        ],
        body:
          "Short stereo delays can make a mono source feel wide without moving the dry source away from the center. Instead of a static widening plugin, use a send to a delay aux and design the return like an arrangement part. A vocal might use a quiet 1/16 note on one side and a dotted 1/8 on the other. A guitar might use 70 ms left and 110 ms right with no obvious feedback. A synth hook might get ping-pong movement only at phrase endings. Logic's Stereo Delay, Tape Delay, and Delay Designer are all useful here. Filter lows out of the return and roll off some highs if the delay distracts from the lead. The advantage of a send is control: you can automate throws, mute the return in dense sections, and keep the original track solid. Delay width should create space and groove, not clutter.",
        symbolName: "metronome",
        visualTitle: "Stereo Delays",
        visualCaption: "Asymmetrical repeats widen with rhythm.",
        settings: {
          "Short Delay": "60-120 ms",
          "Tempo Throws": "1/16, 1/8, dotted 1/8",
          "Return EQ": "High-pass and soften highs"
        },
        proTip:
          "Automate send level for the last word of a vocal phrase. The mix feels wide during gaps while the lyric stays dry and clear.",
        avoidThis:
          "Avoid full-range stereo delays on every phrase. Repeats that fight consonants and transients reduce clarity.",
        checkYourWork:
          "The dry source remains focused while the delay return creates width, rhythm, or transition energy around it.",
        stepScreenshot: "/assets/training/stereo-tricks/step07_stereo_delays.png"
      },
      {
        number: 8,
        title: "Shape Reverb Width and Depth",
        concept:
          "Reverb can create a wide environment, but uncontrolled low end and long tails can wash out the mix.",
        actions: [
          "Use shared reverb auxes so multiple elements live in related spaces.",
          "Narrow or filter low-frequency reverb content.",
          "Use pre-delay to keep the dry source forward while the reverb blooms behind it."
        ],
        body:
          "Reverb is a stereo trick because it tells the ear where the source exists in a space. A dry vocal can stay centered while a plate or chamber return spreads around it. A snare can remain punchy while a short room gives it shoulders. A guitar can sit wide because its ambience reaches beyond the speaker positions. The key is shaping the return. In Logic, ChromaVerb, Space Designer, and SilverVerb-style tools can all work, but the return should be filtered and placed intentionally. High-pass the reverb so kick, bass, and low vocal chest do not smear. Use pre-delay, often 20-80 ms depending on tempo, so the dry attack speaks before the wash. If the reverb is too wide, use Direction Mixer or panning on the return. Reverb width should frame the song, not cover it with fog.",
        symbolName: "sparkles",
        visualTitle: "Wide Reverb",
        visualCaption: "Dry center, spacious sides, filtered lows.",
        settings: {
          "Pre-Delay": "20-80 ms",
          "Return HPF": "150-300 Hz starting point",
          "Width": "Adjust return, not dry anchor"
        },
        proTip:
          "Try a narrower verse reverb and a wider chorus reverb. The chorus can feel bigger without changing the lead vocal level.",
        avoidThis:
          "Do not leave huge stereo reverbs full-range by default. Low-frequency ambience can make a mix feel late and unfocused.",
        checkYourWork:
          "The reverb creates depth and width while the dry source remains intelligible at low listening volume.",
        stepScreenshot: "/assets/training/stereo-tricks/step08_wide_reverb.png"
      },
      {
        number: 9,
        title: "Use Mid/Side EQ for Separation",
        concept:
          "Mid/side EQ lets you treat the center and edges differently, which can add clarity without pushing faders.",
        actions: [
          "Use mid/side processing only after the basic balance works.",
          "Cut low-mid buildup from the sides when the mix feels cloudy.",
          "Add small side brightness only to sources or buses that can support it."
        ],
        body:
          "Mid/side processing separates the center information from the side information. The mid channel contains what is common to left and right; the side channel contains differences between them. This is powerful because many width problems are really frequency problems. A wide keyboard may sound impressive but crowd the vocal with side low mids. A reverb return may be beautiful but too dark and heavy around the edges. With a mid/side-capable EQ, you can reduce 200-500 Hz on the sides, brighten the side air slightly, or keep low frequencies stronger in the mid. Logic's stock Channel EQ is not always the most direct mid/side interface, so use available mid/side-capable tools when you have them, or use routing carefully. Make small moves. Mid/side EQ can quickly make a mix sound hollow if the center and sides stop feeling connected.",
        symbolName: "waveform.path.ecg",
        visualTitle: "Mid / Side EQ",
        visualCaption: "Clean the edges while protecting the center.",
        settings: {
          "Side Mud": "Cut 200-500 Hz gently",
          "Side Air": "Small shelf, if needed",
          "Low End": "Prefer mid stability"
        },
        proTip:
          "If a side boost sounds exciting, level-match it before deciding. Extra side brightness often feels better only because it got louder.",
        avoidThis:
          "Do not carve the mid channel so deeply that the mix loses vocal, snare, bass, or mono identity.",
        checkYourWork:
          "The stereo edges feel cleaner, but the mix still sounds natural and full when switched back to standard stereo or mono.",
        stepScreenshot: "/assets/training/stereo-tricks/step09_mid_side_eq.png"
      },
      {
        number: 10,
        title: "Keep Low End Focused",
        concept:
          "Sub and bass fundamentals usually translate best when they are centered and phase-stable.",
        actions: [
          "Keep kick and bass fundamentals mono or very narrow.",
          "Widen harmonics above the low end instead of widening sub frequencies.",
          "Check low-end translation on headphones, speakers, and mono playback."
        ],
        body:
          "Low-frequency stereo can feel impressive on headphones, but it often causes weak translation. Club systems, phones, Bluetooth speakers, and many playback paths sum or partially sum low end. If the bass fundamentals are wide and phasey, they can disappear or hit unevenly. A safer trick is to keep the low band centered while widening upper harmonics. For bass guitar, synth bass, or 808-style sounds, split the idea mentally: the sub and fundamental provide stable weight; saturation, chorus, room, or parallel distortion above the low band provide size. You can high-pass a stereo effect return so it adds character without touching the bottom. On the mix bus, avoid stereo widening that expands the entire frequency range. If you use Direction Mixer or other imaging tools, protect lows first. A wide mix with weak bass rarely feels finished.",
        symbolName: "speaker.wave.2",
        visualTitle: "Mono Low End",
        visualCaption: "Center the weight, widen upper harmonics.",
        settings: {
          "Mono Focus": "Below 80-150 Hz",
          "Widen": "Harmonics above low band",
          "Check": "Mono and small speakers"
        },
        proTip:
          "If bass feels too narrow, add a distorted parallel track high-passed around 150 Hz and spread that instead of the clean low track.",
        avoidThis:
          "Avoid chorus or stereo spread directly on sub-heavy bass unless you filter or split the effect.",
        checkYourWork:
          "The low end stays punchy and even when mono, while upper harmonics can still feel wide in stereo.",
        stepScreenshot: "/assets/training/stereo-tricks/step10_mono_low_end.png"
      },
      {
        number: 11,
        title: "Make Drums Wide Without Losing Punch",
        concept:
          "Drum width comes from overheads, rooms, percussion, and ambience while close-mic punch stays centered.",
        actions: [
          "Anchor kick, snare close mic, and main drum bus impact near center.",
          "Pan overheads from the drummer or audience perspective and keep the kit believable.",
          "Use room and parallel returns to add shoulder width behind the close mics."
        ],
        body:
          "Drums are a perfect place to separate punch from image. The kick, snare close mic, and low tom power usually need a strong center so the groove hits consistently. Width can come from overheads, stereo rooms, cymbal spread, percussion overdubs, short ambience, and parallel compression returns. Start by choosing a perspective: drummer perspective places hi-hat usually left from the drummer's seat, audience perspective flips it. Either is valid; consistency matters more than dogma. Check overhead polarity against the snare close mic before processing because phase problems here can destroy punch. If the kit feels narrow, do not immediately widen the whole drum bus. Try raising room mics, panning percussion, or adding a short stereo room reverb. A drum image should feel like a kit in a space, not a collection of unrelated wide objects.",
        symbolName: "circle.grid.cross",
        visualTitle: "Drum Image",
        visualCaption: "Center punch, wide rooms and cymbals.",
        settings: {
          "Center": "Kick, snare close, main punch",
          "Width": "Overheads, rooms, percussion",
          "First Fix": "Check polarity and phase"
        },
        proTip:
          "Listen to the snare while toggling overheads in mono. If snare body gets smaller, phase alignment may need attention before mixing.",
        avoidThis:
          "Do not widen the entire drum bus to fix narrow cymbals. You may smear kick and snare transients.",
        checkYourWork:
          "The kit feels wide and realistic in stereo while kick and snare punch remain strong in mono.",
        stepScreenshot: "/assets/training/stereo-tricks/step11_drum_image.png"
      },
      {
        number: 12,
        title: "Spread Guitars and Keys Without Masking",
        concept:
          "Wide harmonic beds can make a chorus huge, but they must leave space for vocal and snare focus.",
        actions: [
          "Use panning and complementary tones before adding stereo spread.",
          "High-pass or low-mid cut wide beds that cloud the center.",
          "Automate support layers down when the lead vocal or solo needs attention."
        ],
        body:
          "Guitars, keys, pads, and synth layers often become the width of a production. They also create some of the worst masking problems because they fill the same midrange that vocals, snare crack, and lead instruments need. Treat wide harmonic parts like scenery around the actor. Double-track guitars when possible, pan keyboard layers by register, and avoid stacking every pad in full stereo. If the chorus needs size, choose which layer owns the far edges and which layer supports closer to center. Use EQ to remove unnecessary low mids from wide beds, especially around 150-400 Hz, and use automation when lyrics are dense. Stereo Spread or chorus can be useful on keys, but check the center after applying it. A wide bed should make the mix feel expensive while leaving a clear hole for the lead.",
        symbolName: "guitars",
        visualTitle: "Harmonic Beds",
        visualCaption: "Wide support around a clear lead lane.",
        settings: {
          "Mask Zone": "150-400 Hz and 2-5 kHz",
          "Best Width": "Doubles, panning, layered registers",
          "Automation": "Tuck under dense vocals"
        },
        proTip:
          "Mute the lead vocal and make the instrumental feel wide, then unmute the vocal and carve only what blocks the lyric.",
        avoidThis:
          "Avoid making every keyboard patch maximum stereo. Multiple ultra-wide parts can collapse into an undefined wash.",
        checkYourWork:
          "The chorus feels wide, but vocal words and snare attack remain easy to locate.",
        stepScreenshot: "/assets/training/stereo-tricks/step12_harmonic_beds.png"
      },
      {
        number: 13,
        title: "Give Lead Vocals Width While Staying Centered",
        concept:
          "A lead vocal can feel large through side information while its dry body remains locked in the middle.",
        actions: [
          "Keep the main lead vocal dry signal centered.",
          "Use stereo doubles, micro-pitch, slap, delay throws, or reverb returns around it.",
          "Filter and automate vocal effects so words stay intelligible."
        ],
        body:
          "Lead vocal width is a balancing act. The singer should feel present in the center, but the production may need a larger-than-life halo. The safest approach is parallel width. Keep the main vocal track centered and use sends or doubles for the sides. Real double-tracked chorus vocals can be panned wide. Micro-pitch can add a glossy outline. A stereo slap can thicken without obvious repeats. Reverb can frame the voice behind the lead. Delay throws can expand selected words at the ends of lines. Each effect should be filtered so consonants and low-mid body do not smear. Automate effect sends: drier during fast lyrics, wider during held notes, ad-libs, and transitions. If the lead vocal becomes hard to understand, the width is stealing attention. The listener should hear the vocal first and the stereo magic second.",
        symbolName: "waveform.and.mic",
        visualTitle: "Vocal Halo",
        visualCaption: "Centered lead with controlled side effects.",
        settings: {
          "Dry Lead": "Center",
          "Width Sources": "Doubles, pitch, slap, reverb, throws",
          "Automation": "More width in gaps and hooks"
        },
        proTip:
          "Use separate effects for thickness and space. A short slap can widen the vocal while a longer reverb handles depth.",
        avoidThis:
          "Do not make the dry lead itself phasey just to chase width. If the lyric blurs, the mix loses its anchor.",
        checkYourWork:
          "The vocal feels larger in stereo, but the main performance stays centered, intelligible, and strong in mono.",
        stepScreenshot: "/assets/training/stereo-tricks/step13_vocal_width.png"
      },
      {
        number: 14,
        title: "Use Stereo Modulation as Texture",
        concept:
          "Chorus, flanging, phasing, tremolo, and rotary effects can add movement when they serve the arrangement.",
        actions: [
          "Choose one modulation job: shimmer, wobble, motion, or transition.",
          "Blend modulation on an aux or parallel layer when the dry track needs stability.",
          "Sync rate or movement to the song when rhythmic pulsing matters."
        ],
        body:
          "Stereo modulation can make a part feel alive. Chorus spreads guitars and synths. Tremolo can move a keyboard pulse between speakers. Phaser or flanger can create a psychedelic sweep. Rotary speaker effects can make organs and guitars feel three-dimensional. These sounds are powerful because they move over time, not just because they are wide. The risk is listener fatigue and mono unpredictability. If every layer is modulating, the mix stops feeling grounded. Use modulation as a texture assigned to specific parts or moments. In Logic, Modulation Delay, Chorus, Ensemble, Phaser, Tremolo, and Rotor-style effects can all contribute. Put them on an aux when you want the dry source stable, or insert them directly when the effect defines the sound. Always test the busiest section because modulation that works in a verse may become seasick in a chorus.",
        symbolName: "dial.medium",
        visualTitle: "Modulation Texture",
        visualCaption: "Movement should support the song.",
        settings: {
          "Rate": "Tempo-aware if rhythmic",
          "Blend": "Parallel for stability",
          "Use": "Specific part or moment"
        },
        proTip:
          "Automate modulation depth up for a transition, then pull it back once the next section lands.",
        avoidThis:
          "Avoid stacking chorus, flanger, phaser, and stereo widening on the same source unless the obvious effect is intentional.",
        checkYourWork:
          "The modulation adds movement or identity without making the whole mix drift, wobble, or lose mono clarity.",
        stepScreenshot: "/assets/training/stereo-tricks/step14_modulation_texture.png"
      },
      {
        number: 15,
        title: "Automate Width by Song Section",
        concept:
          "Contrast makes width feel bigger. A chorus sounds wider when the verse leaves room for expansion.",
        actions: [
          "Make a section map before automating width.",
          "Narrow some verse effects and widen selected chorus or bridge layers.",
          "Use transition throws, reverb blooms, and widening automation to create lift."
        ],
        body:
          "If everything is wide all the time, nothing feels wide. Width is most effective when it changes with the song's emotional arc. A verse might keep guitars closer, reverbs shorter, and delays tucked. The pre-chorus might introduce a filtered stereo delay or a widening pad. The chorus can open doubled guitars, backing vocals, cymbal spread, and a wider reverb return. Logic automation makes this easy: write send levels, plugin bypass, Direction Mixer spread, delay feedback, reverb size, or aux return volume by section. Start with big moves before drawing tiny details. The listener should feel the chorus open, not notice a technical trick. Also consider narrowing breakdowns or bridges so the final chorus feels huge. Stereo automation turns width into arrangement storytelling instead of a static setting.",
        symbolName: "point.3.filled.connected.trianglepath.dotted",
        visualTitle: "Width Automation",
        visualCaption: "Narrower verses make wider hooks.",
        settings: {
          "Verse": "Focused and controlled",
          "Chorus": "Open selected layers",
          "Transitions": "Throws, blooms, spread changes"
        },
        proTip:
          "Automate width down for the bar before a chorus drop. The sudden expansion can feel bigger than boosting the chorus level.",
        avoidThis:
          "Do not automate every stereo parameter at once. Too many moving edges can make the mix feel unstable.",
        checkYourWork:
          "The song feels like it expands and contracts naturally across sections without losing balance.",
        stepScreenshot: "/assets/training/stereo-tricks/step15_width_automation.png"
      },
      {
        number: 16,
        title: "Use Binaural Panning Only for Headphone Moments",
        concept:
          "Binaural placement can be dramatic on headphones, but it is less predictable on speakers and in mono.",
        actions: [
          "Reserve binaural effects for ear candy, intros, transitions, and headphone-focused productions.",
          "Keep essential musical information in standard stereo or mono-safe paths.",
          "Check the result on speakers because headphone illusions may not translate."
        ],
        body:
          "Binaural panning uses head-related cues to make sound appear around or behind the listener, especially on headphones. Logic includes binaural panning options that can be inspiring for ad-libs, sound design, percussion, whispers, risers, and immersive moments. The important word is moments. Binaural effects can collapse strangely on speakers because the left and right channels interact acoustically in the room. They can also lose impact when a platform or device sums playback. Keep the main song information safe: lead vocal meaning, groove, bass, and key hooks should not depend on a headphone-only illusion. Use binaural placement like lighting in a stage show. It can make a transition memorable or place a texture outside the normal speaker line, but the song should still work when the trick disappears. Print and check these effects carefully before delivery.",
        symbolName: "headphones",
        visualTitle: "Binaural Moments",
        visualCaption: "Great for headphones, risky as a foundation.",
        settings: {
          "Best Use": "Ear candy, transitions, sound design",
          "Keep Safe": "Lead, groove, bass, hooks",
          "Verify": "Headphones, speakers, mono"
        },
        proTip:
          "Place a quiet binaural detail before a hook to make headphone listeners lean in, while the main hook remains standard stereo.",
        avoidThis:
          "Avoid building the entire lead vocal or core rhythm around binaural cues unless the release format is specifically headphone-first.",
        checkYourWork:
          "The binaural effect is exciting on headphones but the song still communicates clearly on normal speakers.",
        stepScreenshot: "/assets/training/stereo-tricks/step16_binaural_panner.png"
      },
      {
        number: 17,
        title: "Layer Mono and Stereo Copies Safely",
        concept:
          "A stable mono layer plus a filtered stereo layer can create size without sacrificing focus.",
        actions: [
          "Keep one clean version centered for definition.",
          "Create a stereo parallel layer for width, distortion, ambience, or modulation.",
          "Filter the parallel layer so it supports rather than masks the main source."
        ],
        body:
          "One advanced but practical trick is to separate definition from width. The mono or narrow layer provides attack, pitch, lyric, or groove. The stereo layer provides size, color, and air. This works on bass, vocals, synth leads, percussion loops, and even some drums. For example, a mono bass DI can hold the low end while a distorted stereo aux adds growl above 200 Hz. A centered vocal can stay dry while a filtered stereo slap provides width. A mono synth lead can cut through while a chorus return surrounds it. The parallel layer should usually be filtered, compressed, saturated, or automated differently from the main source. Do not just duplicate full-range audio and make it wide; that often masks the original. Think of the stereo copy as a shadow or glow, not a second competing instrument.",
        symbolName: "square.stack.3d.up",
        visualTitle: "Parallel Width",
        visualCaption: "Mono definition plus stereo glow.",
        settings: {
          "Main Layer": "Clean, centered, defined",
          "Stereo Layer": "Filtered and blended",
          "Use Cases": "Bass growl, vocal slap, synth halo"
        },
        proTip:
          "If the stereo layer makes the main source quieter, invert bypass comparisons at matched level and check whether masking increased.",
        avoidThis:
          "Do not leave the parallel layer full-range by default. It should occupy only the frequencies that add useful size.",
        checkYourWork:
          "The combined sound is bigger than the mono layer, but muting the stereo layer does not reveal that the core part depended on it.",
        stepScreenshot: "/assets/training/stereo-tricks/step17_parallel_width.png"
      },
      {
        number: 18,
        title: "Use Correlation and Mono Checks",
        concept:
          "Meters do not mix for you, but they reveal stereo moves that may fail outside your room.",
        actions: [
          "Place Logic's Multimeter or a correlation meter on the stereo output.",
          "Watch for sustained negative correlation during important sections.",
          "Toggle mono after every major width, delay, modulation, or mid/side change."
        ],
        body:
          "A correlation meter shows how similar or different the left and right channels are. A reading near +1 means highly mono or in phase. Around 0 means wide or decorrelated. Sustained negative values suggest the sides are out of phase and may cancel when summed. Do not panic over a quick dip during a cymbal wash or special effect. Do pay attention when the chorus, vocal, bass, or full mix spends a long time negative. Logic's Multimeter is useful here because it pairs visual feedback with your mono button. The workflow is simple: make a stereo move, listen in stereo, glance at correlation, switch to mono, and listen again. Trust your ears first, but let the meter warn you when excitement may be coming from cancellation. The goal is not a perfectly mono mix; the goal is width that survives real playback.",
        symbolName: "waveform.and.magnifyingglass",
        visualTitle: "Correlation Check",
        visualCaption: "Use meters as warning lights.",
        settings: {
          "+1": "Mono / strongly in phase",
          "0": "Wide / decorrelated",
          "-1": "Likely mono cancellation"
        },
        proTip:
          "Put a mono Gain plugin and Multimeter near the end of your stereo output while mixing, then bypass them before bouncing if they are only utilities.",
        avoidThis:
          "Do not chase meter perfection at the expense of the song. Short negative moments can be fine when the musical result translates.",
        checkYourWork:
          "Major stereo moves keep important sections mostly stable and the mono button reveals no disappearing anchors.",
        stepScreenshot: "/assets/training/stereo-tricks/step18_correlation_check.png"
      },
      {
        number: 19,
        title: "Fix Phase Problems Before Adding More Width",
        concept:
          "Phase issues are source problems. Widening a broken source usually makes the damage louder.",
        actions: [
          "Check polarity and timing between multi-mic sources before processing.",
          "Nudge or delay close and distant mics only when it improves the combined tone.",
          "Bypass wideners while diagnosing phase so the cause is clear."
        ],
        body:
          "Some stereo problems begin long before the mix bus. Drum overheads may fight the snare close mic. A bass DI and amp mic may arrive at different times. A stereo keyboard patch may include phasey modulation. A guitar recorded with two microphones may sound huge in solo and thin in the track. If you add widening to those sources, you exaggerate the confusion. Diagnose first. Flip polarity where appropriate, compare timing, and listen for low-end weight, transient punch, and tonal fullness. In Logic, region nudging, Sample Delay, and polarity controls in Gain can help, but use them with ears rather than a grid obsession. Perfect visual alignment is not always the best sound; the best alignment is the one that supports the mix. Once the source is healthy, width tools become optional polish instead of emergency medicine.",
        symbolName: "wrench.and.screwdriver.fill",
        visualTitle: "Phase Repair",
        visualCaption: "Correct the source before widening.",
        settings: {
          "Tools": "Gain polarity, Sample Delay, region nudge",
          "Listen For": "Punch, body, stable tone",
          "Rule": "Fix first, widen second"
        },
        proTip:
          "Loop the loudest downbeat and switch between polarity states at matched level. The better choice usually sounds fuller immediately.",
        avoidThis:
          "Do not keep adding stereo spread to a source that already gets smaller when summed to mono.",
        checkYourWork:
          "Multi-mic sources sound fuller and more focused before any width effect is reintroduced.",
        stepScreenshot: "/assets/training/stereo-tricks/step19_phase_repair.png"
      },
      {
        number: 20,
        title: "Print, Reference, and Translate",
        concept:
          "The final stereo test is not how impressive the mix sounds in one sweet spot; it is how well it survives everywhere.",
        actions: [
          "Bounce a short reference after major stereo decisions.",
          "Check headphones, monitors, phone speaker, car or small Bluetooth, and mono.",
          "Write one fix list and adjust only the problems that repeat across systems."
        ],
        body:
          "Stereo decisions can fool you because they are highly dependent on monitoring. Headphones exaggerate left/right separation because each ear receives only one channel. Speakers create acoustic crossfeed because both ears hear both speakers. Phone speakers may be mono or nearly mono. Cars can hype width with reflective cabins. This is why printing a short reference is part of the stereo process. Bounce the loudest chorus and a sparse verse, then listen in several contexts. Do not chase every tiny difference; look for repeatable problems. Does the chorus lose bass in mono? Does the vocal feel detached on headphones? Do guitars dominate one side in the car? Does the reverb blur lyrics on the phone? Make a short fix list, return to Logic, and solve the highest-impact items. A finished stereo image feels wide, intentional, and emotionally stable across imperfect playback.",
        symbolName: "checkmark.seal",
        visualTitle: "Translation Pass",
        visualCaption: "Great width survives real playback.",
        settings: {
          "Bounce": "Short verse + loud chorus",
          "Systems": "Monitors, headphones, phone, car, mono",
          "Fix List": "Only repeated translation issues"
        },
        proTip:
          "Keep a folder of quick stereo reference bounces. Comparing versions prevents you from undoing a strong earlier image by over-processing later.",
        avoidThis:
          "Avoid changing the whole mix after one bad playback impression. Confirm the issue repeats before making big stereo moves.",
        checkYourWork:
          "The final reference feels wide in stereo, dependable in mono, and balanced across normal listener devices.",
        stepScreenshot: "/assets/training/stereo-tricks/step20_translation_check.png"
      }
    ]
  },
  {
    id: "frequently-asked-questions",
    title: "Frequently Asked Questions",
    series: "Essential Knowledge Series",
    summary:
      "Clear answers to the most common Logic Pro workflow questions, from file management and buffer settings to recording techniques and export best practices.",
    duration: "25 min read",
    symbolName: "questionmark.circle",
    badges: ["Essential", "Beginner", "Quick Reference"],
    isFeatured: true,
    checklist: [
      "Understand .logicx packages vs folder bundles for saving projects.",
      "Know safe storage locations for projects, plugins, and samples.",
      "Learn when to adjust buffer size for recording vs mixing.",
      "Discover when stock plugins are sufficient vs when third-party is needed.",
      "Master the complete export workflow for finished songs.",
      "Identify healthy waveform levels visually.",
      "Use comping to compile the best take from multiple recordings.",
      "Understand bounce behavior and source preservation.",
      "Know when to mix in mono vs stereo.",
      "Adjust track zoom and waveform display for editing."
    ],
    steps: [
      {
        number: 1,
        title: "Should I save to a .logicx file or to a folder? Does it matter?",
        concept:
          "Logic Pro uses package bundles that appear as single files but actually contain folders. Understanding the format helps with troubleshooting, backup, and collaboration.",
        actions: [
          "Save as .logicx package by default for clean file management.",
          "Use 'Save As' with appropriate options based on collaboration needs.",
          "Keep project files organized in dedicated folders with sessions grouped logically."
        ],
        body:
          "When you save a Logic Pro project, it creates a .logicx package file. This is actually a special folder that macOS treats as a single file in Finder. Inside this package, Logic stores your project settings, plugin states, audio files (if you choose), and other session data.\n\nThe .logicx format keeps everything tidy and portable. When you double-click a .logicx file, Logic opens it directly. You can also right-click (Control-click) and choose 'Show Package Contents' to see what's inside.\n\nPrevious Logic versions used folder bundles or loose folders. While Logic can still open these older formats, new projects default to .logicx packages for better organization.\n\nWhen saving, Logic asks if you want to copy audio and other media into the project. Choosing 'Copy external audio files' makes your project self-contained and easier to move between computers or archive. If you decline, Logic references audio from its original location, which saves disk space but creates dependencies.\n\nFor collaboration, consolidate your project (File > Project Management > Consolidate) to ensure all dependencies are copied into the package. For personal work with trusted backups, referencing external audio is fine and more space-efficient.\n\nAlways save project files to fast local storage, not network drives or cloud-synced folders, to avoid corruption during auto-save operations. Use those locations only for manual backups after closing Logic.",
        symbolName: "doc.fill",
        visualTitle: "Project File Formats",
        visualCaption: "Package format keeps projects organized.",
        settings: {
          "Default Format": ".logicx package",
          "Legacy Format": "Folder bundle (pre-Logic X)",
          "Best Practice": "Copy media into package for archiving"
        },
        proTip:
          "Use File > Save a Copy As... to create an archived version with all assets embedded before moving the project to another system.",
        avoidThis:
          "Don't work directly from cloud-synced folders like Dropbox or iCloud Drive during active sessions—save locally and sync manually after closing.",
        checkYourWork:
          "Your project opens reliably on another Mac without missing file warnings.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq1_save_format_overview.png"
      },
      {
        number: 1,
        title: "Save Format Visual Examples",
        concept:
          "Visual reference showing how Logic packages appear in Finder and what's contained inside.",
        actions: [
          "View package contents to understand internal structure.",
          "Identify the difference between consolidated and referenced projects.",
          "Learn to read file paths when troubleshooting missing media."
        ],
        body:
          "Understanding the internal structure of a .logicx package helps when troubleshooting missing files or migrating projects. The package contains folders like 'Media' for embedded audio, 'Alternatives' for project versions, and various settings files.\n\nWhen you consolidate a project, all external references are copied into these internal folders. This makes the project fully portable but increases its size. Referenced projects remain smaller but depend on external files staying in their original locations.\n\nIf you ever see missing file warnings, showing package contents helps you locate what's missing and either restore it or relink it from backups.",
        symbolName: "folder.fill",
        visualTitle: "Inside a Logic Package",
        visualCaption: "Package contents and structure.",
        settings: null,
        proTip:
          "Press Command-R on a selected audio region to reveal its source file location, helping you track down where files actually live.",
        avoidThis:
          "Don't manually move or rename files inside a Logic package while the project is open—use Logic's internal file management instead.",
        checkYourWork:
          "You can locate any project's audio files by examining package contents.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq1_package_contents.png"
      },
      {
        number: 2,
        title: "I have limited hard drive space on my computer, is it okay to save files to a USB drive or network storage? What about plugins or samples?",
        concept:
          "Storage location affects performance, reliability, and workflow speed. Understanding the hierarchy of storage types prevents corruption and frustration.",
        actions: [
          "Keep active projects on internal SSD for best performance.",
          "Archive finished projects to external drives after completion.",
          "Install plugins and system samples on internal storage only.",
          "Use high-quality external SSDs for overflow project storage if needed."
        ],
        body:
          "Logic Pro performs best when working with files on your Mac's internal SSD. This drive offers the fastest read/write speeds and most reliable operation during auto-save cycles. Working directly from slower storage—especially network drives or USB thumb drives—risks file corruption, sluggish performance, and unexpected crashes.\n\nIf your internal drive is nearly full, consider archiving completed projects to external storage rather than keeping active sessions there. When you need to work on an archived project, copy it back to your internal drive first, make your changes, then archive it again.\n\nFor plugin files and Logic's built-in sound libraries, internal storage is mandatory. macOS expects plugins to live in specific system folders (typically /Library/Audio/Plug-Ins), and scanning plugins over slow connections causes long startup times. Logic's sound library can theoretically be relocated, but it performs better on internal SSDs.\n\nIf you absolutely must expand storage, use a high-quality external Thunderbolt or USB-C SSD (not a spinning hard drive or cheap flash drive). Format it as APFS or HFS+ for Mac compatibility. Even then, understand that performance will be somewhat reduced compared to internal storage.\n\nFor sample libraries from third-party developers (like Kontakt or Omnisphere), these can safely live on external SSDs since they're accessed differently than system-level plugins. Just ensure the drive is always connected when you open those sessions.\n\nNetwork storage (NAS, SMB shares, or cloud-synced folders) should only be used for manual backups or completed project archives, never for active work. The latency and potential interruptions make them unsuitable for real-time audio work.",
        symbolName: "internaldrive",
        visualTitle: "Storage Hierarchy",
        visualCaption: "Internal SSD for active work.",
        settings: {
          "Best: Internal SSD": "Active projects, plugins, system libraries",
          "OK: External SSD": "Sample libraries, archived projects",
          "Avoid: Network/Cloud": "Never for active sessions"
        },
        proTip:
          "Before archiving, run File > Project Management > Clean Up to remove unused audio files and reduce project size.",
        avoidThis:
          "Never run Logic projects directly from Dropbox, Google Drive, OneDrive, or similar sync services—these can corrupt projects mid-save.",
        checkYourWork:
          "Logic's performance meter shows low disk usage and no playback stuttering during heavy sessions.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq2_storage_types.png"
      },
      {
        number: 2,
        title: "Storage Best Practices",
        concept:
          "Practical workflows for managing projects across multiple storage locations.",
        actions: [
          "Set up a logical folder structure for projects.",
          "Create a workflow for archiving completed work.",
          "Understand how to relocate Logic's sound library if absolutely necessary."
        ],
        body:
          "Organize your Logic projects with a consistent folder structure: keep 'Active Projects' on your internal drive, 'Archive' on external storage, and 'Samples & Libraries' on whichever drive has space but preferably internal SSD.\n\nWhen a project is finished, consolidate it, verify the bounce, and then move the entire package to your archive drive. Keep a working backup on a second external drive or cloud storage for redundancy.\n\nIf you must relocate Logic's sound library, go to Logic Pro > Sound Library > Relocate Sound Library, but expect slower load times for patches. Always keep plugins themselves on the internal drive.",
        symbolName: "externaldrive",
        visualTitle: "Workflow Organization",
        visualCaption: "Active internal, archive external.",
        settings: {
          "Active Work": "~/Documents/Logic/Active",
          "Archive": "/Volumes/ExternalSSD/Logic Archive",
          "Samples": "/Volumes/SampleDrive/Libraries"
        },
        proTip:
          "Use Color Tags in Finder to visually mark projects as 'Active' (green), 'Archived' (gray), or 'In Progress' (orange).",
        avoidThis:
          "Don't scatter projects randomly across drives—a consistent structure saves hours of searching later.",
        checkYourWork:
          "You can find any project quickly by following your folder naming convention.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq2_folder_organization.png"
      },
      {
        number: 3,
        title: "Should I change the buffer when mixing or recording?",
        concept:
          "Buffer size balances input monitoring latency against CPU overhead. Recording needs low latency; mixing benefits from high efficiency.",
        actions: [
          "Set buffer to 64-128 samples when recording with live input monitoring.",
          "Increase buffer to 256-1024 samples when mixing or using heavy plugin counts.",
          "Test your system to find the highest stable buffer for each task."
        ],
        body:
          "Buffer size (also called I/O buffer or hardware buffer size) determines how much audio data Logic processes in each cycle. Smaller buffers reduce the delay (latency) between playing a note and hearing it, which is critical when recording with real-time input monitoring. Larger buffers give Logic more time to process each chunk, reducing CPU strain and preventing audio dropouts when running many plugins.\n\nWhen recording vocals, guitars, or MIDI keyboards where you need to hear yourself immediately through Logic's effects, use a buffer of 64 or 128 samples. At 44.1kHz, 64 samples equals roughly 1.5 milliseconds of round-trip latency—low enough that most performers don't notice any delay.\n\nWhen mixing or producing with many tracks and plugins, increase the buffer to 512 or even 1024 samples. This reduces CPU load and prevents crackling or stuttering during playback. You won't notice the latency because you're not actively recording input.\n\nLogic displays the current buffer setting in Preferences > Audio > Devices > I/O Buffer Size. Some interfaces offer additional low-latency monitoring features that bypass Logic entirely, letting you monitor through the hardware while still using high buffer sizes in Logic.\n\nIf you're using software instruments with live MIDI input during composition, you'll want lower buffers for that phase as well. Once the parts are recorded, bump the buffer up for mixing.\n\nWatch Logic's CPU meter in the top-right of the main window. If it's frequently peaking or you hear dropouts, increase the buffer. If input monitoring feels sluggish, decrease it. Modern Macs with Apple Silicon can often run lower buffers with more plugins than Intel Macs could.",
        symbolName: "waveform.path",
        visualTitle: "Buffer Size Trade-offs",
        visualCaption: "Low for recording, high for mixing.",
        settings: {
          "Recording (live monitoring)": "64-128 samples",
          "Mixing / heavy plugin use": "256-1024 samples",
          "Typical latency at 128 samples": "~3ms round-trip at 44.1kHz"
        },
        proTip:
          "Create a custom key command to toggle between your favorite recording and mixing buffer sizes quickly.",
        avoidThis:
          "Don't leave buffer at 64 samples during mixing if you're getting CPU overload warnings—that's unnecessary stress on your system.",
        checkYourWork:
          "No crackling during playback, and input monitoring feels immediate during recording.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq3_buffer_settings.png"
      },
      {
        number: 3,
        title: "Buffer Size in Practice",
        concept:
          "Visual examples of buffer settings for different workflow scenarios.",
        actions: [
          "Identify the buffer setting in Logic's Audio Preferences.",
          "Understand how your interface's buffer setting interacts with Logic.",
          "Learn to read the CPU/HD meter to diagnose performance issues."
        ],
        body:
          "Most audio interfaces have their own control software that also displays buffer size. Ensure Logic's setting matches what you've configured in your interface's driver or control panel.\n\nWhen you change buffer size in Logic, you may hear a brief interruption as the audio engine restarts. This is normal. Some interfaces require you to close and reopen Logic for buffer changes to fully take effect.\n\nIf you're using Logic's built-in Low Latency Mode (Record > Low Latency Mode), Logic temporarily disables certain plugins during recording to reduce latency even further. This is useful when you need to record with effects but can't lower the buffer any more without CPU overload.",
        symbolName: "slider.horizontal.3",
        visualTitle: "Buffer Configuration",
        visualCaption: "Interface and Logic settings.",
        settings: {
          "Logic Preferences": "Audio > Devices > I/O Buffer Size",
          "Low Latency Mode": "Bypasses high-latency plugins during record"
        },
        proTip:
          "If using an Apollo or similar DSP interface, monitor through its onboard processing to keep latency ultra-low while using high buffers in Logic.",
        avoidThis:
          "Don't assume one buffer size works for all tasks—switching based on recording vs mixing is standard practice.",
        checkYourWork:
          "You can comfortably record with real-time monitoring and mix without playback interruptions.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq3_latency_comparison.png"
      },
      {
        number: 4,
        title: "Do I really need to buy plugins or can I use the stock plugins?",
        concept:
          "Logic's included plugins are professional-grade tools. Third-party plugins offer different workflows, character, or specialized functions, but aren't required for quality results.",
        actions: [
          "Master Logic's stock EQ, compressor, and reverb before buying alternatives.",
          "Identify gaps in your workflow before purchasing third-party tools.",
          "Evaluate plugins with specific use cases in mind, not hype or marketing."
        ],
        body:
          "Logic Pro ships with one of the most comprehensive plugin suites of any DAW. The Channel EQ, stock compressors (including Vintage models), Space Designer convolution reverb, and ChromaVerb are all studio-quality tools used on professional productions worldwide. Many Grammy-winning records were mixed entirely with Logic's stock plugins.\n\nThe most common reason to buy third-party plugins is workflow preference or specific tonal character. Some engineers prefer the interface or sound of third-party EQs like FabFilter Pro-Q, but Logic's Channel EQ can achieve nearly identical results with more work. Similarly, compressors like the Empirical Labs Distressor or Universal Audio 1176 offer specific color and response curves, but Logic's Vintage VCA and Vintage FET cover similar territory.\n\nSpecialized plugins fill genuine gaps: advanced vocal tuning (like Melodyne), convolution reverb beyond Space Designer's capabilities, sophisticated mastering limiters (though Logic's Adaptive Limiter is quite good), or niche creative effects. Unless you have a specific problem you can't solve with stock tools, hold off on purchases.\n\nBeginner and intermediate producers benefit far more from learning their stock tools deeply than from collecting plugins. Pros who buy third-party gear usually do so for speed—they know a particular plugin's workflow intimately and can work faster with it. They're not getting sounds that are objectively better, just different or more efficient for their process.\n\nThat said, some third-party categories are legitimately superior for specific tasks: saturation/distortion units, advanced spectral processors, and highly specialized instruments. But for foundational mixing tools—EQ, compression, reverb, delay—Logic's stock offerings are legitimately professional.",
        symbolName: "puzzlepiece.extension",
        visualTitle: "Stock vs Third-Party",
        visualCaption: "Stock plugins are professional tools.",
        settings: {
          "Core Stock Tools": "Channel EQ, Compressor, Space Designer, ChromaVerb",
          "Optional Upgrades": "Melodyne, FabFilter bundle, specific character gear"
        },
        proTip:
          "Spend six months mixing exclusively with stock plugins to truly understand what you're missing before buying anything.",
        avoidThis:
          "Don't buy plugins based on YouTube hype or producer name-drops—evaluate them against real problems in your work.",
        checkYourWork:
          "You can point to a specific task you can't accomplish with stock tools before considering a purchase.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq4_stock_plugins_overview.png"
      },
      {
        number: 4,
        title: "Essential Stock Plugin Examples",
        concept:
          "Visual tour of Logic's most powerful included plugins and their professional applications.",
        actions: [
          "Explore the Vintage compressor collection.",
          "Learn Space Designer for convolution reverb.",
          "Understand when to use Channel EQ vs Vintage EQs."
        ],
        body:
          "Logic's Vintage Compressor collection emulates classic hardware: Vintage FET (1176-style fast limiter), Vintage VCA (SSL bus compressor character), and Vintage Opto (LA-2A smooth leveling). These cover the vast majority of compression needs.\n\nSpace Designer is a convolution reverb that can load impulse responses from real rooms, chambers, or hardware units. It's powerful enough for film scoring and high-end mixing. ChromaVerb offers algorithmic reverb with a beautiful interface.\n\nThe Channel EQ is clean, precise, and surgical. The Vintage EQs (Vintage Console EQ, Vintage Tube EQ) add harmonic color. Both have their place.\n\nFor dynamics beyond compression, Logic includes the Multipressor (multiband compression), Limiter, Expander, and DeEsser. For creative effects, you get Delay Designer, Pedalboard, Amp Designer, extensive modulation effects, and more.\n\nUnless you need something truly specialized, Logic's bundle is complete.",
        symbolName: "square.stack.3d.up",
        visualTitle: "Stock Plugin Power",
        visualCaption: "Professional tools included.",
        settings: {
          "Vintage Compressors": "FET, VCA, Opto models",
          "Reverbs": "Space Designer (convolution), ChromaVerb (algorithmic)",
          "EQs": "Channel EQ (surgical), Vintage models (character)"
        },
        proTip:
          "Use the Plugin Manager to hide plugins you never use, keeping your insert menus clean and focused.",
        avoidThis:
          "Don't ignore Vintage models thinking they're lesser—they're excellent emulations of legendary hardware.",
        checkYourWork:
          "You can explain what each of Logic's core dynamics and EQ plugins is best suited for.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq4_vintage_compressors.png"
      },
      {
        number: 5,
        title: "I finished a song, how do I export it?",
        concept:
          "Exporting (bouncing) renders your mix to a stereo file. Proper bounce settings preserve quality and ensure compatibility with mastering or distribution.",
        actions: [
          "Use File > Bounce > Project or Section to export your mix.",
          "Choose WAV or AIFF at 24-bit for mastering, or MP3/AAC for demos.",
          "Include tail and verify the bounce by reimporting it."
        ],
        body:
          "Once your mix is complete, exporting it to a stereo file is called 'bouncing.' This renders all tracks, plugins, and automation into a single audio file. Here's the step-by-step process:\n\n1. Set your cycle range to cover the entire song, including any reverb or delay tails at the end. If your song ends at bar 64, extend the cycle to bar 66 to capture those tails.\n\n2. Go to File > Bounce > Project or Section. Logic opens the bounce dialog with format options.\n\n3. For a mix you'll send to mastering or archive, choose:\n   - File Format: WAV or AIFF (lossless)\n   - Bit Depth: 24-bit (maintains quality)\n   - Sample Rate: Match your project (typically 44.1kHz or 48kHz)\n   - File Type: Interleaved (standard stereo file)\n\n4. If exporting for demo purposes, streaming previews, or file sharing, you can choose MP3 (for compatibility) or AAC (for quality at similar file size). Set quality to at least 256 kbps.\n\n5. Enable 'Offline' bounce mode for fastest, most reliable rendering. Real-time bounce is only necessary if you're using hardware processors or certain plugins that don't support offline mode.\n\n6. Choose a destination folder and descriptive filename. Include version numbers or date stamps if you're bouncing multiple iterations.\n\n7. Click OK to start the bounce. Logic renders the file and places it in your chosen location.\n\n8. Import the bounced file back into a fresh Logic project or simply play it in Finder to verify:\n   - No unexpected clipping or distortion\n   - The full length including tails is present\n   - The start isn't truncated\n   - The file sounds like what you heard during mixing\n\nIf you're delivering stems (individual instrument groups), use the same process but solo the groups you want to bounce, or use Track > Bounce Track in Place for each track individually.",
        symbolName: "square.and.arrow.up",
        visualTitle: "Bounce/Export Process",
        visualCaption: "Render to stereo file.",
        settings: {
          "Mastering/Archive": "24-bit WAV, project sample rate",
          "Demo/Streaming": "MP3 320kbps or AAC 256kbps",
          "Offline Bounce": "Faster and more reliable for most uses"
        },
        proTip:
          "Create a Bounce preset in the bounce dialog to quickly apply your standard settings.",
        avoidThis:
          "Don't use lossy formats (MP3/AAC) as your only archive—always keep a lossless 24-bit master.",
        checkYourWork:
          "The bounced file plays correctly from start to finish with all tails intact and no clipping.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq5_bounce_dialog.png"
      },
      {
        number: 5,
        title: "Bounce Settings Explained",
        concept:
          "Understanding each bounce option helps you choose the right settings for different delivery contexts.",
        actions: [
          "Learn the difference between offline and real-time bounce.",
          "Understand when to use normalize and when to avoid it.",
          "Know how to create multiple format bounces in one pass."
        ],
        body:
          "Offline bounce processes your mix as fast as your CPU allows, rendering in less than real-time. It's accurate and efficient for most uses. Real-time bounce plays the project in real-time, which is necessary for external hardware inserts or certain plugins that don't support offline rendering.\n\nNormalize is a post-bounce process that increases gain to bring the peak of your file to a target level (usually 0 dBFS or -0.1 dBFS). Use it cautiously—if your mix has proper headroom for mastering, normalization may push it into clipping range. For mastering-bound mixes, leave normalization off. For demo tracks, it can make them louder for casual listening.\n\nLogic's bounce dialog lets you export multiple formats simultaneously—check multiple format boxes to create WAV, MP3, and AAC versions in one bounce.\n\nIf you plan to send your mix to a mastering engineer, ask for their preferred format. Most prefer 24-bit WAV at the project sample rate with no processing on the master fader (or minimal, transparent processing).\n\nFor streaming upload, most platforms accept WAV, but MP3 or AAC are fine too since they'll be transcoded anyway. Higher bitrate source files generally result in better final quality.",
        symbolName: "gearshape.2",
        visualTitle: "Bounce Options",
        visualCaption: "Format, bit depth, normalization.",
        settings: {
          "Normalize": "Off for mastering, optional for demos",
          "PCM vs Compressed": "PCM (WAV/AIFF) for quality, MP3/AAC for convenience",
          "Sample Rate": "Match project or check mastering specs"
        },
        proTip:
          "Include metadata (song title, artist, album) in the bounce dialog for automatic tagging in MP3/AAC files.",
        avoidThis:
          "Don't normalize mixes intended for mastering—leave headroom for the mastering engineer to work.",
        checkYourWork:
          "You understand what each bounce setting does and can choose appropriate options for any delivery context.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq5_bounce_formats.png"
      },
      {
        number: 6,
        title: "I recorded a track but I barely see the waveform or the waveform is really large, what should I visually be looking for to know the levels are good?",
        concept:
          "Waveform size indicates recording level. Healthy recordings show clear, visible waveforms without clipping. Understanding visual cues prevents problems in mixing.",
        actions: [
          "Aim for waveform peaks around 50-75% of the track height visually.",
          "Ensure peaks reach roughly -12 to -6 dBFS on the channel meter.",
          "Avoid flat-topped waveforms (clipping) and barely visible waveforms (too quiet)."
        ],
        body:
          "When you record audio in Logic, the waveform display provides a quick visual health check. A well-recorded track should have a waveform that's clearly visible but not smashed against the top and bottom of the track lane.\n\nVisually, aim for waveforms that occupy about 50-75% of the vertical track space during louder sections. If the waveform is a thin line barely visible, your input gain was too low. If it's a solid block filling the entire height with flat tops, you've clipped the recording—the peaks were cut off, creating distortion that can't be fixed in mixing.\n\nOn the channel meter (the level meter on the track's channel strip or next to the track in the main window), healthy peaks should hit somewhere between -12 and -6 dBFS. For dynamic sources like vocals or acoustic instruments, seeing peaks around -10 dBFS is great. For dense sources like distorted guitar or highly compressed bass, -6 dBFS is fine. Anything consistently hitting 0 dBFS (red) is clipping and should be re-recorded.\n\nIf you recorded something too quietly, you can use clip gain (select the region, press Command-G) to increase its level before it hits plugins. This is better than cranking the track fader, which only boosts the signal after processing. However, extremely quiet recordings may have audible noise once gained up, so it's always better to set proper input levels during tracking.\n\nIf you recorded something too hot but it's not clipping, simply lower the clip gain or track fader. If it is clipping, you'll need to re-record at a lower input level. There's no way to un-clip a digital recording.\n\nWhen setting input levels before recording, play the loudest section and adjust your interface's input gain so peaks hit around -10 dBFS. This gives you headroom for unexpected loud moments while ensuring a strong, clean signal.",
        symbolName: "waveform",
        visualTitle: "Waveform Visual Health",
        visualCaption: "Clear shape, no clipping.",
        settings: {
          "Visual Target": "50-75% of track height",
          "Meter Target": "-12 to -6 dBFS peaks",
          "Clipping Indicator": "Red meter, flat-topped waveform"
        },
        proTip:
          "Enable Pre-Fader Metering (Control-click the meter and choose Pre) to see the true recorded level before any plugins or fader adjustments.",
        avoidThis:
          "Don't record at maximum levels 'just to be safe'—digital clipping is unforgiving, and you need headroom for peaks.",
        checkYourWork:
          "Your recorded waveforms are easily visible and show natural dynamic variation without clipping indicators.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq6_waveform_good_level.png"
      },
      {
        number: 6,
        title: "Waveform Problems and Solutions",
        concept:
          "Visual examples of too-quiet, too-loud, and properly recorded waveforms with remediation strategies.",
        actions: [
          "Identify clipping visually and on meters.",
          "Use clip gain to adjust quiet recordings before processing.",
          "Learn to set input gain properly before recording."
        ],
        body:
          "A waveform that barely shows up often results from input gain set too low on your audio interface. To fix it, use clip gain (Command-G on the region) or the Gain plugin as the first insert. However, if the original signal was very weak, you may introduce noise floor or hum when gaining it up significantly.\n\nA clipped waveform shows flat tops and bottoms where peaks were cut off. The channel meter shows red overload indicators. Clipping introduces harsh digital distortion. The only fix is to re-record at a lower level. Some light clipping might be salvageable with specialized tools, but prevention is key.\n\nA well-recorded waveform has a natural shape reflecting the dynamics of the performance. Peaks are visible but not flattened. The meter shows healthy levels with occasional peaks near -6 dBFS but rarely hitting 0.\n\nBefore recording, set your interface's input gain by having the performer play the loudest section. Adjust gain until peaks hit around -10 to -6 dBFS. This gives enough headroom for unexpected louder moments without sacrificing signal quality.",
        symbolName: "waveform.path.ecg",
        visualTitle: "Level Troubleshooting",
        visualCaption: "Too quiet, clipped, and correct.",
        settings: {
          "Clip Gain Adjustment": "Select region > Command-G",
          "Re-recording Threshold": "If clipped or extremely low"
        },
        proTip:
          "Use Logic's Test Oscillator (utility plugin) to generate a known-level signal (-18 dBFS sine wave) to calibrate your monitoring and level expectations.",
        avoidThis:
          "Don't try to 'fix' clipped recordings with EQ or compression—they'll still sound distorted. Re-record them.",
        checkYourWork:
          "You can distinguish between too-quiet, clipped, and healthy recordings visually and know the appropriate fix.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq6_waveform_comparison.png"
      },
      {
        number: 7,
        title: "Can I record several takes and choose parts of each?",
        concept:
          "Logic's comp recording feature (take folders and comping) allows you to record multiple passes and assemble the best composite performance from them.",
        actions: [
          "Enable Cycle mode and record multiple passes—Logic creates a take folder.",
          "Use Quick Swipe Comping to select the best segments from each take.",
          "Flatten the comp to create a final, editable audio region."
        ],
        body:
          "One of Logic's most powerful recording features is comping: recording multiple takes of the same section and then choosing the best parts of each to create a perfect composite performance. This is especially useful for vocals, solos, and any performance where nailing every phrase in one pass is difficult.\n\nHere's how it works:\n\n1. Set your cycle range over the section you want to record (e.g., a verse or chorus).\n\n2. Enable Cycle mode (press C or click the Cycle button in the control bar).\n\n3. Press Record (R). Logic will record the first pass. When it loops back, it automatically starts recording a second pass without stopping. Keep going as many times as needed.\n\n4. When you're done, press Stop. Logic creates a 'take folder' containing all your passes stacked together.\n\n5. Click the arrow in the top-left corner of the take folder to expand it. You'll see all takes displayed as lanes.\n\n6. Enable Quick Swipe Comping mode (View > Show Quick Swipe Comping or press Shift-click the take folder). Now you can click and drag across portions of different takes to select the segments you want to use.\n\n7. Logic's comp is non-destructive—the unused parts of each take are still there, so you can change your mind anytime.\n\n8. When satisfied, flatten the comp: select the take folder and choose Flatten from the Take Folder menu (or press Command-Control-F). This creates a single audio region from your comp.\n\nComping works with audio and MIDI. For vocals, it's common to record 3-5 complete passes and then comp the best lines. For instruments, you might comp for tuning accuracy or emotional delivery.\n\nYou can also manually create take folders by selecting multiple regions and choosing 'Folder > Pack Take Folder' from the region menu.",
        symbolName: "rectangle.stack",
        visualTitle: "Comp Recording Workflow",
        visualCaption: "Multiple takes, best parts.",
        settings: {
          "Record Mode": "Cycle Recording (C to enable cycle)",
          "Comp Mode": "Quick Swipe Comping (click take folder arrow)"
        },
        proTip:
          "Record more takes than you think you need—sometimes the 'safety' take at the end has the most natural, relaxed performance.",
        avoidThis:
          "Don't flatten your comp immediately—leave it as a take folder until final mix so you can adjust comps if needed.",
        checkYourWork:
          "You can record multiple vocal takes, comp the best phrases, and create a seamless final performance.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq7_take_folder_overview.png"
      },
      {
        number: 7,
        title: "Comping in Detail",
        concept:
          "Visual walkthrough of comping techniques, crossfade adjustments, and advanced comp editing.",
        actions: [
          "Learn to adjust comp segment boundaries and crossfades.",
          "Duplicate a comp to create alternate versions.",
          "Understand how to export comp alternatives for later decisions."
        ],
        body:
          "Once you've created a basic comp, you can fine-tune it. Click the border between comp segments to adjust where the transition happens. Logic automatically applies short crossfades to smooth transitions.\n\nIf transitions sound abrupt or phasey, adjust the crossfade length or position. Select the take folder and use the Comp Tool (available when Quick Swipe Comping is active) to tweak segment edges.\n\nTo create alternate comps from the same takes, use Take Folder > Duplicate Comp. This lets you try different combinations without losing your original comp.\n\nIf you're not sure which comp is best, leave them as alternatives. Logic's Alternative system lets you save multiple comps and recall them later.\n\nFor complex vocal productions, some engineers comp multiple take folders—recording verses separately, choruses separately—so each section has its own take folder for maximum flexibility.\n\nOnce you flatten a comp, it becomes a standard region that can be edited, moved, or processed like any other audio. But if you later realize you want to change the comp, you've lost access to the original takes unless you saved a pre-flattened version.",
        symbolName: "slider.horizontal.2.rectangle.and.arrow.triangle.2.circlepath",
        visualTitle: "Advanced Comping",
        visualCaption: "Fine-tune transitions and segments.",
        settings: {
          "Crossfade Length": "Adjustable per transition",
          "Alternate Comps": "Take Folder > Duplicate Comp"
        },
        proTip:
          "Name your take folder descriptively (e.g., 'Vocal Verse 1 Comp') before flattening to keep your arrange window organized.",
        avoidThis:
          "Don't flatten comps until you're confident—once flattened, you lose easy access to alternate takes.",
        checkYourWork:
          "Your comped performance sounds natural with smooth transitions and no audible clicks or phase issues.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq7_comping_workflow.png"
      },
      {
        number: 8,
        title: "If I bounce a track do I lose the original?",
        concept:
          "Bouncing in place renders a track to audio but doesn't delete the original. Understanding destructive vs non-destructive processes protects your work.",
        actions: [
          "Use Bounce in Place to render tracks with plugins/sends to audio.",
          "Understand that bouncing creates new regions; originals remain unless deleted.",
          "Learn the difference between destructive editing and non-destructive rendering."
        ],
        body:
          "When people say 'bounce a track,' they might mean two different things: bouncing the entire project to a stereo file (covered in FAQ 5), or using Bounce in Place to render an individual track to audio.\n\nBounce in Place (Track > Bounce in Place, or Control-B) takes a selected track or region, renders it with all active plugins and inserts, and creates a new audio region. This is useful for:\n\n- Committing CPU-heavy software instruments to audio to free up processing power\n- 'Printing' effects like reverb or delay that you want as part of the audio region\n- Creating audio stems from MIDI tracks for collaboration or archive\n\nWhen you bounce a track in place, Logic creates a new audio file and (by default) places it on a new track below the original, muting the original track. The original MIDI or audio track is still there—it's just muted. You can unmute it anytime and delete the bounced version if needed.\n\nLogic's bounce options let you choose:\n\n- Source: Pre-Fader or Post-Fader (include track volume/pan or not)\n- Include inserts, sends, or both\n- Bypass effect plugins (useful when committing just a software instrument without its processing)\n\nThis process is non-destructive—you're creating something new, not destroying the original. The only way to lose the original is to manually delete it.\n\nDestructive editing, by contrast, permanently alters audio files on disk. Logic's edits are almost always non-destructive—even when you trim a region, the full audio file remains intact, and you can extend the region boundaries to reveal 'hidden' audio.\n\nIf you want to fully replace a track with its bounced version and clean up, bounce in place, verify the bounce sounds correct, then delete the original track. But most engineers keep originals until final delivery, just in case.",
        symbolName: "arrow.down.doc",
        visualTitle: "Bounce in Place Process",
        visualCaption: "Render to audio, keep original.",
        settings: {
          "Bounce Source": "Pre-Fader (dry level) or Post-Fader (with volume/pan)",
          "Include": "Inserts, Sends, or Both",
          "Original Track": "Muted by default, not deleted"
        },
        proTip:
          "Before bouncing in place, name your track descriptively—the bounced audio file will inherit that name.",
        avoidThis:
          "Don't delete the original track immediately after bouncing—verify the bounce first, especially if using sends or automation.",
        checkYourWork:
          "You understand that bouncing creates new audio without deleting originals unless you choose to remove them.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq8_bounce_in_place.png"
      },
      {
        number: 8,
        title: "Bounce in Place Options",
        concept:
          "Detailed look at Bounce in Place settings and when to use each option.",
        actions: [
          "Learn when to use Pre-Fader vs Post-Fader.",
          "Understand how to include or exclude sends.",
          "Know how to bounce in place with tails for reverb/delay."
        ],
        body:
          "Pre-Fader bounce captures the track's output just before the fader, at unity gain. Use this when you want a clean audio render at the plugin's output level, ignoring your fader position. Post-Fader includes fader level and pan, baking those settings into the audio.\n\nIf you want to include reverb or delay tails from send effects, choose to include Sends. Logic will render the track with those effects blended in. Be aware: this commits the send levels and can't be undone except by re-bouncing.\n\nWhen bouncing software instruments with long release or reverb tails, ensure your region or cycle range extends beyond the last note to capture the full tail.\n\nBounce in Place is also useful for 'freezing' tracks—rendering them to audio to save CPU without deleting the original. This is similar to Logic's Track Freeze feature, but Bounce in Place gives you more control.\n\nIf you bounce MIDI tracks with plugins, you can later delete the instrument plugin and save CPU, keeping only the audio. The MIDI original remains if you mute instead of delete.",
        symbolName: "gearshape.2",
        visualTitle: "Bounce Settings Explained",
        visualCaption: "Pre/Post Fader, Sends, Tails.",
        settings: {
          "Pre-Fader": "Clean render at plugin output",
          "Post-Fader": "Includes fader level and pan",
          "Include Sends": "Bakes in reverb/delay effects"
        },
        proTip:
          "Use Bounce in Place with 'Bypass Effect Plugins' to commit a software instrument to audio without its processing chain—useful when you want to re-process the dry audio differently.",
        avoidThis:
          "Don't include sends in the bounce if you plan to adjust reverb/delay balance later—keep them on aux returns instead.",
        checkYourWork:
          "You can explain the difference between Pre-Fader and Post-Fader bounce and choose the right option for your needs.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq8_bounce_settings.png"
      },
      {
        number: 9,
        title: "Should I be mixing in mono or stereo?",
        concept:
          "Mixing in mono helps ensure balance and frequency clarity before stereo imaging is applied. Both mono and stereo monitoring are essential at different stages.",
        actions: [
          "Check your mix in mono during balancing and EQ decisions.",
          "Mix primarily in stereo for final panning, width, and spatial effects.",
          "Toggle between mono and stereo throughout the mixing process."
        ],
        body:
          "The short answer: use both. Mixing entirely in mono or entirely in stereo ignores important translation checks.\n\nMono mixing reveals problems that stereo imaging can mask. When you collapse a mix to mono, left and right channels sum together. This exposes:\n\n- Level imbalances: elements that seemed present in stereo may disappear in mono\n- Phase cancellation: stereo-widened or doubled tracks may thin out or vanish\n- Frequency masking: competing instruments that sat in separate stereo positions now directly clash\n\nMany classic mixing engineers built their entire balance in mono first, only adding panning at the end. This forces you to make separation through level, EQ, and depth (reverb) rather than relying on stereo trickery.\n\nHere's a practical workflow:\n\n1. Build your initial rough balance in stereo, panning core elements (kick, snare, bass, lead vocal) to center and supporting elements to sides.\n\n2. Switch to mono and adjust levels and EQ until everything is clear and balanced. If something disappears in mono, investigate phase issues or re-balance its level.\n\n3. Return to stereo and fine-tune panning and width effects.\n\n4. Periodically toggle back to mono throughout the mix to verify translation.\n\nTo check in mono in Logic:\n- Insert the Gain utility plugin on your Stereo Output and enable its 'Mono' button, or\n- Use the 'Mono' button on your audio interface or monitor controller if available, or\n- Hold Control-Command and click the Stereo Output fader, choosing 'Mono'\n\nMany playback systems (phone speakers, some Bluetooth speakers, PA systems) are effectively mono or near-mono. If your mix falls apart in mono, it'll sound weak on those systems.\n\nStereo mixing is essential for creating width, depth, and immersion. Once your mono balance is solid, stereo enhancements add dimension without compromising core translation.\n\nDon't get dogmatic—some genres (electronic, ambient) are stereo-first experiences. But even then, a mono check ensures your mix survives format conversion.",
        symbolName: "speaker.wave.2",
        visualTitle: "Mono vs Stereo Mixing",
        visualCaption: "Check both for translation.",
        settings: {
          "Mono Check Method": "Gain plugin Mono button, or interface control",
          "Workflow": "Build in stereo, verify in mono, finalize in stereo"
        },
        proTip:
          "Set up a key command to toggle mono on the Stereo Output so you can quickly check mono with one keystroke.",
        avoidThis:
          "Don't mix entirely in mono thinking it's more 'professional'—you'll miss stereo imaging problems and produce a narrow mix.",
        checkYourWork:
          "Your mix sounds balanced and clear in both mono and stereo, with no elements disappearing in mono.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq9_mono_stereo_comparison.png"
      },
      {
        number: 9,
        title: "Mono Compatibility in Practice",
        concept:
          "Understanding phase correlation, stereo widening tools, and mono-safe mixing techniques.",
        actions: [
          "Use the Correlation Meter to identify phase issues.",
          "Learn which stereo effects are mono-compatible.",
          "Test your mix on real mono playback systems."
        ],
        body:
          "The Correlation Meter (in Logic's Multimeter plugin) shows the phase relationship between left and right channels. +1 means perfectly in-phase (mono), 0 means uncorrelated (wide stereo), and -1 means fully out-of-phase.\n\nIf your correlation meter shows strong negative values during significant parts of your mix, those sections may have phase cancellation issues. In mono playback, they'll sound thin or hollow.\n\nStereo widening plugins (like stereo imagers, mid-side processors, or pseudo-stereo effects) can create width but often sacrifice mono compatibility. Use them sparingly and always check the result in mono.\n\nNatural panning and level differences are mono-safe because they don't introduce phase manipulation—they just place sounds in the stereo field. When summed to mono, all elements remain present, just centered.\n\nSome reverbs and delays create width through slightly different left/right timing or tonality. These usually collapse acceptably to mono, but verify.\n\nDouble-tracked guitars or vocals are naturally mono-compatible if each take is genuinely different. Artificial doubling using delay or pitch shifting often introduces phase issues.\n\nTest your mix on a real mono speaker (phone, laptop, or small Bluetooth speaker) to hear exactly how it translates, not just through a mono button on your studio monitors.",
        symbolName: "waveform.and.magnifyingglass",
        visualTitle: "Phase and Correlation",
        visualCaption: "Mono-safe stereo techniques.",
        settings: {
          "Correlation Meter": "Use Multimeter plugin to monitor phase",
          "Safe Stereo": "Natural panning, true double-tracking",
          "Risky Stereo": "Heavy widening plugins, artificial doubling"
        },
        proTip:
          "If a stereo-widened element disappears in mono, try narrowing the width or re-recording the part differently rather than abandoning the effect entirely.",
        avoidThis:
          "Don't use extreme stereo widening on bass or lead vocals—these core elements must remain strong in mono.",
        checkYourWork:
          "Your correlation meter stays mostly positive, and your mix retains clarity and balance when played through a single speaker.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq9_correlation_meter.png"
      },
      {
        number: 10,
        title: "How do I make the waveform bigger so I can see it?",
        concept:
          "Logic offers multiple zoom controls for waveforms and track heights. Understanding these tools improves editing speed and visual clarity.",
        actions: [
          "Use vertical zoom to adjust track height and waveform size.",
          "Use the Zoom tool or trackpad gestures for horizontal and vertical zooming.",
          "Set up key commands for instant zoom presets."
        ],
        body:
          "Logic provides several ways to adjust waveform display size for easier editing:\n\n1. Vertical Track Zoom (Track Height):\n   - Hover over the lower edge of a track in the track list until the cursor becomes a vertical resize arrow, then click and drag up or down.\n   - This adjusts that track's height. Taller tracks show larger waveforms.\n   - Hold Option while dragging to resize all tracks simultaneously.\n\n2. Waveform Zoom:\n   - Select a region, then use the vertical zoom slider (right side of the main window, below the Inspector) to increase waveform amplitude display without changing track height.\n   - This makes quiet waveforms more visible without affecting actual audio level.\n\n3. Zoom Tool and Shortcuts:\n   - Press Z to activate the Zoom tool. Click and drag to zoom in on a specific area. Option-click to zoom out.\n   - Use Control-Left Arrow / Control-Right Arrow to zoom horizontally.\n   - Use Control-Up Arrow / Control-Down Arrow to zoom vertically.\n   - Trackpad users: pinch to zoom in/out horizontally and vertically.\n\n4. Zoom Presets:\n   - Set zoom levels you use frequently (like 'Full Project View,' 'Region Edit View') and save them as key command presets.\n   - Use View > Create Track Zoom to save and recall specific zoom states.\n\n5. Autoscroll and Link Modes:\n   - Enable autoscroll (View > Autoscroll or press C) to keep the playhead in view.\n   - Link track zoom to arrange zoom for coordinated navigation.\n\nFor detailed editing (like finding exact zero-crossings, fixing clicks, or precise comping), zoom in both horizontally (to see individual samples) and vertically (to see waveform detail).\n\nFor arranging and balancing, zoom out to see the full project or entire song sections at once.\n\nMost engineers develop muscle memory for zoom shortcuts since they zoom in and out constantly during mixing and editing.",
        symbolName: "plus.magnifyingglass",
        visualTitle: "Zoom and Track Height",
        visualCaption: "Adjust display for editing clarity.",
        settings: {
          "Vertical Track Resize": "Drag track lower edge",
          "Waveform Amplitude Zoom": "Vertical zoom slider (right side)",
          "Horizontal/Vertical Zoom": "Control + Arrow keys, or trackpad gestures"
        },
        proTip:
          "Set up a key command for 'Zoom to Fit Selection' to instantly fill the window with a selected region—extremely useful for detailed editing.",
        avoidThis:
          "Don't confuse visual waveform zoom with gain—zooming in on a waveform doesn't make the audio louder, it just makes it easier to see.",
        checkYourWork:
          "You can quickly zoom in for detailed editing and zoom out for big-picture arrangement view without hunting through menus.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq10_track_zoom.png"
      },
      {
        number: 10,
        title: "Zoom Workflows for Editing",
        concept:
          "Practical zoom workflows for common editing tasks: comping, cleaning up, arranging, and mixing.",
        actions: [
          "Use zoom presets for instant task-switching.",
          "Learn to navigate quickly with key commands.",
          "Set up screensets for different zoom and window layouts."
        ],
        body:
          "Different mixing and editing tasks benefit from different zoom levels:\n\n- Comping vocals: Zoom horizontally to see one line or phrase at a time, zoom vertically to see waveform detail for choosing the best take.\n\n- Cleaning up clicks or breaths: Zoom way in horizontally (sample-level view), zoom vertically to see waveform details, use the Fade tool or Scissor tool for precise edits.\n\n- Arranging and structure edits: Zoom out fully to see the entire song, making it easier to move sections or identify repetition.\n\n- Balancing and mixing: Moderate horizontal zoom showing 8-16 bars at a time, moderate track heights so you can see many tracks without scrolling.\n\nScreensets (View > Screensets) let you save different window layouts, zoom levels, and track configurations. Create a 'Comping' screenset with tall track heights and zoomed-in detail, a 'Mixing' screenset with moderate zoom and mixer visible, and an 'Arranging' screenset with full-project zoom and all tracks shown.\n\nIf you work with a trackpad, two-finger pinch gestures for zoom become second nature. If using a mouse, set up key commands for zoom in/out and practice until they're muscle memory.\n\nThe faster you can navigate zoom levels, the more efficient your workflow.",
        symbolName: "rectangle.and.hand.point.up.left",
        visualTitle: "Task-Based Zoom",
        visualCaption: "Different tasks need different views.",
        settings: {
          "Comping": "Horizontal: 1 phrase, Vertical: tall for detail",
          "Editing": "Sample-level horizontal, waveform detail vertical",
          "Mixing": "8-16 bars, moderate track height",
          "Arranging": "Full project visible"
        },
        proTip:
          "Use 'Zoom to Fit All Contents' (Shift-Z) to instantly see your entire project from start to end—perfect for arrangement overview.",
        avoidThis:
          "Don't work at one zoom level the whole time—constantly adjust zoom to suit the task for maximum efficiency.",
        checkYourWork:
          "You can rapidly switch between detailed editing view and full-project overview using shortcuts or screensets.",
        stepScreenshot: "/assets/training/frequently-asked-questions/faq10_zoom_workflows.png"
      }
    ]
  }
];
