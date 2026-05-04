import type { CardItem, CheatSheet, SheetSection } from "@/lib/sheet-schema";
import { pluginCatalog } from "@/data/plugins/catalog";
import { buildEnhancedPluginCatalog } from "@/data/plugins/seed-catalog";

const enhancedPluginCatalog = buildEnhancedPluginCatalog(pluginCatalog);

const automationArticleIllustrations = [
  { slug: "rider-before-dynamics", title: "Illustration 1. Rider Before Dynamics", alt: "Automation curve showing a vocal rider smoothing phrase level before compression.", caption: "A rider is best when the performance needs many small corrections before the compressor, not when one dramatic moment needs a hand-drawn lift." },
  { slug: "gate-vs-rider", title: "Illustration 2. Gate vs Rider", alt: "Diagram comparing gate cleanup with rider level control.", caption: "Gates decide open or closed; riders decide how loud. Treat them as different tools instead of competing fixes." },
  { slug: "delay-throw-feedback", title: "Illustration 3. Delay Throw Feedback", alt: "Delay feedback automation rising for a final word and falling before the next lyric.", caption: "Automating feedback turns a normal send into a performance event that blooms and then gets out of the way." },
  { slug: "delay-threshold-ducking", title: "Illustration 4. Delay Threshold Ducking", alt: "Threshold automation controlling when delay repeats duck behind a vocal.", caption: "Threshold and ducking moves keep repeats musical while the singer is active, then let the space appear in the gap." },
  { slug: "parallel-bus-lift", title: "Illustration 5. Parallel Bus Lift", alt: "Parallel bus with one automated channel lifting intensity for a chorus.", caption: "A parallel bus can carry the movement while the dry track remains stable, making automation safer and easier to audition." },
  { slug: "chorus-vocal-ride", title: "Illustration 6. Chorus Vocal Ride", alt: "Small vocal volume ride from verse to chorus.", caption: "A one or two dB chorus lift often sounds more natural than pushing the compressor harder for the entire song." },
  { slug: "bass-note-correction", title: "Illustration 7. Bass Note Correction", alt: "Bass note clip gain and fader automation correcting one weak note.", caption: "Single notes can be repaired before dynamics so the compressor reacts to intent instead of surprise." },
  { slug: "snare-fill-spotlight", title: "Illustration 8. Snare Fill Spotlight", alt: "Drum fill automation briefly raising snare and tom energy.", caption: "Spotlighting a fill is a musical decision; it should return to the normal groove before the next downbeat." },
  { slug: "room-mic-section", title: "Illustration 9. Room Mic Section Ride", alt: "Room mic automation lower in verse and higher in chorus.", caption: "Room microphones are emotional size controls. Automate them by section before adding more reverb." },
  { slug: "guitar-filter-open", title: "Illustration 10. Guitar Filter Open", alt: "Filter cutoff automation opening from verse into chorus guitars.", caption: "Opening a filter can create lift without adding new parts or making the chorus permanently brighter." },
  { slug: "reverb-pre-delay-shift", title: "Illustration 11. Reverb Pre-Delay Shift", alt: "Pre-delay automation separating a vocal from reverb wash.", caption: "More pre-delay can keep a vocal upfront while still allowing the space to feel larger." },
  { slug: "plate-decay-tail", title: "Illustration 12. Plate Decay Tail", alt: "Plate reverb decay automation adapting to sparse and dense sections.", caption: "Decay time should respect arrangement density: long tails need space, short tails keep busy parts readable." },
  { slug: "pan-ear-candy", title: "Illustration 13. Pan Ear Candy", alt: "Pan automation moving a small ear-candy part around a static band image.", caption: "Move decorative parts while keeping kick, snare, bass, and lead vocal anchored." },
  { slug: "mute-automation", title: "Illustration 14. Mute Automation", alt: "Mute automation clearing a transition before a downbeat.", caption: "Mute automation is useful when a clean stop communicates the arrangement better than a fade." },
  { slug: "distortion-send", title: "Illustration 15. Distortion Send Bloom", alt: "Distortion send automation appearing for selected vocal phrases.", caption: "Automated grit feels intentional when it arrives on a phrase, not when it coats every word by default." },
  { slug: "compressor-threshold", title: "Illustration 16. Compressor Threshold Ride", alt: "Compressor threshold automation keeping gain reduction consistent.", caption: "Threshold automation can protect the groove when a section changes level but should be checked against bypassed dynamics." },
  { slug: "deesser-focus", title: "Illustration 17. De-Esser Focus", alt: "De-esser threshold automation increasing control on harsh words.", caption: "Automate de-essing only where harshness appears so the rest of the performance keeps its air." },
  { slug: "eq-presence-lift", title: "Illustration 18. Presence Lift", alt: "EQ presence band automation highlighting a lyric.", caption: "A temporary presence lift can make one lyric intelligible without making the whole vocal sharp." },
  { slug: "low-end-tighten", title: "Illustration 19. Low-End Tighten", alt: "Low shelf automation reducing buildup before a dense chorus.", caption: "Automated low-end cleanup can make a chorus hit harder because the downbeat arrives into headroom." },
  { slug: "sidechain-intensity", title: "Illustration 20. Sidechain Intensity", alt: "Sidechain depth automation increasing rhythmic pumping.", caption: "Sidechain movement can be an arrangement effect; automate intensity when the groove wants to exaggerate or relax." },
  { slug: "tremolo-depth", title: "Illustration 21. Tremolo Depth", alt: "Tremolo depth automation growing during a bridge.", caption: "Modulation depth can build tension while the source level stays controlled." },
  { slug: "auto-filter-sweep", title: "Illustration 22. Auto-Filter Sweep", alt: "Auto-filter cutoff automation sweeping into a transition.", caption: "Filter sweeps work best when they serve a transition instead of constantly announcing themselves." },
  { slug: "master-bus-caution", title: "Illustration 23. Master Bus Caution", alt: "Subtle master bus automation warning against large final-output rides.", caption: "Master bus moves affect every downstream decision, so keep them rare, small, and easy to undo." },
  { slug: "stem-print-safety", title: "Illustration 24. Stem Print Safety", alt: "Printed stems showing automation committed to exported files.", caption: "Before printing stems, confirm the automation is intentional because collaborators may not see your lanes later." },
  { slug: "latch-touch-write", title: "Illustration 25. Touch, Latch, and Write", alt: "Logic Pro automation modes represented as different write behaviors.", caption: "Touch is for temporary gestures, Latch is for holding a new value, and Write should be used carefully." },
  { slug: "snapshot-sections", title: "Illustration 26. Section Snapshots", alt: "Verse chorus and bridge automation baselines shown as snapshots.", caption: "Section snapshots keep the song organized before you draw detailed phrase-by-phrase moves." },
  { slug: "automation-trim", title: "Illustration 27. Automation Trim", alt: "Trim automation raising an existing curve without flattening it.", caption: "Trim changes the overall offset while preserving the musical contour you already wrote." },
  { slug: "send-return-flow", title: "Illustration 28. Send Return Flow", alt: "Shared send and return path carrying automated effect levels.", caption: "Automating sends into a shared return keeps space consistent while each track gets its own entrance and exit." },
  { slug: "human-performance-map", title: "Illustration 29. Human Performance Map", alt: "Automation curve following emotional intensity in a performance.", caption: "The best rides trace the singer, player, and arrangement rather than chasing the meter alone." },
  { slug: "final-bypass-check", title: "Illustration 30. Final Bypass Check", alt: "Automation lanes being bypassed to verify the song gets worse without them.", caption: "Every automation pass should survive a bypass check: if the song does not miss it, simplify the mix." }
] as const;

