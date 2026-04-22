import type { CardItem, CheatSheet } from "@/lib/sheet-schema";

const commonMixChain = [
  { name: "Gain", goal: "Set healthy peaks around -12 dBFS." },
  { name: "Surgical EQ", goal: "Remove mud and harsh resonances." },
  { name: "Compression", goal: "Control dynamics and add consistency." },
  { name: "Tone EQ", goal: "Shape musical balance and clarity." },
  { name: "Saturation", goal: "Add harmonics and perceived density." },
  { name: "Space", goal: "Use subtle reverb or delay if needed." },
  { name: "Limiting", goal: "Catch peaks and cap final level." }
] as const;

const mixCards = (focus: string): CardItem[] => [
  {
    title: "EQ Targets",
    items: ["High-pass where possible", "Cut boxiness first", "Boost for intent, not volume"]
  },
  {
    title: "Compression Targets",
    items: ["Ratio 3:1 to 4:1", "Attack 10-30 ms", "Aim 2-6 dB gain reduction"]
  },
  {
    title: "Metering Targets",
    items: ["Keep peaks below -6 dBFS", "Watch low-end buildup", `Prioritize ${focus} clarity`]
  }
];

function makeMixSheet(config: {
  id: string;
  title: string;
  icon: string;
  accent: CheatSheet["header"]["accent"];
  focus: string;
  eqRows: string[][];
  plugins: string[][];
  quickTips: string[];
}): CheatSheet {
  const pluginImagePositions = ["12% 82%", "37% 82%", "61% 82%", "84% 82%"];

  return {
    id: config.id,
    header: {
      title: config.title,
      subtitle: "IN LOGIC PRO",
      icon: config.icon,
      accent: config.accent
    },
    summary: `A practical ${config.focus.toLowerCase()} cheat sheet with chain order, tone moves, level targets, and mix decisions you can adjust later.`,
    sections: [
      {
        type: "chain",
        title: "1. Chain Order (Start to Finish)",
        steps: commonMixChain.map((step) => ({ ...step }))
      },
      {
        type: "cards",
        title: "2-4. EQ, Compression, and Metering",
        cards: mixCards(config.focus)
      },
      {
        type: "table",
        title: "EQ Moves",
        table: {
          columns: ["Range", "Move", "Why"],
          rows: config.eqRows
        }
      },
      {
        type: "cards",
        title: "Plugin Recommendations",
        columns: 4,
        cards: config.plugins.map(([name, detail], index) => ({
          title: name,
          items: [
            {
              text: detail,
              imageSrc: `/assets/sheets/${config.id}.png`,
              imageAlt: `${config.title} ${name} plugin photo`,
              imagePosition: pluginImagePositions[index] ?? "50% 82%"
            }
          ]
        }))
      },
      {
        type: "checklist",
        title: "Quick Reminders",
        items: config.quickTips
      }
    ]
  };
}

