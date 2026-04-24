export interface PluginCatalogItem {
  name: string;
  type: string;
  popularity: number;
  emulation: string;
  bestOn: string;
  knownFor: string;
  cost: string;
}

export const pluginCatalog: PluginCatalogItem[] = [
  // Intelligent mix/master helpers (Mastering The Mix + analysis)
  { name: "ANIMATE", type: "Mix Assistant", popularity: 7, emulation: "Digital (non-emulation)", bestOn: "Drums, synths, full mix bus", knownFor: "Adds dynamic movement/punch in selected bands", cost: "Mastering The Mix one-time (~$49-$66) or bundle; periodic sales" },
  { name: "BASSROOM", type: "Mix Assistant", popularity: 8, emulation: "Digital (non-emulation)", bestOn: "Master bus low-end, bass-heavy genres", knownFor: "Low-end target curves and corrective guidance", cost: "Mastering The Mix one-time (~$49-$66) or bundle; periodic sales" },
  { name: "FASTERMASTER", type: "Mix Assistant", popularity: 6, emulation: "Digital (non-emulation)", bestOn: "Quick mastering chains, demos", knownFor: "Fast starting-point mastering decisions", cost: "Mastering The Mix one-time/plugin alliance pricing; periodic sales" },
  { name: "FUSER", type: "Mix Assistant", popularity: 7, emulation: "Digital (non-emulation)", bestOn: "Dense arrangements, vocal/music masking", knownFor: "Unmasking competing frequency layers", cost: "Mastering The Mix one-time (~$49-$66) or bundle; periodic sales" },
  { name: "LEVELS", type: "Metering & Analysis", popularity: 8, emulation: "Digital (non-emulation)", bestOn: "Mix bus and mastering checks", knownFor: "Actionable metering for clipping, dynamics, low-end, stereo", cost: "Mastering The Mix one-time (~$49-$66) or bundle; periodic sales" },
  { name: "LIMITER", type: "Limiter & Clipping", popularity: 7, emulation: "Digital (non-emulation)", bestOn: "Master bus loudness", knownFor: "Simple loudness-first limiting workflow", cost: "Mastering The Mix one-time (~$49-$66) or bundle; periodic sales" },
  { name: "MIXROOM", type: "Mix Assistant", popularity: 8, emulation: "Digital (non-emulation)", bestOn: "Master bus, tonal-balance shaping", knownFor: "Guided broad EQ decisions against references", cost: "Mastering The Mix one-time (~$49-$66) or bundle; periodic sales" },
  { name: "Mix Monolith", type: "Metering & Analysis", popularity: 4, emulation: "Digital (non-emulation)", bestOn: "Session utility", knownFor: "Utility plugin; usage context varies by release", cost: "Unknown/varies by vendor" },
  { name: "REFERENCE3", type: "Metering & Analysis", popularity: 8, emulation: "Digital (non-emulation)", bestOn: "Mix referencing and A/B", knownFor: "Reference matching and fast level-compared checks", cost: "Mastering The Mix one-time (~$49-$66) or bundle; periodic sales" },
  { name: "REFSEND", type: "Utility", popularity: 5, emulation: "Digital (non-emulation)", bestOn: "Reference-routing workflows", knownFor: "Reference send/routing utility", cost: "Unknown/varies by vendor or bundle" },
  { name: "RESO", type: "EQ", popularity: 7, emulation: "Digital (non-emulation)", bestOn: "Harsh sources, resonant tracks, mix bus cleanup", knownFor: "Automatic resonant peak control", cost: "Mastering The Mix one-time (~$49-$66) or bundle; periodic sales" },
  { name: "VSX", type: "Monitoring", popularity: 8, emulation: "Room/monitor environment modeling", bestOn: "Mix translation checks", knownFor: "Virtual room and speaker environment monitoring", cost: "VSX hardware purchase; optional Slate subscriptions/expansions" },
  { name: "Youlean Loudness Meter 2", type: "Metering & Analysis", popularity: 9, emulation: "Digital (non-emulation)", bestOn: "Master bus loudness compliance", knownFor: "Accurate LUFS/TP/LRA metering", cost: "Free tier + Pro one-time purchase (commonly around $29-$49)" },

  // FabFilter
  { name: "FabFilter Pro-Q 4", type: "EQ", popularity: 10, emulation: "Digital (non-emulation)", bestOn: "Any source; surgical and musical EQ", knownFor: "Modern workflow EQ with dynamic bands and excellent UI", cost: "One-time (around $199) or FabFilter bundle" },
  { name: "FabFilter Pro-C 3", type: "Compression", popularity: 9, emulation: "Digital with model styles", bestOn: "Vocals, drums, buses, mastering", knownFor: "Flexible compressor styles and deep control", cost: "One-time (around $179-$199) or FabFilter bundle" },
  { name: "FabFilter Pro-DS", type: "Dynamics Utility", popularity: 8, emulation: "Digital (non-emulation)", bestOn: "Vocals and bright mixes", knownFor: "Transparent de-essing", cost: "One-time (around $149) or FabFilter bundle" },
  { name: "FabFilter Pro-G", type: "Dynamics Utility", popularity: 7, emulation: "Digital (non-emulation)", bestOn: "Drums, cleanup, expansion tasks", knownFor: "Clean gate/expander with sidechain control", cost: "One-time (around $149) or FabFilter bundle" },
  { name: "FabFilter Pro-L 2", type: "Limiter & Clipping", popularity: 9, emulation: "Digital (non-emulation)", bestOn: "Mastering and loudness management", knownFor: "True-peak limiting with modern loudness metering", cost: "One-time (around $199) or FabFilter bundle" },
  { name: "FabFilter Pro-MB", type: "Compression", popularity: 8, emulation: "Digital (non-emulation)", bestOn: "Problem-specific dynamic EQ/multiband control", knownFor: "Surgical multiband compression with smooth behavior", cost: "One-time (around $199) or FabFilter bundle" },
  { name: "FabFilter Pro-R 2", type: "Reverb", popularity: 8, emulation: "Digital (non-emulation)", bestOn: "Vocals, instruments, modern ambient spaces", knownFor: "Natural reverb with musical decay shaping", cost: "One-time (around $199) or FabFilter bundle" },
  { name: "FabFilter Saturn 2", type: "Saturation", popularity: 9, emulation: "Analog-inspired digital modes", bestOn: "Bass, drums, synths, mix bus color", knownFor: "Multiband saturation with modulation", cost: "One-time (around $154-$199) or FabFilter bundle" },
  { name: "FabFilter Timeless 3", type: "Delay", popularity: 8, emulation: "Tape-inspired digital delay", bestOn: "Vocals, synth FX, sound design", knownFor: "Creative delay with extensive modulation", cost: "One-time (around $129-$149) or FabFilter bundle" },
  { name: "FabFilter Volcano 3", type: "Filter", popularity: 7, emulation: "Analog-inspired filter models", bestOn: "Synths, FX movement, transitions", knownFor: "Creative modulation-focused filtering", cost: "One-time (around $129-$149) or FabFilter bundle" },
  { name: "FabFilter One", type: "Instrument", popularity: 4, emulation: "Analog-style synth", bestOn: "Simple synth lines", knownFor: "Minimal subtractive synth workflow", cost: "Included in FabFilter Total bundle" },
  { name: "FabFilter Twin 3", type: "Instrument", popularity: 6, emulation: "Analog-style synth", bestOn: "Electronic leads, pads, basses", knownFor: "Flexible modular-style synth routing", cost: "One-time or FabFilter bundle" },
  { name: "FabFilter Simplon", type: "Filter", popularity: 4, emulation: "Digital filter utility", bestOn: "Simple filter shaping", knownFor: "Lightweight two-filter tool", cost: "Included in FabFilter bundle / legacy pricing" },
  { name: "FabFilter Micro", type: "Filter", popularity: 4, emulation: "Digital filter utility", bestOn: "Basic filter automation", knownFor: "Quick single-filter effects", cost: "Included in FabFilter bundle / legacy pricing" },

  // Free utility suite
  { name: "Free EQ", type: "EQ", popularity: 3, emulation: "Digital (non-emulation)", bestOn: "Basic corrective EQ", knownFor: "Free entry-level EQ utility", cost: "Free" },
  { name: "Free Comp", type: "Compression", popularity: 3, emulation: "Digital (non-emulation)", bestOn: "Basic compression tasks", knownFor: "Simple free compressor", cost: "Free" },
  { name: "Free Delay", type: "Delay", popularity: 3, emulation: "Digital (non-emulation)", bestOn: "Simple delay effects", knownFor: "Basic free delay utility", cost: "Free" },
  { name: "Free Convolve", type: "Reverb", popularity: 3, emulation: "Convolution (IR-based)", bestOn: "Spaces via impulse responses", knownFor: "Free convolution reverb approach", cost: "Free" },
  { name: "Free Gain", type: "Utility", popularity: 3, emulation: "Digital (non-emulation)", bestOn: "Gain staging", knownFor: "Simple gain control utility", cost: "Free" },
  { name: "Free Meter", type: "Metering & Analysis", popularity: 3, emulation: "Digital (non-emulation)", bestOn: "Basic metering", knownFor: "Entry-level free metering", cost: "Free" },
  { name: "Free Pan", type: "Utility", popularity: 3, emulation: "Digital (non-emulation)", bestOn: "Stereo placement", knownFor: "Dedicated panning utility", cost: "Free" },
  { name: "Free Tone", type: "EQ", popularity: 3, emulation: "Digital (non-emulation)", bestOn: "Basic tonal shaping", knownFor: "Simple tone control", cost: "Free" },
  { name: "Free Clip 2", type: "Limiter & Clipping", popularity: 5, emulation: "Digital clipping", bestOn: "Drum bus and loudness peaks", knownFor: "Free hard/soft clipping utility", cost: "Free" },
  { name: "FreeClip", type: "Limiter & Clipping", popularity: 5, emulation: "Digital clipping", bestOn: "Drum and master clipping tests", knownFor: "Simple clipper for loudness shaping", cost: "Free" },
  { name: "VClip2", type: "Limiter & Clipping", popularity: 7, emulation: "Digital clipping", bestOn: "Drums, mix bus clipping stages", knownFor: "Transparent-to-colorful clipping control", cost: "One-time purchase (commonly around $99)" },

  // Other third-party
  { name: "Saturation Knob", type: "Saturation", popularity: 8, emulation: "Analog-inspired saturation", bestOn: "Bass, vocals, drums", knownFor: "Fast one-knob harmonic drive", cost: "Free (Softube)" },
  { name: "Shadow Hills Class A Mastering Comp", type: "Compression", popularity: 8, emulation: "Shadow Hills hardware mastering compressor", bestOn: "Mix bus and mastering", knownFor: "Dual-stage mastering glue and tone", cost: "One-time or subscription/bundle (varies by distributor)" },
  { name: "SSDSampler5", type: "Instrument", popularity: 7, emulation: "Sampled drums (not hardware emulation)", bestOn: "Drum production and replacement", knownFor: "Slate drum sampler workflow", cost: "Included with Slate ecosystem tiers; may vary by license" },
  { name: "ValhallaVintageVerbAU64", type: "Reverb", popularity: 9, emulation: "Vintage digital reverb algorithms (70s/80s inspired)", bestOn: "Vocals, synths, drums, ambience", knownFor: "Lush algorithmic reverb with vintage color modes", cost: "One-time $50 (Valhalla fixed pricing)" },

  // UA / UAD native
  { name: "uaudio_api_2500", type: "Compression", popularity: 9, emulation: "API 2500 Bus Compressor", bestOn: "Drum bus, mix bus punch", knownFor: "Punchy bus compression with API tone", cost: "UAD one-time or included in UAD Spark subscription tiers" },
  { name: "uaudio_api_vision_channel_strip", type: "Channel Strip", popularity: 8, emulation: "API Vision console strip", bestOn: "Vocals, drums, guitars, all-round channel strip", knownFor: "Console-style channel workflow", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_avalon_vt-737sp", type: "Channel Strip", popularity: 8, emulation: "Avalon VT-737sp", bestOn: "Vocals, bass, polished tracking chains", knownFor: "Smooth tube channel-strip vibe", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_capitol_compressor", type: "Compression", popularity: 7, emulation: "Capitol Mastering Compressor", bestOn: "Mix bus and mastering", knownFor: "Mastering-style glue and tone shaping", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_distressor", type: "Compression", popularity: 9, emulation: "Empirical Labs EL8 Distressor", bestOn: "Drums, vocals, aggressive dynamics control", knownFor: "Versatile compression character from clean to smash", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_fairchild_660", type: "Compression", popularity: 8, emulation: "Fairchild 660", bestOn: "Vocals, bass, buses", knownFor: "Classic tube compression thickness", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_fairchild_670", type: "Compression", popularity: 9, emulation: "Fairchild 670", bestOn: "Mix bus mastering glue", knownFor: "Legendary vintage tube limiter behavior", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_galaxy_tape_echo", type: "Delay", popularity: 8, emulation: "Roland Space Echo style tape delay", bestOn: "Vocals, guitars, dub echoes", knownFor: "Vintage tape echo character", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_manley_massive_passive", type: "EQ", popularity: 9, emulation: "Manley Massive Passive", bestOn: "Mix bus and mastering", knownFor: "Broad musical mastering EQ curves", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_manley_massive_passive_m", type: "EQ", popularity: 8, emulation: "Manley Massive Passive Mastering variant", bestOn: "Mastering chains", knownFor: "Precise broad tonal shaping for final polish", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_manley_preamp", type: "Channel Strip", popularity: 7, emulation: "Manley tube preamp", bestOn: "Vocals and DI instruments", knownFor: "Clean tube preamp color", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_manley_variable_mu", type: "Compression", popularity: 8, emulation: "Manley Variable Mu", bestOn: "Mix bus and mastering glue", knownFor: "Smooth tube bus compression", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_manley_voxbox", type: "Channel Strip", popularity: 8, emulation: "Manley VOXBOX", bestOn: "Lead vocals and voiceover", knownFor: "Premium vocal channel-strip chain", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_neve_1073", type: "EQ", popularity: 10, emulation: "Neve 1073 preamp/EQ", bestOn: "Vocals, guitars, drums", knownFor: "Classic Neve color and musical EQ", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_oxide_tape", type: "Saturation", popularity: 8, emulation: "Tape machine style saturation", bestOn: "Mix bus, drums, keys", knownFor: "Simple analog-tape glue and warmth", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_pultec_eqp-1a", type: "EQ", popularity: 9, emulation: "Pultec EQP-1A", bestOn: "Kick, bass, vocals, mix bus", knownFor: "Classic boost/cut curves and low-end trick", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_pultec_hlf-3c", type: "EQ", popularity: 7, emulation: "Pultec HLF-3C", bestOn: "High/low filter shaping", knownFor: "Classic gentle filter curves", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_pultec_meq-5", type: "EQ", popularity: 7, emulation: "Pultec MEQ-5", bestOn: "Midrange shaping", knownFor: "Musical midrange sculpting", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_pure_plate", type: "Reverb", popularity: 8, emulation: "Plate reverb hardware style", bestOn: "Vocals, snare, melodic leads", knownFor: "Smooth classic plate spaces", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_ssl_g_bus_compressor", type: "Compression", popularity: 10, emulation: "SSL 4000 G Bus Compressor", bestOn: "Mix bus and drum bus", knownFor: "Famous mix-bus glue compressor", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_studer_a800", type: "Saturation", popularity: 9, emulation: "Studer A800 tape machine", bestOn: "Multitrack drum/music tone shaping", knownFor: "Tape glue and harmonic depth", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_teletronix_la-2", type: "Compression", popularity: 8, emulation: "Teletronix LA-2", bestOn: "Vocals and bass leveling", knownFor: "Optical leveling and smooth dynamics", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_teletronix_la-2a_gray", type: "Compression", popularity: 9, emulation: "Teletronix LA-2A Gray", bestOn: "Vocals, bass, sustained sources", knownFor: "Classic optical compression tone", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_teletronix_la-2a_silver", type: "Compression", popularity: 8, emulation: "Teletronix LA-2A Silver", bestOn: "Vocals and melodic instruments", knownFor: "Smooth opto compression variant", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_teletronix_la-2a_tc", type: "Compression", popularity: 7, emulation: "Teletronix LA-2A tube/compressor variant", bestOn: "Vocals and bass", knownFor: "LA-2A family character option", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_topline_vocal_suite", type: "Dynamics Utility", popularity: 7, emulation: "Digital vocal suite (non-hardware-specific)", bestOn: "Lead vocals and vocal chains", knownFor: "Fast modern vocal polish tools", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_ua_1176", type: "Compression", popularity: 10, emulation: "UA 1176", bestOn: "Vocals, drums, parallel compression", knownFor: "Fast FET attack and aggressive control", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_ua_1176_rev_a", type: "Compression", popularity: 9, emulation: "1176 Rev A", bestOn: "Vocals and character compression", knownFor: "Colorful early 1176 tone", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_ua_1176ae", type: "Compression", popularity: 8, emulation: "1176AE", bestOn: "Slower attack 1176 tasks, buses", knownFor: "1176 flavor with alternate timings", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_ua_1176ln_rev_e", type: "Compression", popularity: 9, emulation: "1176LN Rev E", bestOn: "Vocals, drums, modern FET compression", knownFor: "Cleaner 1176 variant with fast control", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_ampex_atr-102_tape", type: "Saturation", popularity: 9, emulation: "Ampex ATR-102 mastering tape", bestOn: "Master bus and stem print chains", knownFor: "High-end tape finishing and glue", cost: "UAD one-time or included in UAD Spark tiers" },
  { name: "uaudio_verve", type: "Saturation", popularity: 7, emulation: "Analog machine color collection", bestOn: "Buses, tracks needing color and glue", knownFor: "Quick analog coloration choices", cost: "UAD one-time or included in UAD Spark tiers" }
];
