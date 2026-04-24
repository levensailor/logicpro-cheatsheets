import type { CardItem, CheatSheet, SheetSection } from "@/lib/sheet-schema";
import { pluginCatalog } from "@/data/plugins/catalog";

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

function normalizePluginKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const pluginImageByNormalizedName: Record<string, string> = {
  logicchanneleq: "/assets/plugins/logic-channel-eq.png",
  channeleq: "/assets/plugins/logic-channel-eq.png",
  wavesf6: "/assets/plugins/waves-f6.png",
  fabfilterproq3: "/assets/plugins/fabfilter-pro-q-4.jpg",
  fabfilterproq4: "/assets/plugins/fabfilter-pro-q-4.jpg",
  fabfilterproc2: "/assets/plugins/fabfilter-pro-c-3.jpg",
  fabfilterproc3: "/assets/plugins/fabfilter-pro-c-3.jpg",
  wavescla76: "/assets/plugins/waves-cla76.png",
  cla76: "/assets/plugins/waves-cla76.png",
  wavesapi2500: "/assets/plugins/waves-api-2500.jpg",
  api2500: "/assets/plugins/waves-api-2500.jpg",
  api550a: "/assets/plugins/api-550a.png",
  soundtoysdecapitator: "/assets/plugins/decapitator.jpg",
  decapitator: "/assets/plugins/decapitator.jpg",
  wavesj37: "/assets/plugins/waves-j37.png",
  waveskramertape: "/assets/plugins/waves-kramer.jpg",
  waveskramer: "/assets/plugins/waves-kramer.jpg",
  fabfiltersaturn2: "/assets/plugins/fabfilter-saturn.jpg",
  fabfiltersaturn: "/assets/plugins/fabfilter-saturn.jpg",
  valhallavintageverb: "/assets/plugins/valhalla-vintage-verb.png",
  waveshreverb: "/assets/plugins/waves-h-reverb.jpg",
  pror2: "/assets/plugins/fabfitler-pro-r-2.jpg",
  wavesl2: "/assets/plugins/waves-l2.jpg",
  uadprecisionlimiter: "/assets/plugins/uad-precision-limiter.png",
  uademt140: "/assets/plugins/uad-emt-140.png",
  uad1176: "/assets/plugins/uad-1176.jpg",
  ampxatr102: "/assets/plugins/ampx-atr-102.png",
  wavesdeesser: "/assets/plugins/waves-deesser.png",
  fabfilterprods: "/assets/plugins/fabfilter-pro-ds.jpg",
  prods: "/assets/plugins/fabfilter-pro-ds.jpg",
  studiovca: "/assets/plugins/logic-studio-vca.jpg",
  fetcompressor: "/assets/plugins/waves-cla76.png",
  vintageeqorproq3: "/assets/plugins/fabfilter-pro-q-4.jpg",
  optofetblend: "/assets/plugins/uad-1176.jpg",
  tapedriveforcharacter: "/assets/plugins/waves-j37.png",
  gentlegluecompression: "/assets/plugins/waves-ssl-g-master.jpg",
  correlationphasecheckutilities: "/assets/plugins/waves-trans-x.png",
  verysubtleroomorsaturationonly: "/assets/plugins/waves-h-reverb.jpg",
  wavessslgmaster: "/assets/plugins/waves-ssl-g-master.jpg",
  uadssl4000g: "/assets/plugins/uad-ssl-4000-g.png",
  wavestransx: "/assets/plugins/waves-trans-x.png",
  wavesabbeyroadtg: "/assets/plugins/waves-abbey-road-tg.png",
  sibilance: "/assets/plugins/sibilance.jpg",
  sslstyle: "/assets/plugins/waves-ssl-g-master.jpg",
  api2500lightsettings: "/assets/plugins/waves-api-2500.jpg",
  j37: "/assets/plugins/waves-j37.png",
  saturn2subtle: "/assets/plugins/fabfilter-saturn.jpg",
  transparentlimiterforpeakcatch: "/assets/plugins/uad-precision-limiter.png",
  noisedgate: "/assets/plugins/waves-deesser.png",
  noisegate: "/assets/plugins/waves-deesser.png",
  expanderforbleedcontrol: "/assets/plugins/waves-deesser.png",
  tapeoroverdrivesubtle: "/assets/plugins/waves-j37.png",
  uselightlyforspillcontrol: "/assets/plugins/waves-deesser.png"
};

