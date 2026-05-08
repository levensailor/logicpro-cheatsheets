import type { CardItem, CheatSheet, SheetSection } from "@/lib/sheet-schema";
import { pluginCatalog } from "@/data/plugins/catalog";
import { buildEnhancedPluginCatalog } from "@/data/plugins/seed-catalog";

const enhancedPluginCatalog = buildEnhancedPluginCatalog(pluginCatalog);

const sourceMixChain = [
  { name: "Clip Gain / Input Gain", goal: "Set a workable level before plugins, avoid clipping, and do not use gain staging just to make the track loud." },
  { name: "Cleanup / Corrective EQ", goal: "Remove rumble, harsh resonances, boxiness, or mud only if needed; use narrow cuts for real problems." },
  { name: "Dynamics", goal: "Compress only when the source needs leveling, punch, control, or tone; leave it alone when it already sits correctly." },
  { name: "Tone EQ", goal: "Add weight, presence, or air after the source is controlled and the part works in context." },
  { name: "Saturation / Character", goal: "Optional color for density, harmonic interest, or perceived loudness when the arrangement benefits from it." },
  { name: "Space / Sends", goal: "Prefer sends for shared reverbs and delays; use insert reverbs only when the effect is part of the sound." },
  { name: "Peak Control", goal: "Use clip gain, light clipping, or limiting only when peaks are causing problems; do not limit every track by default." }
] as const;

const busMixChain = [
  { name: "Trim / Gain", goal: "Set the bus level so processing has headroom and bypass comparisons are level-matched." },
  { name: "Corrective EQ if needed", goal: "Use broad or focused cuts only for buildup, harshness, or clutter created by the grouped tracks." },
  { name: "Glue Compression if needed", goal: "Use light compression when it improves cohesion; leave the bus dynamic when it already moves well." },
  { name: "Tone EQ if needed", goal: "Add broad weight, clarity, or air only after the balance works." },
  { name: "Saturation / Console / Tape Color", goal: "Optional character for density or shared tone; level-match because color often feels louder." },
  { name: "Width / Imaging", goal: "Use only when phase-safe and useful; check mono before trusting wide processing." },
  { name: "Peak Control", goal: "Use clipping or limiting only if peaks are causing problems or the bus needs a deliberate effect." }
] as const;

const mainBusChain = [
  { name: "Gain / Trim", goal: "Leave headroom and avoid using the main bus to fix poor track balances." },
  { name: "Gentle Corrective EQ if needed", goal: "Prefer broad, subtle moves; fix obvious problems in the mix when possible." },
  { name: "Very Light Bus Compression if useful", goal: "Use only when it improves movement or glue, usually around 0.5-2 dB of gain reduction." },
  { name: "Subtle Tone EQ if needed", goal: "Add broad polish carefully and keep checking bypass at matched loudness." },
  { name: "Subtle Saturation / Tape / Console Color", goal: "Optional finishing color when it helps density without shrinking the mix." },
  { name: "Metering", goal: "Check peak, loudness, dynamic range, stereo correlation, and low-end translation." },
  { name: "Limiter for Preview / Final Checks", goal: "Use limiting to audition loudness or create a final master, not as a mix crutch." }
] as const;

function chainForTitle(title: string) {
  if (title.includes("Main Bus")) {
    return mainBusChain;
  }

  if (title.includes("Bus")) {
    return busMixChain;
  }

  return sourceMixChain;
}

function compressionCardForTitle(title: string): CardItem {
  if (title.includes("Bass Guitar")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Leveling: 3:1 to 6:1, medium attack/release, around 3-6 dB gain reduction if notes jump around.",
        "Use faster attack only when peaks hit too hard.",
        "Parallel compression and saturation can add sustain/density without flattening the DI."
      ]
    };
  }

  if (title.includes("Kick")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Punch: 3:1 to 6:1, slower attack around 10-30 ms, release timed to the groove, 2-6 dB gain reduction.",
        "Use faster attack only if the transient is too pokey.",
        "Avoid compressing just because the kick exists."
      ]
    };
  }

  if (title.includes("Snare")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Punch/body: 3:1 to 6:1, 10-30 ms attack, 50-150 ms release as a starting point.",
        "Use faster release or parallel compression for crack and aggression.",
        "Preserve the transient unless the snare is too sharp."
      ]
    };
  }

  if (title.includes("Toms")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Use compression only if tom hits are inconsistent.",
        "Try 3:1 to 5:1, medium attack, and medium/fast release.",
        "Gate, edit, or automate bleed before over-compressing."
      ]
    };
  }

  if (title.includes("Overheads")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Compression is optional; use gentle control only if cymbals or kit image need cohesion.",
        "Avoid pumping cymbals.",
        "EQ, phase alignment, and level often matter more than compression."
      ]
    };
  }

  if (title.includes("Room Mic")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Natural room: light compression with 1-3 dB gain reduction.",
        "Exciting room: heavy compression or limiting can be a deliberate effect.",
        "Blend aggressive room compression underneath the dry kit."
      ]
    };
  }

  if (title.includes("Electric Guitar")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Distorted guitars often need little or no compression.",
        "Use compression for clean, jangly, funk, or inconsistent parts.",
        "For distorted guitars, EQ, double tracking, panning, and automation usually matter more."
      ]
    };
  }

  if (title.includes("Vocal Mixing")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Leveling: 2:1 to 4:1, moderate attack/release, around 2-5 dB gain reduction.",
        "Modern control often works best as serial compression with light stages.",
        "Use automation before relying on heavy compression."
      ]
    };
  }

  if (title.includes("Drum Bus")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Glue: 1.5:1 to 2:1, slow/medium attack, auto or tempo-based release, around 1-3 dB gain reduction.",
        "Aggressive bus compression is a sound/effect, not the default.",
        "Parallel compression is usually safer than crushing the main drum bus."
      ]
    };
  }

  if (title.includes("Vocal Bus")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Use light compression for cohesion, usually 1-3 dB gain reduction.",
        "De-ess the bus only if stacked vocals build harshness.",
        "Avoid crushing the bus after already compressing individual vocals."
      ]
    };
  }

  if (title.includes("Guitar Bus")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Use light glue compression only if multiple guitar tracks need cohesion.",
        "Distorted guitars may not need bus compression.",
        "EQ and automation often matter more than bus compression."
      ]
    };
  }

  if (title.includes("Main Bus")) {
    return {
      title: "Compression Starting Points",
      items: [
        "Gentle glue only: 1.5:1 to 2:1 is a common starting point.",
        "Usually aim for about 0.5-2 dB gain reduction.",
        "Use slow/medium attack and auto or tempo-aware release to preserve transients."
      ]
    };
  }

  return {
    title: "Compression Starting Points",
    items: [
      "Compress only if the source needs leveling, punch, control, or tone.",
      "Use light settings first, then adjust by ear in context.",
      "If the part already sits correctly, leave the dynamics alone."
    ]
  };
}