function automationArticleImageSections(): SheetSection[] {
  return automationArticleIllustrations.map((illustration) => ({
    type: "image",
    title: illustration.title,
    src: `/assets/articles/automation-beyond-volume/${illustration.slug}.svg`,
    alt: illustration.alt,
    caption: illustration.caption
  }));
}

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
      subtitle: "Riders, gates, delay throws, parallel motion, and musical mix decisions",
      icon: "🎛️",
      accent: "purple"
    },
    summary:
      "A long-form Logic Pro automation article with practical moves for riders, gates, delay feedback, parallel buses, and twenty additional automation targets that make a static mix feel performed.",
    sections: [
      {
        type: "cards",
        title: "Article Thesis: Automation Is Arrangement",
        columns: 3,
        cards: [
          {
            title: "Beyond Fader Chasing",
            items: [
              "Automation is not just a late-stage rescue pass where you chase every word that feels too quiet. In Logic Pro it is a second arrangement layer: a way to decide which parts lead, which parts answer, and which parts disappear so the listener can follow the song without thinking about the mix.",
              "Volume rides are still the foundation, but the most exciting moves often happen on sends, feedback, thresholds, filters, mutes, parallel returns, and plugin intensity. Those lanes turn static processing into musical performance."
            ]
          },
          {
            title: "Write Moves With Intent",
            items: [
              "A useful automation move has a reason that can be spoken in musical language: the lyric needs to land, the fill should answer the vocal, the chorus needs to widen, or the bridge should feel like it is leaning forward. If the reason is only that a meter looked uneven, listen again before drawing more data.",
              "The best workflow is static mix first, clip gain second, dynamics third, automation fourth, and trim or simplify last. That order keeps automation expressive instead of turning it into a complicated workaround for avoidable balance problems."
            ]
          },
          {
            title: "Logic Pro Mindset",
            items: [
              "Use Track Automation for normal mix movement, Region Automation when the move belongs to an edited audio region, and Automation Trim when the shape is good but the whole curve needs to move up or down. Touch mode is safe for short gestures, Latch is useful when a new value should remain, and Write should be treated carefully because it can overwrite lanes quickly.",
              "Name buses clearly, color important returns, and show only the lanes you are editing. Automation becomes easier when the session makes the signal flow obvious."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "Using Riders to Automate Levels vs Gates",
        columns: 3,
        cards: [
          {
            title: "Riders Solve Continuous Level Drift",
            items: [
              "A rider is best when the performance constantly moves around: a singer changes distance from the mic, a bass player hits some notes harder, or a room mic swells with the band. Put the rider before the compressor when possible so the compressor receives a steadier performance and does less obvious work.",
              "In practice, set the rider to make small corrections, then listen to whether the compressor breathes more naturally. If the rider is moving several dB all the time, the part may need clip gain editing or a better static balance first."
            ]
          },
          {
            title: "Gates Solve Open-or-Closed Problems",
            items: [
              "A gate is not a leveler. It is a cleanup decision: open when the wanted signal arrives, close or reduce when the wanted signal is gone. Gates work well on toms, noisy guitar gaps, and certain close drum mics, but they can make cymbals chatter and room tone vanish if the threshold is too aggressive.",
              "Use a gate when silence or bleed reduction is the goal. Use a rider when the part should remain audible but needs to be steadier. If you are trying to make a vocal phrase more emotional, a gate is almost never the right first tool."
            ]
          },
          {
            title: "Automation Beats Both for One-Off Moments",
            items: [
              "If only one syllable jumps out, one snare ghost note is too loud, or one bass note disappears, write a manual move instead of asking an automatic tool to reinterpret the whole track. One hand-drawn point can be more transparent than another plugin reacting for three minutes.",
              "Think in tiers: clip gain for obvious source-level repairs, rider for constant small leveling, gate or expander for cleanup, and manual automation for musical moments that need human judgment."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "Automating Delay Feedback and Threshold",
        columns: 3,
        cards: [
          {
            title: "Feedback Creates the Throw",
            items: [
              "A delay throw is more than turning up a send. The send decides which word enters the delay, but feedback decides how long the idea repeats and how dramatic the tail feels. Automate feedback upward only for the word or phrase that should bloom, then bring it down before the next lyric so the mix does not smear.",
              "In Logic Pro, keep the delay on an aux return, automate the send on the source track, and automate feedback on the delay plugin. This separates the entrance from the tail, which makes cleanup much faster."
            ]
          },
          {
            title: "Threshold Controls Ducking and Spill",
            items: [
              "When a delay or reverb return has ducking, compression, or gating, threshold automation can be the difference between a tasteful throw and a cloudy wash. Lower the threshold when the vocal should push the effect away, then relax it when the vocal stops so repeats rise into the gap.",
              "This works especially well when the arrangement is dense. The listener hears the lyric clearly while it happens and still gets the excitement of the repeat after the phrase ends."
            ]
          },
          {
            title: "Filter the Return Too",
            items: [
              "Automate a high-pass, low-pass, or tone control on the delay return so the throw occupies a deliberate pocket. Darker repeats can sit behind a vocal; brighter repeats can announce a transition; narrower filtered repeats can create motion without masking guitars and cymbals.",
              "The safest habit is to automate the return back to a boring default after the moment. Unreset feedback, wet mix, or filter lanes are common reasons the next section feels messy."
            ]
          }
        ]
      },
      {
        type: "cards",
        title: "Using a Parallel Bus With Automation on One Channel",
        columns: 3,
        cards: [
          {
            title: "Keep the Dry Channel Honest",
            items: [
              "A parallel bus lets you automate intensity without rewriting the dry sound. Send a vocal, drum bus, bass, or guitar group to an aux with compression, saturation, distortion, widening, or ambience, then automate the aux fader or send level only where the song needs extra attitude.",
              "Because the original track stays stable, it is easy to bypass the parallel return and hear whether the move actually helps. This is safer than automating five plugins on the primary channel for every chorus."
            ]
          },
          {
            title: "Choose One Job Per Parallel Return",
            items: [
              "Give the bus a clear purpose: vocal excitement, drum smash, bass grit, guitar width, room size, or filtered transition. If the return is trying to add punch, tone, width, and reverb at once, automation decisions become confusing and the bypass test becomes meaningless.",
              "Print or freeze complex parallel effects when CPU gets heavy, but keep the automation visible and labeled so later stem exports still make sense."
            ]
          },
          {
            title: "Automate the Blend, Not the Whole Mix",
            items: [
              "For a rock chorus, a compressed drum parallel can rise half a dB to two dB while the main drum bus remains unchanged. For a lead vocal, a distorted parallel can appear on the last line of each chorus. For bass, a midrange grit bus can rise on small speakers without changing sub weight.",
              "Small moves are often enough because parallel processing is already exaggerated. If the return has to be loud to be noticed, revisit the processing tone before drawing bigger automation."
            ]
          }
        ]
      },
      {
        type: "table",
        title: "20 More Logic Pro Automation Topics",
        table: {
          columns: ["Topic", "Automation Move", "Why It Works"],
          layout: "detailCards",
          rows: [
            ["1. Vocal phrase rides", "Lift only the words carrying meaning, then return to the normal line level before the next breath.", "The vocal feels emotionally present without compressing every phrase into the same shape."],
            ["2. Bass note support", "Raise weak notes with clip gain or track automation before the bass compressor, especially around arrangement changes.", "The groove becomes steadier while the low end keeps its natural attack and decay."],
            ["3. Drum fill emphasis", "Push snare, tom, overhead, or drum-bus level briefly for fills that introduce a chorus or bridge.", "The fill behaves like a musical cue rather than a background detail."],
            ["4. Room mic drama", "Ride room mics down in verses and up in choruses, breakdowns, or final hits.", "The band sounds bigger by section without washing out the entire performance."],
            ["5. Guitar bus width", "Automate a width plugin or doubled-guitar bus only when the arrangement opens up.", "The chorus expands while verses keep focus and mono compatibility remains easier to manage."],
            ["6. Reverb send entrances", "Send only selected words, snare hits, or guitar stabs into a shared reverb return.", "Space becomes an accent instead of a constant fog around the mix."],
            ["7. Reverb decay time", "Shorten decay in dense sections and lengthen it when the arrangement becomes sparse.", "The same reverb can feel intimate or cinematic without changing presets."],
            ["8. Pre-delay shifts", "Increase pre-delay when the vocal needs to stay forward; reduce it when the part should blend into the room.", "Depth changes without sacrificing lyric intelligibility."],
            ["9. Distortion sends", "Automate a grit aux on choruses, screams, bass fills, or guitar answers.", "The source gains attitude for a moment while the clean track remains dependable."],
            ["10. EQ presence lifts", "Boost a narrow or broad presence band for one lyric, solo line, or melodic answer.", "Important information cuts through without making the whole track harsh."],
            ["11. Low-end cleanup", "Automate a low shelf, high-pass, or dynamic EQ threshold before dense downbeats.", "The chorus or drop hits into cleaner headroom, which makes impact feel larger."],
            ["12. De-esser intensity", "Lower the threshold only for harsh words or stacked background vocals.", "Sibilance is controlled where it hurts while air remains intact elsewhere."],
            ["13. Compressor threshold", "Adjust threshold between verse and chorus when input level changes but the desired compression character should stay similar.", "Gain reduction remains musical instead of over-clamping the loudest section."],
            ["14. Sidechain amount", "Increase sidechain depth for dance-like pumping, then relax it for natural band sections.", "The groove can exaggerate or breathe depending on the arrangement."],
            ["15. Mute automation", "Cut noise, breaths, guitar squeaks, or effect returns exactly where silence is part of the arrangement.", "A clean stop can create more energy than another fade or plugin."],
            ["16. Pan motion", "Move small ear-candy parts, delay returns, or transitional percussion while the core band remains anchored.", "Width becomes playful without destabilizing the song's center."],
            ["17. Tremolo and modulation depth", "Increase depth through bridges or breakdowns, then reduce it before the full band returns.", "Movement builds tension without requiring another recorded layer."],
            ["18. Filter cutoff sweeps", "Open or close AutoFilter, Channel EQ, or plugin cutoff around transitions.", "The listener feels lift and release even before new instruments enter."],
            ["19. Master bus restraint", "Use tiny trim or bypass automation only for special transitions, never to fix ordinary balance problems.", "The final bus stays trustworthy, and individual tracks remain responsible for the mix."],
            ["20. Stem export checks", "After printing stems, reimport or spot-check sections where automation is dense.", "Automation written into audio must translate for collaborators, mastering, and future revisions."]
          ]
        }
      },
      {
        type: "cards",
        title: "Logic Pro Workflow for Writing Automation",
        columns: 3,
        cards: [
          {
            title: "1. Build a Static Pass",
            items: [
              "Start with faders, pan, gain staging, and broad processing until the song works without automation. If the static mix collapses, automation will become a maze of compensation moves instead of a musical layer.",
              "Mark the sections with Arrangement Markers or clearly named markers so verse, chorus, bridge, solo, and outro decisions are easy to compare."
            ]
          },
          {
            title: "2. Fix Sources First",
            items: [
              "Use clip gain, region gain, fades, and edits for obvious source issues. Then set riders, gates, expanders, or compressors for repeated behavior. Only after that should you draw expressive moves across lanes.",
              "This keeps the visible automation meaningful. When every point is an emergency repair, it becomes hard to see the emotional contour of the mix."
            ]
          },
          {
            title: "3. Write in Passes",
            items: [
              "Do one pass for lead vocal, one for rhythm section impact, one for effects throws, and one for transitions. Focused passes prevent you from changing the snare, vocal, delay, and master bus every time something feels slightly wrong.",
              "After each pass, listen from before the move into after the move. Automation should make the transition feel inevitable, not like a button was pushed."
            ]
          },
          {
            title: "4. Use Trim and Simplify",
            items: [
              "When the curve shape works but the whole move is too much, use trim or select the automation points and offset them together. Do not redraw a musical curve just because it is one dB too high.",
              "Delete unnecessary points. Smooth curves are easier to understand later and less likely to create zippery or nervous movement."
            ]
          },
          {
            title: "5. Bypass the Story",
            items: [
              "Bypass or disable automation lanes in groups: vocal rides, effects throws, room moves, parallel returns. The song should miss each group when it is gone. If it does not, the moves are probably clutter.",
              "Level-match when comparing parallel buses and automated effects. Louder usually sounds exciting for a moment, so judge the musical role rather than the temporary loudness."
            ]
          },
          {
            title: "6. Print With Labels",
            items: [
              "Before bouncing stems, confirm that automation is included, effect returns are routed correctly, and printed files start at the same bar. Dense automation is part of the arrangement, so exports must preserve it.",
              "Keep a version before destructive printing. Future edits are easier when the automation lanes remain available in the session."
            ]
          }
        ]
      },
      {
        type: "checklist",
        title: "Automation: Beyond Volume Checklist",
        items: [
          "Can you explain each automation move as a musical decision rather than a meter correction?",
          "Did you fix obvious source-level issues with clip gain or region gain before drawing long fader curves?",
          "Is a rider handling constant small level drift before compression where appropriate?",
          "Is a gate or expander used only when open-or-closed cleanup is truly the goal?",
          "Do delay throws reset feedback, wet level, and filters before the next lyric or section?",
          "Are ducking or threshold moves keeping effects out of the way while the lead part is active?",
          "Does each parallel bus have one clear job, such as grit, smash, width, or room size?",
          "Have you automated the parallel blend instead of disturbing the dry channel unnecessarily?",
          "Are room mics, reverb decay, and pre-delay changing by arrangement density?",
          "Have you kept kick, snare, bass, and lead vocal stable while moving decorative elements?",
          "Did you use trim or grouped offsets when the curve shape was right but the level was wrong?",
          "Have you removed extra automation points that no longer change the emotional result?",
          "Can the mix survive a pass with all automation bypassed, proving the static mix is still healthy?",
          "Does the song clearly get worse when important automation groups are bypassed?",
          "Before export, did you check that stems and effect returns include the intended automation?"
        ]
      },
      ...automationArticleImageSections()
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
