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
  }
];
