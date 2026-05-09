import type { TrainingLesson } from "@/lib/sheet-schema";

export const sidechainingLesson: TrainingLesson = {
  id: "sidechaining-practical-uses",
  title: "Sidechaining in Logic Pro",
  series: "Dynamics Mastery Series",
  summary:
    "A practical sidechaining lesson for creating space, controlling masking, and building musical movement with compressors, gates, dynamic EQ, delays, reverbs, and buses.",
  duration: "45 min read",
  symbolName: "point.3.filled.connected.trianglepath.dotted",
  badges: ["New", "Intermediate", "Dynamics"],
  isFeatured: true,
  checklist: [
    "Understand trigger, target, detector, and gain-reduction paths before inserting plugins.",
    "Set up Logic Pro Compressor sidechain input from the target processor menu.",
    "Use the sidechain Listen and filter controls to shape what the detector hears.",
    "Apply kick-to-bass ducking without deleting the bass sustain.",
    "Use dynamic EQ or multiband sidechaining for frequency-specific masking.",
    "Duck vocal reverbs and delays so ambience blooms after phrases.",
    "Use gates and keyed effects creatively without confusing them with cleanup.",
    "Level-match, bypass, and print important sidechain moves for reliable recall.",
    "Check every sidechain move in context, at low volume, and in mono."
  ],
  steps: [
    {
      number: 1,
      title: "Understand the Sidechain Signal Flow",
      concept:
        "Sidechaining means one signal controls how a processor reacts to another signal.",
      actions: [
        "Name the trigger source: the sound that controls the movement.",
        "Name the target: the sound being compressed, gated, filtered, or ducked.",
        "Decide whether the move should be transparent problem-solving or an obvious groove effect."
      ],
      body:
        "A normal compressor listens to the same channel it is processing. A sidechained compressor listens to another signal instead. If the kick is the trigger and the bass is the target, the compressor lives on the bass track but listens to the kick. Every time the kick crosses the threshold, the bass turns down for a moment. That simple rerouting is the foundation for much more than dance-music pumping. The same idea can make a vocal push guitars out of the way, make a delay disappear during lyrics and return between phrases, make a gate open only when a drum hits, or make a dynamic EQ remove just one masking band. Think in three pieces: trigger, detector, and target. The detector is the part of the processor that decides when to act. The target is what the audience hears being changed. When those roles are clear, sidechaining becomes predictable instead of mysterious.",
      symbolName: "point.3.connected.trianglepath.dotted",
      visualTitle: "Trigger Controls Target",
      visualCaption: "The sidechain signal drives the detector while the target audio is processed.",
      settings: {
        Trigger: "The control source",
        Target: "The processed sound",
        Detector: "What the plugin listens to"
      },
      proTip:
        "Say the routing out loud before patching it: 'Kick controls bass compressor' or 'Lead vocal controls reverb return compressor.'",
      avoidThis:
        "Do not call every ducking move sidechain compression. Sidechain gates, dynamic EQ, multiband compressors, and keyed effects use the same control idea in different processors.",
      checkYourWork:
        "You can identify trigger, target, and audible result for the sidechain move before choosing settings.",
      stepScreenshot: "/assets/training/sidechaining/01-sidechain-signal-flow.png"
    },
    {
      number: 2,
      title: "Patch a Sidechain in Logic Pro",
      concept:
        "Logic Pro exposes sidechain input selection at the top of compatible plugins, including Compressor.",
      actions: [
        "Insert Compressor on the target channel, not the trigger channel.",
        "Open the Side Chain input menu at the top of the plugin window.",
        "Choose the trigger track or bus, then confirm the gain-reduction meter moves only when the trigger plays."
      ],
      body:
        "The most common setup mistake is inserting the compressor on the wrong channel. If you want the bass to duck when the kick hits, place Compressor on the bass channel strip. Then use the plugin header Side Chain menu to select the kick track or a kick bus as the external input. The kick now feeds the detector while the bass remains the processed audio path. Start with Auto Gain off so loudness does not fool you. Use a moderate ratio, lower the threshold until gain reduction appears on kick hits, then tune attack and release. Fast attack catches the bass immediately, while slower attack lets a little bass transient through. Release decides whether the bass returns quickly, breathes with the groove, or stays reduced too long. If the trigger is a bus, name it clearly so you can understand the patch months later.",
      symbolName: "slider.horizontal.3",
      visualTitle: "Logic Pro Patch Point",
      visualCaption: "Insert on target, choose trigger in the plugin Side Chain menu.",
      settings: {
        Insert: "Target channel",
        Sidechain: "Trigger track or bus",
        "Auto Gain": "Off while learning"
      },
      proTip:
        "Use a dedicated trigger bus if the audible kick track has fills, edits, or effects that make the detector react inconsistently.",
      avoidThis:
        "Do not put the compressor on the kick if the goal is ducking the bass. The plugin must sit on the sound you want to reduce.",
      checkYourWork:
        "Muting the trigger should stop gain reduction; bypassing the compressor should restore the un-ducked target.",
      stepScreenshot: "/assets/training/sidechaining/02-logic-pro-sidechain-patch.png"
    },
    {
      number: 3,
      title: "Shape What the Detector Hears",
      concept:
        "Sidechain filtering lets the processor react to the useful part of the trigger instead of the entire trigger signal.",
      actions: [
        "Enable the sidechain filter or advanced sidechain controls when available.",
        "Use Listen to monitor the filtered detector signal.",
        "Filter out trigger frequencies that cause false or exaggerated gain reduction."
      ],
      body:
        "Logic Pro Compressor includes sidechain controls that change detector behavior. Peak detection reacts to short transients, RMS detection follows average energy, and stereo detection modes decide how left and right inputs trigger compression. The filter section is often the difference between professional control and distracting pumping. A low-frequency kick can over-trigger bus compression, so a high-pass filter in the detector can make the compressor respond more to snare and body than sub thump. A vocal can trigger dynamic EQ on guitars more cleanly if the detector focuses on the presence range instead of plosives. Use Listen to hear what the compressor hears. You are not filtering the audible target with this section; you are filtering the control signal. That distinction matters. A filtered detector can be surgical while the target audio still keeps its full tone.",
      symbolName: "line.3.horizontal.decrease.circle",
      visualTitle: "Detector Filter",
      visualCaption: "Sidechain filters focus the trigger before it reaches the detector.",
      settings: {
        Peak: "Transient-sensitive movement",
        RMS: "Smoother average movement",
        Listen: "Monitor detector input"
      },
      proTip:
        "If compression is rhythmically correct but too exaggerated, try detector filtering before changing every main compressor setting.",
      avoidThis:
        "Do not confuse the sidechain filter with EQ on the audible signal. It usually changes trigger behavior, not target tone.",
      checkYourWork:
        "The gain-reduction meter follows the intended part of the trigger rather than random lows, cymbals, breaths, or bleed.",
      stepScreenshot: "/assets/training/sidechaining/03-sidechain-detector-filter.png"
    },
    {
      number: 4,
      title: "Example 1: Duck Bass When the Kick Hits",
      concept:
        "Kick-to-bass ducking creates low-end space without permanently EQ-cutting the bass.",
      actions: [
        "Insert Compressor on the bass track or bass bus.",
        "Select the kick as the sidechain input.",
        "Aim for 1-4 dB of gain reduction for natural mixes or more for an audible pumping style."
      ],
      body:
        "Kick and bass often fight because both occupy the lowest octaves. Static EQ can help, but it removes bass tone all the time. Sidechain ducking only moves the bass when the kick needs space. In rock, pop, worship, and singer-songwriter mixes, keep the move subtle: fast enough attack to make room for the kick transient, release timed so the bass returns before the groove feels empty, and gain reduction that you miss when muted but do not notice as an effect. In EDM, hip-hop, synth-pop, or heavy modern productions, the same patch can become a rhythmic pulse. The important decision is musical intent. If the kick should sound solid but the bass should still feel continuous, use light reduction. If the whole track should breathe around the kick, push ratio, threshold, and release until the pumping becomes part of the arrangement.",
      symbolName: "speaker.wave.2.fill",
      visualTitle: "Kick Opens Low-End Space",
      visualCaption: "The kick transient briefly lowers bass so both elements translate.",
      settings: {
        Ratio: "2:1 to 6:1",
        Attack: "0-10 ms",
        Release: "40-180 ms by groove"
      },
      proTip:
        "Set release while the full groove plays. The correct release usually feels connected to tempo more than to the compressor display.",
      avoidThis:
        "Do not remove so much bass that the song loses sustain between kick hits unless pumping is the desired sound.",
      checkYourWork:
        "The kick becomes clearer at the same master level and the bass still feels like a continuous musical part.",
      stepScreenshot: "/assets/training/sidechaining/04-kick-ducks-bass.png"
    },
    {
      number: 5,
      title: "Example 2: Let the Acoustic Kick Beat the 808",
      concept:
        "Short 808 or sub ducking prevents low-frequency pileups while preserving the long sub note.",
      actions: [
        "Put a compressor or volume shaper on the 808, sub bass, or synth low layer.",
        "Use the kick, ghost kick, or clean trigger bus as the sidechain source.",
        "Use fast attack and a release that recovers before the next bass pitch change."
      ],
      body:
        "An 808, sub synth, or long bass drop can mask the physical click and thump of an acoustic kick. The goal is not always to make the sub obviously pulse; often it is to remove the first 40-120 ms of sub energy so the kick transient owns the speaker cone. If the kick has fills, use a ghost trigger MIDI track or muted audio trigger that plays only the pattern you want the 808 to follow. This keeps the ducking consistent even if the audible kick has rolls, flam hits, or sample layers. For trap, pop, and rock productions with added sub support, this move can preserve power without clipping the mix bus. Watch the release carefully. Too short creates distortion or clicks; too long makes the low end vanish after every hit. The best setting usually sounds louder and cleaner even though the sub is being turned down momentarily.",
      symbolName: "waveform",
      visualTitle: "Kick vs 808",
      visualCaption: "A short duck clears speaker excursion at the exact kick transient.",
      settings: {
        Duck: "40-120 ms window",
        Trigger: "Kick or ghost kick bus",
        Goal: "Transient clarity without sub dropout"
      },
      proTip:
        "A muted ghost kick trigger can be more reliable than the audible kick if the production has fills or changing kick samples.",
      avoidThis:
        "Avoid using a long release just because the meter looks smooth. If the 808 note disappears, the release is too slow.",
      checkYourWork:
        "The combined kick and 808 feel stronger, not smaller, when the sidechain is active.",
      stepScreenshot: "/assets/training/sidechaining/05-kick-ducks-808.png"
    },
    {
      number: 6,
      title: "Example 3: Duck Low Synths Under Bass Guitar",
      concept:
        "A bass guitar can trigger dynamic control on supporting synth lows so the played part remains articulate.",
      actions: [
        "Route the synth low layer through a compressor or dynamic EQ.",
        "Use the bass guitar DI or bass bus as the sidechain trigger.",
        "Reduce only the low-mid or sub band if full-band compression makes the synth pump."
      ],
      body:
        "Layered bass arrangements are common: a real bass guitar supplies performance and midrange identity while a synth or sub layer adds weight. The problem appears when both layers sustain through the same notes and blur the rhythm. Instead of muting the synth or cutting huge EQ holes, let the bass guitar control the synth layer. Full-band compression works if the synth is only a support pad. Dynamic EQ or multiband compression is better when you want to duck only the 60-180 Hz area while preserving top-end texture. This technique is useful in rock choruses with added synth bass, pop tracks with live bass plus sub, and worship arrangements where pads fill the low octave. The musical result is authority: the performed bass line remains readable and the synth reinforces it without swallowing the groove.",
      symbolName: "gauge.with.dots.needle.50percent",
      visualTitle: "Bass Leads the Low Layer",
      visualCaption: "The played bass can carve temporary room in a supporting synth.",
      settings: {
        Target: "Synth low layer",
        Trigger: "Bass DI or bass bus",
        Band: "60-180 Hz if using dynamic EQ"
      },
      proTip:
        "If the synth has stereo width, keep sub frequencies centered before sidechaining so mono playback stays stable.",
      avoidThis:
        "Do not let the synth become louder after each duck because makeup gain or release overshoot can create low-end surges.",
      checkYourWork:
        "Bass notes are easier to follow while the synth layer still adds weight when the bass leaves space.",
      stepScreenshot: "/assets/training/sidechaining/06-bass-ducks-synth-low.png"
    },
    {
      number: 7,
      title: "Example 4: Let Vocals Duck Guitars or Keys",
      concept:
        "Vocal-triggered dynamic EQ can reduce masking only when the singer is present.",
      actions: [
        "Place a dynamic EQ or multiband compressor on the guitar, keys, or music bus.",
        "Use the lead vocal as the external sidechain trigger.",
        "Target the masking zone, often 1.5-5 kHz for intelligibility conflicts."
      ],
      body:
        "Dense guitars, piano, organ, and synths can occupy the same presence range that carries lyric intelligibility. Static cuts may make the track feel dull in instrumental sections. A vocal-triggered dynamic EQ is more elegant: when the singer enters, the music bus dips a narrow or medium band; when the singer stops, the instruments return to full tone. This is one of the most practical non-EDM sidechain uses. It works for rock guitars under lead vocal, piano under ballad vocal, synth pads under pop hooks, and stacked backing tracks under spoken lines. Start small, often 1-3 dB of dynamic reduction. Use a sidechain detector that follows the vocal after basic cleanup and de-essing, not a raw noisy track. The goal is not to hear the guitars duck. The goal is to understand the vocal with less fader riding and fewer permanent tonal compromises.",
      symbolName: "mic.fill",
      visualTitle: "Vocal Clears Presence",
      visualCaption: "Dynamic EQ moves a masking band only during vocal phrases.",
      settings: {
        "Common Band": "1.5-5 kHz",
        Reduction: "1-3 dB",
        Width: "Medium Q for natural tone"
      },
      proTip:
        "Sidechain the music bus for broad support, or individual guitars/keys when only one instrument masks the vocal.",
      avoidThis:
        "Avoid wide heavy dips that make the band sound like it folds backward every time the vocal starts.",
      checkYourWork:
        "Lyrics become easier to understand without the instruments sounding darker in instrumental gaps.",
      stepScreenshot: "/assets/training/sidechaining/07-vocal-ducks-guitars-keys.png"
    },
    {
      number: 8,
      title: "Example 5: Duck Vocal Reverb",
      concept:
        "Sidechaining the reverb return keeps the dry vocal forward while letting space bloom after phrases.",
      actions: [
        "Send the vocal to a reverb aux set fully wet.",
        "Insert Compressor after the reverb on the aux return.",
        "Select the dry lead vocal as the compressor sidechain input."
      ],
      body:
        "Big vocal reverb can sound beautiful in gaps and messy during lyrics. Instead of lowering the reverb send for the whole song, place a compressor on the reverb return and trigger it from the dry vocal. When the singer is active, the reverb return ducks. When the phrase ends, release time lets the tail rise into the space. This keeps the vocal intimate and intelligible while still making the production feel wide and emotional. It is useful for lead vocals, background stacks, snare plates, guitar ambience, and even room mics. Attack can be fast because you want the reverb to move out of the way quickly. Release is the creative control: short release keeps the tail lively; longer release makes a smoother swell after each phrase. Adjust threshold until the reverb supports the vocal instead of wrapping around every consonant.",
      symbolName: "sparkles",
      visualTitle: "Reverb Moves Behind the Voice",
      visualCaption: "The dry vocal ducks its own ambience while phrases are present.",
      settings: {
        Insert: "Compressor after reverb",
        Trigger: "Dry vocal",
        Release: "150-600 ms by phrase"
      },
      proTip:
        "Filter the reverb return before the compressor if low reverb rumble makes the ducking feel cloudy.",
      avoidThis:
        "Do not sidechain the dry vocal itself when the goal is reverb clarity. Compress the return, not the source.",
      checkYourWork:
        "The vocal reads clearly during lines and the reverb tail becomes more audible between lines.",
      stepScreenshot: "/assets/training/sidechaining/08-vocal-ducks-reverb.png"
    },
    {
      number: 9,
      title: "Example 6: Duck Delay Throws During Lyrics",
      concept:
        "A vocal can control delay level so repeats stay exciting without covering new words.",
      actions: [
        "Create a delay aux and keep it mostly or fully wet.",
        "Insert Compressor after the delay.",
        "Use the dry vocal as sidechain input and tune release to the tempo."
      ],
      body:
        "Delay throws are exciting because repeats answer the vocal. They become distracting when repeats collide with the next line. Sidechain compression on the delay return solves this by reducing the delay while the singer continues, then releasing the repeats into gaps. It is especially effective on quarter-note, dotted-eighth, slap, and tape delays. You can automate the send for special words and still sidechain the return for automatic cleanup. Use tempo-aware thinking: if the song is fast, release may need to recover within an eighth or quarter note. If the song is slow and spacious, a longer release can make the delay swell musically. For a more controlled result, insert EQ before compression to remove lows and harsh highs from the return. The ducked delay should feel like arrangement polish, not like a gate chopping off every repeat.",
      symbolName: "repeat",
      visualTitle: "Delay Answers, Then Tucks",
      visualCaption: "The vocal keeps repeats out of the way until there is space.",
      settings: {
        Delay: "Slap, 1/8, dotted 1/8, or 1/4",
        Trigger: "Dry vocal",
        "Release Feel": "Tempo-matched"
      },
      proTip:
        "Automate send level for which words get delay; use sidechain ducking for how the return behaves afterward.",
      avoidThis:
        "Do not set release so fast that the delay chatters between syllables unless that stutter is the intended effect.",
      checkYourWork:
        "Delay repeats are obvious in gaps but lyrics remain clean when the next phrase starts.",
      stepScreenshot: "/assets/training/sidechaining/09-vocal-ducks-delay.png"
    },
    {
      number: 10,
      title: "Example 7: Snare Ducks Room or Plate Reverb",
      concept:
        "A snare can trigger control on its ambience so the attack stays crisp and the decay stays large.",
      actions: [
        "Send snare to a room or plate aux.",
        "Compress the reverb return using the dry snare as sidechain input.",
        "Tune release so the ambience rises after the transient instead of masking it."
      ],
      body:
        "Snare reverb often creates a conflict: the mix needs size, but the transient needs to stay sharp. Sidechaining the snare reverb return gives you both. When the dry snare hits, the reverb dips. As the compressor releases, the tail blooms and fills the space after the crack. This works on natural room mics, artificial plates, gated-style rooms, and parallel snare ambience. The technique is not limited to snare. Toms can duck their room return so fills stay articulate, and percussion can duck short ambience so grooves remain tight. Start with more reduction than needed so you can hear the timing, then back off until the move feels natural. If the return has too much low-mid buildup, EQ it before the compressor. That way the sidechain move enhances depth without turning the drum bus into a boxy wash.",
      symbolName: "circle.grid.cross",
      visualTitle: "Snare Space Without Smear",
      visualCaption: "A ducked room return preserves crack while keeping size.",
      settings: {
        Target: "Snare room or plate",
        Trigger: "Dry snare",
        Release: "Recover with decay"
      },
      proTip:
        "Use the same trigger bus for snare samples and live snare if both should control the shared ambience.",
      avoidThis:
        "Avoid ducking so hard that the reverb tail sounds disconnected from the snare hit.",
      checkYourWork:
        "The snare attack is clearer and the drum still feels larger when the return is active.",
      stepScreenshot: "/assets/training/sidechaining/10-snare-ducks-room.png"
    },
    {
      number: 11,
      title: "Example 8: Lead Guitar Ducks Rhythm Layers",
      concept:
        "Sidechaining can create a temporary feature pocket without muting supporting parts.",
      actions: [
        "Place dynamic EQ or a compressor on the rhythm guitar bus.",
        "Use the lead guitar as the external sidechain trigger.",
        "Target the midrange band where the lead needs focus, then reduce gently."
      ],
      body:
        "A guitar solo, melodic hook, or featured synth line often competes with rhythm layers that are important everywhere else. Manual automation is still valuable, but sidechaining can make the pocket respond to the performance. Put dynamic EQ on the rhythm guitar bus and use the lead guitar as trigger. Reduce a band around the lead's bite or body only when the lead plays. The rhythm guitars remain wide and powerful in rests, then step back during featured phrases. This is useful for rock guitar solos, harmony lead lines, keyboard hooks, fiddle or violin features, and call-and-response parts. Keep the sidechain subtle because listeners are sensitive to rhythm guitars collapsing. If the lead needs a dramatic spotlight, combine light sidechain reduction with a small lead fader ride instead of forcing the sidechain to do all the work.",
      symbolName: "music.note",
      visualTitle: "Feature Pocket",
      visualCaption: "The lead instrument asks the support layer to step back temporarily.",
      settings: {
        Target: "Rhythm bus",
        Trigger: "Lead instrument",
        Reduction: "1-3 dB dynamic band"
      },
      proTip:
        "Sidechain the bus when both left and right rhythm layers should move together; sidechain one track when only one side masks the feature.",
      avoidThis:
        "Do not create a hole so wide that the track loses energy every time the lead plays.",
      checkYourWork:
        "The featured line reads clearly while the rhythm bed still feels continuous.",
      stepScreenshot: "/assets/training/sidechaining/11-lead-ducks-rhythm.png"
    },
    {
      number: 12,
      title: "Example 9: Voice Ducks a Music Bed",
      concept:
        "Sidechain ducking can automate narration, podcast, livestream, or announcement mixes.",
      actions: [
        "Insert a compressor on the music bed or background bus.",
        "Use the voice, narration, or announcement mic as the sidechain trigger.",
        "Set attack fast enough for intelligibility and release slow enough to avoid pumping between words."
      ],
      body:
        "Sidechaining is not only for songs. Voiceover, podcast, worship service playback, livestream intros, and spoken interludes often need music to lower automatically when someone talks. The setup is simple: compressor on music, voice as trigger. The taste is in the timing. Fast attack protects consonants at the start of words. Release should be slower than a syllable gap so the music does not rise and fall between every word. For natural narration, use lower ratios and a few dB of reduction. For radio-style announcements, heavier ducking may be appropriate. Use a filtered detector if plosives or breath noise trigger the compressor too hard. This approach saves automation time, but you should still listen through the entire piece. A speaker who pauses for effect may need manual automation so the music does not jump up at the wrong emotional moment.",
      symbolName: "mic.circle.fill",
      visualTitle: "Narration Priority",
      visualCaption: "Voiceover can automatically lower the supporting music bed.",
      settings: {
        Ratio: "2:1 to 5:1",
        Attack: "Fast",
        Release: "300 ms to 1 s"
      },
      proTip:
        "For podcasts, combine gentle sidechain ducking with clip gain or vocal riding so the compressor receives a consistent trigger.",
      avoidThis:
        "Do not let the music pump up between every word. Smooth release is usually more important than dramatic reduction.",
      checkYourWork:
        "Every word remains intelligible while the bed still feels present under the voice.",
      stepScreenshot: "/assets/training/sidechaining/12-voice-ducks-music-bed.png"
    },
    {
      number: 13,
      title: "Example 10: De-Ess with an Internal Sidechain",
      concept:
        "A de-esser is a frequency-aware compressor whose detector listens hardest to sibilance.",
      actions: [
        "Insert DeEsser 2 or a compressor/dynamic EQ on the vocal.",
        "Focus the detector around the harsh S range, often 5-10 kHz.",
        "Reduce only enough to soften sibilance without dulling the vocal."
      ],
      body:
        "Not every sidechain uses a different external track. Many processors use an internal sidechain: the same vocal feeds the detector, but the detector is filtered so it reacts mostly to sibilance. That is the core idea behind de-essing. The audible vocal is reduced, split-band reduced, or dynamically filtered when S, T, SH, or CH energy crosses the threshold. Understanding this makes de-essing easier. You are not simply turning down treble. You are asking the detector to identify a problem band and act only when that band spikes. Logic DeEsser 2 is built for this, but dynamic EQ can do similar work with more control. Use Listen or monitoring modes to find the harsh band, then reduce conservatively. Over-de-essing creates lispy vocals and removes excitement. Good de-essing makes the compressor and vocal effects behave better downstream because the vocal no longer triggers them with sharp sibilant bursts.",
      symbolName: "waveform.path.ecg",
      visualTitle: "Filtered Internal Sidechain",
      visualCaption: "The vocal controls its own high-frequency problem band.",
      settings: {
        "S Range": "5-10 kHz",
        Mode: "Wideband or split-band",
        Goal: "Softer sibilance, same vocal energy"
      },
      proTip:
        "De-ess before bright reverbs and delays so sibilance does not splash through every effect return.",
      avoidThis:
        "Do not chase every bright consonant. Some brightness is articulation, not a defect.",
      checkYourWork:
        "Sibilance is less painful while the vocal still sounds clear and natural.",
      stepScreenshot: "/assets/training/sidechaining/13-de-ess-internal-sidechain.png"
    },
    {
      number: 14,
      title: "Example 11: Key a Gate from a Drum Trigger",
      concept:
        "A sidechain gate opens a target only when the trigger crosses threshold.",
      actions: [
        "Insert a gate on the sound you want to open, such as room noise, a sine tone, or a parallel effect.",
        "Choose the drum trigger as the sidechain input.",
        "Set attack, hold, and release to follow the drum envelope musically."
      ],
      body:
        "Sidechain gates are the inverse of common ducking. Instead of turning a target down when the trigger appears, a gate can open the target only when the trigger appears. This is useful for reinforcing drums. A kick can open a low sine tone for added sub weight. A snare can open a noise burst or gated room for impact. A tom close mic can key a gate more accurately from a cleaner trigger track than from a noisy mic with cymbal bleed. The target might be audible audio, a parallel return, or a printed sample. Keep the gate musical: attack too slow misses the transient, hold too short chops the body, release too long smears into the next hit. This technique can be transparent reinforcement or a deliberately artificial 1980s-style gated effect. The key is remembering that the trigger does not need to be heard; it only needs to control the gate reliably.",
      symbolName: "rectangle.compress.vertical",
      visualTitle: "Gate Opens on Trigger",
      visualCaption: "A drum hit can reveal reinforcement only when needed.",
      settings: {
        Trigger: "Kick, snare, or tom",
        Target: "Tone, room, or sample layer",
        Controls: "Attack, hold, release"
      },
      proTip:
        "Duplicate or print a clean trigger if bleed makes the gate open on the wrong hits.",
      avoidThis:
        "Do not use a keyed gate to hide bad timing between layers. Align timing first, then gate.",
      checkYourWork:
        "The added layer appears only on intended hits and decays in time with the drum.",
      stepScreenshot: "/assets/training/sidechaining/14-keyed-gate-drum-trigger.png"
    },
    {
      number: 15,
      title: "Example 12: Stop Drum Bus Pumping with a Sidechain Filter",
      concept:
        "Filtering a compressor detector can keep low-end hits from over-controlling a bus.",
      actions: [
        "Insert gentle compression on the drum bus or mix bus only if it improves glue.",
        "Enable the sidechain filter in the compressor.",
        "High-pass or shape the detector so kick lows do not dominate the gain reduction."
      ],
      body:
        "Bus compression can glue a kit or mix, but low-frequency hits often make the whole bus lurch. A loud kick can pull down cymbals, guitars, and vocal ambience in a way that feels smaller rather than punchier. The solution may be a sidechain filter, even without an external sidechain source. In many compressors, the detector normally listens to the processed signal. By high-passing or shaping the detector path, you tell the compressor to respond less to sub energy and more to the overall musical envelope. Logic Pro Compressor sidechain parameters stay useful in this internal mode. Use Listen to confirm you are not simply ignoring the entire groove. This move is subtle but important: it lets compression add cohesion without turning the kick into the boss of the whole mix. It is a professional way to get glue while keeping low-end stability.",
      symbolName: "dial.medium",
      visualTitle: "Filtered Bus Detector",
      visualCaption: "Internal sidechain filtering prevents kick lows from over-triggering glue compression.",
      settings: {
        "Detector HPF": "60-150 Hz starting zone",
        "Gain Reduction": "0.5-2 dB on mix bus",
        Goal: "Glue without lurching"
      },
      proTip:
        "If bus compression feels worse only when the kick enters, adjust detector filtering before abandoning the compressor.",
      avoidThis:
        "Do not use heavy bus compression to fix an unbalanced low end. Fix the kick and bass balance first.",
      checkYourWork:
        "The bus feels cohesive while cymbals, ambience, and vocals stop dipping with every kick hit.",
      stepScreenshot: "/assets/training/sidechaining/15-bus-sidechain-filter.png"
    },
    {
      number: 16,
      title: "Example 13: Sidechain Dynamic EQ for Frequency Pockets",
      concept:
        "Dynamic EQ can duck only the overlapping frequency range instead of the entire target.",
      actions: [
        "Choose a dynamic EQ or multiband processor that supports external sidechain.",
        "Place it on the target that masks another part.",
        "Set the sidechain trigger and reduce only the masking band."
      ],
      body:
        "Full-band ducking is not always the cleanest solution. If a vocal only conflicts with guitars around 3 kHz, turning down the entire guitar bus may make the arrangement shrink. Dynamic EQ creates a smaller pocket. The vocal triggers one band on the guitar bus. The bass triggers only the low band of a synth. The kick triggers only the sub band of a bass. The snare triggers only a harsh room resonance. The lead guitar triggers a mid band in keys. This is sidechaining as frequency choreography. It is particularly useful in dense band mixes because every instrument keeps most of its tone most of the time. Start with the narrowest useful problem statement: who masks whom, and where? Then use the minimum reduction that solves that conflict. If you need more than 4-5 dB of dynamic reduction, check arrangement, static EQ, and levels too.",
      symbolName: "waveform.path.badge.plus",
      visualTitle: "Frequency-Only Ducking",
      visualCaption: "Dynamic EQ removes the shared band while leaving the rest alone.",
      settings: {
        Tools: "Dynamic EQ or multiband compressor",
        Reduction: "1-4 dB usually",
        Question: "Who masks whom, and where?"
      },
      proTip:
        "Solo the detector briefly to find the trigger behavior, then make final decisions only in the full mix.",
      avoidThis:
        "Avoid making many tiny sidechain bands before the rough balance works. Complexity cannot replace arrangement clarity.",
      checkYourWork:
        "The masking problem improves without obvious level pumping or tonal collapse.",
      stepScreenshot: "/assets/training/sidechaining/16-dynamic-eq-frequency-pocket.png"
    },
    {
      number: 17,
      title: "Example 14: Make Pads Pump with the Groove",
      concept:
        "Creative sidechaining can turn sustained sounds into rhythmic motion.",
      actions: [
        "Place a compressor, tremolo-style volume shaper, or gate on the pad or synth bus.",
        "Use kick, snare, percussion, or a muted rhythm trigger as the sidechain source.",
        "Exaggerate threshold, ratio, and release until the movement becomes part of the arrangement."
      ],
      body:
        "Not every sidechain has to be invisible. Sustained pads, drones, string layers, and synth chords can feel static. Sidechaining them to the kick or a ghost rhythm trigger makes the arrangement breathe with the groove. This is common in electronic music, but it also works subtly in pop, worship, cinematic rock, and ambient transitions. The trigger can be the actual kick, a percussion loop, or a silent MIDI/audio trigger with a custom rhythm. A ghost trigger gives the most control because the audible drums do not have to determine the pumping pattern. Use deeper reduction and slower release for obvious swell. Use lighter reduction for a pad that simply stops masking the transient grid. If the movement makes the track feel smaller, reduce low-frequency content in the pad or limit the sidechain to a mid/high layer.",
      symbolName: "metronome",
      visualTitle: "Rhythmic Pumping",
      visualCaption: "A trigger pattern can animate sustained instruments.",
      settings: {
        Trigger: "Kick, percussion, or ghost rhythm",
        Target: "Pad, drone, strings, synth bus",
        Style: "Subtle space or obvious pulse"
      },
      proTip:
        "A ghost trigger lets you program syncopated sidechain movement without changing the audible drum part.",
      avoidThis:
        "Do not pump full-range pads with lots of sub unless you want the low end to sway dramatically.",
      checkYourWork:
        "The sustained layer gains movement while the groove feels stronger and more intentional.",
      stepScreenshot: "/assets/training/sidechaining/17-pad-pumping-groove.png"
    },
    {
      number: 18,
      title: "Build a Repeatable Logic Pro Routing Template",
      concept:
        "Reusable buses make sidechain patches faster, clearer, and safer across sessions.",
      actions: [
        "Create named trigger buses such as SC Kick, SC Vocal, and SC Snare.",
        "Feed those buses with pre-fader or post-fader sends depending on the goal.",
        "Color and document sidechain auxiliaries so routing remains readable."
      ],
      body:
        "Sidechain routing becomes messy when every plugin points directly at random tracks. A template keeps decisions readable. Create a few dedicated sidechain buses: SC Kick, SC Vocal, SC Snare, SC Lead, or SC Narration. Feed them from the sources that should control other processors. In some cases the trigger bus is audible nowhere; it exists only for detection. In other cases it mirrors an existing bus. Pre-fader sends are useful when a trigger must keep working even if the audible source is faded down. Post-fader sends make the sidechain follow the mix balance. There is no universal answer, so label the reason. Keep trigger buses out of the stereo output unless they are meant to be heard. Name auxes clearly, for example 'Vox Verb Duck Comp' or 'Bass DynEQ keyed by Kick.' Future you will thank present you when revisiting the session.",
      symbolName: "folder.fill.badge.gearshape",
      visualTitle: "Sidechain Bus Template",
      visualCaption: "Named trigger buses turn complex patches into a repeatable workflow.",
      settings: {
        Buses: "SC Kick, SC Vocal, SC Snare",
        "Pre-Fader": "Independent trigger",
        "Post-Fader": "Follows source level"
      },
      proTip:
        "Save a Logic template with common sidechain trigger buses but no active processing, so you start organized without committing to moves.",
      avoidThis:
        "Do not leave unnamed buses feeding hidden processors. Sidechain confusion is a real mix recall problem.",
      checkYourWork:
        "A collaborator can open the mixer and understand which buses are triggers and which are audible returns.",
      stepScreenshot: "/assets/training/sidechaining/18-routing-template.png"
    },
    {
      number: 19,
      title: "Troubleshoot Clicks, Pumping, and Missing Impact",
      concept:
        "Most sidechain problems come from timing, detector choice, or asking one move to solve too much.",
      actions: [
        "If the target clicks, slow the attack or release and check plugin lookahead if available.",
        "If the target pumps too obviously, reduce gain reduction or filter the detector.",
        "If nothing happens, confirm the sidechain input, trigger level, threshold, and plugin placement."
      ],
      body:
        "Sidechains fail in predictable ways. Clicking usually means the gain is moving too abruptly, especially on bass and sub material. Slow attack or release, use lookahead if the processor offers it, or reduce the amount of gain reduction. Over-pumping usually means release timing is wrong, threshold is too low, or the detector is reacting to energy that should not control the move. Use the sidechain Listen function and filters. Missing impact can mean the sidechain is patched correctly but the target has makeup gain, parallel paths, or another bus that bypasses the processor. Check routing by muting the target, trigger, and return paths one at a time. Also watch for phase and timing when sidechaining layered drums or parallel bass. A sidechain should solve one clear problem. If you are trying to fix balance, tone, arrangement, and groove at once, split the problem into smaller moves.",
      symbolName: "wrench.and.screwdriver.fill",
      visualTitle: "Sidechain Debugging",
      visualCaption: "Clicks, pumping, and no-response issues usually trace back to timing or routing.",
      settings: {
        Clicks: "Slow timing or reduce depth",
        Pumping: "Release/filter/threshold",
        "No Response": "Check input and placement"
      },
      proTip:
        "Temporarily exaggerate threshold and ratio while debugging. Once you hear the route working, back settings down to the musical amount.",
      avoidThis:
        "Do not keep adding processors before proving the first sidechain is patched and timed correctly.",
      checkYourWork:
        "You can deliberately make the sidechain obvious, then reduce it to the intended musical amount without losing the effect.",
      stepScreenshot: "/assets/training/sidechaining/19-troubleshooting.png"
    },
    {
      number: 20,
      title: "Verify, Print, and Document the Move",
      concept:
        "A sidechain is finished only when it improves the mix at matched loudness and can be recalled later.",
      actions: [
        "Bypass the sidechain at matched loudness and confirm the mix loses clarity or movement.",
        "Check low-volume playback, mono playback, and the loudest song section.",
        "Print or bounce critical sidechain returns when delivery, collaboration, or CPU stability requires it."
      ],
      body:
        "Sidechaining can feel impressive because meters move. Final verification must be musical. Level-match before and after, then ask whether the song is clearer, groovier, bigger, or more controlled. Check the loudest section because sidechains that work in a verse may overreact in a chorus. Check low volume because over-ducking becomes obvious when the mix is quiet. Check mono because low-end and ambience moves can change translation. If the sidechain uses third-party dynamic EQ, tempo-synced effects, or complex routing, consider printing the return or target to audio before final delivery. Printing does not mean abandoning flexibility; save a muted source track or project alternative so you can revise later. Add short notes in track names or comments: trigger, target, purpose, and approximate depth. A finished sidechain should be repeatable, understandable, and boringly reliable when you reopen the session.",
      symbolName: "checkmark.seal.fill",
      visualTitle: "Final Sidechain Pass",
      visualCaption: "Verification turns clever routing into dependable mix improvement.",
      settings: {
        "A/B": "Matched loudness",
        Checks: "Low volume, mono, loudest section",
        Notes: "Trigger, target, purpose, depth"
      },
      proTip:
        "Print only after the arrangement and main balances are stable. Early printing can make simple changes harder than necessary.",
      avoidThis:
        "Do not approve a sidechain because it looks active on a meter. Approve it because bypass makes the music worse.",
      checkYourWork:
        "The sidechain improves the song in context, survives translation checks, and is documented clearly enough to recall.",
      stepScreenshot: "/assets/training/sidechaining/20-final-verification.png"
    }
  ]
};