function resolvePluginImage(pluginName: string): string | undefined {
  const key = normalizePluginKey(pluginName);
  return pluginImageByNormalizedName[key];
}

function buildPluginItems(
  detail: string,
  sheetTitle: string
): CardItem["items"] {
  const plugins = detail
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);

  return plugins.map((pluginName, rowIndex) => {
    const imageSrc = resolvePluginImage(pluginName);

    return {
      text: pluginName,
      imageSrc,
      imageAlt: imageSrc ? `${sheetTitle} ${pluginName} screenshot` : undefined
    };
  });
}

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
          items: buildPluginItems(detail, config.title)
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

function buildPluginsPageSections(): SheetSection[] {
  const chooserSection: SheetSection = {
    type: "cards",
    title: "How to Choose Quickly",
    columns: 3,
    cards: [
      {
        title: "By Instrument",
        items: [
          "Vocals: Compression, De-essing, Reverb, Channel Strip",
          "Drums: Compression, Saturation, Transient, Limiter/Clipper",
          "Bass: EQ, Compression, Saturation, Low-end analysis",
          "Mix Bus: Glue compression, EQ, limiter, metering"
        ]
      },
      {
        title: "By Style",
        items: [
          "Pop/EDM: tight compression + modern limiting",
          "Rock: analog-style saturation and bus glue",
          "Hip-Hop: punchy dynamics, controlled low-end",
          "Acoustic/Jazz: transparent EQ + gentle compression"
        ]
      },
      {
        title: "By Goal",
        items: [
          "More clarity: EQ + resonance control",
          "More loudness: limiter/clipper + metering",
          "More vibe: tape/saturation + vintage comps",
          "Better translation: reference + loudness checks"
        ]
      }
    ]
  };

  const typeOrder = [
    "Channel Strip",
    "EQ",
    "Compression",
    "Limiter & Clipping",
    "Saturation",
    "Reverb",
    "Delay",
    "Filter",
    "Dynamics Utility",
    "Metering & Analysis",
    "Mix Assistant",
    "Monitoring",
    "Instrument",
    "Utility"
  ];

  const grouped = new Map<string, typeof pluginCatalog>();
  for (const item of pluginCatalog) {
    if (!grouped.has(item.type)) {
      grouped.set(item.type, []);
    }
    grouped.get(item.type)?.push(item);
  }

  const tableSections: SheetSection[] = [];
  for (const type of typeOrder) {
    const items = grouped.get(type);
    if (!items || items.length === 0) {
      continue;
    }

    const sorted = [...items].sort((a, b) => b.popularity - a.popularity || a.name.localeCompare(b.name));
    tableSections.push({
      type: "table",
      title: `${type} Plugins`,
      table: {
        columns: ["Plugin", "Popularity (1-10)", "Hardware Emulation", "Best On", "Known For"],
        rows: sorted.map((plugin) => [
          plugin.name,
          String(plugin.popularity),
          plugin.emulation,
          plugin.bestOn,
          plugin.knownFor
        ])
      }
    });
  }

  return [chooserSection, ...tableSections];
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
    id: "logic-pro-workflow",
    header: {
      title: "Logic Pro Workflow Cheat Sheet",
      subtitle: "Organize, save often, and move fast",
      icon: "🎹",
      accent: "blue"
    },
    summary: "Combined workflow guide covering setup, editing, stack organization, and final export checks.",
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
        title: "Editing and Session Control",
        cards: [
          { title: "Comping", items: ["Use take folders", "Label best takes quickly"] },
          { title: "Punch In/Out", items: ["Set locators before record", "Use cycle when needed"] },
          { title: "Project Management", items: ["Clean project audio regularly", "Archive major milestones"] }
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
          "Unused tracks muted or removed",
          "Correct bounce/sample rate settings",
          "Right file format and sample rate",
          "No clipping on printed masters",
          "Correct naming and metadata",
          "Archive project and deliverables"
        ]
      }
    ]
  },
  {
    id: "plugins-reference",
    header: {
      title: "Plugins",
      subtitle: "Choose by type, style, and instrument",
      icon: "🧩",
      accent: "teal"
    },
    summary: "Catalog of installed plugins with best-effort popularity, emulation, use-case, and pricing context.",
    sections: buildPluginsPageSections()
  },
  {
    id: "appendix-audio-terms",
    header: {
      title: "Appendix Audio Terms",
      subtitle: "Beginner-friendly reference",
      icon: "📘",
      accent: "green"
    },
    summary: "Quick explanations of common mixing and mastering terms used throughout these sheets.",
    sections: [
      {
        type: "cards",
        title: "Core Dynamics Terms",
        columns: 2,
        cards: [
          {
            title: "Compressor",
            items: [
              "Turns down loud parts so volume is more controlled.",
              "Can make tracks feel tighter, smoother, and more consistent."
            ]
          },
          {
            title: "Limiter",
            items: [
              "A very strong compressor used at the top end of volume.",
              "Helps stop peaks from clipping and sets a ceiling."
            ]
          },
          {
            title: "Gate",
            items: [
              "Mutes or reduces signal when audio falls below a threshold.",
              "Useful for reducing bleed/noise between drum hits."
            ]
          },
          {
            title: "Normalization",
            items: [
              "Automatically raises audio so the loudest peak hits a chosen level.",
              "Does not improve balance by itself; just changes overall level."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "EQ and Filter Terms",
        columns: 2,
        cards: [
          {
            title: "High-Pass Filter (HPF)",
            items: [
              "Lets high frequencies pass and cuts low frequencies.",
              "Used to remove rumble and unnecessary low-end."
            ]
          },
          {
            title: "Low-Pass Filter (LPF)",
            items: [
              "Lets low frequencies pass and cuts high frequencies.",
              "Used to tame hiss/harsh top-end or push sounds backward."
            ]
          },
          {
            title: "High Shelf",
            items: [
              "Boosts or cuts all frequencies above a chosen point.",
              "Good for adding air/brightness or reducing harshness."
            ]
          },
          {
            title: "Low Shelf",
            items: [
              "Boosts or cuts all frequencies below a chosen point.",
              "Used for adding weight or cleaning excessive boom."
            ]
          }
        ]
      },
      {
        type: "table",
        title: "Metering and Space Terms",
        table: {
          columns: ["Term", "Beginner Explanation"],
          rows: [
            ["LUFS", "Loudness Units relative to Full Scale; a perceived loudness measurement over time."],
            ["dBFS", "Digital level scale where 0 dBFS is max level before digital clipping."],
            ["Stereo", "Two-channel audio (left and right) that creates width and placement."],
            ["Mono", "Single channel centered audio; useful for checking phase and translation."],
            ["Panning", "Placing sounds left, center, or right in the stereo field."],
            ["Phase", "Timing relationship between similar waveforms; poor phase can make sounds thin."],
            ["Headroom", "Safety space below 0 dBFS so peaks do not clip."],
            ["Clipping", "Distortion from exceeding maximum level; usually harsh and unwanted."]
          ]
        }
      },
      {
        type: "table",
        title: "Dynamics and Processing Terms",
        table: {
          columns: ["Term", "Beginner Explanation"],
          rows: [
            ["Attack", "How fast a compressor starts reducing gain after passing threshold."],
            ["Release", "How fast gain reduction stops after signal falls below threshold."],
            ["Threshold", "The level where a dynamic processor starts to act."],
            ["Ratio", "How strongly compression is applied once threshold is crossed."],
            ["Knee", "How gently or abruptly compression starts near threshold."],
            ["Makeup Gain", "Output gain added after compression to restore loudness."],
            ["Gain Reduction", "How much level is currently being turned down."],
            ["Transient", "The short initial hit at the start of a sound."],
            ["Sustain", "The held body/tail of a sound after its attack."],
            ["Transient Shaper", "Tool that boosts/cuts attack and sustain directly."],
            ["Parallel Compression", "Blend of heavily compressed signal with dry signal."],
            ["Saturation", "Harmonic coloration that adds density, grit, or warmth."],
            ["Harmonics", "Extra frequency content above the fundamental pitch."],
            ["Subharmonics", "Generated low-frequency content below the original tone."],
            ["Resonance", "A narrow frequency that rings out more than others."],
            ["Notch Filter", "Very narrow EQ cut used to remove a problem tone."],
            ["Q (Bandwidth)", "Width of an EQ band: narrow vs broad."],
            ["Mid/Side (M/S)", "Separate processing of center (mid) and edges (side)."],
            ["True Peak", "Estimated inter-sample peak that can exceed sample peak."],
            ["RMS", "Average signal energy used as a loudness reference."]
          ]
        }
      },
      {
        type: "table",
        title: "Routing and Session Workflow Terms",
        table: {
          columns: ["Term", "Beginner Explanation"],
          rows: [
            ["LRA (Loudness Range)", "How much loudness changes across a song over time."],
            ["Dynamic Range", "Difference between quiet and loud parts."],
            ["Noise Floor", "Base level of background hiss or room/system noise."],
            ["Dither", "Low-level noise added when lowering bit depth."],
            ["Bit Depth", "How detailed level values are in digital audio."],
            ["Sample Rate", "Number of audio samples captured each second."],
            ["Inter-sample Peaks", "Peaks between samples that can clip in playback."],
            ["Reference Track", "Professional song used as tonal/loudness comparison."],
            ["Bus", "Shared channel where multiple tracks are grouped."],
            ["Aux Send", "Copied signal sent to shared effects like reverb."],
            ["Return Track", "Channel that receives aux sends and outputs effects."],
            ["Insert", "Processor placed directly in a track signal path."],
            ["Pre-Fader Send", "Send level independent from fader level."],
            ["Post-Fader Send", "Send level follows track fader changes."],
            ["Dry/Wet", "Blend between original and processed signal."],
            ["Automation", "Time-based control of levels, pan, and plugin settings."],
            ["Clip Gain", "Gain change applied to an audio region before inserts."],
            ["Gain Staging", "Setting healthy levels at every stage in the chain."],
            ["Unity Gain", "Input and output level are effectively the same."],
            ["Mono Compatibility", "How well a stereo mix holds up in mono."]
          ]
        }
      },
      {
        type: "table",
        title: "Mix Translation and Tonal Vocabulary",
        table: {
          columns: ["Term", "Beginner Explanation"],
          rows: [
            ["Crest Factor", "Difference between peaks and average loudness."],
            ["Brickwall Limiter", "Limiter with strict ceiling that blocks overs."],
            ["Oversampling", "Internal upsampling to reduce digital artifacts."],
            ["Aliasing", "Unwanted mirrored high-frequency distortion artifacts."],
            ["Sidechain", "Using one signal to control another signal’s processor."],
            ["De-esser", "Frequency-focused compressor for vocal sibilance."],
            ["Exciter", "Adds harmonics, often to brighten or add presence."],
            ["Glue Compression", "Gentle bus compression to make elements feel cohesive."],
            ["Frequency Masking", "One sound hides another in the same range."],
            ["Masking Release", "EQ/arrangement moves that reduce masking conflicts."],
            ["Tonal Balance", "Overall low-mid-high energy distribution in a mix."],
            ["Sub Bass", "Lowest bass region, often around 20-60 Hz."],
            ["Low End", "Bass range that provides weight and power."],
            ["Low Mids", "Region often tied to body, warmth, and mud."],
            ["Presence", "Upper-mid area affecting clarity and intelligibility."],
            ["Air Band", "Very high frequencies that add openness and sheen."],
            ["Harshness", "Unpleasant aggressive upper-mid or high frequencies."],
            ["Mud", "Cloudy low-mid buildup that reduces clarity."],
            ["Boxiness", "Closed, hollow tone usually in low-mids."],
            ["Boominess", "Excessive low-frequency resonance."]
          ]
        }
      },
      {
        type: "table",
        title: "Editing, Space, and Delivery Terms",
        table: {
          columns: ["Term", "Beginner Explanation"],
          rows: [
            ["Sibilance", "Sharp 's' and 'sh' vocal sounds."],
            ["Plosives", "Low thumps from consonants like P and B."],
            ["Bleed", "Unwanted spill from another source into a mic."],
            ["Spill Control", "Steps to reduce unwanted mic leakage."],
            ["Comping", "Building one final take from multiple recordings."],
            ["Take Folder", "Container that organizes alternate takes."],
            ["Punch-In", "Recording over only a selected part."],
            ["Crossfade", "Small overlap fade that smooths edits."],
            ["Edit Point", "Exact cut/join location in an audio file."],
            ["Phase Inversion", "Flip polarity by 180 degrees."],
            ["Polarity", "Positive/negative orientation of waveform motion."],
            ["Null Test", "Compare two signals by phase-cancel checking."],
            ["Stereo Image", "Perceived width and placement of sounds."],
            ["Depth", "Perceived front-to-back distance in a mix."],
            ["Front-to-Back Placement", "How close or far a sound feels."],
            ["Reverb Tail", "The decaying part of a reverb after source stops."],
            ["Early Reflections", "First room echoes that define space cues."],
            ["Pre-Delay", "Time between dry sound and reverb start."],
            ["Decay Time", "How long reverb takes to fade out."],
            ["Room Tone", "Natural ambient sound of a recording space."],
            ["Ambience", "Perceived environmental space around a source."],
            ["Delay Feedback", "How much delayed signal repeats again."],
            ["Slap Delay", "Very short delay used for thickness."],
            ["Tempo Sync", "Effect timing locked to song tempo."],
            ["Tap Tempo", "Manual tempo entry by tapping rhythm."],
            ["Meter Bridge", "Grouped meter view for many channels at once."],
            ["Peak Hold", "Meter mode that keeps peak value visible."],
            ["Headroom Margin", "Intentional level buffer before clipping."],
            ["Ceiling", "Maximum output level set in limiter/master."],
            ["Master Bus", "Final stereo channel carrying the full mix."],
            ["Print", "Render processed audio to a new file."],
            ["Bounce", "Export audio from session to file."],
            ["Stem", "Grouped export such as drums, vocals, or music."],
            ["Print Through", "Render audio while effects chain stays active."],
            ["Bypass Gain Match", "Compare processed/unprocessed at equal loudness."],
            ["A/B Testing", "Switching options for objective comparison."],
            ["Ear Fatigue", "Reduced accuracy after long loud listening."],
            ["Translation", "How well the mix sounds across different systems."]
          ]
        }
      },
      {
        type: "checklist",
        title: "Beginner Rules of Thumb",
        items: [
          "Fix balance first, then process.",
          "Use small EQ/compression moves before big ones.",
          "A/B bypass often at matched loudness.",
          "Check your mix in mono and at low volume.",
          "Leave headroom and avoid clipping on buses.",
          "Trust references and your ears over visuals alone."
        ]
      }
    ]
  }
];

export const defaultSheetId = cheatSheets[0]?.id ?? "";

export const sheetMap = new Map(cheatSheets.map((sheet) => [sheet.id, sheet]));