const mixCards = (focus: string, title: string): CardItem[] => [
  {
    title: "EQ Targets",
    items: [
      "Filter only what the arrangement does not need.",
      "Cut boxiness, harshness, or mud when you actually hear it.",
      "Boost for a musical reason, not to make the track louder."
    ]
  },
  compressionCardForTitle(title),
  {
    title: "Metering Targets",
    items: ["Leave headroom before buses", "Watch low-end buildup", `Prioritize ${focus} clarity in context`]
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
    summary: `A practical ${config.focus.toLowerCase()} cheat sheet with modular processing, tone moves, level targets, and mix decisions you can adjust later.`,
    sections: [
      {
        type: "chain",
        title: config.title.includes("Main Bus")
          ? "Main Bus / Pre-Master Chain Starting Point"
          : config.title.includes("Bus")
            ? "Bus Chain Starting Point"
            : "Recommended Modular Chain",
        steps: chainForTitle(config.title).map((step) => ({ ...step }))
      },
      {
        type: "cards",
        title: "2-4. EQ, Compression, and Metering",
        cards: mixCards(config.focus, config.title)
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
    type: "plugin-chooser",
    title: "How to Choose Quickly",
    entries: enhancedPluginCatalog.map((plugin) => ({
      name: plugin.name,
      type: plugin.type,
      popularity: plugin.popularity,
      emulation: plugin.emulation,
      bestOn: plugin.bestOn,
      knownFor: plugin.knownFor
    }))
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

  const grouped = new Map<string, typeof enhancedPluginCatalog>();
  for (const item of enhancedPluginCatalog) {
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
      ["40-60 Hz", "Sub extension", "Use carefully for deep reach if the arrangement has room"],
      ["60-100 Hz", "Fundamental weight", "Shape the main low-end support"],
      ["100-250 Hz", "Body / warmth", "Add fullness or cut if the bass clouds the kick"],
      ["250-500 Hz", "Mud / boxiness", "Reduce if the bass feels cloudy or cardboard-like"],
      ["700 Hz-1.5 kHz", "Note definition / growl", "Help bass speak on small speakers"],
      ["2-5 kHz", "Attack / string noise", "Add articulation carefully when needed"]
    ],
    plugins: [
      ["EQ", "Logic Channel EQ, Logic Linear Phase EQ, FabFilter Pro-Q 4, Waves F6"],
      ["Compression", "Logic Compressor, FabFilter Pro-C 3, Waves CLA-76"],
      ["Saturation", "Logic Phat FX, Logic Overdrive, Soundtoys Decapitator, Waves J37"],
      ["Space (Optional)", "Logic ChromaVerb, Logic Space Designer, ValhallaRoom, Waves H-Reverb"]
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
      ["40-60 Hz", "Sub / low extension", "Use carefully if the song needs deep low end"],
      ["60-100 Hz", "Thump / fundamental punch", "Shape the main kick weight"],
      ["100-200 Hz", "Weight / fullness", "Add or trim depending on bass relationship"],
      ["200-500 Hz", "Boxiness / mud", "Often reduced if the kick feels cloudy"],
      ["400-800 Hz", "Wood / hollow tone", "Useful only when the acoustic character needs it"],
      ["1-3 kHz", "Beater attack", "Add definition for smaller speakers"],
      ["4-8 kHz", "Click / snap", "Use for dense mixes when more cut is needed"]
    ],
    plugins: [
      ["EQ", "Logic Channel EQ, Logic Linear Phase EQ, FabFilter Pro-Q 4"],
      ["Compression", "Logic Compressor, Waves API 2500"],
      ["Saturation", "Logic Phat FX, Logic Clip Distortion, Waves J37, Soundtoys Decapitator"],
      ["Peak Control", "Logic Adaptive Limiter, Logic Limiter, Waves L2, UAD Precision Limiter"]
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
      ["EQ", "Logic Channel EQ, FabFilter Pro-Q 4, Waves F6"],
      ["Compression", "Logic Compressor, Waves CLA-76, API 2500"],
      ["Saturation", "Logic Phat FX, Waves Kramer Tape, FabFilter Saturn 2"],
      ["Reverb", "Logic Space Designer, Logic ChromaVerb, UAD EMT 140, Valhalla VintageVerb"]
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
      ["80-120 Hz", "High-pass range", "Remove rumble; adjust to the arrangement"],
      ["150-300 Hz", "Warmth / body", "Add fullness or cut if guitars muddy the mix"],
      ["300-600 Hz", "Boxiness / congestion", "Reduce if the part feels cloudy"],
      ["1-2 kHz", "Bite / note definition", "Bring out riffs and chord movement"],
      ["2-5 kHz", "Aggression / presence", "Use carefully because harshness builds here"],
      ["5-8 kHz", "Fizz / pick noise", "Tame distorted guitars if they fight cymbals or vocals"],
      ["6-10 kHz", "Clean-guitar air", "Mainly for clean guitars; often low-pass distorted guitars here"]
    ],
    plugins: [
      ["EQ", "Logic Channel EQ, FabFilter Pro-Q 4, API 550A"],
      ["Compression", "Logic Compressor, Waves CLA-76, FabFilter Pro-C 3"],
      ["Saturation", "Logic Overdrive, Logic Pedalboard, Waves J37, FabFilter Saturn 2"],
      ["Space", "Logic ChromaVerb, Logic Space Designer, Waves H-Reverb, Pro-R 2"]
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
      ["5-9 kHz", "De-ess range", "Common sibilance area; varies by singer, mic, and performance"]
    ],
    plugins: [
      ["EQ", "Logic Channel EQ, Waves F6, FabFilter Pro-Q 4"],
      ["Compression", "Logic Compressor, CLA-76, UAD 1176"],
      ["Saturation", "Logic Phat FX, Logic Overdrive, Waves J37, AMPX ATR-102"],
      ["De-essing", "Logic DeEsser 2, Waves DeEsser, FabFilter Pro-DS"]
    ],
    quickTips: [
      "Ride the vocal level before over-compressing.",
      "Use a de-esser before bright EQ if brightness exaggerates harshness.",
      "Add another light de-esser after compression only if sibilance returns.",
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
      ["EQ", "Logic Channel EQ, FabFilter Pro-Q 4"],
      ["Compression", "Studio VCA, FET compressor"],
      ["Gate/Expander", "Logic Noise Gate, Expander for bleed control"],
      ["Saturation", "Logic Phat FX, tape or overdrive if useful"]
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
      ["EQ", "Logic Channel EQ, vintage EQ, or FabFilter Pro-Q 4"],
      ["Compression", "Studio VCA, Opto/FET blend"],
      ["Gate (Optional)", "Use lightly for spill control"],
      ["Saturation", "Logic Phat FX, tape drive for character"]
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
      ["EQ", "Logic Channel EQ, FabFilter Pro-Q 4"],
      ["Compression", "Gentle glue compression"],
      ["Phase Tools", "Correlation/phase check utilities"],
      ["Effects", "Logic Space Designer, ChromaVerb, or subtle saturation only"]
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
      ["Bus Compression", "Logic Compressor, Waves SSL G-Master, UAD SSL 4000 G"],
      ["Saturation", "Logic Phat FX, Waves J37, FabFilter Saturn 2"],
      ["Transient", "Logic Enveloper, Waves Smack Attack, SPL Transient Designer, oeksound Spiff"],
      ["Reverb", "Logic Space Designer, Logic ChromaVerb, Waves Abbey Road Chambers, Pro-R 2"]
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
      ["EQ", "Logic Channel EQ, Waves F6, FabFilter Pro-Q 4"],
      ["Compression", "Logic Compressor, Waves SSL G-Master, CLA-76"],
      ["Saturation", "Logic Phat FX, Waves J37, AMPX ATR-102"],
      ["De-essing", "Logic DeEsser 2, Waves Sibilance, FabFilter Pro-DS"]
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
      ["EQ", "Logic Channel EQ, Logic Linear Phase EQ, FabFilter Pro-Q 4"],
      ["Glue Compression", "SSL style, API 2500 light settings"],
      ["Saturation", "Logic Phat FX, J37, Saturn 2 subtle"],
      ["Metering / Preview Limiting", "Logic Loudness Meter, Multimeter, Adaptive Limiter for preview checks"]
    ],
    quickTips: [
      "Leave target peak around -6 dBFS.",
      "Do not normalize at mix stage.",
      "Check mono and low-volume translation.",
      "Avoid fixing arrangement issues on bus.",
      "Avoid large master EQ moves unless intentional; fix mix problems at the source when possible."
    ]
  }),
  {
    id: "gain-staging-lufs",
    header: {
      title: "Gain Staging & LUFS",
      subtitle: "Streaming, CD, vinyl, and tape",
      icon: "📈",
      accent: "green"
    },
    summary: "Set healthy levels from tracks to master, then choose loudness and delivery targets that fit streaming services, physical formats, and the song.",
    sections: [
      {
        type: "cards",
        title: "Core Principles",
        columns: 3,
        cards: [
          {
            title: "Gain Staging Basics",
            items: [
              "Set proper source levels before plugins.",
              "Avoid clipping on tracks, buses, plugins, and the master.",
              "Leave mix bus headroom so mastering can work without rescue moves."
            ]
          },
          {
            title: "LUFS Is a Reference",
            items: [
              "Streaming LUFS numbers are normalization references, not always strict creative targets.",
              "A loud master still gets turned down, but crushed dynamics stay crushed.",
              "Master to what serves the genre, then check how platforms will normalize it."
            ]
          },
          {
            title: "Streaming Master Mindset",
            items: [
              "Do not treat -14 LUFS as a universal mastering target.",
              "Choose loudness from the song, genre, and emotional intent, then check platform normalization.",
              "Use more true-peak safety on louder or brighter masters because codecs can create extra peaks."
            ]
          },
          {
            title: "Format-Specific Masters",
            items: [
              "Use a separate vinyl master when pressing records.",
              "Use a separate CD or hi-res master if you want louder or less codec-safe delivery.",
              "Keep the premaster and stems archived so remasters are easy later."
            ]
          },
          {
            title: "True Peak Matters",
            items: [
              "True peak catches inter-sample peaks that regular peak meters can miss.",
              "Lossy codecs can create extra peaks after upload.",
              "Dense, bright, heavily limited masters need more true-peak safety margin."
            ]
          },
          {
            title: "Balance First",
            items: [
              "Fix harshness, boomy lows, and weak vocals before chasing loudness.",
              "If a limiter needs more than a few dB of gain reduction, revisit the mix.",
              "Check quiet playback; strong balances survive lower volume."
            ]
          }
        ]
      },
      {
        type: "table",
        title: "Ideal Peak Levels",
        table: {
          columns: ["Stage", "Target"],
          layout: "compact",
          rows: [
            ["Individual tracks", "-18 dBFS"],
            ["After plugins", "-18 to -12 dBFS"],
            ["Groups / buses", "-12 to -6 dBFS"],
            ["Main bus pre-master", "-6 dBFS max peaks"],
            ["Streaming master true peak", "-1.0 to -2.0 dBTP"]
          ]
        }
      },
      {
        type: "table",
        title: "Streaming Loudness Context",
        table: {
          columns: ["Context", "Integrated Loudness", "True Peak", "Notes"],
          layout: "detailCards",
          rows: [
            [
              "Dynamic / acoustic / open mix",
              "-18 to -14 LUFS",
              "-1.0 to -2.0 dBTP",
              "Good for natural dynamics, acoustic music, jazz, folk, and open arrangements."
            ],
            [
              "Streaming-safe general reference",
              "Around -14 LUFS",
              "About -1.0 dBTP",
              "Useful as a normalization reference, not a rule every master must chase."
            ],
            [
              "Modern indie / rock / pop master",
              "-13 to -9 LUFS",
              "About -2.0 dBTP when loud",
              "Common for competitive releases; preserve punch and watch codec distortion."
            ],
            [
              "Short-form social clip",
              "-12 to -9 LUFS",
              "-1.0 to -2.0 dBTP",
              "Can be louder, but harsh limiting becomes obvious after phone playback and platform encoding."
            ],
            [
              "Preview / client loudness check",
              "Varies by reference",
              "-1.0 to -2.0 dBTP",
              "Use to hear limiter behavior and translation before committing the final master."
            ],
            [
              "Codec-sensitive delivery",
              "Any chosen loudness",
              "-2.0 dBTP safer",
              "AAC/MP3/OGG encoding can create intersample peaks; preview codec artifacts when possible."
            ],
            [
              "Very loud master",
              "-9 LUFS or louder",
              "-2.0 dBTP strongly recommended",
              "Only if the genre demands it; expect normalization and possible loss of depth."
            ]
          ]
        }
      },
      {
        type: "table",
        title: "Physical and Specialty Delivery",
        table: {
          columns: ["Format", "Typical Approach", "Watch Out For", "Practical Tip"],
          layout: "detailCards",
          rows: [
            [
              "CD",
              "16-bit / 44.1 kHz delivery, often louder than streaming",
              "No playback normalization, so over-limiting is heard exactly as printed",
              "Use dithering when reducing to 16-bit and avoid chasing loudness past the song's comfort zone."
            ],
            [
              "Vinyl",
              "Dedicated cutting master with preserved dynamics",
              "Wide low bass, harsh sibilance, extreme highs, and long sides can distort or skip",
              "Mono or narrow the deep low end and let a vinyl mastering engineer handle final cutting decisions."
            ],
            [
              "Cassette / tape",
              "Moderate level with controlled highs and lows",
              "Noise floor, hiss, saturation, and dullness if printed too hot or too dark",
              "Leave transient room, avoid brittle top end, and print a test pass if duplicating to tape."
            ],
            [
              "Hi-res download",
              "24-bit WAV/AIFF at native session sample rate",
              "Too much limiting defeats the point of a high-resolution release",
              "Keep dynamics and use a slightly higher ceiling such as -0.5 dBTP when no lossy encoding is expected."
            ],
            [
              "Club / DJ playback",
              "Often louder and denser than streaming",
              "Sub buildup, limiter pumping, and harsh highs become obvious on big systems",
              "Check mono low end, kick/bass headroom, references in the same genre, and distortion after limiting."
            ]
          ]
        }
      },
      {
        type: "cards",
        title: "Vinyl and Tape Notes",
        columns: 3,
        cards: [
          {
            title: "Vinyl Low End",
            items: [
              "Keep very low bass centered or narrowed.",
              "Avoid huge stereo subs and hard-panned kick/bass information.",
              "Shorter sides allow louder, cleaner cuts than long sides."
            ]
          },
          {
            title: "Vinyl High End",
            items: [
              "De-ess vocals and cymbals before the cutting stage.",
              "Harsh sibilance can distort on playback.",
              "Preserve dynamics so the needle has room to track the groove."
            ]
          },
          {
            title: "Tape Character",
            items: [
              "Tape can add pleasing saturation, but it also raises noise.",
              "Too much low end can blur; too much high end can get brittle or hissy.",
              "Print a reference and listen before duplicating a full run."
            ]
          }
        ]
      },
      {
        type: "checklist",
        title: "Delivery Checklist",
        items: [
          "No red clipping on tracks, buses, plugins, or master.",
          "Premaster peaks leave roughly 3-6 dB of headroom.",
          "Integrated LUFS matches the song, genre, and destination.",
          "True peak ceiling is safe for the platform or format.",
          "Streaming master is checked through loudness normalization expectations.",
          "Vinyl, CD, tape, or hi-res releases get separate masters when needed.",
          "Low end, sibilance, mono compatibility, and quiet playback are checked.",
          "Reference against professional releases without copying their loudness blindly."
        ]
      }
    ]
  },
  {
    id: "interfaces",
    header: {
      title: "Interfaces",
      subtitle: "Converters, preamps, latency, and expansion",
      icon: "🔌",
      accent: "slate"
    },
    summary: "Choose an audio interface by matching real input needs, converter quality, latency, preamps, headphone mixes, expansion standards, and DSP workflow to the sessions you actually record.",
    sections: [
      {
        type: "cards",
        title: "What an Interface Does",
        columns: 3,
        cards: [
          {
            title: "A/D Conversion",
            items: [
              "Analog-to-digital conversion turns mic, instrument, and line signals into audio your DAW can record.",
              "Better A/D conversion gives cleaner headroom, lower noise, and more trustworthy transients.",
              "Dynamic range and SNR specs are useful, but the session still depends on gain staging and source quality."
            ]
          },
          {
            title: "D/A Conversion",
            items: [
              "Digital-to-analog conversion feeds your monitors and headphones.",
              "D/A quality affects what you hear while balancing, panning, and judging reverb tails.",
              "A weak monitor output can make good speakers or headphones feel smaller than they are."
            ]
          },
          {
            title: "Preamps and Monitoring",
            items: [
              "Mic preamps raise quiet microphone signals to a usable recording level.",
              "Phantom power runs condenser mics; Hi-Z inputs record direct guitar and bass.",
              "Direct monitoring lets performers hear themselves before DAW buffer latency becomes distracting."
            ]
          }
        ]
      },
      {
        type: "table",
        title: "Buying Criteria",
        table: {
          columns: ["Spec", "What to Look For", "Why It Matters"],
          layout: "detailCards",
          rows: [
            ["Real analog inputs", "Count simultaneous mic, line, and instrument inputs, not marketing totals", "A listed 18-input interface may only have 8 physical preamps plus digital expansion"],
            ["Mic preamp gain", "Around 56 dB is workable; 60-70 dB is better for low-output dynamics", "Quiet dynamic mics can need lots of clean gain"],
            ["EIN / noise", "Lower equivalent input noise is better, often around -128 dBu on strong preamps", "Noisy preamps become obvious on vocals, acoustic instruments, and quiet sources"],
            ["Dynamic range / SNR", "Look separately at A/D and D/A dynamic range when possible", "A/D affects capture; D/A affects monitoring and mastering decisions"],
            ["Round-trip latency", "Under 10 ms is usable; lower is better for software monitoring", "Latency changes the feel for singers, guitarists, and drummers"],
            ["Driver reliability", "Stable Core Audio/ASIO drivers matter as much as headline specs", "Bad drivers create clicks, dropouts, and session stress"],
            ["Headphone outputs", "Check volume, clarity, and number of independent headphone mixes", "Bands often need more than one cue mix"],
            ["Routing software", "Look for loopback, cue mixes, internal mixers, and saved scenes", "Good routing saves time for tracking, streaming, and hybrid setups"],
            ["Power", "Bus-powered is portable; external power is often stronger for bigger I/O", "Bigger headphone amps, preamps, and DSP usually need more power"],
            ["Computer connection", "USB-C is enough for most; Thunderbolt helps larger low-latency rigs", "Connection type affects bandwidth, latency, and compatibility"]
          ]
        }
      },
      {
        type: "table",
        title: "Expansion and Standards",
        table: {
          columns: ["Standard", "What It Does", "When It Matters"],
          layout: "detailCards",
          rows: [
            ["ADAT", "Adds up to 8 channels at 44.1/48 kHz over optical", "Best affordable path for adding drum preamps or extra line inputs"],
            ["S/PDIF", "Two-channel digital audio over coax or optical", "Useful for connecting a stereo converter, preamp, or digital processor"],
            ["Word clock", "Synchronizes digital devices to one clock", "Important when several converters or digital devices run together"],
            ["MIDI", "Connects keyboards, drum machines, controllers, and outboard sync", "Helpful if your interface can replace a separate MIDI box"],
            ["USB-C", "Modern universal computer connection", "Enough for most home and project studios"],
            ["Thunderbolt", "High-bandwidth, low-latency computer connection", "Useful for Apollo, large I/O, and real-time tracking workflows"],
            ["AVB", "Ethernet-based audio networking used by some MOTU/PreSonus systems", "Good for expandable multi-device studio or live rigs"],
            ["Dante", "Network audio over standard Ethernet infrastructure", "Useful for larger studios, live rooms, broadcast, and multi-room routing"],
            ["MADI", "High-channel-count digital audio, common in broadcast and large studios", "Useful when 64+ channels need to move reliably"],
            ["DB25 / line I/O", "Multichannel analog connectors for outboard gear", "Useful for hybrid studios with compressors, EQs, summing, or patchbays"]
          ]
        }
      },
      {
        type: "cards",
        title: "DSP and Plugin Processing",
        columns: 3,
        cards: [
          {
            title: "UAD Apollo",
            items: [
              "Apollo interfaces can run UAD DSP plugins in real time while tracking.",
              "Unison preamps can change input impedance and gain behavior for preamp, amp, and pedal models.",
              "DSP monitoring can save computer CPU, but each Apollo has finite DSP resources."
            ]
          },
          {
            title: "Antelope Synergy Core",
            items: [
              "Antelope interfaces use onboard FPGA/DSP processing for low-latency effects.",
              "They can be attractive when you want interface-based processing without relying only on the DAW.",
              "Check which effects are included and which require extra purchases."
            ]
          },
          {
            title: "When DSP Helps",
            items: [
              "Tracking vocals through compression, EQ, reverb, or amp sounds without distracting delay.",
              "Keeping the DAW buffer higher during large sessions while performers still hear a finished cue mix.",
              "Committing tones on the way in, if you are confident and want a faster analog-style workflow."
            ]
          }
        ]
      },
      {
        type: "table",
        title: "Choose by Session Type",
        table: {
          columns: ["Session", "Minimum Interface Shape", "Best Upgrade"],
          layout: "detailCards",
          rows: [
            ["Solo vocal or guitar", "1-2 clean preamps, Hi-Z input, strong headphone output", "Focusrite Scarlett 2i2, MOTU M2, UAD Volt, or Apollo Solo"],
            ["Singer-songwriter", "2 mic/line inputs and low-latency monitoring", "4 inputs if you want vocal, guitar, stereo keys, or room mic options"],
            ["Podcast / streaming", "2-4 inputs, loopback, simple routing software", "Interfaces with onboard processing or dedicated stream routing"],
            ["Band demos", "4-8 analog inputs", "ADAT expansion so drums and scratch instruments can grow later"],
            ["Drum tracking", "8 mic preamps or 4 preamps plus ADAT", "18i20, UMC1820 plus ADA8200, Audient EVO 16, or rack Apollo"],
            ["Hybrid outboard studio", "Enough line I/O, inserts, DB25, word clock", "MOTU, RME, Focusrite Clarett/Red, Lynx, or Antelope rack systems"],
            ["Live or multi-room studio", "Network audio or expandable rack I/O", "AVB, Dante, MADI, or multi-interface systems with stable clocking"]
          ]
        }
      },
      {
        type: "table",
        title: "Starter Interface Recommendations",
        table: {
          columns: ["Model", "Inputs / Expansion", "Best For", "Why Consider It"],
          rows: [
            ["Behringer U-Phoria UMC22", "1 mic + 1 instrument", "Cheapest simple recording", "Very low-cost entry point for one mic and one instrument."],
            ["Behringer U-Phoria UMC204HD", "2 inputs / MIDI", "Budget stereo and MIDI", "More flexible than ultra-basic boxes while staying inexpensive."],
            ["Focusrite Scarlett Solo 4th Gen", "1 mic + 1 instrument", "Solo vocals and guitar", "Easy setup, clean preamp, Air mode, and beginner-friendly gain help."],
            ["Focusrite Scarlett 2i2 4th Gen", "2 combo inputs", "Most small home studios", "Reliable default pick for vocals, guitars, keys, and two-mic recording."],
            ["Focusrite Scarlett 4i4 4th Gen", "2 preamps + extra line I/O", "Small synth or stream rigs", "Adds routing and line inputs when two inputs feel tight."],
            ["MOTU M2", "2 inputs / 4 outputs / MIDI", "Metering and conversion value", "Excellent front-panel metering and strong converter performance for the price."],
            ["Universal Audio Volt 2", "2 inputs", "Warm simple tracking", "UA-style vintage tone option without Apollo DSP complexity."],
            ["Universal Audio Volt 276", "2 inputs / onboard analog compressor", "Vocals and bass with character", "Built-in 76-style compression can smooth tracking before the DAW."],
            ["PreSonus AudioBox USB 96", "2 inputs / MIDI", "Starter Studio One setups", "Simple budget interface with MIDI and bundled workflow value."],
            ["Audient iD4 MkII", "1 mic + JFET instrument", "Best small preamp feel", "Strong preamp and DI quality when you record one source at a time."]
          ]
        }
      },
      {
        type: "table",
        title: "Midrange Interface Recommendations",
        table: {
          columns: ["Model", "Inputs / Expansion", "Best For", "Why Consider It"],
          rows: [
            ["Behringer UMC1820 + ADA8200", "16 mic inputs via ADAT", "Budget drum tracking", "A practical low-cost path to full-band input counts."],
            ["Focusrite Scarlett 18i20 4th Gen", "8 preamps / ADAT / S/PDIF", "Home studios recording drums", "Expandable, familiar, and strong value for multi-mic sessions."],
            ["MOTU UltraLite mk5", "Flexible line I/O / DSP mixer", "Hybrid desktop rigs", "Excellent routing, conversion, and outputs in a compact box."],
            ["MOTU 828", "Rack I/O / AVB options", "Expandable studio hub", "Good fit when you need more routing and network-style growth."],
            ["Universal Audio Apollo Solo", "2 inputs / UAD DSP", "Entry Apollo workflow", "Realtime UAD processing and Unison in a small interface."],
            ["Universal Audio Apollo Twin X", "2 preamps / ADAT / UAD DSP", "Vocal and guitar tracking", "Low-latency UAD plugin tracking with expandable inputs."],
            ["Antelope Audio Zen Go Synergy Core", "2 inputs / onboard effects", "Portable DSP workflow", "Antelope conversion and Synergy Core effects in a small rig."],
            ["Antelope Audio Zen Q Synergy Core", "More I/O / ADAT / DSP", "Growing project studios", "More expansion and processing than the portable Zen Go."],
            ["Audient EVO 16", "8 preamps / ADAT", "Fast multi-input tracking", "Smart gain features and lots of inputs for home bands."],
            ["SSL 12", "4 preamps / ADAT / MIDI", "Small studio with SSL flavor", "Useful routing, 4K color, and expansion in a compact format."]
          ]
        }
      },
      {
        type: "table",
        title: "Pro Interface Recommendations",
        table: {
          columns: ["Model", "Inputs / Expansion", "Best For", "Why Consider It"],
          rows: [
            ["Universal Audio Apollo x4 Gen 2", "4 Unison preamps / UAD DSP", "Serious desktop tracking", "More DSP and I/O than Twin while staying desktop-friendly."],
            ["Universal Audio Apollo x8p Gen 2", "8 Unison preamps / HEXA Core DSP", "Professional drum and band tracking", "Eight Apollo preamps with realtime UAD plugin workflow."],
            ["Universal Audio Apollo x16D", "Dante / line I/O / UAD DSP", "Networked Apollo studios", "Dante-ready Apollo option for larger routing systems."],
            ["Antelope Audio Orion Studio Synergy Core", "High I/O / Synergy Core DSP", "Large project studios", "Lots of conversion, effects processing, and flexible studio routing."],
            ["Antelope Audio Discrete 8 Pro", "8 preamps / Synergy Core", "Tracking with onboard effects", "Good fit for multi-mic sessions needing Antelope processing."],
            ["Focusrite Clarett+ 8Pre", "8 preamps / ADAT", "Clean expandable recording", "Higher-tier Focusrite preamps and conversion for project studios."],
            ["Focusrite Red 16Line", "Thunderbolt / Dante / Pro Tools", "Hybrid professional rooms", "High-end Focusrite hub for Dante, line I/O, and larger studios."],
            ["MOTU 16A", "16 line inputs / AVB", "Synths and hybrid line-level rigs", "Excellent when you need lots of line I/O instead of mic preamps."],
            ["RME Fireface UFX III", "Deep I/O / TotalMix / rock-solid drivers", "Reliability-first studios", "Known for stable drivers, routing depth, and long-term support."],
            ["Lynx Aurora(n)", "Modular conversion and I/O", "Mastering or high-end hybrid studios", "High-quality conversion with configurable expansion cards."]
          ]
        }
      },
      {
        type: "checklist",
        title: "Interface Buying Checklist",
        items: [
          "Count the real simultaneous analog inputs you need before looking at total I/O marketing numbers.",
          "Choose enough mic preamps for the sessions you record most often.",
          "Check clean gain if you use low-output dynamic or ribbon microphones.",
          "Look at A/D and D/A dynamic range separately when specs provide both.",
          "Prioritize stable drivers and low round-trip latency over flashy bundles.",
          "Make sure headphone outputs and cue mixes support the number of performers you record.",
          "Use ADAT for affordable expansion, and consider Dante, MADI, or AVB only when the studio truly needs networked audio.",
          "Consider Apollo, Antelope, or similar DSP interfaces if you want to track through plugins while saving computer CPU.",
          "Confirm macOS/Windows/iPad compatibility before buying.",
          "Buy for your next two years of sessions, not for every possible future studio fantasy."
        ]
      }
    ]
  },
  {
    id: "monitoring",
    header: {
      title: "Monitoring",
      subtitle: "Speakers, headphones, rooms, and translation",
      icon: "🎧",
      accent: "blue"
    },
    summary: "Build a reliable monitoring workflow using room setup, headphones, speaker checks, mono/stereo awareness, and references that reveal mix decisions clearly.",
    sections: [
      {
        type: "cards",
        title: "Monitoring Mindset",
        columns: 3,
        cards: [
          {
            title: "Learn One Main System",
            items: [
              "Pick one primary monitor setup and learn how finished records sound on it.",
              "Use reference tracks in the same style before making major EQ or level decisions.",
              "Do not chase every speaker; look for problems that repeat across systems."
            ]
          },
          {
            title: "Check Quietly",
            items: [
              "Mixing quietly helps balances, vocals, snare, and harshness reveal themselves.",
              "Turn up briefly for low-end impact checks, then return to a safe working level.",
              "If the mix only works loud, the balance probably needs work."
            ]
          },
          {
            title: "Protect Your Ears",
            items: [
              "Take short breaks before your ears start normalizing harshness or loudness.",
              "Keep headphone sessions especially moderate because fatigue arrives quietly.",
              "Do not make final brightness or vocal-level calls when tired."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "Speaker Placement and Ear Position",
        columns: 3,
        cards: [
          {
            title: "Triangle Setup",
            items: [
              "Place the speakers and your head in an equilateral triangle.",
              "Aim tweeters at ear height and angle both monitors toward the listening position.",
              "Keep the left and right sides of the room as symmetrical as practical."
            ]
          },
          {
            title: "Wall Distance",
            items: [
              "Avoid corners because they exaggerate bass buildup.",
              "Use the monitor's manual and rear-panel EQ if the speakers must sit near a wall.",
              "Intermediate wall distances can create low-mid cancellations, so test placement with references."
            ]
          },
          {
            title: "Stands and Isolation",
            items: [
              "Use stands or isolation pads so the desk does not resonate with the speakers.",
              "Raise low desktop speakers instead of aiming them at your chest.",
              "Keep speakers stable; wobble and vibration blur transient detail."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "Room Dynamics",
        columns: 3,
        cards: [
          {
            title: "First Reflections",
            items: [
              "Treat side-wall, ceiling, and rear-wall reflection points before buying bigger speakers.",
              "Use the mirror trick: if you can see a speaker from the mix position, treat that spot.",
              "Broadband panels work better than thin foam for real mix decisions."
            ]
          },
          {
            title: "Bass Problems",
            items: [
              "Small rooms exaggerate some bass notes and hide others.",
              "Corner bass traps help more than guessing with EQ.",
              "Check kick and bass on headphones or VSX-style rooms if your room cannot reproduce sub lows."
            ]
          },
          {
            title: "Desk and Rear Wall",
            items: [
              "Desk reflections can make upper mids and stereo placement misleading.",
              "A bare wall behind your head can smear imaging and exaggerate slap.",
              "Use absorption, diffusion, bookshelves, or soft furniture to reduce obvious reflections."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "Headphones and Room Emulation",
        columns: 3,
        cards: [
          {
            title: "Closed-Back Headphones",
            items: [
              "Best for tracking because they reduce click bleed into microphones.",
              "Useful for finding clicks, edits, mouth noises, and distortion.",
              "Can feel bright or narrow, so avoid making every mix decision only on closed-backs."
            ]
          },
          {
            title: "Open-Back Headphones",
            items: [
              "Better for long mix checks and midrange detail in a quiet room.",
              "They leak sound, so do not use them near open microphones.",
              "Use references because the bass and stereo width differ from speakers."
            ]
          },
          {
            title: "VSX and Space Emulators",
            items: [
              "Steven Slate VSX and similar tools simulate studios, cars, clubs, and alternate speakers.",
              "Treat them as translation checks and learn them with commercial references.",
              "Calibrate output and take breaks; headphone room emulation still causes ear fatigue."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "Mono, Stereo, and Surround Checks",
        columns: 3,
        cards: [
          {
            title: "Mono",
            items: [
              "Check mono to catch phase problems, weak vocals, disappearing guitars, and hollow drums.",
              "If the hook collapses in mono, fix the arrangement, phase, or stereo widening.",
              "Small mono speakers reveal whether the song works without impressive width."
            ]
          },
          {
            title: "Stereo",
            items: [
              "Use stereo for panning, depth, reverbs, delays, and emotional width.",
              "Make sure the center still carries kick, bass, snare, and lead vocal.",
              "Avoid widening low bass unless the format and playback system can handle it."
            ]
          },
          {
            title: "Surround and Immersive",
            items: [
              "Treat surround, Atmos, and spatial versions as separate delivery formats.",
              "Do not assume a stereo mix automatically becomes a good immersive mix.",
              "Check fold-down behavior so important parts survive outside the ideal speaker layout."
            ]
          }
        ]
      },
      {
        type: "table",
        title: "Multiple Playback Checks",
        table: {
          columns: ["System", "Best For", "What to Listen For"],
          layout: "detailCards",
          rows: [
            ["Main monitors", "Primary balance and tone", "Vocal level, kick/bass relationship, depth, and stereo image"],
            ["Second small speaker", "Midrange truth", "Lead vocal, snare, guitars, hooks, and whether the song works small"],
            ["Closed-back headphones", "Editing and detail", "Clicks, noise, harshness, mouth sounds, and reverb tails"],
            ["Open-back headphones", "Longer mix checks", "Midrange tone, vocal emotion, and panning decisions"],
            ["Earbuds / phone / laptop", "Real-world translation", "Vocal intelligibility, low-end loss, and harsh upper mids"],
            ["Car", "Consumer low end and excitement", "Boomy bass, vocal level, cymbal harshness, and chorus impact"],
            ["VSX / room emulator", "Alternate room perspective", "Sub decisions, club impact, car translation, and mono-style checks"]
          ]
        }
      },
      {
        type: "table",
        title: "Headphone Recommendations",
        table: {
          columns: ["Price Range", "Model", "Type", "Why Use It"],
          rows: [
            [
              "Starter",
              "Sony MDR-7506",
              "Closed-back",
              "Classic tracking and editing headphone that reveals clicks, noise, and bright detail."
            ],
            [
              "Starter",
              "Audio-Technica ATH-M40x",
              "Closed-back",
              "Affordable all-purpose option for tracking, production, and rough mix checks."
            ],
            [
              "Starter",
              "Sennheiser HD 280 Pro",
              "Closed-back",
              "Strong isolation for vocals, loud rooms, and click-heavy tracking sessions."
            ],
            [
              "Mid",
              "Sennheiser HD 6XX",
              "Open-back",
              "Great value for midrange tone, long listening, and musical reference checks."
            ],
            [
              "Mid",
              "Beyerdynamic DT 770 Pro",
              "Closed-back",
              "Comfortable isolation with extended lows for tracking and production checks."
            ],
            [
              "Mid",
              "Sennheiser HD 560S",
              "Open-back",
              "Neutral, modern open-back choice for balance and stereo judgment."
            ],
            [
              "Higher",
              "Steven Slate VSX",
              "Closed-back plus room emulation",
              "Useful for checking studio, car, club, and alternate playback spaces from headphones."
            ],
            [
              "Higher",
              "Sony MDR-MV1",
              "Open-back",
              "Detailed Sony-style reference for mixing, immersive checks, and long sessions."
            ],
            [
              "Higher",
              "Sennheiser HD 600 / HD 650",
              "Open-back",
              "Reliable reference standards for tone, midrange, and translation when properly powered."
            ]
          ]
        }
      },
      {
        type: "table",
        title: "Monitor Speaker Recommendations",
        table: {
          columns: ["Price Range", "Model", "Best Fit", "Why Use It"],
          rows: [
            [
              "Starter",
              "PreSonus Eris E5 XT",
              "Small rooms and first monitor pair",
              "Strong value with room tuning controls and enough size for beginner home studios."
            ],
            [
              "Starter",
              "PreSonus Eris E4.5",
              "Desktop or very small rooms",
              "Compact and affordable when larger speakers would overload the room."
            ],
            [
              "Starter",
              "JBL 305P MkII",
              "Budget stereo imaging",
              "Wide sweet spot and useful detail for the price."
            ],
            [
              "Mid",
              "Kali Audio LP-6 V2",
              "Bass-aware home mixing",
              "Flat, practical monitor with useful boundary EQ and more low-end reach."
            ],
            [
              "Mid",
              "Yamaha HS5",
              "Critical midrange checks",
              "Revealing, familiar monitor that exposes balance problems without flattering them."
            ],
            [
              "Mid",
              "ADAM Audio T5V",
              "High-frequency detail",
              "Clear top end and strong detail for acoustic, vocal, and guitar decisions."
            ],
            [
              "Higher",
              "Yamaha HS7 / HS8",
              "Larger rooms needing more low end",
              "More extension than HS5, but needs placement and treatment to avoid bass confusion."
            ],
            [
              "Higher",
              "ADAM A4V / A7V",
              "Detailed treated-room monitoring",
              "More refined imaging and tuning options for serious mix rooms."
            ],
            [
              "Higher",
              "Kali IN-8",
              "Three-way monitoring on a budget",
              "Coaxial mid/tweeter design helps imaging and gives more detail than many two-way options."
            ]
          ]
        }
      },
      {
        type: "checklist",
        title: "Monitoring Checklist",
        items: [
          "Set monitors in an equilateral triangle with tweeters aimed at ear height.",
          "Treat first reflection points and corners before trusting bass decisions.",
          "Use one main monitoring system for most decisions and references.",
          "Check mono before approving wide guitars, stereo effects, or drum overheads.",
          "Use headphones for detail, but verify low end and stereo width elsewhere.",
          "Use VSX or room emulators as translation checks, not magic fixes.",
          "Check the mix quietly, on earbuds, in the car, and on a small speaker before final delivery.",
          "Take breaks before making final EQ, loudness, or vocal-level decisions."
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
          { title: "2. Broad EQ Only if Needed", items: ["Prefer subtle moves", "Fix mix problems before big master EQ"] },
          { title: "3. Dynamics if Useful", items: ["Use light glue", "Keep punch", "Avoid solving mix problems with compression"] },
          { title: "4. Limiter / Codec Check", items: ["Set final ceiling", "Preview loudness", "Check intersample clipping"] }
        ]
      },
      {
        type: "table",
        title: "Loudness Context",
        table: {
          columns: ["Style / Intent", "Integrated LUFS", "True Peak", "How to Use It"],
          layout: "detailCards",
          rows: [
            ["Dynamic/acoustic/open mix", "-18 to -14 LUFS", "-1.0 to -2.0 dBTP", "Preserve space, transients, and emotional movement."],
            ["Streaming-safe reference", "Around -14 LUFS", "About -1.0 dBTP", "Use as a normalization check, not a required final target."],
            ["Modern indie/rock/pop", "-13 to -9 LUFS", "About -2.0 dBTP if loud", "Check limiter artifacts and codec previews before delivery."],
            ["Preview/client loudness check", "Varies by reference", "-1.0 to -2.0 dBTP", "Use temporary limiting to audition loudness without hiding mix issues."]
          ]
        }
      },
      {
        type: "checklist",
        title: "Final Delivery",
        items: [
          "Check in mono and stereo",
          "Confirm no inter-sample clipping",
          "Preview AAC/MP3-style codec distortion when pushing loudness",
          "Use broad, subtle master EQ unless a deliberate creative move calls for more",
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
    summary: "Bring guitar layers together with optional bus glue, tone shaping, and controlled stereo image.",
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
            items: ["Tracks -> Guitar Bus -> Mix Bus", "Use bus processing only when the grouped guitars need shared tone or control"]
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
            ["5-8 kHz", "Fizz / pick edge", "Control distorted-guitar fizz before boosting"],
            ["6-10 kHz", "Clean-guitar air", "Use only when clean guitars need sparkle"]
          ]
        }
      },
      {
        type: "cards",
        title: "Compression Starting Points",
        cards: [
          {
            title: "Glue Only if Needed",
            items: [
              "Distorted rhythm guitars may not need bus compression.",
              "Try 1.5:1 to 2:1 and 1-2 dB gain reduction when multiple guitar layers need cohesion.",
              "Use automation or clip gain when a single part jumps out."
            ]
          }
        ]
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
    summary: "Capture clean, intentional performances by controlling the room, choosing simple mic setups, and keeping the session organized from the first take.",
    sections: [
      {
        type: "cards",
        title: "Acoustics and Sound Treatment",
        columns: 3,
        cards: [
          {
            title: "Pick the Best Room",
            items: [
              "Choose the largest, least boxy room you can use.",
              "Avoid bare parallel walls, glass, tile, and sharp reflective corners near the source.",
              "Put drums and amps away from walls when possible so early reflections are less harsh."
            ]
          },
          {
            title: "Treatment, Not Soundproofing",
            items: [
              "Soundproofing keeps noise in or out and usually needs construction.",
              "Acoustic treatment controls reflections inside the room and is the better home-studio goal.",
              "Treat first reflection points, corners, and the ceiling before buying more microphones."
            ]
          },
          {
            title: "DIY Panels and Bass Traps",
            items: [
              "Build panels from 2-4 inch Rockwool or Owens Corning 703 in simple wood frames.",
              "Use breathable fabric, not plastic, so air and sound can reach the absorber.",
              "Straddle room corners with thicker 4-6 inch traps to reduce low-end buildup."
            ]
          },
          {
            title: "What Works",
            items: [
              "Heavy rugs, curtains, couches, mattresses, bookshelves, and moving blankets can help in the right spots.",
              "A ceiling cloud above drums or the mix position reduces ceiling slap.",
              "Use the mirror trick to find wall spots where monitors or loud sources reflect directly."
            ]
          },
          {
            title: "What Does Not Work",
            items: [
              "Thin foam mostly absorbs high end and does very little for bass problems.",
              "Egg cartons are not useful acoustic treatment.",
              "Covering every surface can make the room dull while leaving low-frequency mud untouched."
            ]
          },
          {
            title: "Vibration Is the Enemy",
            items: [
              "Tighten rattling drum hardware, light fixtures, shelves, doors, and windows before recording.",
              "Decouple amps and speakers from the floor with stands, pads, or dense foam.",
              "Listen for buzzes during loud test passes before the band starts doing real takes."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "Microphones and Mic Placement",
        columns: 3,
        cards: [
          {
            title: "Choose the Right Mic",
            items: [
              "Dynamic mics handle loud sources and reject more room sound.",
              "Condenser mics capture detail on vocals, acoustic guitar, overheads, and rooms.",
              "Ribbon mics can smooth bright guitars or cymbals, but be careful with phantom power."
            ]
          },
          {
            title: "Home-Studio Rule",
            items: [
              "Cardioid patterns are your friend in imperfect rooms.",
              "Aim the back of the mic toward the noisiest bleed source.",
              "Move the mic before reaching for EQ; one inch can change the tone dramatically."
            ]
          },
          {
            title: "Vocals",
            items: [
              "Start 6-8 inches from a cardioid condenser or dynamic mic with a pop filter.",
              "Put absorption behind the singer and behind the mic if the room is bright.",
              "Record a test phrase with the loudest chorus so peaks stay clean."
            ]
          },
          {
            title: "Electric Guitar",
            items: [
              "Start with a dynamic mic near the speaker edge, 1-3 inches from the grille.",
              "Move toward the dust cap for brighter bite or toward the edge for a darker tone.",
              "Turn the amp down if the room is making the mic sound small or harsh."
            ]
          },
          {
            title: "Acoustic Guitar",
            items: [
              "Start around the 12th fret, 8-12 inches back, aimed slightly toward the sound hole.",
              "Avoid pointing straight into the sound hole unless you want boom.",
              "Use one good mic before adding stereo complexity."
            ]
          },
          {
            title: "Phase Checks",
            items: [
              "When two mics hear one source, measure equal distances from the important drum or speaker.",
              "Flip polarity and listen in mono; keep the option that sounds fuller.",
              "If the sound gets hollow, move a mic before recording more takes."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "DI and Preamps",
        columns: 3,
        cards: [
          {
            title: "Why DI Matters",
            items: [
              "A DI captures a clean, reliable signal before pedals, amps, and room problems.",
              "Keep DI tracks for bass and guitar so you can reamp or use amp sims later.",
              "A clean DI can save a great performance if the amp tone was wrong."
            ]
          },
          {
            title: "Bass",
            items: [
              "Record bass DI on every session.",
              "Blend the DI for low-end solidity with an amp track for grit or air.",
              "Use fresh strings and check tuning often; bass tuning problems are obvious in the mix."
            ]
          },
          {
            title: "Preamps and Levels",
            items: [
              "Use the interface preamp cleanly unless you are intentionally driving color.",
              "At 24-bit, leave headroom instead of recording hot.",
              "Aim loud peaks around -12 to -6 dBFS and avoid clipping anywhere in the chain."
            ]
          }
        ]
      },
      {
        type: "table",
        title: "Tracking Drums: Choose a Mic Setup",
        table: {
          columns: ["Setup", "Mics", "What It Sounds Like", "Best For", "Home-Studio Tip"],
          rows: [
            [
              "One-mic mono kit",
              "1 room or overhead mic",
              "Raw, vintage, balanced by the drummer instead of the mixer",
              "Demos, garage rock, simple songwriting captures",
              "Place the mic 3-6 feet in front of the kit around chest height, then move until kick/snare/cymbals balance."
            ],
            [
              "Two-mic Recorderman",
              "2 overhead-style cardioid mics",
              "Focused kit image with solid snare and kick if measured carefully",
              "Small rooms, limited inputs, natural indie or folk drums",
              "Keep both mics the same distance from the snare and kick beater, then check mono before recording."
            ],
            [
              "Three-mic punch setup",
              "Kick plus two overheads",
              "More low-end control while overheads carry the kit",
              "Rock demos, rehearsal-room sessions, quick live-band tracking",
              "Treat the overheads as the main drum sound and bring the kick mic up only enough to add weight."
            ],
            [
              "Four-mic Glyn Johns",
              "Overhead, floor-tom side mic, kick, snare",
              "Open, roomy, classic rock tone with strong kit perspective",
              "Rock, blues, roots, punk, and bands that want live energy",
              "Measure both main mics from the snare center so the snare stays full instead of phasey."
            ],
            [
              "Five or six-mic home setup",
              "Kick, snare, stereo overheads, one or two tom/room mics",
              "Modern control without too many phase problems",
              "Most home band productions",
              "Tune drums first, keep cymbals lower in volume, and use tom mics only if they improve the overhead picture."
            ],
            [
              "Full close-mic setup",
              "Kick, snare top/bottom, toms, hat, overheads, rooms",
              "Polished, editable, punchy, and mix-ready when phase is managed",
              "Professional sessions, dense rock, metal, pop, and productions needing detailed edits",
              "Label every input, check polarity as you add mics, and do a short test mix before committing."
            ]
          ]
        }
      },
      {
        type: "table",
        title: "Gain Staging Quick Guide",
        table: {
          columns: ["Metric", "Recommended", "Why"],
          layout: "detailCards",
          rows: [
            ["Bit depth", "24-bit", "Allows conservative levels without noise problems"],
            ["Peaks", "-12 to -6 dBFS", "Leaves room for surprise hits and singer/drummer excitement"],
            ["Average level", "Around -18 dBFS", "Keeps plugins and preamps in a comfortable operating range"],
            ["Avoid", "Any clipping or over-hot stems", "Clipped tracking cannot be repaired cleanly later"]
          ]
        }
      },
      {
        type: "cards",
        title: "Overdubs",
        columns: 3,
        cards: [
          {
            title: "Start With a Foundation",
            items: [
              "Record a scratch vocal or guide guitar before the rhythm section.",
              "Make sure everyone understands the arrangement before chasing tones.",
              "Keep the guide track if it has feel, but do not let it bleed into final mics."
            ]
          },
          {
            title: "Punches and Comps",
            items: [
              "Record multiple complete takes before punching every small mistake.",
              "Use playlists or take folders so good ideas do not get overwritten.",
              "Punch in a bar early and out a bar late so edits breathe naturally."
            ]
          },
          {
            title: "Keep Tone Consistent",
            items: [
              "Mark mic positions with tape before breaks.",
              "Photograph amp settings, pedal settings, and mic placement.",
              "Retune between takes, especially bass, acoustic guitar, and doubled parts."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "Studio Time and Habits",
        columns: 3,
        cards: [
          {
            title: "Headphone Mixes",
            items: [
              "Give each musician enough of themselves, kick/snare, bass, and guide vocal.",
              "Use closed-back headphones to reduce click bleed.",
              "If the take feels stiff, improve the headphone mix before blaming the player."
            ]
          },
          {
            title: "Click or No Click",
            items: [
              "Use a click for tight edits, tempo-based effects, and modern production.",
              "Skip or loosen the click when the song needs natural push and pull.",
              "Tempo-map rehearsals if the band plays best with intentional tempo changes."
            ]
          },
          {
            title: "Session Logistics",
            items: [
              "Name tracks before recording: Kick In, Snare Top, Bass DI, Guitar L, Vocal Lead.",
              "Color-code instruments and route buses before the serious takes.",
              "Keep water, spare strings, drum keys, batteries, picks, and gaff tape nearby."
            ]
          },
          {
            title: "Communication",
            items: [
              "Talk about feel, emotion, and arrangement before talking about gear.",
              "Use short notes after each take so the band stays confident.",
              "Do not over-coach during a great performance."
            ]
          },
          {
            title: "Breaks and Ears",
            items: [
              "Take short breaks before fatigue makes everyone chase bad decisions.",
              "Keep control-room volume moderate so tone choices stay reliable.",
              "Print a rough mix at the end of the day so everyone can review calmly."
            ]
          },
          {
            title: "Backup Routine",
            items: [
              "Save before changing setups or deleting takes.",
              "Back up raw audio before editing or comping.",
              "Keep a dated session copy when the tracking day ends."
            ]
          }
        ]
      },
      {
        type: "checklist",
        title: "Tracking Day Checklist",
        items: [
          "Tune drums, guitars, and bass before microphones go up.",
          "Walk the room and remove rattles, buzzes, and loose hardware.",
          "Record a 30-second test and listen in mono for phase problems.",
          "Check the loudest section before setting final preamp gain.",
          "Confirm the headphone mix is comfortable for the player.",
          "Label tracks, inputs, takes, and playlists before the real pass.",
          "Save and back up raw audio before editing."
        ]
      }
    ]
  },
  {
    id: "audio-routing",
    header: {
      title: "Audio Routing",
      subtitle: "Buses, sends, inserts, and parallel paths",
      icon: "🚌",
      accent: "green"
    },
    summary: "Route instruments into clean buses, use sends and inserts intentionally, and build creative parallel paths in Logic Pro.",
    sections: [
      {
        type: "cards",
        title: "Core Signal Flow",
        columns: 4,
        cards: [
          {
            title: "Track",
            items: ["The original audio or software instrument channel.", "Use inserts here for source-specific cleanup."]
          },
          {
            title: "Instrument Bus",
            items: ["Group related tracks: drums, guitars, vocals, keys.", "Use the bus fader as one control for that family."]
          },
          {
            title: "Mix / Master Bus",
            items: ["All group buses feed the final stereo path.", "Use gentle polish, metering, and final level checks here."]
          },
          {
            title: "Simple Map",
            items: ["Kick/Snare/Toms/OH -> Drum Bus", "Guitars -> Guitar Bus", "Vocals -> Vocal Bus", "All buses -> Mix Bus -> Stereo Out"]
          }
        ]
      },
      {
        type: "table",
        title: "Insert vs Send",
        table: {
          columns: ["Choice", "What It Does", "Use It For", "Logic Pro Tip"],
          layout: "detailCards",
          rows: [
            [
              "Insert",
              "Processes 100% of the signal directly on that track or bus.",
              "EQ, compression, gates, de-essing, amp sims, corrective tools.",
              "Use inserts when the sound itself needs to change before it reaches the bus."
            ],
            [
              "Send",
              "Copies part of a signal to an aux through a bus while the original keeps playing.",
              "Reverb, delay, chorus, flanger, parallel compression, cue mixes.",
              "Set time-based FX returns to 100% wet because the dry sound is already on the original track."
            ],
            [
              "Post-Fader Send",
              "Send level follows the track fader.",
              "Most reverbs and delays, where the effect should fade down with the source.",
              "This is Logic's normal choice for shared space effects."
            ],
            [
              "Pre-Fader Send",
              "Send level stays independent of the track fader.",
              "Headphone mixes, isolated effects, and some parallel compression setups.",
              "Use carefully so hidden or quiet tracks do not keep feeding the effect unexpectedly."
            ]
          ]
        }
      },
      {
        type: "cards",
        title: "Parallel Mixing",
        columns: 3,
        cards: [
          {
            title: "What It Means",
            items: [
              "Split a source into two paths: dry original plus processed copy.",
              "Blend the processed return underneath instead of replacing the original."
            ]
          },
          {
            title: "Why It Works",
            items: [
              "Keeps punch, clarity, and transients from the dry track.",
              "Adds density, sustain, width, grit, or excitement from the parallel path."
            ]
          },
          {
            title: "How to Start",
            items: [
              "Send the source or bus to a new aux.",
              "Compress, saturate, widen, or filter the aux hard.",
              "Pull the aux fader down, then raise it until you miss it when muted."
            ]
          }
        ]
      },
      {
        type: "table",
        title: "Creative Routing Examples",
        table: {
          columns: ["Idea", "Routing", "Why It Is Useful"],
          layout: "detailCards",
          rows: [
            [
              "Drum Crush Bus",
              "Drum Bus -> Send -> Aux with fast compressor, saturation, and EQ.",
              "Adds energy and density while the original drums keep their punch."
            ],
            [
              "Dub Delay Throw",
              "Vocal or snare -> Send -> Delay Aux -> optional Reverb Aux.",
              "Automate send levels on select words or hits for dramatic echoes without washing out the whole track."
            ],
            [
              "Parallel Bass Grit",
              "Bass -> Send -> Aux with high-pass EQ, saturation, and compression.",
              "Adds midrange translation on phones/laptops while the clean low-end stays stable."
            ],
            [
              "Vocal Space Stack",
              "Lead Vocal -> Sends to short room, slap delay, long delay, and plate reverb auxes.",
              "Lets the vocal feel close, wide, and emotional by blending different spaces independently."
            ]
          ]
        }
      },
      {
        type: "checklist",
        title: "Routing Rules of Thumb",
        items: [
          "Use buses to organize related instruments and process families together.",
          "Use inserts when a single track needs tonal or dynamic correction.",
          "Use sends when multiple tracks should share one space or effect.",
          "Keep reverbs and delays on aux returns mostly or fully wet.",
          "Name buses clearly: Drum Bus, Vocal Verb, Slap Delay, Drum Crush.",
          "Check that every bus eventually routes to the mix bus or stereo output.",
          "Mute parallel returns occasionally to confirm they are helping, not cluttering."
        ]
      }
    ]
  },
  {
    id: "automation",
    header: {
      title: "Automation: Beyond Volume",
      subtitle: "Advanced automation techniques for dynamic, musical mixes",
      icon: "🎛️",
      accent: "purple"
    },
    summary: "Master automation beyond basic volume rides: riders vs gates, dynamic effect parameters, parallel bus automation, and advanced mixing techniques that bring movement and life to every production.",
    sections: [
      {
        type: "cards",
        title: "Automation Fundamentals",
        columns: 3,
        cards: [
          {
            title: "What Is Automation?",
            items: [
              "Automation records parameter changes over time: volume, pan, sends, plugin parameters, and more.",
              "It turns static settings into dynamic, musical movements that evolve with your song.",
              "Every automatable parameter can tell a story and create emotional impact.",
              "Think of automation as performance: it should feel musical, not mechanical."
            ]
          },
          {
            title: "Why Automation Matters",
            items: [
              "Static mixes sound lifeless and amateur compared to automated productions.",
              "Automation creates focus, directing listener attention to what matters most in each moment.",
              "It solves problems that compression and EQ cannot: bringing out one word, one note, one moment.",
              "Professional mixes move, breathe, and respond to musical energy through intentional automation."
            ]
          },
          {
            title: "When to Automate",
            items: [
              "After establishing rough balance, gain staging, and core processing.",
              "Do not use automation to fix fundamentally broken balances or badly chosen plugins.",
              "Automate when a single static setting compromises another section of the song.",
              "Start simple with volume and sends, then expand to more creative parameters."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Volume Automation Lane",
        src: "/images/automation/01-volume-automation-lane.png",
        alt: "Logic Pro volume automation lane showing smooth curves on a vocal track",
        caption: "Volume automation is the foundation of dynamic mixing, allowing precise control of level changes throughout your song."
      },
      {
        type: "cards",
        title: "Automation Modes Explained",
        columns: 4,
        cards: [
          {
            title: "Read Mode",
            items: [
              "Plays back existing automation without allowing new recording.",
              "Use this mode when mixing other tracks to prevent accidental automation writes.",
              "Essential for reviewing and fine-tuning existing automation moves.",
              "Default mode for safe playback."
            ]
          },
          {
            title: "Touch Mode",
            items: [
              "Records automation only while touching the control, then returns to existing automation.",
              "Best for surgical fixes and specific moment adjustments.",
              "Preserves surrounding automation automatically.",
              "Most commonly used mode for manual automation writing."
            ]
          },
          {
            title: "Latch Mode",
            items: [
              "Records from the moment you touch a control until you stop playback.",
              "Overwrites all existing automation from the touch point forward.",
              "Useful for long, sustained parameter changes.",
              "Requires careful attention to avoid overwriting good automation."
            ]
          },
          {
            title: "Write Mode",
            items: [
              "Records all parameter movements from the moment playback starts.",
              "Overwrites all existing automation immediately and continuously.",
              "Rarely used in professional mixing due to destructive nature.",
              "Can be useful for starting fresh on heavily automated tracks."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Automation Modes",
        src: "/images/automation/02-automation-modes.png",
        alt: "Logic Pro automation modes menu showing Touch, Latch, Write, and Read options",
        caption: "Understanding automation modes is critical for efficient workflow and preventing accidental overwrites."
      },
      {
        type: "cards",
        title: "Riders vs Gates vs Manual Automation",
        columns: 3,
        cards: [
          {
            title: "Use Manual Automation When",
            items: [
              "The fix is specific, musical, and intentional: one loud word, one buried note, one drum fill that should explode.",
              "You need precise control over the exact shape and timing of level changes.",
              "Creative moves like delay throws, filter sweeps, and effect sends that follow musical phrasing.",
              "Automation gives you unlimited control but requires more time investment."
            ]
          },
          {
            title: "Use a Rider When",
            items: [
              "The performance needs constant small corrections across the entire track: inconsistent vocal dynamics, bass note variations.",
              "You want automatic level balancing without the pumping artifacts of heavy compression.",
              "Riders work before compression, feeding the compressor a more even signal for cleaner results.",
              "Best for natural-sounding leveling on vocals, bass, acoustic guitar, and solo instruments."
            ]
          },
          {
            title: "Use a Gate When",
            items: [
              "You need automatic cleanup between hits or phrases: drum close mics with cymbal bleed, noisy guitar amps with silence between notes.",
              "The goal is noise reduction, not creative effect.",
              "Gates work best with clear attack/release patterns and obvious silence between wanted sounds.",
              "They work poorly when bleed is musical or when silence is not truly silent."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Vocal Rider Plugin",
        src: "/images/automation/03-vocal-rider-plugin.png",
        alt: "Vocal rider plugin interface showing automatic level adjustments",
        caption: "Vocal riders automate level adjustments intelligently, saving hours of manual automation while preserving natural dynamics."
      },
      {
        type: "table",
        title: "Rider vs Gate Decision Matrix",
        table: {
          columns: ["Scenario", "Best Tool", "Why", "Pro Tip"],
          layout: "detailCards",
          rows: [
            [
              "Inconsistent vocal performance with constant level changes",
              "Rider before compressor",
              "Evens out the signal before compression, resulting in cleaner dynamics control without pumping.",
              "Set rider target range narrow (2-3 dB) for transparent results."
            ],
            [
              "Drum close mics with cymbal bleed between hits",
              "Gate with gentle settings or manual editing",
              "Removes unwanted cymbal wash during tom hits and snare silence, tightening the drum sound.",
              "Use longer release times to avoid cutting off natural decay."
            ],
            [
              "Bass guitar with huge dynamic range from slapping and soft notes",
              "Rider + compression in series",
              "Rider handles the big jumps, compressor handles the subtleties, avoiding over-compression.",
              "Use rider first, then light compression (2-4 dB GR max)."
            ],
            [
              "One phrase in the chorus that disappears in the mix",
              "Manual volume automation",
              "Surgical fix for a specific moment that does not repeat.",
              "Automate 1-2 dB lift with smooth curves, not sudden jumps."
            ],
            [
              "Acoustic guitar recording with loud pick attacks and quiet fingerstyle sections",
              "Rider for broad leveling, clip gain for extreme transients",
              "Rider handles overall dynamics, clip gain tames a few outlier peaks without affecting everything.",
              "Lower peak transients with clip gain before adding the rider."
            ],
            [
              "Guitar amp recording with hum during silence between riffs",
              "Gate with sidechain filter",
              "Automatic noise reduction without manually editing every gap.",
              "Filter the sidechain to focus on guitar fundamentals, not hum."
            ]
          ]
        }
      },
      {
        type: "image",
        title: "Gate Threshold Automation",
        src: "/images/automation/12-gate-threshold-automation.png",
        alt: "Logic Pro gate plugin with threshold automation creating dynamic gating behavior",
        caption: "Automating gate threshold allows different cleanup intensity for quiet verses vs loud choruses."
      },
      {
        type: "cards",
        title: "Automating Delay Feedback and Threshold",
        columns: 2,
        cards: [
          {
            title: "Delay Feedback Automation",
            items: [
              "Feedback controls how many repeats you hear: low feedback = short tail, high feedback = infinite spinning echoes.",
              "Automate feedback up during transitions to create 'delay throws' that bloom into the next section.",
              "Automate feedback down before dense lyrical sections to avoid clutter and maintain clarity.",
              "Use dramatic feedback spikes (70-95%) for breakdown effects, then pull back to 15-30% for normal delays.",
              "Feedback automation is one of the most musical and immediately noticeable automation moves."
            ]
          },
          {
            title: "Delay Threshold Automation",
            items: [
              "Some delays (especially vintage or tape-style) have built-in ducking or threshold controls.",
              "Automating threshold changes how much input is needed before the delay responds, creating dynamic delay presence.",
              "Lower threshold = more delay action, higher threshold = delay only on loud peaks.",
              "Use threshold automation to make delays appear only on emphasized words or final notes of phrases.",
              "Combine threshold automation with send level automation for maximum dynamic control."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Delay Feedback Automation",
        src: "/images/automation/05-delay-feedback-automation.png",
        alt: "Logic Pro delay plugin showing dramatic feedback automation curve creating a delay throw effect",
        caption: "Feedback automation creates the iconic 'delay throw' effect, building tension and energy at transitions."
      },
      {
        type: "table",
        title: "Delay Feedback Automation Techniques",
        table: {
          columns: ["Technique", "Feedback Range", "Musical Use", "Timing"],
          layout: "detailCards",
          rows: [
            [
              "Delay Throw",
              "Jump from 20% to 80-95%, then back down",
              "Create swirling, building tension at the end of a section before a drop or new section",
              "Automate up over 1-2 beats, hold briefly, then pull down quickly"
            ],
            [
              "Subtle Section Shift",
              "15% in verse, 35% in chorus",
              "Make choruses feel more spacious and energetic without changing the dry sound",
              "Ramp up smoothly over 1-4 bars at section transition"
            ],
            [
              "Freeze Effect",
              "Momentary spike to 100%",
              "Create infinite sustain on one note or word, freezing it in time",
              "Spike to 100% for 1 beat, then drop to 0% or very low"
            ],
            [
              "Feedback Swell",
              "Gradually rise from 10% to 60% over 8-16 bars",
              "Build anticipation and intensity during a long build-up section",
              "Slow, smooth automation curve over the entire build section"
            ],
            [
              "Dynamic Delay Presence",
              "Low (10-15%) normally, spike to 40-50% on final words of phrases",
              "Make delays appear only on select words for emphasis without constant effect",
              "Short spikes (1-2 beats) on intentional moments only"
            ]
          ]
        }
      },
      {
        type: "cards",
        title: "Parallel Bus with Automation on One Channel",
        columns: 2,
        cards: [
          {
            title: "Parallel Bus Automation Concept",
            items: [
              "Create two buses: one dry or lightly processed, one heavily processed (compressed, saturated, distorted).",
              "Both buses receive the same source, but only the processed bus has automation.",
              "Automate the level of the processed bus to blend in intensity where needed without affecting the dry tone.",
              "This technique gives you consistent clean tone with dynamic aggression, sustain, or density.",
              "Common uses: parallel drum compression, parallel bass saturation, parallel vocal thickness."
            ]
          },
          {
            title: "Why This Works",
            items: [
              "You maintain the natural dynamics and transients of the dry signal at all times.",
              "The processed bus adds body, sustain, or energy only when and where you choose.",
              "Automation becomes a creative blend control rather than a fix for processing issues.",
              "It is easier to commit to heavy processing when you know you can automate its contribution.",
              "Allows you to have both clean, transparent mixing and aggressive character in the same track."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Parallel Bus Automation",
        src: "/images/automation/08-parallel-bus-automation.png",
        alt: "Logic Pro parallel compression bus with automation on the wet channel",
        caption: "Parallel bus automation lets you blend heavy processing dynamically while keeping the dry signal consistent."
      },
      {
        type: "table",
        title: "Parallel Bus Automation Applications",
        table: {
          columns: ["Source", "Parallel Processing", "What to Automate", "Musical Result"],
          layout: "detailCards",
          rows: [
            [
              "Drum bus",
              "Heavy compression (8:1, aggressive attack/release)",
              "Compressed bus level: low in verses, higher in choruses",
              "Punchy, explosive drums in choruses while keeping verses dynamic and natural"
            ],
            [
              "Bass guitar",
              "Saturation or distortion (Decapitator, SansAmp)",
              "Saturated bus level: automate up during chorus and breakdown riffs",
              "Clean low end stays consistent, aggressive grind appears only when needed"
            ],
            [
              "Lead vocal",
              "Dense compression + saturation",
              "Dense bus level: low normally, higher on powerful belted notes",
              "Natural breathy tone on soft phrases, thick powerful sound on climaxes"
            ],
            [
              "Snare",
              "Parallel compression or transient enhancement",
              "Parallel level: automate up on fills and hits that need extra crack",
              "Consistent snare tone with dynamic emphasis on important hits"
            ],
            [
              "Synth pad",
              "Heavy reverb or shimmer effect",
              "Effect bus level: low in busy sections, high in sparse intros/outros",
              "Lush ambience when space allows, clarity when arrangement is dense"
            ]
          ]
        }
      },
      {
        type: "image",
        title: "Send Automation Across Multiple Tracks",
        src: "/images/automation/04-send-automation-multiple-tracks.png",
        alt: "Logic Pro mixer view showing send automation lanes on multiple tracks",
        caption: "Send automation is powerful for creating dynamic effects that appear and disappear musically."
      },
      {
        type: "cards",
        title: "Filter Cutoff Automation",
        columns: 2,
        cards: [
          {
            title: "High-Pass Filter Sweeps",
            items: [
              "Start with a heavy high-pass filter removing lows and mids, creating a thin, distant sound.",
              "Automate the cutoff frequency down (opening the filter) to reveal the full sound at a climactic moment.",
              "Common in electronic music builds, but works equally well on guitars, synths, vocals, and entire mix buses.",
              "Combine with volume automation for an even more dramatic reveal.",
              "Use smooth automation curves (1-8 bars) for musical sweeps, not sudden jumps."
            ]
          },
          {
            title: "Low-Pass Filter Sweeps",
            items: [
              "Start with the low-pass filter open (bright, full-range sound), then automate it closed to create a muffled, distant effect.",
              "Useful for creating tension, simulating distance, or preparing for a drop.",
              "Automate the filter to close gradually during a build, then snap it open on the drop.",
              "Low-pass automation is effective on drum loops, synth pads, guitars, and background vocals.",
              "Pair with reverb decay automation for even more dramatic depth shifts."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Filter Sweep Automation",
        src: "/images/automation/06-filter-sweep-automation.png",
        alt: "Logic Pro filter cutoff automation showing an upward frequency sweep",
        caption: "Filter sweeps create excitement and anticipation, making transitions feel intentional and energetic."
      },
      {
        type: "cards",
        title: "Pan Automation for Width and Movement",
        columns: 2,
        cards: [
          {
            title: "Static Pan vs Automated Pan",
            items: [
              "Static panning creates a fixed stereo image: vocals center, guitars left/right, etc.",
              "Automated panning creates movement, excitement, and evolving width throughout the song.",
              "Use pan automation sparingly on lead elements to avoid disorienting the listener.",
              "Background elements, ear candy, and effects can move freely without causing issues.",
              "Pan automation can make a simple part feel dynamic and engaging."
            ]
          },
          {
            title: "Pan Automation Techniques",
            items: [
              "Auto-pan effects: rhythmic left-right movement synced to tempo for tremolo-style motion.",
              "Widening choruses: automate stereo elements slightly wider during chorus sections for expansiveness.",
              "Ear candy movement: automate synth arpeggios or delay tails to drift across the stereo field.",
              "Collapse and expand: narrow the mix during verses, widen during choruses for dynamic contrast.",
              "Avoid automating low-frequency elements (kick, bass, sub) to maintain solid low-end imaging."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Pan Automation Movement",
        src: "/images/automation/07-pan-automation-movement.png",
        alt: "Logic Pro pan automation showing stereo movement from left to right",
        caption: "Pan automation adds motion and width, making static arrangements feel alive and engaging."
      },
      {
        type: "table",
        title: "Advanced Automation Targets",
        table: {
          columns: ["Parameter", "What It Does", "Creative Use", "Pro Tip"],
          layout: "detailCards",
          rows: [
            [
              "Reverb Decay Time",
              "Controls how long reverb tails sustain",
              "Short decay (0.5-1s) in verses, long decay (2-4s) in choruses for depth contrast",
              "Automate decay longer at the end of phrases to create space without constant wetness"
            ],
            [
              "Reverb Pre-Delay",
              "Sets the gap between dry signal and reverb onset",
              "Increase pre-delay in dense mixes to separate dry vocal from reverb tail",
              "Automate pre-delay shorter on sustained notes, longer on fast phrases"
            ],
            [
              "Compressor Threshold",
              "Changes how much compression is applied dynamically",
              "Lower threshold in quiet sections for more support, higher in loud sections to preserve dynamics",
              "Useful for maintaining consistent compression feel across widely varying input levels"
            ],
            [
              "Compressor Ratio",
              "Changes compression intensity from gentle to aggressive",
              "Automate ratio higher (6:1-10:1) on aggressive sections, lower (2:1-3:1) on smooth sections",
              "Rarely used but powerful for creating distinctly different compression character per section"
            ],
            [
              "EQ Band Gain",
              "Dynamically boosts or cuts specific frequencies",
              "Boost high-mids on lead vocal during chorus for presence, reduce during verse for intimacy",
              "Automate narrow cuts to remove resonances that only appear in certain sections"
            ],
            [
              "EQ Filter Frequency",
              "Moves the center frequency of a boost or cut",
              "Sweep a resonant peak for creative filter effects or dynamic tonal shifts",
              "Automate high-pass filter higher during verses to clear space, lower in chorus for fullness"
            ],
            [
              "Saturation Drive/Mix",
              "Controls distortion intensity and blend",
              "Increase saturation during aggressive sections, back off for clean intimate moments",
              "Automate mix percentage rather than drive to maintain consistent character with variable intensity"
            ],
            [
              "Stereo Width",
              "Narrows or widens the stereo image",
              "Narrow verses for focus, widen choruses for expansiveness",
              "Avoid widening low frequencies or you will lose mono compatibility"
            ],
            [
              "Transient Designer Attack",
              "Emphasizes or softens initial transients",
              "Boost attack on drum fills and impactful hits, soften on smooth sustained sections",
              "Small changes (10-20%) create noticeable impact without sounding processed"
            ],
            [
              "Transient Designer Sustain",
              "Lengthens or shortens the body of a sound",
              "Increase sustain on drums for energy, decrease for tightness and control",
              "Combine with parallel compression for maximum sustain control"
            ],
            [
              "De-esser Frequency",
              "Targets different sibilance ranges dynamically",
              "Automate frequency lower for darker 'sh' sounds, higher for brighter 's' sounds",
              "Useful when sibilance character changes between sections (breathy verse vs belted chorus)"
            ],
            [
              "Limiter Ceiling",
              "Sets maximum output level before clipping",
              "Automate ceiling lower for streaming masters, higher for club/loud masters",
              "Rarely needed but useful when creating multiple master versions from one session"
            ]
          ]
        }
      },
      {
        type: "image",
        title: "Compressor Threshold Automation",
        src: "/images/automation/09-compressor-threshold-automation.png",
        alt: "Logic Pro compressor with threshold automation curve",
        caption: "Threshold automation adjusts compression intensity dynamically to match the energy of each section."
      },
      {
        type: "image",
        title: "Reverb Decay Automation",
        src: "/images/automation/10-reverb-decay-automation.png",
        alt: "Logic Pro reverb plugin with decay time automation changing between sections",
        caption: "Decay time automation creates dramatic depth shifts between intimate verses and expansive choruses."
      },
      {
        type: "cards",
        title: "EQ Automation for Dynamic Tone Shaping",
        columns: 2,
        cards: [
          {
            title: "Surgical EQ Automation",
            items: [
              "Automate narrow cuts to remove resonances that only appear in certain notes or sections.",
              "Example: A vocal has a harsh 3kHz spike only on certain vowels, automate a cut just for those moments.",
              "Use high-Q (narrow) cuts with 3-6 dB depth, automated in and out as needed.",
              "This approach is more transparent than static EQ, which may dull other parts to fix one problem.",
              "Common on vocals, acoustic guitars, and any source with inconsistent tonal issues."
            ]
          },
          {
            title: "Broad Tone Automation",
            items: [
              "Automate broad shelf or bell curves to change the overall tone color between sections.",
              "Example: Boost 10kHz shelf by 2 dB in the chorus to make vocals more present and airy.",
              "Use low-Q (wide) curves with 1-3 dB changes for smooth, natural-sounding tonal shifts.",
              "Helps vocals, guitars, and synths shift character to match the emotional energy of each section.",
              "Pair with send level automation for maximum tonal and spatial control."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "EQ Band Automation",
        src: "/images/automation/11-eq-band-automation.png",
        alt: "Logic Pro EQ plugin showing multiple frequency band automation lanes",
        caption: "Multi-band EQ automation allows precise, dynamic tonal adjustments that respond to the song's needs."
      },
      {
        type: "cards",
        title: "VCA Faders and Group Automation",
        columns: 2,
        cards: [
          {
            title: "What Are VCA Faders?",
            items: [
              "VCA (Voltage Controlled Amplifier) faders control the level of multiple tracks simultaneously without summing them to a bus.",
              "Automating a VCA fader affects all assigned tracks while preserving their relative balance.",
              "VCAs are perfect for controlling groups like 'All Drums', 'All Vocals', or 'All Guitars' dynamically.",
              "Unlike bus faders, VCAs do not route audio or add processing—they are pure control automation.",
              "Essential for large mixes where you need dynamic group control without affecting routing or processing."
            ]
          },
          {
            title: "VCA Automation Strategies",
            items: [
              "Automate the drum VCA to lower during verses and raise during choruses for dynamic energy control.",
              "Automate backing vocal VCA separately from lead vocal for independent balance control.",
              "Use VCA automation to duck entire instrument groups during important vocal phrases.",
              "Combine VCA automation with individual track automation for layered, detailed mix movements.",
              "VCAs make mix revisions easier: change the group balance without redoing individual automation."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "VCA Group Automation",
        src: "/images/automation/14-vca-group-automation.png",
        alt: "Logic Pro track stack showing VCA fader automation controlling multiple grouped tracks",
        caption: "VCA automation provides powerful control over entire instrument groups while preserving relative balance."
      },
      {
        type: "cards",
        title: "Wet/Dry Mix Automation",
        columns: 2,
        cards: [
          {
            title: "Plugin Wet/Dry Automation",
            items: [
              "Many plugins have internal wet/dry mix controls that blend processed and unprocessed signal.",
              "Automate the mix parameter to make effects appear and disappear without changing send levels.",
              "Example: Automate a chorus plugin from 0% wet in verses to 40% wet in choruses for movement.",
              "Works beautifully on modulation effects, distortion, reverb, and stereo widening.",
              "More transparent than automating plugin bypass, which can cause clicks."
            ]
          },
          {
            title: "Effect Blend Techniques",
            items: [
              "Start with 100% wet on return tracks, then use send automation to control effect level.",
              "Or use 100% wet on inserts and automate the plugin's internal mix for different control.",
              "Automating wet/dry mix feels more gradual and musical than on/off bypass automation.",
              "Use smooth curves (2-4 bars) when automating wet/dry to avoid abrupt tonal shifts.",
              "Great for making delays, reverbs, modulation, and distortion effects evolve throughout the song."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Wet/Dry Mix Automation",
        src: "/images/automation/15-wetdry-mix-automation.png",
        alt: "Logic Pro distortion plugin with wet/dry mix automation",
        caption: "Wet/dry automation creates smooth transitions from clean to processed tones without routing changes."
      },
      {
        type: "cards",
        title: "Sidechain Automation for Dynamic Ducking",
        columns: 2,
        cards: [
          {
            title: "Sidechain Compression Automation",
            items: [
              "Sidechain compression ducks one track when another plays: bass ducks when kick hits, synths duck when vocals sing.",
              "Automate the sidechain threshold or ratio to change ducking intensity between sections.",
              "Example: Heavy kick-sidechain ducking on bass during verses, lighter ducking during choruses for fullness.",
              "Automate sidechain mix or depth controls if your compressor has them.",
              "Sidechain automation is powerful in electronic music, but also useful in rock and pop for vocal clarity."
            ]
          },
          {
            title: "Sidechain Filter Automation",
            items: [
              "Many sidechain compressors let you filter the detection signal to focus on specific frequencies.",
              "Automate the sidechain filter frequency to change which part of the trigger signal causes ducking.",
              "Example: Automate sidechain filter higher to duck only on kick fundamental, lower to include bass guitar.",
              "Prevents unwanted ducking from cymbals or hi-hats when only kick should trigger compression.",
              "Advanced technique for surgical, transparent ducking without over-processing."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Sidechain Automation",
        src: "/images/automation/23-sidechain-automation.png",
        alt: "Logic Pro sidechain compression with key filter automation",
        caption: "Sidechain automation creates dynamic space and clarity by making elements duck out of each other's way musically."
      },
      {
        type: "cards",
        title: "Tempo and Time-Based Automation",
        columns: 2,
        cards: [
          {
            title: "Tempo Automation",
            items: [
              "Automate the project tempo to create accelerandos (speed ups) or ritardandos (slow downs).",
              "Use tempo automation to build tension: gradually increase tempo during a build section.",
              "Create dramatic ritardandos at the end of songs for a natural, human feel.",
              "Tempo automation affects all tempo-synced effects (delays, LFOs, sequencers).",
              "Use smooth curves for gradual tempo changes, stepped automation for sudden shifts."
            ]
          },
          {
            title: "Delay Time Automation",
            items: [
              "Automate delay time (not tempo-synced) for pitch-shifting tape delay effects.",
              "Shortening delay time creates upward pitch bends, lengthening creates downward pitch bends.",
              "Great for risers, falls, and lo-fi tape-style effects.",
              "Combine with feedback automation for wild, experimental textures.",
              "Keep changes subtle (5-20ms) for musicality, or go extreme for sound design."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Tempo Automation",
        src: "/images/automation/24-tempo-automation.png",
        alt: "Logic Pro tempo automation showing BPM ramp from 120 to 140",
        caption: "Tempo automation creates urgency and energy, making build sections feel naturally accelerating."
      },
      {
        type: "cards",
        title: "Mute Automation for Arrangement and Effects",
        columns: 2,
        cards: [
          {
            title: "Arrangement Mute Automation",
            items: [
              "Mute automation removes tracks or regions from the mix entirely at specific moments.",
              "Use mute automation to create breakdowns, drops, and arrangement changes without deleting regions.",
              "Automate mutes on backing vocals, doubled guitars, or ear candy to vary arrangement dynamically.",
              "Easier to revise than cutting regions, and allows instant A/B comparison.",
              "Mute automation is non-destructive and fast for trying different arrangement ideas."
            ]
          },
          {
            title: "Stutter and Gating Effects",
            items: [
              "Rapid on/off mute automation creates stuttering, glitchy rhythmic effects.",
              "Automate mutes in rhythmic patterns (1/16th notes, triplets) for EDM-style gating.",
              "Combine with delay feedback spikes for chaotic transition effects.",
              "Use on vocals, synths, or entire drum groups for dramatic drops and builds.",
              "Can replace or enhance tremolo and gate plugins with more precise control."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Mute Automation Stutter",
        src: "/images/automation/28-mute-automation-stutter.png",
        alt: "Logic Pro showing rapid mute automation creating stuttering effect",
        caption: "Mute automation creates dramatic stutters and rhythmic gating effects for modern production styles."
      },
      {
        type: "cards",
        title: "Pitch Correction Automation",
        columns: 2,
        cards: [
          {
            title: "Retune Speed Automation",
            items: [
              "Pitch correction plugins like Auto-Tune and Melodyne have retune speed controls that determine how fast pitch is corrected.",
              "Automate retune speed slow (natural) in verses, fast (tight/robotic) in choruses for dynamic vocal character.",
              "Allows you to have natural, emotional verses and polished, powerful choruses from one vocal take.",
              "Also useful for artistic effect: extreme fast retune for T-Pain/Cher-style auto-tune sound.",
              "Automate retune speed per word or phrase for maximum flexibility."
            ]
          },
          {
            title: "Formant and Throat Automation",
            items: [
              "Formant controls change the tonal character without changing pitch: darker or brighter vocal timbre.",
              "Automate formant to make vocals sound larger, smaller, more masculine, or more feminine.",
              "Throat length controls add depth and body or thinner, brighter character.",
              "Use subtle formant automation (±5-10%) for natural tonal variation between sections.",
              "Extreme automation creates vocal transformation effects and harmonizer-style sounds."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Pitch Correction Automation",
        src: "/images/automation/25-pitch-correction-automation.png",
        alt: "Logic Pro pitch correction plugin with retune speed automation",
        caption: "Pitch correction automation allows natural and tight tuning within the same vocal performance."
      },
      {
        type: "cards",
        title: "Transient Shaper Automation",
        columns: 2,
        cards: [
          {
            title: "Attack Automation",
            items: [
              "Transient designers increase or decrease the initial attack transient of percussive sounds.",
              "Automate attack parameter higher during drum fills and impactful moments for extra punch.",
              "Reduce attack during smooth, laid-back sections to soften the sound.",
              "Works on drums, bass, guitars, piano—anything with clear attack transients.",
              "Small changes (10-30%) make a big difference in perceived energy."
            ]
          },
          {
            title: "Sustain Automation",
            items: [
              "Sustain parameter controls the body and decay of a sound after the transient.",
              "Automate sustain higher in choruses for fuller, longer-lasting drum hits.",
              "Reduce sustain in verses for tighter, more controlled drums.",
              "Combine attack and sustain automation for complete dynamic character control.",
              "Transient automation is less obvious than compression but equally powerful."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Transient Shaper Automation",
        src: "/images/automation/26-transient-shaper-automation.png",
        alt: "Logic Pro transient designer showing attack and sustain automation",
        caption: "Transient automation shapes the attack and body of sounds dynamically for energy control."
      },
      {
        type: "cards",
        title: "Automation Curve Shapes and Timing",
        columns: 3,
        cards: [
          {
            title: "Linear Curves",
            items: [
              "Straight-line automation between two points.",
              "Feels mechanical and even, good for smooth fades and predictable changes.",
              "Use for fade-outs, volume rides, and send level changes.",
              "Best when you want steady, constant change without acceleration."
            ]
          },
          {
            title: "Exponential Curves",
            items: [
              "Slow start with rapid acceleration toward the end (or vice versa).",
              "Feels more natural and musical than linear curves.",
              "Use for filter sweeps, crescendos, and dramatic builds.",
              "Match the curve shape to the emotional intent of the moment."
            ]
          },
          {
            title: "Stepped Automation",
            items: [
              "Sudden jumps between values with no curve.",
              "Useful for switching between discrete states: mute on/off, bypass on/off, preset changes.",
              "Sounds abrupt and intentional, not smooth.",
              "Great for creative effects and EDM-style gating but avoid on volume for smooth mixing."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Automation Curve Shapes",
        src: "/images/automation/20-automation-curve-shapes.png",
        alt: "Logic Pro showing different automation curve shapes side by side",
        caption: "The shape of your automation curves changes how the movement feels emotionally and musically."
      },
      {
        type: "cards",
        title: "Clip Gain vs Track Volume Automation",
        columns: 2,
        cards: [
          {
            title: "When to Use Clip Gain",
            items: [
              "Clip gain adjusts the level of individual regions or clips before any processing.",
              "Use clip gain for big, obvious fixes: one loud word, one quiet note, huge dynamic inconsistencies.",
              "Clip gain happens before plugins, so changes affect how compressors and EQs respond.",
              "Faster and more permanent than automation: it is like re-recording the source at a different level.",
              "Clip gain is destructive if not used carefully, but powerful for surgical fixes."
            ]
          },
          {
            title: "When to Use Track Volume Automation",
            items: [
              "Track volume automation happens after all plugins, controlling the final fader level.",
              "Use track automation for musical rides, section balance changes, and dynamic mixing.",
              "Automation is non-destructive and easy to adjust, perfect for iterative mixing.",
              "Track automation is what you see and hear in the final mix.",
              "Best for subtle moves and broad mixing decisions that may need frequent tweaking."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Clip Gain vs Automation",
        src: "/images/automation/16-clipgain-vs-automation.png",
        alt: "Logic Pro comparison of clip gain and track volume automation",
        caption: "Clip gain fixes problems at the source, while track automation shapes the final mix musically."
      },
      {
        type: "cards",
        title: "Relative vs Absolute Automation",
        columns: 2,
        cards: [
          {
            title: "Absolute Automation (Default)",
            items: [
              "Automation sets exact parameter values: volume at -6 dB, pan at 45 left, send at -12 dB.",
              "If you move the fader manually after writing automation, the automation overrides your change on playback.",
              "Best for final, committed automation moves that should not change.",
              "Most common mode and easiest to understand for beginners.",
              "If you need to adjust levels after automation, you must edit the automation itself."
            ]
          },
          {
            title: "Relative Automation",
            items: [
              "Automation writes offsets from the current fader position instead of absolute values.",
              "Moving the fader after writing relative automation shifts all automation by that amount.",
              "Useful for making broad level changes to already-automated tracks without redoing automation.",
              "Example: If vocal is automated and needs to be 2 dB louder overall, move the fader +2 dB and all automation follows.",
              "Advanced feature rarely used but extremely powerful for mix revisions."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Relative vs Absolute Automation",
        src: "/images/automation/18-relative-vs-absolute.png",
        alt: "Logic Pro showing relative vs absolute automation comparison diagram",
        caption: "Relative automation allows broad fader changes to affect all automation proportionally."
      },
      {
        type: "cards",
        title: "Automation Snapshots and Recall",
        columns: 2,
        cards: [
          {
            title: "Saving Automation Snapshots",
            items: [
              "Automation snapshots capture the current state of all automation across the entire project.",
              "Use snapshots to save different mix versions or automation approaches for A/B comparison.",
              "Essential for client revisions: save the original automation before making requested changes.",
              "Snapshots are faster than saving full project versions when only automation changes.",
              "Logic Pro, Pro Tools, and most DAWs support some form of automation snapshot or playlist."
            ]
          },
          {
            title: "Recalling and Comparing",
            items: [
              "Recall snapshots instantly to compare different automation approaches during mixing.",
              "Use snapshots to undo broad automation changes without losing individual edits.",
              "Combine snapshots with VCA automation for powerful, flexible mixing workflows.",
              "Snapshots are non-destructive: you can always return to any saved state.",
              "Great for 'what if' experimentation without fear of losing good work."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Automation Snapshots",
        src: "/images/automation/22-automation-snapshots.png",
        alt: "Logic Pro automation snapshot menu showing saved states",
        caption: "Automation snapshots allow instant recall of different mix automation versions for comparison."
      },
      {
        type: "cards",
        title: "LFO and Modulation Automation",
        columns: 2,
        cards: [
          {
            title: "LFO-Driven Automation",
            items: [
              "LFOs (Low-Frequency Oscillators) create rhythmic, repeating automation patterns automatically.",
              "Use LFO tools to automate filter cutoff, pan, volume, or any parameter with rhythmic pulsing.",
              "Sync LFO rate to tempo (1/4 notes, 1/8 notes, 1/16 notes) for musical pulsing effects.",
              "Automate LFO rate, depth, or shape for evolving modulation throughout the song.",
              "Common in electronic music but powerful in any genre for movement and energy."
            ]
          },
          {
            title: "Modulation Wheel Automation",
            items: [
              "On MIDI synth tracks, automate the modulation wheel (CC1) for expressive filter, vibrato, or volume changes.",
              "Mod wheel automation can control any synth parameter assigned to it, creating dynamic timbral shifts.",
              "Record mod wheel automation in real-time by performing with a MIDI controller, or draw it manually.",
              "Use mod wheel automation to bring static synth sounds to life with evolving brightness and movement.",
              "Essential for realistic string and brass synth performances."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "LFO Automated Filter",
        src: "/images/automation/31-lfo-automated-filter.png",
        alt: "Logic Pro LFO tool creating rhythmic filter automation",
        caption: "LFO automation creates rhythmic pulsing effects synced to tempo for modern production movement."
      },
      {
        type: "image",
        title: "Modulation Wheel Automation",
        src: "/images/automation/17-modwheel-automation.png",
        alt: "Logic Pro modulation wheel automation on synthesizer track",
        caption: "Mod wheel automation brings expressive, human-like dynamics to synthesizer performances."
      },
      {
        type: "cards",
        title: "Stereo Width Automation",
        columns: 2,
        cards: [
          {
            title: "Narrow vs Wide Automation",
            items: [
              "Stereo width controls adjust how spread out a sound is across the stereo field.",
              "Automate width narrower (more mono) during verses for focus and intimacy.",
              "Automate width wider during choruses for expansiveness and energy.",
              "Avoid widening low-frequency elements (kick, bass, sub) or you will lose mono compatibility.",
              "Width automation is powerful on pads, synths, background vocals, and overheads."
            ]
          },
          {
            title: "Width Automation Safety",
            items: [
              "Always check mono compatibility when using width automation: fold to mono and listen for phase cancellation.",
              "Subtle width changes (10-30%) are often more musical than extreme widening.",
              "Use mid/side EQ instead of pure width for safer, more controlled stereo manipulation.",
              "Combine width automation with pan automation for complex, evolving stereo images.",
              "Width automation can make small arrangements feel huge without adding more tracks."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Stereo Width Automation",
        src: "/images/automation/19-stereo-width-automation.png",
        alt: "Logic Pro stereo width automation on synth pad",
        caption: "Width automation creates dynamic expansiveness, making choruses feel bigger without additional tracks."
      },
      {
        type: "cards",
        title: "De-esser Frequency Automation",
        columns: 2,
        cards: [
          {
            title: "Dynamic Sibilance Control",
            items: [
              "Sibilance (harsh 's' and 'sh' sounds) can vary in frequency between vocal sections.",
              "Automate de-esser center frequency to target brighter sibilance in belted choruses, darker sibilance in breathy verses.",
              "Static de-esser settings often work great in one section but miss or over-process in another.",
              "Frequency automation is subtle but makes a big difference in vocal clarity and naturalness.",
              "Typically automate within a narrow range: 6kHz to 9kHz for most vocals."
            ]
          },
          {
            title: "Threshold and Depth Automation",
            items: [
              "Automate de-esser threshold to apply more de-essing in loud, sibilant sections and less in soft sections.",
              "Automate de-esser depth (amount of reduction) for variable control intensity.",
              "Prevents over-processing soft phrases while effectively controlling loud sibilance.",
              "Combine frequency, threshold, and depth automation for surgical sibilance control.",
              "Advanced technique but yields the most natural, transparent vocal de-essing."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "De-esser Automation",
        src: "/images/automation/33-deesser-automation.png",
        alt: "Logic Pro de-esser with frequency and threshold automation",
        caption: "De-esser automation targets different sibilance characteristics dynamically for natural-sounding vocal control."
      },
      {
        type: "cards",
        title: "Bus Processing Bypass Automation",
        columns: 2,
        cards: [
          {
            title: "Effect Bus On/Off Automation",
            items: [
              "Automate effect bus sends or plugin bypass to turn effects on and off musically.",
              "Example: Turn off reverb bus during fast rap verses, turn on during sung choruses.",
              "Bypass automation can cause clicks if not handled carefully: use smooth crossfades or mute automation instead.",
              "Great for making dense arrangements feel less cluttered by removing effects when not needed.",
              "Combine with send level automation for smoother transitions than pure bypass."
            ]
          },
          {
            title: "Parallel Processing Automation",
            items: [
              "Automate the blend of parallel compression, saturation, or reverb buses for dynamic intensity.",
              "Example: Parallel drum compression low in verses, high in choruses for explosive energy.",
              "Allows you to commit to heavy processing knowing you can dial it back whenever needed.",
              "More flexible than automating plugin parameters because you can adjust the source and processed balance independently.",
              "Essential technique for modern, dynamic mixing."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Bus Bypass Automation",
        src: "/images/automation/32-bus-bypass-automation.png",
        alt: "Logic Pro showing bus processing bypass automation",
        caption: "Bus bypass automation creates dramatic effect presence changes for dynamic arrangements."
      },
      {
        type: "cards",
        title: "Smart Controls and Macro Automation",
        columns: 2,
        cards: [
          {
            title: "What Are Smart Controls?",
            items: [
              "Smart Controls map multiple plugin parameters to a single control knob or fader.",
              "Example: One smart control adjusts reverb mix, decay time, and pre-delay simultaneously for a 'depth' control.",
              "Automate the smart control to morph multiple parameters at once with one automation lane.",
              "Simplifies complex automation and makes mixing faster and more intuitive.",
              "Available in Logic Pro, Ableton Live (Macro controls), and many plugin formats."
            ]
          },
          {
            title: "Macro Automation Strategies",
            items: [
              "Create macro controls for common moves: 'Vocal Presence' (EQ + saturation + compression), 'Drum Energy' (parallel compression + transient shaping).",
              "Automate macros instead of individual parameters for faster, more musical mixing.",
              "Use macros for client revisions: 'Make the vocal brighter' becomes one automation move, not five.",
              "Macros are especially powerful on complex, multi-effect chains and bus processing.",
              "Once set up, macros save hours of tedious individual parameter automation."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Smart Control Automation",
        src: "/images/automation/29-smart-control-automation.png",
        alt: "Logic Pro smart control automation controlling multiple linked parameters",
        caption: "Smart controls let you automate complex multi-parameter changes with a single automation lane."
      },
      {
        type: "cards",
        title: "Pre-Fader vs Post-Fader Send Automation",
        columns: 2,
        cards: [
          {
            title: "Post-Fader Sends (Default)",
            items: [
              "Post-fader sends are affected by the track fader level: lower fader = less send signal.",
              "Use post-fader sends for reverbs and delays where the effect should follow the dry level.",
              "If you automate the track fader down, the send level automatically goes down too.",
              "Most natural and common for time-based effects.",
              "Send automation on post-fader sends is relative to the fader position."
            ]
          },
          {
            title: "Pre-Fader Sends",
            items: [
              "Pre-fader sends are independent of the track fader: effect level stays constant regardless of fader.",
              "Use pre-fader sends when you want effects to continue even as the dry track fades out.",
              "Example: Fade a vocal out while the reverb tail continues at full level for a ghostly effect.",
              "Also useful for headphone monitor mixes that should not be affected by mix fader changes.",
              "Pre-fader send automation is completely independent of track volume automation."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Pre-Fader vs Post-Fader Sends",
        src: "/images/automation/21-prefader-postfader-sends.png",
        alt: "Logic Pro signal flow diagram showing pre-fader and post-fader send points",
        caption: "Pre-fader and post-fader sends behave differently with fader automation, offering creative flexibility."
      },
      {
        type: "cards",
        title: "Region-Based Automation",
        columns: 2,
        cards: [
          {
            title: "What Is Region-Based Automation?",
            items: [
              "Some DAWs (Studio One, Cubase) allow automation to be tied to regions rather than timeline position.",
              "When you move or copy a region, its automation moves with it automatically.",
              "Useful for creating templates, loops, and repeating sections with built-in automation.",
              "In Logic Pro, you can achieve similar results with automation follows region events preference.",
              "Region automation makes arrangement experimentation faster and less destructive."
            ]
          },
          {
            title: "Use Cases",
            items: [
              "Build chorus automation once, then copy the entire region with automation to every chorus.",
              "Create effect-heavy breakdown regions with automation, then move them freely in the arrangement.",
              "Template building: create regions with automation baked in for quick song starts.",
              "Experimental arrangement: try different section orders without manually adjusting automation.",
              "Essential for loop-based production and remixing workflows."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Region-Based Automation",
        src: "/images/automation/30-region-based-automation.png",
        alt: "Logic Pro showing region-based automation following regions",
        caption: "Region-based automation follows audio/MIDI regions, making arrangement changes easier."
      },
      {
        type: "cards",
        title: "Limiter Ceiling Automation for Mastering",
        columns: 2,
        cards: [
          {
            title: "Variable Loudness Masters",
            items: [
              "Automate mastering limiter ceiling to create different loudness targets for different master versions.",
              "Example: -1.0 dBFS ceiling for streaming/digital, -0.1 dBFS ceiling for club/DJ masters.",
              "Automate ceiling lower for conservative loudness, higher for aggressive loudness.",
              "Allows one mastering session to generate multiple master versions with different loudness without re-mixing.",
              "Combine with limiter threshold or release automation for even more dynamic control."
            ]
          },
          {
            title: "Dynamic Loudness Control",
            items: [
              "In rare cases, automate limiter ceiling within a song for dynamic loudness shifts (less common).",
              "Example: Automate ceiling lower during quiet intros for more dynamic range, higher during loud sections for density.",
              "More common in soundtrack and post-production than music mixing.",
              "Most music benefits from consistent mastering limiting throughout; use mix automation instead.",
              "Advanced technique requiring careful loudness metering and comparison."
            ]
          }
        ]
      },
      {
        type: "image",
        title: "Limiter Ceiling Automation",
        src: "/images/automation/27-limiter-ceiling-automation.png",
        alt: "Logic Pro mastering limiter with ceiling automation",
        caption: "Limiter ceiling automation allows multiple master loudness versions from a single mastering session."
      },
      {
        type: "table",
        title: "Common Automation Mistakes and Solutions",
        table: {
          columns: ["Mistake", "Why It Happens", "How to Fix It", "Prevention"],
          layout: "detailCards",
          rows: [
            [
              "Over-automating everything",
              "Excitement about automation leads to automating every parameter constantly",
              "Mute automation lanes and listen: if the song feels better without certain automation, delete it",
              "Automate with intention, not just because you can"
            ],
            [
              "Automation clicks and pops",
              "Sudden jumps in automation curves or bypass automation without crossfades",
              "Use smooth curves, add intermediate points, or use plugin mix automation instead of bypass",
              "Always preview automation changes solo before playing in context"
            ],
            [
              "Automation fighting compression",
              "Automating volume before compression causes compressor to respond inconsistently",
              "Use clip gain or pre-fader automation before compression, track volume automation after",
              "Understand signal flow: compression before fader, automation after"
            ],
            [
              "Losing automation when moving regions",
              "Automation is timeline-based, not region-based in most DAWs",
              "Enable 'automation follows regions' preference or manually copy automation",
              "Be aware of whether your DAW uses timeline or region automation"
            ],
            [
              "Too many automation lanes visible",
              "Cluttered workspace makes mixing slower and harder to navigate",
              "Show only automation lanes currently being edited, hide others",
              "Use automation lane visibility shortcuts for fast toggling"
            ],
            [
              "Forgetting what parameters are automated",
              "Automation is invisible until you show lanes, causing confusion during mixing",
              "Check automation indicators on track headers, use show all automation command regularly",
              "Name automation lanes descriptively, use colors for different automation types"
            ],
            [
              "Automation in wrong mode (Latch vs Touch)",
              "Accidentally overwrite good automation because mode was set to Latch",
              "Always set tracks to Read mode when not actively automating",
              "Check automation mode before every automation pass"
            ]
          ]
        }
      },
      {
        type: "checklist",
        title: "Automation Workflow Checklist",
        items: [
          "Set rough static balance first: faders, panning, gain staging, and core processing before any automation.",
          "Identify problem moments: which words disappear, which sections lack energy, where does the mix feel static?",
          "Start with volume automation: bring up buried elements, tuck back distractions, create section contrast.",
          "Add send automation: make reverbs and delays appear and disappear musically, not constantly.",
          "Automate effect parameters: delay feedback throws, filter sweeps, reverb decay changes between sections.",
          "Use riders and gates where appropriate: constant level control on vocals/bass, cleanup on drums/guitars.",
          "Experiment with advanced automation: EQ bands, compressor thresholds, stereo width, transient shapers.",
          "Review all automation with lanes muted: confirm each automation move improves the mix measurably.",
          "Set tracks to Read mode when finished: prevent accidental automation overwrites during mixing.",
          "Save automation snapshots: capture different automation approaches for easy A/B comparison.",
          "Check mono compatibility: ensure stereo width and pan automation do not cause phase issues.",
          "Listen at low volume: automation moves should be obvious even at quiet listening levels.",
          "Export and review: listen outside the DAW to confirm automation translates to final delivery formats.",
          "Document automation strategy: note which tracks are automated and why for future recall and revisions."
        ]
      },
      {
        type: "cards",
        title: "Automation Philosophy and Best Practices",
        columns: 3,
        cards: [
          {
            title: "Automate with Intent",
            items: [
              "Every automation move should serve the song emotionally and musically.",
              "Avoid automating just because the feature exists; automate because the mix demands it.",
              "Ask: does this automation improve clarity, energy, emotion, or focus?",
              "If you cannot hear or feel the difference, the automation is not helping."
            ]
          },
          {
            title: "Start Simple, Add Complexity",
            items: [
              "Begin with volume and send automation before diving into plugin parameter automation.",
              "Master basic automation before experimenting with advanced techniques like macro controls and LFO modulation.",
              "Simple automation executed well beats complex automation done poorly.",
              "Build automation layers gradually, checking each addition for actual improvement."
            ]
          },
          {
            title: "Automation Is Performance",
            items: [
              "Think of automation as another instrument: it should groove, breathe, and respond to the song's energy.",
              "Avoid mechanical, stiff automation curves; use smooth, musical transitions.",
              "Automation timing matters: early or late automation can make or break the effect.",
              "Record automation in real-time when possible for natural, human feel."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "Final Thoughts on Automation",
        columns: 2,
        cards: [
          {
            title: "Automation Separates Amateurs from Professionals",
            items: [
              "Amateur mixes are static: one setting for the entire song, compromising every section.",
              "Professional mixes are dynamic: every section gets the exact balance, effect level, and tone it needs.",
              "Automation is not a luxury or an optional final step; it is fundamental to competitive mixing.",
              "The best mixes feel alive, responsive, and intentional because of thoughtful automation.",
              "Invest time learning automation: the return is immediately audible in your mixes."
            ]
          },
          {
            title: "Automation Is Creative Freedom",
            items: [
              "With automation, you are no longer limited to one static tone, balance, or effect level.",
              "Automation unlocks creative possibilities: delay throws, filter builds, dynamic ducking, evolving textures.",
              "It allows you to commit to bold processing knowing you can automate its intensity per section.",
              "Automation makes mixing feel less like compromise and more like creative expression.",
              "Master automation, and your mixes will feel as dynamic and exciting as the best commercial productions."
            ]
          }
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