export const cheatSheets: CheatSheet[] = [
  makeMixSheet({
    id: "bass-guitar-mixing",
    title: "Bass Guitar Mixing",
    icon: "🎸",
    accent: "blue",
    focus: "Low-end",
    eqRows: [
      ["25-40 Hz", "High-pass filter", "Remove sub rumble"],
      ["100-250 Hz", "Low-mid cut", "Clean mud and boxiness"],
      ["700 Hz-1 kHz", "Low-mid focus", "Add body and note definition"],
      ["2-5 kHz", "Presence boost", "Add attack and string clarity"],
      ["8-12 kHz", "High shelf", "Add top-end sheen"]
    ],
    plugins: [
      ["EQ", "FabFilter Pro-Q 3, Waves F6"],
      ["Compression", "FabFilter Pro-C 2, Waves CLA-76"],
      ["Saturation", "Soundtoys Decapitator, Waves J37"],
      ["Reverb", "Valhalla VintageVerb, Waves H-Reverb"]
    ],
    quickTips: [
      "Carve space for kick and bass relationship.",
      "Keep bass mostly mono for translation.",
      "Use subtle saturation before heavy EQ boosts.",
      "Reference low-end against trusted songs."
    ]
  }),
  makeMixSheet({
    id: "kick-drum-mixing",
    title: "Kick Drum Mixing",
    icon: "🥁",
    accent: "blue",
    focus: "Punch",
    eqRows: [
      ["25-35 Hz", "High-pass filter", "Remove unusable sub"],
      ["150-300 Hz", "Low cut", "Reduce mud and boxiness"],
      ["400-800 Hz", "Body", "Add weight if thin"],
      ["2-5 kHz", "Attack boost", "Bring out beater click"],
      ["5-8 kHz", "Click", "Improve definition"]
    ],
    plugins: [
      ["EQ", "Logic Channel EQ, FabFilter Pro-Q 3"],
      ["Compression", "Logic Compressor, Waves API 2500"],
      ["Saturation", "Waves J37, Soundtoys Decapitator"],
      ["Limiting", "Waves L2, UAD Precision Limiter"]
    ],
    quickTips: [
      "Shape transients before adding more low-end.",
      "Level-match when bypassing compressors.",
      "Control kick and bass at arrangement level too.",
      "Do not clip the bus to get loudness."
    ]
  }),
  makeMixSheet({
    id: "snare-drum-mixing",
    title: "Snare Drum Mixing",
    icon: "🥁",
    accent: "purple",
    focus: "Crack and body",
    eqRows: [
      ["80-120 Hz", "High-pass filter", "Remove low rumble"],
      ["200-400 Hz", "Low-mid cut", "Reduce mud and ring"],
      ["500 Hz-1 kHz", "Body", "Add fullness where needed"],
      ["2-5 kHz", "Crack boost", "Enhance attack and snap"],
      ["7-12 kHz", "Snap shelf", "Add air and brightness"]
    ],
    plugins: [
      ["EQ", "FabFilter Pro-Q 3, Waves F6"],
      ["Compression", "Waves CLA-76, API 2500"],
      ["Saturation", "Waves Kramer Tape, FabFilter Saturn 2"],
      ["Reverb", "UAD EMT 140, Valhalla VintageVerb"]
    ],
    quickTips: [
      "Use short ambience, not long tails.",
      "Blend transient and tone layers carefully.",
      "Parallel compression adds density without flattening.",
      "Always verify in context with overheads."
    ]
  }),
  makeMixSheet({
    id: "electric-guitar-mixing",
    title: "Electric Guitar Mixing",
    icon: "🎸",
    accent: "orange",
    focus: "Tone and width",
    eqRows: [
      ["70-120 Hz", "High-pass filter", "Remove low rumble"],
      ["200-400 Hz", "Low-mid cut", "Clean mud and boxiness"],
      ["600 Hz-1.5 kHz", "Mid cut", "Reduce harsh nasal tones"],
      ["2-5 kHz", "Presence", "Add attack and definition"],
      ["6-10 kHz", "High shelf", "Add air and sparkle"]
    ],
    plugins: [
      ["EQ", "FabFilter Pro-Q 3, API 550A"],
      ["Compression", "Waves CLA-76, FabFilter Pro-C 2"],
      ["Saturation", "Waves J37, FabFilter Saturn 2"],
      ["Space", "Waves H-Reverb, Pro-R 2"]
    ],
    quickTips: [
      "Pan doubles for width before adding stereo widening.",
      "Cut harshness before boosting presence.",
      "Keep rhythm guitars phase-coherent in mono.",
      "Use reverbs as depth, not wash."
    ]
  }),
  makeMixSheet({
    id: "vocal-mixing",
    title: "Vocal Mixing",
    icon: "🎤",
    accent: "purple",
    focus: "Intelligibility",
    eqRows: [
      ["80-120 Hz", "High-pass filter", "Remove low-end rumble"],
      ["200-400 Hz", "Low-mid cut", "Reduce mud and congestion"],
      ["2-5 kHz", "Presence boost", "Improve lyric clarity"],
      ["10-16 kHz", "Air boost", "Add openness"],
      ["6-8 kHz", "De-ess support", "Control sibilance"]
    ],
    plugins: [
      ["EQ", "Waves F6, FabFilter Pro-Q 3"],
      ["Compression", "CLA-76, UAD 1176"],
      ["Saturation", "Waves J37, AMPX ATR-102"],
      ["De-essing", "Waves DeEsser, FabFilter Pro-DS"]
    ],
    quickTips: [
      "Ride the vocal level before over-compressing.",
      "Apply de-essing in stages if needed.",
      "Keep effects tucked behind the dry vocal.",
      "Reference with a commercial vocal track."
    ]
  }),
  makeMixSheet({
    id: "toms-mixing-guide",
    title: "Toms Mixing Guide",
    icon: "🥁",
    accent: "purple",
    focus: "Tone and depth",
    eqRows: [
      ["80-120 Hz", "Low cut", "Remove rumble and unwanted mud"],
      ["150-300 Hz", "Body", "Add fullness and tone"],
      ["400-800 Hz", "Boxiness cut", "Clear muddy resonance"],
      ["2-5 kHz", "Attack", "Bring out stick and beater definition"],
      ["8-12 kHz", "Air", "Add openness and top detail"]
    ],
    plugins: [
      ["EQ", "FabFilter Pro-Q 3, Channel EQ"],
      ["Compression", "Studio VCA, FET compressor"],
      ["Gate/Expander", "Noise Gate, Expander for bleed control"],
      ["Saturation", "Tape or overdrive (subtle)"]
    ],
    quickTips: [
      "Pan toms to match kit perspective.",
      "Use less processing if overhead blend already works.",
      "Avoid over-gating to keep natural decay.",
      "Tune with the song key when possible."
    ]
  }),
  makeMixSheet({
    id: "room-mic-mixing-guide",
    title: "Room Mic Mixing Guide",
    icon: "🎙️",
    accent: "teal",
    focus: "Space and realism",
    eqRows: [
      ["80-150 Hz", "Low cut", "Remove low-end rumble"],
      ["200-500 Hz", "Low-mid control", "Reduce boxy buildup"],
      ["2-5 kHz", "Presence", "Add articulation if needed"],
      ["8-12 kHz", "Air", "Add life and shimmer"],
      ["12-16 kHz", "Shelf", "Optional brightness lift"]
    ],
    plugins: [
      ["EQ", "Vintage EQ or Pro-Q 3"],
      ["Compression", "Studio VCA, Opto/FET blend"],
      ["Gate (Optional)", "Use lightly for spill control"],
      ["Saturation", "Tape drive for character"]
    ],
    quickTips: [
      "Room mics should support, not dominate.",
      "Check mono and phase before level rides.",
      "Bring room up until feel appears, then back off.",
      "Use fader automation instead of hard muting."
    ]
  }),
  makeMixSheet({
    id: "overheads-mixing-guide",
    title: "Overheads Mixing Guide",
    icon: "🎧",
    accent: "blue",
    focus: "Kit balance",
    eqRows: [
      ["80-120 Hz", "Low cut", "Remove unnecessary low-end build"],
      ["200-500 Hz", "Low-mid control", "Reduce boxiness and cloud"],
      ["2-5 kHz", "Presence", "Add cymbal and stick definition"],
      ["8-12 kHz", "Air", "Open the top end subtly"],
      ["12-16 kHz", "Shelf", "Optional brilliance"]
    ],
    plugins: [
      ["EQ", "Channel EQ, Pro-Q 3"],
      ["Compression", "Gentle glue compression"],
      ["Phase Tools", "Correlation/phase check utilities"],
      ["Effects", "Very subtle room or saturation only"]
    ],
    quickTips: [
      "Think of overheads as the full-kit picture.",
      "Use small EQ moves and trust balance first.",
      "Fix phase before heavy processing.",
      "Keep cymbals natural, not hyped."
    ]
  }),
  makeMixSheet({
    id: "drum-bus-mixing",
    title: "Drum Bus Mixing",
    icon: "🥁",
    accent: "blue",
    focus: "Glue and impact",
    eqRows: [
      ["20-30 Hz", "High-pass filter", "Remove unnecessary sub"],
      ["200-350 Hz", "Low-mid cut", "Clean up mud and boxiness"],
      ["400-600 Hz", "Mud cut", "Control congestion"],
      ["2-5 kHz", "Presence", "Add attack and detail"],
      ["8-12 kHz", "High shelf", "Add air and sparkle"]
    ],
    plugins: [
      ["Bus Compression", "Waves SSL G-Master, UAD SSL 4000 G"],
      ["Saturation", "Waves J37, FabFilter Saturn 2"],
      ["Transient", "Waves Trans-X, FabFilter Pro-DS for control"],
      ["Reverb", "Waves Abbey Road TG, Pro-R 2"]
    ],
    quickTips: [
      "Blend parallel compression for weight.",
      "Preserve attack on snare and kick.",
      "Bus EQ should be broad and musical.",
      "Compare bypass at matched loudness."
    ]
  }),
  makeMixSheet({
    id: "vocal-bus-mixing",
    title: "Vocal Bus Mixing",
    icon: "🎙️",
    accent: "purple",
    focus: "Cohesion",
    eqRows: [
      ["80-120 Hz", "High-pass filter", "Remove unnecessary rumble"],
      ["200-350 Hz", "Low-mid cut", "Clear mud and clutter"],
      ["400-800 Hz", "Low-mid control", "Reduce honk and congestion"],
      ["2-5 kHz", "Presence", "Increase clarity and diction"],
      ["12-16 kHz", "High shelf", "Add shine and openness"]
    ],
    plugins: [
      ["EQ", "Waves F6, FabFilter Pro-Q 3"],
      ["Compression", "Waves SSL G-Master, CLA-76"],
      ["Saturation", "Waves J37, AMPX ATR-102"],
      ["De-essing", "Sibilance, Pro-DS"]
    ],
    quickTips: [
      "Small bus reductions are often enough.",
      "Use reverb send as glue, not distance.",
      "Keep lead vocal centered and upfront.",
      "Automate emotional moments by phrase."
    ]
  }),
  makeMixSheet({
    id: "main-bus-pre-master",
    title: "Main Bus / Pre-Master Mixing",
    icon: "🔊",
    accent: "slate",
    focus: "Balance and headroom",
    eqRows: [
      ["20-30 Hz", "High-pass filter", "Clean subsonic rumble"],
      ["150-300 Hz", "Low-mid cut", "Reduce low-mid congestion"],
      ["1-3 kHz", "Presence", "Improve detail and definition"],
      ["10-16 kHz", "High shelf", "Open top end carefully"],
      ["16-20 kHz", "Air", "Optional sparkle"]
    ],
    plugins: [
      ["EQ", "Channel EQ, Pro-Q 3"],
      ["Glue Compression", "SSL style, API 2500 light settings"],
      ["Saturation", "J37, Saturn 2 subtle"],
      ["Limiting", "Transparent limiter for peak catch"]
    ],
    quickTips: [
      "Leave target peak around -6 dBFS.",
      "Do not normalize at mix stage.",
      "Check mono and low-volume translation.",
      "Avoid fixing arrangement issues on bus."
    ]
  }),
  {
    id: "gain-staging-lufs",
    header: {
      title: "Gain Staging & LUFS",
      subtitle: "Cheat Sheet for Spotify",
      icon: "📈",
      accent: "green"
    },
    summary: "Set healthy input levels from tracks to master, then target streaming loudness without destroying dynamics.",
    sections: [
      {
        type: "cards",
        title: "Core Principles",
        cards: [
          {
            title: "Gain Staging Basics",
            items: ["Set proper source levels", "Avoid clipping at every stage", "Leave mix bus headroom"]
          },
          {
            title: "Rule of Thumb",
            items: ["If it sounds good quieter, it will sound louder later", "Balance first, loudness second"]
          },
          {
            title: "Master Targets",
            items: ["Integrated: around -14 LUFS", "True peak ceiling: -1.0 dBTP"]
          }
        ]
      },
      {
        type: "table",
        title: "Ideal Peak Levels",
        table: {
          columns: ["Stage", "Target"],
          rows: [
            ["Individual tracks", "-18 dBFS"],
            ["After plugins", "-18 to -12 dBFS"],
            ["Groups / buses", "-12 to -6 dBFS"],
            ["Main bus pre-master", "-6 dBFS max peaks"],
            ["Master true peak", "-1.0 dBTP"]
          ]
        }
      },
      {
        type: "checklist",
        title: "Quick Checklist",
        items: [
          "No red clipping on tracks or buses",
          "Peaks follow target ranges",
          "Integrated LUFS matches genre target",
          "Reference against pro mixes regularly"
        ]
      }
    ]
  },
  {
    id: "mastering-final-mix",
    header: {
      title: "Mastering the Final Mix",
      subtitle: "Enhance, do not fix",
      icon: "✨",
      accent: "orange"
    },
    summary: "A mastering workflow focused on translation, loudness control, and clean delivery.",
    sections: [
      {
        type: "cards",
        title: "Mastering Order",
        columns: 4,
        cards: [
          { title: "1. Listen & Analyze", items: ["Check tonal balance", "Check dynamics", "Use references"] },
          { title: "2. EQ", items: ["Correct broad issues", "Avoid over-EQ"] },
          { title: "3. Dynamics", items: ["Use light glue", "Keep punch"] },
          { title: "4. Limiter", items: ["Set final ceiling", "Control clipping"] }
        ]
      },
      {
        type: "table",
        title: "Spotify Loudness Targets",
        table: {
          columns: ["Style", "Integrated LUFS", "True Peak"],
          rows: [
            ["Standard", "-14 LUFS", "-1.0 dBTP"],
            ["Louder pop/edm", "-10 to -12 LUFS", "-1.0 dBTP"],
            ["Dynamic genres", "-16 to -18 LUFS", "-1.0 dBTP"]
          ]
        }
      },
      {
        type: "checklist",
        title: "Final Delivery",
        items: [
          "Check in mono and stereo",
          "Confirm no inter-sample clipping",
          "Export WAV 24-bit (or project spec)",
          "Embed metadata and version naming"
        ]
      }
    ]
  },
  {
    id: "guitar-bus-mixing",
    header: {
      title: "Guitar Bus Mixing Cheat Sheet",
      subtitle: "Glue, control, and enhance",
      icon: "🎸",
      accent: "blue"
    },
    summary: "Bring all guitar layers together with bus compression, tone shaping, and controlled stereo image.",
    sections: [
      {
        type: "cards",
        title: "Bus Purpose and Signal Flow",
        cards: [
          {
            title: "Purpose",
            items: ["Glue rhythm and lead guitars", "Create cohesion", "Save CPU with shared processing"]
          },
          {
            title: "Signal Flow",
            items: ["Tracks -> Guitar Bus -> Mix Bus", "Process and glue all guitars"]
          },
          {
            title: "Level Targets",
            items: ["Individual tracks: -18 to -12 dBFS", "Bus peaks: -6 dBFS max", "Master peak: -1 dBTP ceiling"]
          }
        ]
      },
      {
        type: "table",
        title: "EQ Guidelines",
        table: {
          columns: ["Range", "What It Does", "Tip"],
          rows: [
            ["20-80 Hz", "Sub and low-end build-up", "High-pass if needed"],
            ["80-150 Hz", "Boom and thump", "Cut if muddy"],
            ["150-400 Hz", "Boxiness and mud", "Use broad cut"],
            ["2-5 kHz", "Presence and pick attack", "Boost carefully"],
            ["5-10 kHz", "Air and sparkle", "Use shelf gently"]
          ]
        }
      },
      {
        type: "checklist",
        title: "Common Mistakes to Avoid",
        items: [
          "Over-compressing and killing dynamics",
          "Over-saturating and losing clarity",
          "Making guitars too wide (phase issues)",
          "Ignoring gain staging and clipping"
        ]
      }
    ]
  },
  {
    id: "tracking-band",
    header: {
      title: "Tracking a Band Cheat Sheet",
      subtitle: "Bass, drums, and vocals",
      icon: "🎚️",
      accent: "teal"
    },
    summary: "Capture clean, intentional performances with stable gain staging and session routing from day one.",
    sections: [
      {
        type: "cards",
        title: "Prepare and Track",
        cards: [
          {
            title: "Before Tracking",
            items: ["Tune and check instruments", "Label channels", "Create click and scratch guide"]
          },
          {
            title: "Tracking Order",
            items: ["Drums first", "Bass second", "Vocals after rhythm foundation"]
          },
          {
            title: "Mic & Setup",
            items: ["Use proper mic distance", "Monitor bleed", "Record room when useful"]
          }
        ]
      },
      {
        type: "table",
        title: "Gain Staging Quick Guide",
        table: {
          columns: ["Metric", "Recommended"],
          rows: [
            ["Peaks", "-12 to -6 dBFS"],
            ["RMS", "-18 to -12 dBFS"],
            ["Avoid", "Any clipping or over-hot stems"]
          ]
        }
      },
      {
        type: "checklist",
        title: "After Tracking",
        items: [
          "Listen through all takes",
          "Comp clean edits",
          "Save and label sessions clearly",
          "Back up raw audio before mixing"
        ]
      }
    ]
  },
  {
    id: "logic-pro-workflow-v1",
    header: {
      title: "Logic Pro Workflow Cheat Sheet",
      subtitle: "Organize, save, and move fast",
      icon: "💽",
      accent: "purple"
    },
    summary: "A practical workflow for templates, folder structure, bouncing, takes, and final project cleanup.",
    sections: [
      {
        type: "cards",
        title: "Workflow Core",
        columns: 4,
        cards: [
          { title: "Templates", items: ["Start from reusable template", "Preload routing and markers"] },
          { title: "Folders", items: ["Song project root", "Audio files, backups, stems"] },
          { title: "Saving", items: ["Save versions frequently", "Use Save As intentionally"] },
          { title: "Bouncing", items: ["Bounce in place for edits", "Export WAV 24-bit"] }
        ]
      },
      {
        type: "cards",
        title: "Editing and Session Control",
        cards: [
          { title: "Comping", items: ["Use take folders", "Label best takes quickly"] },
          { title: "Punch In/Out", items: ["Set locators before record", "Use cycle when needed"] },
          { title: "Project Management", items: ["Clean project audio regularly", "Archive major milestones"] }
        ]
      },
      {
        type: "checklist",
        title: "Final Checklist",
        items: [
          "Unused tracks muted or removed",
          "Correct bounce/sample rate settings",
          "Project renamed and backed up",
          "Channel strips and presets exported"
        ]
      }
    ]
  },
  {
    id: "logic-pro-workflow-v2",
    header: {
      title: "Logic Pro Workflow Cheat Sheet",
      subtitle: "Good workflow = better music",
      icon: "🎹",
      accent: "blue"
    },
    summary: "Second workflow variant with stronger emphasis on track stacks, locators, and keyboard shortcuts.",
    sections: [
      {
        type: "cards",
        title: "Start Smart",
        columns: 4,
        cards: [
          { title: "Templates", items: ["Create by genre", "Save channel strip defaults"] },
          { title: "Folder Setup", items: ["Create folder tree first", "Keep references and stems organized"] },
          { title: "Save Often", items: ["Use version numbers", "Back up project folder"] },
          { title: "Bounce", items: ["Project or section bounce", "Keep export naming consistent"] }
        ]
      },
      {
        type: "cards",
        title: "Mix-Prep Utilities",
        cards: [
          { title: "Track Stacks", items: ["Group drums, guitars, vocals", "Color-code groups"] },
          { title: "Markers & Locators", items: ["Label sections quickly", "Navigate edits faster"] },
          { title: "Plugin Presets", items: ["Save reusable chains", "Build your go-to palette"] }
        ]
      },
      {
        type: "checklist",
        title: "Final Export Checklist",
        items: [
          "Right file format and sample rate",
          "No clipping on printed masters",
          "Correct naming and metadata",
          "Archive project and deliverables"
        ]
      }
    ]
  }
];

export const defaultSheetId = cheatSheets[0]?.id ?? "";

export const sheetMap = new Map(cheatSheets.map((sheet) => [sheet.id, sheet]));
