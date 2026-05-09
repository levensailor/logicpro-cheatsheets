import type { TrainingLesson } from "@/lib/sheet-schema";

export const midiDeepDiveLesson: TrainingLesson = {
  id: "midi-deep-dive",
  title: "Deep Dive on MIDI",
  series: "Logic Pro Core Skills Series",
  summary:
    "A complete beginner-to-expert MIDI lesson for Logic Pro users, covering the protocol, musical editing, controllers, control surfaces, Mackie MCU workflows, remapping, troubleshooting, and expert studio habits.",
  duration: "45 min read",
  symbolName: "pianokeys",
  badges: ["New", "MIDI", "Logic Pro", "Control Surfaces"],
  isFeatured: true,
  checklist: [
    "Explain MIDI as performance instructions, not audio.",
    "Record and edit a clean software instrument performance in Logic Pro.",
    "Use channels, velocity, CC, pitch bend, aftertouch, and program changes deliberately.",
    "Choose a controller based on keys, pads, knobs, faders, transport needs, and expressive control.",
    "Set up a USB, DIN, Bluetooth, or network MIDI path without creating loops.",
    "Use quantize, groove, humanize, transform, and MIDI FX without flattening the performance.",
    "Map Smart Controls and controller assignments for musical hands-on control.",
    "Connect a Mackie MCU-compatible control surface and understand what the standard controls.",
    "Remap Logic Pro key commands and MIDI controller assignments safely.",
    "Troubleshoot missing input, stuck notes, wrong sounds, latency, and controller conflicts."
  ],
  steps: [
    {
      number: 1,
      title: "Understand What MIDI Actually Is",
      concept:
        "MIDI is a language for musical instructions. It describes what happened in a performance, while audio is the recorded sound wave that resulted from a performance.",
      actions: [
        "Think of MIDI as notes, gestures, timing, and control data.",
        "Think of software instruments as the sound engines that respond to those instructions.",
        "Separate MIDI editing decisions from audio mixing decisions in your workflow."
      ],
      body: `MIDI stands for Musical Instrument Digital Interface. It was created so electronic instruments, computers, sequencers, drum machines, and control devices could communicate with one another. A MIDI region in Logic Pro does not contain the sound of a piano, synth, string section, or drum kit. It contains instructions such as note C3 started here, velocity was 92, the sustain pedal went down, modulation increased, and the note ended here.

That distinction matters because it explains why MIDI is so flexible. You can record a piano part, change the instrument to a synthesizer, transpose the notes, shorten the timing, adjust the velocity, or route the same performance to an external hardware module. None of those edits require rerecording audio. The actual sound is generated later by a software instrument, sampler, drum machine, external synth, or sound module. Beginners should treat MIDI as editable performance data. Experts should treat it as a precise automation and control layer that can drive sound design, arrangement, mixing, live performance, and hardware integration.`,
      symbolName: "music.note.list",
      visualTitle: "MIDI vs Audio",
      visualCaption: "Instructions trigger sound; audio records sound.",
      settings: {
        "MIDI Region": "Performance instructions",
        "Audio Region": "Recorded waveform",
        "Sound Source": "Software or hardware instrument"
      },
      proTip:
        "When a MIDI region plays the wrong tone, inspect the instrument first. When it plays the wrong rhythm, pitch, or expression, inspect the MIDI data.",
      avoidThis:
        "Do not describe MIDI as a sound file. That mistake leads to confusion when exporting, bouncing, or sharing sessions.",
      checkYourWork:
        "You can explain why changing a software instrument patch can transform a MIDI region without changing the notes inside that region.",
      stepScreenshot: null
    },
    {
      number: 2,
      title: "Follow the MIDI Signal Path",
      concept:
        "A reliable MIDI setup starts by knowing the path from gesture to controller, from controller to Logic, and from Logic to an instrument or control target.",
      actions: [
        "Trace the source device, connection type, Logic input, track destination, and sound generator.",
        "Confirm that Logic sees incoming data before blaming an instrument patch.",
        "Keep one intentional path from controller to destination when troubleshooting."
      ],
      body: `Every MIDI event has a source, a route, and a destination. The source might be a keyboard, pad controller, expression pedal, drum trigger, iPad app, control surface, or external sequencer. The route might be USB, 5-pin DIN through an interface, Bluetooth MIDI, a network session, or an internal virtual port. The destination might be a selected software instrument track, an external MIDI track, a Smart Control assignment, a transport command, or a hardware synthesizer.

Logic Pro sits in the middle of many of these paths. It can record MIDI into a region, echo it through to a selected instrument, transform it through MIDI FX, route it out to external hardware, or interpret it as a control surface command. When something fails, beginners often jump straight to reinstalling drivers or changing random settings. A better method is to trace one hop at a time: does macOS see the device, does Logic receive input, is the correct track selected or record-enabled, is the channel strip loaded with a sound, and is the output routed where you expect?`,
      symbolName: "arrow.triangle.branch",
      visualTitle: "Signal Flow",
      visualCaption: "Gesture to port to Logic to destination.",
      settings: {
        "Input Check": "Logic control bar MIDI activity",
        "Track Check": "Selected or record-enabled software instrument",
        "Output Check": "Instrument, external port, or assignment"
      },
      proTip:
        "When diagnosing a complex rig, temporarily disconnect everything except one controller and one instrument track. Add devices back only after the simple path works.",
      avoidThis:
        "Avoid running the same device through multiple virtual ports unless you intentionally need parallel routing.",
      checkYourWork:
        "You can identify the MIDI source, connection, Logic destination, and final sound generator for a track in your project.",
      stepScreenshot: null
    },
    {
      number: 3,
      title: "Master Note, Velocity, and Length",
      concept:
        "The most common MIDI data is note information: pitch, start time, note length, and velocity. These values create the musical foundation of a performance.",
      actions: [
        "Record a short part and open it in the Piano Roll.",
        "Inspect each note's pitch, position, length, and velocity.",
        "Edit only the values that solve a musical problem."
      ],
      body: `A MIDI note usually includes a note-on message, a note number, a velocity value, and eventually a note-off message. Logic presents this in musical form: a rectangle in the Piano Roll. Its vertical position is pitch, its horizontal start is timing, its width is duration, and its velocity is shown in the velocity lane or note color depending on your view. A soft note and a hard note may trigger different samples, filter behavior, volume levels, or attack character in the receiving instrument.

This is where MIDI becomes powerful for beginners. You can fix a late bass note, shorten a kick drum that overlaps the next hit, raise the velocity of a ghost note, or transpose an entire chord without rerecording. For experts, these values become a performance design tool. Slight velocity curves, intentional overlaps, varied note lengths, and hand-edited accents can make programmed parts feel played rather than pasted. Logic rewards small edits because every note carries multiple dimensions of expression.`,
      symbolName: "pianokeys",
      visualTitle: "Note Anatomy",
      visualCaption: "Pitch, start, length, and velocity.",
      settings: {
        "Velocity Range": "1-127",
        "Middle C Convention": "Often C3 or C4 depending on setting",
        "Core Editor": "Piano Roll"
      },
      proTip:
        "For drums, velocity often changes timbre as much as loudness. Lower snare ghost notes can sound more realistic than simply lowering the track fader.",
      avoidThis:
        "Do not quantize, lengthen, and velocity-normalize every note by default. Perfectly uniform MIDI often sounds less musical.",
      checkYourWork:
        "You can select one MIDI note in Logic and describe its pitch, timing, duration, and velocity.",
      stepScreenshot: null
    },
    {
      number: 4,
      title: "Use MIDI Channels Intentionally",
      concept:
        "MIDI channels let one connection carry multiple independent streams of musical instructions. They are essential for multi-timbral instruments and hardware rigs.",
      actions: [
        "Learn whether your destination listens to all channels or one specific channel.",
        "Use separate channels for different parts in a multi-timbral instrument.",
        "Match external synth receive channels with Logic's outgoing channel settings."
      ],
      body: `Classic MIDI has 16 channels per port. A channel is not an audio channel and it is not the same as a Logic track. It is a label inside the MIDI message that tells receiving devices which stream of data should respond. A hardware module might play piano on channel 1, bass on channel 2, strings on channel 3, and drums on channel 10. A multi-timbral software instrument can behave the same way, with different parts assigned to different channels inside one plugin.

Beginners can usually start with the default setting, where a selected software instrument responds to incoming MIDI without worrying about channels. The concept becomes important when one keyboard controls multiple sound sources, when a drum pad sends each pad on a different channel, when an external synth ignores Logic because it is listening on another channel, or when an orchestral template uses one instrument instance with many articulations and parts. Channels keep complex rigs organized, but mismatched channel settings are a common cause of silence.`,
      symbolName: "number.circle",
      visualTitle: "16 Lanes",
      visualCaption: "One port can carry sixteen channels.",
      settings: {
        "MIDI Channels": "1-16 per port",
        "Common Drum Channel": "10 in General MIDI setups",
        "Logic Beginner Mode": "Often listen to all incoming channels"
      },
      proTip:
        "Name external MIDI tracks with both the instrument and channel, such as Juno Pad CH3, so routing remains readable months later.",
      avoidThis:
        "Do not assume track number equals MIDI channel number. They are separate concepts.",
      checkYourWork:
        "You can explain why a synth set to receive channel 2 might ignore notes sent from Logic on channel 1.",
      stepScreenshot: null
    },
    {
      number: 5,
      title: "Shape Performances with Continuous Controllers",
      concept:
        "Continuous Controller messages, often called CC messages, carry changing values for pedals, wheels, knobs, faders, breath, expression, and many instrument parameters.",
      actions: [
        "Open Logic's MIDI Draw or automation-style lanes for controller data.",
        "Identify common CCs such as modulation, volume, pan, expression, and sustain.",
        "Record a knob or pedal move and inspect the resulting data."
      ],
      body: `MIDI Continuous Controllers use controller numbers and values. In MIDI 1.0, most CC values run from 0 to 127. CC1 commonly controls modulation, CC7 volume, CC10 pan, CC11 expression, and CC64 sustain pedal. These assignments are conventions, not magic. Many instruments follow them, but modern plugins may map CCs to custom parameters such as vibrato depth, filter cutoff, bow pressure, microphone blend, rotor speed, or morph position.

Logic Pro can record CC data into a MIDI region, display it in editors, thin overly dense data, and route it to instruments or external devices. Beginners should learn CC64 immediately because sustain pedal data can explain hanging piano notes or muddy chord overlaps. Intermediate users should learn CC1 and CC11 for orchestral expression. Experts can design entire performance systems around CC curves, using knobs, faders, pedals, and MIDI FX to create movement that would be difficult to draw as audio automation later.`,
      symbolName: "slider.horizontal.3",
      visualTitle: "CC Lanes",
      visualCaption: "Knobs, pedals, and faders become data.",
      settings: {
        "CC1": "Modulation",
        "CC7": "Volume",
        "CC11": "Expression",
        "CC64": "Sustain pedal"
      },
      proTip:
        "Use CC11 for musical expression inside a part and reserve the channel strip fader for mix balance.",
      avoidThis:
        "Avoid recording frantic knob moves before assigning the control clearly. Unwanted dense CC data can make a part hard to edit.",
      checkYourWork:
        "You can locate recorded sustain or modulation data inside a MIDI region and edit it deliberately.",
      stepScreenshot: null
    },
    {
      number: 6,
      title: "Know Program Changes and Bank Select",
      concept:
        "Program Change messages tell compatible instruments to switch patches. Bank Select messages extend the available patch range.",
      actions: [
        "Use program changes mainly with hardware, General MIDI devices, or live rigs that need patch switching.",
        "Confirm whether a plugin responds to program changes before relying on them.",
        "Document patch numbers because device numbering can start at 0 or 1."
      ],
      body: `Program Change is one of the original MIDI message types. It tells a receiving device to load a different program, patch, preset, or sound. Because a basic program change only selects 128 possible programs, Bank Select messages are often used first to choose a larger bank, followed by a program change that chooses a patch inside that bank. Hardware workstations, rack modules, guitar processors, and live performance rigs still make heavy use of this behavior.

In Logic Pro, program changes are useful when driving external MIDI devices or building a live playback session that changes sounds automatically. They are less universal with modern software instruments because many plugins use their own preset systems and may not respond predictably. If you need reliable software-instrument sound changes in Logic, track alternatives, channel strip settings, patches, or separate tracks are often safer. Program changes remain worth understanding because they are part of the shared language that lets older and newer MIDI equipment coexist.`,
      symbolName: "square.grid.2x2",
      visualTitle: "Patch Select",
      visualCaption: "Bank first, program second.",
      settings: {
        "Program Range": "0-127 or 1-128 depending on device",
        "Bank Select": "Usually CC0 and CC32",
        "Best Use": "External gear and live patch changes"
      },
      proTip:
        "When programming a hardware set, test patch changes from the beginning of the previous song section so the device has time to switch cleanly.",
      avoidThis:
        "Do not assume a plugin preset browser is controlled by MIDI program change unless the manual confirms it.",
      checkYourWork:
        "You can describe how Bank Select and Program Change work together to call up a specific hardware sound.",
      stepScreenshot: null
    },
    {
      number: 7,
      title: "Add Pitch Bend and Aftertouch",
      concept:
        "Pitch bend and aftertouch are performance messages that add expression beyond fixed note and velocity values.",
      actions: [
        "Record a pitch wheel move and inspect the bend lane.",
        "Check whether your controller sends channel aftertouch, polyphonic aftertouch, or neither.",
        "Match pitch bend range between the controller performance and the receiving instrument."
      ],
      body: `Pitch bend is a dedicated MIDI message rather than a normal CC. It usually has higher resolution than a 7-bit controller and is centered when no bend is applied. The receiving instrument decides how far the pitch moves at maximum bend, often two semitones by default. If Logic records a dramatic bend but the instrument is set to a tiny range, the result will be subtle. If the instrument is set to twelve semitones and the performance expected two, the result can sound wildly out of tune.

Aftertouch is pressure applied after the initial note strike. Channel aftertouch sends one pressure value for the whole channel, while polyphonic aftertouch can send independent pressure per note. Many affordable controllers do not include aftertouch, but expressive controllers, premium keyboards, and some pad controllers do. In Logic, aftertouch can control vibrato, brightness, volume, effects, or any assignable parameter. These gestures can make a synth lead, string patch, or pad feel alive without drawing automation by hand.`,
      symbolName: "waveform.path.ecg",
      visualTitle: "Expression Data",
      visualCaption: "Bend and pressure animate notes.",
      settings: {
        "Pitch Bend": "Dedicated high-resolution message",
        "Channel Aftertouch": "One pressure value for the channel",
        "Poly Aftertouch": "Independent pressure per note"
      },
      proTip:
        "Set pitch bend range as part of the patch design. A guitar-style bend, synth dive, and orchestral scoop need different ranges.",
      avoidThis:
        "Avoid editing pitch bend as if it were note pitch. It is a continuous curve that depends on the instrument's bend range.",
      checkYourWork:
        "You can record a bend, find its data, and verify that the instrument's bend range matches the musical goal.",
      stepScreenshot: null
    },
    {
      number: 8,
      title: "Understand MIDI Timing, Clock, and Sync",
      concept:
        "MIDI can carry timing information so devices can start together, follow tempo, or chase a timeline.",
      actions: [
        "Distinguish note timing from clock synchronization.",
        "Use MIDI Clock for tempo-based devices such as arpeggiators and drum machines.",
        "Use timecode-style sync only when a device needs timeline position."
      ],
      body: `MIDI timing can mean several things. A MIDI note has a timestamp inside Logic's sequencer grid. MIDI Clock is a stream of timing pulses that lets compatible devices follow tempo. Start, stop, and continue messages tell devices when transport begins or resumes. MIDI Time Code, often called MTC, carries timeline position information so devices can chase a specific location. MIDI Machine Control, or MMC, can send transport commands to machines that support it.

For most Logic Pro music production, you will care about whether an external arpeggiator, drum machine, sequencer, delay, or looper follows Logic's tempo. That is a MIDI Clock problem. If you are syncing video, tape, another DAW, or hardware that must locate to exact time positions, you may encounter timecode. The expert habit is to choose one master clock, keep the sync topology simple, and avoid circular sync where two devices both try to lead. Timing problems often sound like flamming notes, drifting arpeggios, or devices starting one beat late.`,
      symbolName: "clock",
      visualTitle: "Tempo Sync",
      visualCaption: "Clock follows tempo; timecode follows position.",
      settings: {
        "MIDI Clock": "Tempo pulse",
        "MTC": "Timeline position",
        "MMC": "Transport control"
      },
      proTip:
        "If an external drum machine feels late but stable, adjust delay compensation or recording delay. If it drifts over time, inspect sync and clocking.",
      avoidThis:
        "Do not make every device a sync master. One clear clock source is easier to troubleshoot.",
      checkYourWork:
        "You can explain whether a problem requires tempo clock, timeline position, or simple note timing edits.",
      stepScreenshot: null
    },
    {
      number: 9,
      title: "Compare MIDI 1.0 and MIDI 2.0",
      concept:
        "MIDI 1.0 remains the everyday standard, while MIDI 2.0 expands resolution, bidirectional discovery, profiles, and expressive control.",
      actions: [
        "Expect most studio devices and Logic workflows to remain MIDI 1.0 compatible.",
        "Look for MIDI 2.0 support when buying future-facing controllers and interfaces.",
        "Treat MIDI 2.0 as an expansion, not a reason to ignore MIDI 1.0 fundamentals."
      ],
      body: `MIDI 1.0 is remarkably durable. Its note, controller, clock, program, pitch bend, and channel model still powers most production workflows. Its limits are also familiar: 7-bit CC values can feel coarse, device setup often depends on manuals, and expressive per-note control requires extensions or specialized messages. MIDI 2.0 improves the ecosystem with higher-resolution messages, property exchange, profiles, better bidirectional communication, and more consistent discovery between devices.

For Logic Pro users, the practical lesson is not to wait for MIDI 2.0 before learning MIDI deeply. Your keyboard, pad controller, MCU surface, drum machine, synth module, and plugins will likely use MIDI 1.0 concepts for years. At the same time, buyers should understand why newer expressive controllers advertise MIDI 2.0, MPE, high-resolution velocity, and per-note control. The standards are connected. MIDI 2.0 modernizes the language, but the musical ideas of notes, controllers, timing, routing, and mapping remain central.`,
      symbolName: "arrow.up.forward.circle",
      visualTitle: "Standards Timeline",
      visualCaption: "MIDI 2.0 extends the classic language.",
      settings: {
        "MIDI 1.0": "Common studio baseline",
        "MIDI 2.0": "Higher resolution and discovery",
        "Compatibility": "Designed to coexist"
      },
      proTip:
        "Buy for the workflow you need now, but prefer devices from manufacturers that publish clear MIDI implementation charts and firmware updates.",
      avoidThis:
        "Do not assume a device is obsolete because it uses MIDI 1.0. Many professional rigs still depend on it.",
      checkYourWork:
        "You can name two practical limitations of MIDI 1.0 and two improvements MIDI 2.0 is designed to bring.",
      stepScreenshot: null
    },
    {
      number: 10,
      title: "Choose the Right Connection Type",
      concept:
        "USB, 5-pin DIN, Bluetooth, network MIDI, and virtual ports all move MIDI data, but they differ in convenience, latency, reliability, and routing complexity.",
      actions: [
        "Use USB for most modern controllers connected directly to a Mac.",
        "Use DIN through a MIDI interface for vintage synths and hardware modules.",
        "Use Bluetooth or network MIDI only when the convenience outweighs possible latency or setup complexity."
      ],
      body: `The two most common MIDI connections are USB and 5-pin DIN. USB can carry MIDI between a controller and a computer without a separate MIDI interface, and many devices are class compliant on macOS. DIN MIDI is the classic round connector found on older keyboards, synths, drum machines, and interfaces. DIN separates MIDI from USB driver concerns, but it usually requires an interface and only carries one direction per cable unless you connect both In and Out.

Bluetooth MIDI is useful for small controllers, iPads, and cable-free writing setups, but wireless latency and pairing state can become frustrating in serious recording sessions. Network MIDI can connect computers or devices over a local network, which is powerful for multi-computer rigs, but it adds another layer to troubleshoot. Virtual ports created by software can route MIDI internally between apps. In Logic, the best connection is the one that is stable, low latency, clearly named, and easy to reproduce when you reopen the studio tomorrow.`,
      symbolName: "cable.connector",
      visualTitle: "Connection Map",
      visualCaption: "USB, DIN, wireless, network, virtual.",
      settings: {
        "USB": "Modern controller default",
        "DIN": "Classic hardware connection",
        "Bluetooth": "Convenient, check latency",
        "Network": "Advanced multi-device routing"
      },
      proTip:
        "Use powered USB hubs cautiously. If a controller disconnects randomly, test it directly on the Mac before changing Logic settings.",
      avoidThis:
        "Do not connect both USB MIDI and DIN MIDI from the same device unless you know how to prevent duplicate notes.",
      checkYourWork:
        "You can explain why a vintage synth may need two DIN cables while a modern keyboard may need only one USB cable.",
      stepScreenshot: null
    },
    {
      number: 11,
      title: "Survey Controllers on the Market",
      concept:
        "MIDI controllers are specialized surfaces for playing, programming, mixing, launching, conducting, and shaping sound.",
      actions: [
        "Group controllers by job: keyboard, pad, fader, control surface, expressive, guitar, wind, foot, or mobile.",
        "Evaluate build quality, key feel, pads, encoders, faders, transport controls, displays, and integration.",
        "Check whether the controller supports class-compliant MIDI, custom maps, and Logic-friendly modes."
      ],
      body: `The MIDI controller market is broad. Compact keyboards such as Akai MPK Mini, Arturia MiniLab, Novation Launchkey Mini, and Native Instruments Komplete Kontrol M32 are popular for laptop writing. Larger keyboard controllers from Arturia, Novation, Native Instruments, M-Audio, Nektar, and Studiologic add better keybeds, more controls, aftertouch on some models, and deeper DAW integration. Pad controllers such as Ableton Push, Akai MPD and MPC devices, Novation Launchpad, and Maschine-style controllers focus on drums, clips, scenes, and finger performance.

There are also fader surfaces, foot controllers, breath controllers, wind controllers, guitar MIDI systems, MPE devices such as ROLI Seaboard and LinnStrument, grid controllers, and dedicated control surfaces. Beginners should not buy the largest controller first. They should buy the control surface that removes the most friction from the way they actually write. Experts should think in zones: one keyboard for performance, one surface for transport and faders, one expressive device for special parts, and a template that makes every control predictable.`,
      symbolName: "keyboard",
      visualTitle: "Controller Families",
      visualCaption: "Keys, pads, faders, expressive surfaces.",
      settings: {
        "Beginner Focus": "Keys, pads, transport, simple knobs",
        "Producer Focus": "Pads, encoders, scale/chord tools",
        "Mix Focus": "Motorized faders and MCU support",
        "Expression Focus": "Aftertouch, MPE, pedals"
      },
      proTip:
        "If you play piano parts, keybed feel matters more than the number of knobs. If you program drums, pad feel and velocity response matter more.",
      avoidThis:
        "Avoid buying a controller for bundled software alone. Integration, feel, and reliability are what you will use every day.",
      checkYourWork:
        "You can name the controller category that best serves your next Logic Pro bottleneck.",
      stepScreenshot: null
    },
    {
      number: 12,
      title: "Choose a Controller for Logic Pro",
      concept:
        "The best Logic controller is not the most expensive device; it is the one whose physical controls match your Logic workflow.",
      actions: [
        "List your top three tasks: playing instruments, programming drums, controlling plugins, mixing, or live performance.",
        "Prioritize native Logic support, clear documentation, and flexible MIDI mapping.",
        "Confirm macOS compatibility and driver requirements before buying."
      ],
      body: `Logic Pro works well with many controllers, but different devices solve different problems. A singer-songwriter may need 49 or 61 playable keys, a sustain pedal input, transport buttons, and a few knobs for Smart Controls. A beatmaker may prefer responsive pads, note repeat, scale modes, and tight drum programming. A mix-focused user may want motorized faders, scribble strips, pan encoders, transport, automation modes, and Mackie Control compatibility. A composer may care about multiple expression pedals, modulation, expression faders, articulation switching, and template navigation.

Integration levels vary. Some controllers use Logic Pro control surface scripts or vendor software. Some use Mackie Control Universal emulation. Some are generic MIDI devices that you map yourself. None of these is automatically wrong. Generic mapping can be very powerful, but it requires documentation and maintenance. A tightly integrated controller can feel magical, but only if the integration supports the parts of Logic you use. Read the MIDI implementation chart and look for real Logic Pro setup instructions before purchase.`,
      symbolName: "checklist",
      visualTitle: "Buying Matrix",
      visualCaption: "Match controls to daily tasks.",
      settings: {
        "Keys": "Mini, 25, 49, 61, 88",
        "Pads": "Velocity and aftertouch if needed",
        "Faders": "Motorized for serious mix recall",
        "Pedals": "Sustain plus expression when possible"
      },
      proTip:
        "A small controller you understand completely is often more productive than a flagship surface you never map.",
      avoidThis:
        "Do not assume every knob will automatically control the plugin you are looking at. Confirm the integration mode.",
      checkYourWork:
        "You can justify a controller choice by naming the Logic tasks it speeds up and the controls required for those tasks.",
      stepScreenshot: null
    },
    {
      number: 13,
      title: "Create a Software Instrument Track",
      concept:
        "In Logic Pro, most MIDI music starts on a software instrument track that receives MIDI and turns it into sound through a plugin.",
      actions: [
        "Create a new Software Instrument track.",
        "Load a stock instrument such as Sampler, Alchemy, Drum Machine Designer, or Studio Piano.",
        "Record-enable the track and confirm that your controller triggers sound."
      ],
      body: `A software instrument track combines MIDI input, a software instrument plugin, MIDI FX slots, audio inserts, sends, and output routing. The MIDI region on the track contains performance instructions. The instrument slot interprets those instructions and generates audio. After that point, the signal behaves like audio and can pass through EQ, compression, saturation, reverb sends, and the stereo output like any other channel strip.

This track type is central to Logic Pro. It is how you play Alchemy pads, Sampler instruments, drum kits, Studio Strings, Studio Horns, Retro Synth, Sculpture, third-party synths, orchestral libraries, and many drum instruments. Beginners should create a simple test track whenever MIDI seems broken because it separates controller input from complex template routing. Experts use software instrument tracks as modular performance systems: MIDI FX before the instrument, expressive CC data in the region, Smart Controls for macro control, and audio processing after sound generation.`,
      symbolName: "plus.square.on.square",
      visualTitle: "Instrument Track",
      visualCaption: "MIDI in, sound out.",
      settings: {
        "Track Type": "Software Instrument",
        "Input": "MIDI controller or all MIDI inputs",
        "Instrument Slot": "Sound generator",
        "Audio Output": "Stereo Out or bus"
      },
      proTip:
        "Save favorite instrument channel strips as patches so MIDI FX, instrument, inserts, sends, and Smart Controls recall together.",
      avoidThis:
        "Do not put MIDI regions on an audio track and expect them to play. MIDI needs an instrument destination.",
      checkYourWork:
        "You can create a blank software instrument track, load a sound, and play it from your controller.",
      stepScreenshot: null
    },
    {
      number: 14,
      title: "Record MIDI Performances Cleanly",
      concept:
        "Good MIDI recording is about capturing musical intent while leaving enough flexibility to edit timing, dynamics, and sound later.",
      actions: [
        "Set a comfortable buffer size before recording.",
        "Use count-in, metronome, cycle mode, and replace/merge options intentionally.",
        "Record with enough velocity range so the part has life."
      ],
      body: `Recording MIDI in Logic feels simple: select or record-enable the instrument track, press record, and play. The deeper craft is choosing the right recording behavior. Cycle recording can create takes or merge performances depending on settings. Merge is useful when building drum parts one element at a time. Replace is safer when correcting a phrase. Capture Recording can recover a performance you played while not formally recording, which is one of Logic's most useful MIDI safety nets.

Latency matters during MIDI recording because the musician reacts to what they hear. A low audio buffer helps software instruments feel immediate, but very heavy sessions may need freezing, low-latency mode, or a lighter tracking patch. Quantization can be applied after recording or as a region parameter, but beginners should first listen to the raw take. Sometimes the human timing is the feel. Sometimes only the downbeats need help. MIDI gives you the option to correct without erasing the personality of the performance.`,
      symbolName: "record.circle",
      visualTitle: "Clean Capture",
      visualCaption: "Record intent before editing detail.",
      settings: {
        "Tracking Buffer": "64-128 samples when possible",
        "Cycle Recording": "Merge for layered drums, takes for phrases",
        "Safety Feature": "Capture Recording"
      },
      proTip:
        "Record a performance pass before opening the editor. Editing too early can interrupt musical momentum.",
      avoidThis:
        "Avoid recording through a CPU-heavy mastering chain if it makes the instrument feel late.",
      checkYourWork:
        "You can record a MIDI phrase, play it back through a software instrument, and decide what needs editing before quantizing.",
      stepScreenshot: null
    },
    {
      number: 15,
      title: "Quantize Without Killing Feel",
      concept:
        "Quantization moves notes toward a timing grid. Used well, it tightens a performance; used carelessly, it removes groove.",
      actions: [
        "Choose the smallest grid that matches the musical part.",
        "Use strength, swing, and Q-range before forcing 100 percent quantize.",
        "Listen in context with drums, bass, and lead parts."
      ],
      body: `Logic's quantize tools can correct timing quickly. A sixteenth-note grid can tighten hi-hats, an eighth-note grid may suit a bass line, and a bar or beat grid can align section hits. The danger is using the wrong grid or full strength on a part that relies on push and pull. A laid-back bass, human piano part, shuffled percussion loop, or expressive string line may become smaller when every note snaps perfectly to the grid.

Quantize strength lets notes move partway toward the grid instead of all the way. Swing changes the placement of offbeats. Q-range can affect only notes that are close enough to a grid point, leaving intentional late or early notes alone. Groove quantize can borrow timing from another region. Experts use quantize as a conversation between the grid and the performance. The goal is not mathematical perfection. The goal is musical agreement between parts that must lock and parts that should breathe.`,
      symbolName: "metronome",
      visualTitle: "Grid With Feel",
      visualCaption: "Tighten, swing, or preserve timing.",
      settings: {
        "Strength": "Try 50-80 percent first",
        "Swing": "Use for shuffled or loping parts",
        "Groove": "Borrow timing from a reference part"
      },
      proTip:
        "Quantize kick and snare more firmly than ghost notes, fills, and melodic ornamentation.",
      avoidThis:
        "Do not quantize a whole region to sixteenth notes just because sixteenth notes exist somewhere in the part.",
      checkYourWork:
        "You can compare raw, partially quantized, and fully quantized versions and choose the most musical one.",
      stepScreenshot: null
    },
    {
      number: 16,
      title: "Edit in the Piano Roll",
      concept:
        "The Piano Roll is Logic's detailed MIDI editor for pitch, timing, note length, velocity, and controller refinement.",
      actions: [
        "Use pointer, pencil, brush, velocity, and marquee-style edits where appropriate.",
        "Edit notes in musical groups instead of obsessing over isolated rectangles.",
        "Use lanes to inspect velocity and controller data below the notes."
      ],
      body: `The Piano Roll shows MIDI notes against a keyboard and timeline. It is where many Logic users spend the most time editing MIDI. You can drag notes to new pitches, trim lengths, copy phrases, mute notes, split chords, paint repeated notes, adjust velocities, and line up articulations. The editor can be as simple or as advanced as you need. Beginners should learn zooming, selection, velocity editing, and quantize commands. Experts should learn transform operations, MIDI draw, scale quantize, articulation workflows, and key commands for fast navigation.

A good Piano Roll edit serves the musical phrase. If a chord feels late, select the chord and move it as one gesture. If a drum fill feels robotic, vary velocities and timing across the fill. If a bass note overlaps the next harmony, shorten the note length instead of changing the sound. Piano Roll editing can repair a performance, but it can also compose parts that would be difficult to play live.`,
      symbolName: "square.and.pencil",
      visualTitle: "Piano Roll",
      visualCaption: "Detailed note and controller editing.",
      settings: {
        "Primary Values": "Pitch, position, length, velocity",
        "Useful Lanes": "Velocity, modulation, sustain",
        "Editing Style": "Phrase first, note second"
      },
      proTip:
        "Use color by velocity when editing drums. It reveals accents and weak hits faster than reading numbers.",
      avoidThis:
        "Do not edit by sight alone. A visually perfect grid can still sound stiff or wrong.",
      checkYourWork:
        "You can fix one wrong note, one late note, one long note, and one weak velocity in the Piano Roll.",
      stepScreenshot: null
    },
    {
      number: 17,
      title: "Program with Step Sequencer",
      concept:
        "Step Sequencer turns MIDI creation into pattern programming, making drums, bass lines, gates, and repeated synth figures fast to build.",
      actions: [
        "Create a pattern region on a software instrument or drum instrument track.",
        "Use rows for sounds or pitches and columns for rhythmic steps.",
        "Automate row parameters such as velocity, gate, probability, and repeats."
      ],
      body: `Logic's Step Sequencer is a modern pattern tool built on MIDI ideas. Each active step creates a note or event. Rows can represent drum kit pieces, pitches, or pattern lanes. You can set velocity, gate length, tie, note repeat, chance, start offset, and other parameters depending on the row. This makes it excellent for drum grooves, hi-hat movement, bass ostinatos, electronic sequences, and rhythmic sound design.

Beginners often find Step Sequencer less intimidating than recording a perfect drum performance in real time. Experts appreciate that it can create controlled variation through probability, step rates, and row-specific settings. It also encourages thinking like a drum machine or modular sequencer while staying inside Logic's arrangement. The key is to add variation before the loop becomes fatiguing. Change velocities, mute steps, add fills, vary note lengths, and copy pattern regions into song sections with small differences.`,
      symbolName: "square.grid.3x3.fill",
      visualTitle: "Pattern Grid",
      visualCaption: "Steps create notes and variation.",
      settings: {
        "Best For": "Drums, bass, gates, repeated figures",
        "Variation Tools": "Velocity, gate, probability, repeats",
        "Region Type": "Pattern region"
      },
      proTip:
        "Use probability on a few percussion steps instead of duplicating four bars of nearly identical MIDI.",
      avoidThis:
        "Avoid leaving every step at the same velocity unless you specifically want a machine-like effect.",
      checkYourWork:
        "You can create a pattern region with at least one velocity change and one probability-based variation.",
      stepScreenshot: null
    },
    {
      number: 18,
      title: "Use MIDI Transform and Humanize",
      concept:
        "Transform tools let you make systematic changes to MIDI data, from humanizing timing to scaling velocity or filtering controller messages.",
      actions: [
        "Use humanize sparingly to add small timing and velocity variation.",
        "Use fixed velocity or velocity scaling when a part is too uneven or too flat.",
        "Use transform operations on selected regions so changes stay intentional."
      ],
      body: `MIDI editing becomes faster when you stop changing every note one by one. Logic's transform-style tools can select or modify notes based on conditions such as pitch, velocity, position, length, or channel. You can humanize timing and velocity, crescendo a passage, limit maximum velocities, delete unwanted controller data, shorten notes, or create more consistent drum hits. These operations are especially valuable for dense parts such as hi-hats, orchestral runs, programmed percussion, and imported MIDI files.

Humanize is not a magic realism button. It introduces variation, but random variation is not the same as musical intention. A real drummer accents patterns. A real pianist voices chords. A real string player shapes phrases. Use humanize to soften mechanical precision, then make musical edits where the phrase needs direction. Experts combine systematic transforms with hand editing: first bring a part into a usable range, then sculpt the important moments manually.`,
      symbolName: "wand.and.stars",
      visualTitle: "Transform Pass",
      visualCaption: "Systematic edits, musical results.",
      settings: {
        "Humanize Timing": "Small values first",
        "Velocity Scaling": "Shape dynamics without redrawing all notes",
        "Filter Data": "Remove unwanted CC or duplicate notes"
      },
      proTip:
        "Duplicate a region before aggressive transforms so you can compare and recover easily.",
      avoidThis:
        "Do not use random timing variation to fix a groove problem that actually needs intentional accents.",
      checkYourWork:
        "You can apply a small humanize pass and explain which values changed and why.",
      stepScreenshot: null
    },
    {
      number: 19,
      title: "Build Articulations and Key Switches",
      concept:
        "Articulations tell sample libraries how notes should be played, such as legato, staccato, pizzicato, mute, slide, or accent.",
      actions: [
        "Identify whether an instrument uses key switches, MIDI channels, CC values, or articulation IDs.",
        "Use Logic articulation sets when available to keep musical notes separate from switching commands.",
        "Place switches early enough for the instrument to react before the target note."
      ],
      body: `Many realistic instruments need more information than pitch and velocity. A violin line might require legato, staccato, spiccato, tremolo, pizzicato, and sustain articulations. A guitar library may need palm mute, slide, hammer-on, pull-off, harmonics, and strums. These changes are often triggered by key switches, which are MIDI notes outside the playable range, or by MIDI channels, program changes, CC values, or proprietary systems.

Logic Pro articulation sets can make this cleaner by letting you select named articulations instead of managing hidden switch notes manually. This keeps the Piano Roll easier to read and helps score-oriented workflows. Beginners can start by learning where a library's key switches are and labeling them. Experts should build reusable articulation sets for major libraries and templates. The goal is to make the MIDI region express performance technique, not just pitch. Good articulation programming is often what separates a convincing MIDI mockup from a keyboard part wearing an orchestral patch.`,
      symbolName: "text.badge.checkmark",
      visualTitle: "Articulation Map",
      visualCaption: "Performance technique encoded as MIDI.",
      settings: {
        "Common Trigger": "Key switches",
        "Cleaner Logic Workflow": "Articulation sets",
        "Timing Rule": "Switch before the note"
      },
      proTip:
        "Color or label key switch notes if you must keep them visible in the Piano Roll.",
      avoidThis:
        "Do not quantize key switches exactly onto the same tick as the note if the instrument needs a moment to switch.",
      checkYourWork:
        "You can change a phrase from sustain to staccato and verify that only the intended notes use the new articulation.",
      stepScreenshot: null
    },
    {
      number: 20,
      title: "Insert MIDI FX Before the Instrument",
      concept:
        "MIDI FX process performance data before it reaches the software instrument, changing notes or controllers rather than audio.",
      actions: [
        "Insert MIDI FX such as Arpeggiator, Chord Trigger, Modifier, Transposer, Randomizer, or Scripter.",
        "Place MIDI FX before the instrument in the channel strip.",
        "Record or bounce the result when you need committed editable notes."
      ],
      body: `Logic's MIDI FX slots sit above the instrument slot. They can generate, transform, filter, or redirect MIDI before sound is created. Arpeggiator turns held notes into rhythmic patterns. Chord Trigger maps simple inputs to full chords. Transposer shifts notes. Modifier can remap controllers. Randomizer can vary velocity, pitch, or other values. Velocity Processor can reshape dynamics. Scripter allows custom JavaScript-based MIDI processing for specialized workflows.

Beginners should use MIDI FX as creative helpers, not as mysteries. Bypass the effect to hear the original part, then enable it to understand what changed. Experts can stack MIDI FX to create performance systems: Chord Trigger into Arpeggiator into Velocity Processor into an instrument, for example. Remember that MIDI FX are live processors. The region may contain simple notes while the output becomes complex. If another collaborator needs the final notes, record the output, bounce in place where appropriate, or document the MIDI FX chain clearly.`,
      symbolName: "fx",
      visualTitle: "Pre-Instrument FX",
      visualCaption: "Transform MIDI before sound exists.",
      settings: {
        "Slot Location": "Above instrument plugin",
        "Creative Tools": "Arpeggiator, Chord Trigger, Randomizer",
        "Advanced Tool": "Scripter"
      },
      proTip:
        "Use MIDI FX presets as starting points, then adjust rate, range, velocity, and note order to fit the song.",
      avoidThis:
        "Do not confuse MIDI FX with audio plugins. MIDI FX cannot EQ or compress audio because audio has not been generated yet.",
      checkYourWork:
        "You can bypass a MIDI FX plugin and explain how the instrument's input changes.",
      stepScreenshot: null
    },
    {
      number: 21,
      title: "Generate Sound from MIDI Instruments",
      concept:
        "MIDI becomes audible only when an instrument converts it into audio. Logic gives you many sound-generation choices.",
      actions: [
        "Try one MIDI region through several instruments to hear how the same data creates different sounds.",
        "Use Sampler or Quick Sampler for sample playback.",
        "Use synths such as Alchemy or Retro Synth when the MIDI part should shape tone over time."
      ],
      body: `A MIDI region can trigger almost any kind of sound source. Logic's Studio Piano can turn the same notes into a piano part. Alchemy can turn them into a cinematic pad, granular texture, bass, pluck, or evolving synth. Drum Machine Designer can map notes to kit pieces. Sampler can play multisampled instruments. Quick Sampler can turn a single audio file into a playable instrument. Third-party plugins can add orchestral libraries, drum instruments, analog synth emulations, pianos, organs, choirs, and experimental engines.

This is why MIDI is central to modern production. You can write harmony without committing to a sound, audition arrangement roles quickly, and later refine the instrument choice. But sound choice also affects how the MIDI should be edited. A piano part may need realistic sustain and velocity. A synth bass may need precise note lengths to control envelope movement. A string patch may need CC expression and articulations. The same notes are not always the same performance once the destination changes.`,
      symbolName: "speaker.wave.2",
      visualTitle: "Sound Engine",
      visualCaption: "One region, many possible instruments.",
      settings: {
        "Stock Examples": "Alchemy, Sampler, Drum Machine Designer",
        "Sample Workflow": "Quick Sampler",
        "Mix Stage": "Audio processing after the instrument"
      },
      proTip:
        "After changing instruments, recheck note lengths and velocity. A part that worked on piano may smear on a pad or choke on a pluck.",
      avoidThis:
        "Do not judge a MIDI performance only through a placeholder sound if the final instrument responds very differently.",
      checkYourWork:
        "You can play one MIDI region through two different instruments and describe how the editing needs changed.",
      stepScreenshot: null
    },
    {
      number: 22,
      title: "Control External Synths and Drum Machines",
      concept:
        "Logic can send MIDI out to hardware instruments, letting external synths and drum machines perform alongside software instruments.",
      actions: [
        "Connect MIDI Out from your interface to MIDI In on the hardware device.",
        "Create an External MIDI track or external instrument workflow in Logic.",
        "Return the hardware audio into your interface if you want to hear, record, or mix it."
      ],
      body: `External MIDI is where the original promise of the protocol still feels alive. Logic can send notes, clock, CC, program changes, and transport-related messages to a hardware synthesizer, drum machine, sampler, guitar processor, or effects unit. The hardware generates audio, so you must also connect its audio outputs to your interface, mixer, or monitoring path. MIDI controls the performance. Audio carries the sound back.

The most common beginner mistake is connecting MIDI correctly but forgetting the audio return. Another common mistake is expecting a one-cable DIN connection to send data both directions. MIDI Out from the interface goes to MIDI In on the device. If the device needs to send notes, knob moves, or patch data back, connect its MIDI Out to the interface MIDI In as well. Experts should document external device channels, clock needs, patch numbers, audio input channels, and latency offsets in a template. Hardware is rewarding, but only when routing is explicit.`,
      symbolName: "rectangle.connected.to.line.below",
      visualTitle: "Hardware Loop",
      visualCaption: "MIDI out, audio back.",
      settings: {
        "MIDI Direction": "Interface Out to device In",
        "Audio Return": "Device audio out to interface input",
        "Common Need": "Clock for drum machines and sequencers"
      },
      proTip:
        "Print important hardware parts to audio before archiving a project. Future recall depends on the same device, patch, cables, and settings.",
      avoidThis:
        "Do not troubleshoot silence in MIDI settings until you confirm the hardware audio return is connected and monitored.",
      checkYourWork:
        "You can trigger an external synth from Logic and record its audio return onto an audio track.",
      stepScreenshot: null
    },
    {
      number: 23,
      title: "Run Multi-Timbral Instruments",
      concept:
        "A multi-timbral instrument can play multiple parts at once, often with each part listening on a different MIDI channel.",
      actions: [
        "Use multi-output or multi-timbral setup only when it simplifies your project.",
        "Assign each part a clear MIDI channel and sound.",
        "Label tracks and aux returns so editing and mixing stay readable."
      ],
      body: `Multi-timbral workflows let one instrument instance host multiple sounds. This is common in orchestral samplers, older workstation-style plugins, drum instruments, and hardware modules. One instance might contain strings on channel 1, brass on channel 2, woodwinds on channel 3, percussion on channel 10, and so on. Logic tracks can send MIDI to those different channels while the instrument returns stereo or multiple audio outputs for mixing.

The benefit is efficiency and centralized loading. The cost is complexity. Beginners may be better served by one instrument per track because it is easier to see, freeze, bounce, and mix. Experts use multi-timbral setups for large templates, key-switched libraries, CPU planning, and external hardware that naturally works by channel. If you use this approach, naming is not optional. Track names, MIDI channels, articulation sets, output assignments, and aux labels should all agree. A multi-timbral template with vague labels becomes a routing puzzle.`,
      symbolName: "rectangle.stack",
      visualTitle: "Multi-Part Rack",
      visualCaption: "One instrument, many MIDI channels.",
      settings: {
        "Typical Channels": "One part per MIDI channel",
        "Audio Returns": "Stereo or multi-output",
        "Best For": "Large templates and hardware modules"
      },
      proTip:
        "Use track stacks to make multi-timbral setups easier to collapse, navigate, and mix.",
      avoidThis:
        "Avoid multi-timbral routing for simple sessions if separate instrument tracks are clearer.",
      checkYourWork:
        "You can identify which Logic track sends to which part and channel inside a multi-timbral instrument.",
      stepScreenshot: null
    },
    {
      number: 24,
      title: "Separate Controllers from Control Surfaces",
      concept:
        "A MIDI controller usually sends playable or assignable MIDI data, while a control surface uses a structured protocol to control DAW functions.",
      actions: [
        "Use generic MIDI mapping for knobs, pads, keys, and pedals that target instruments or parameters.",
        "Use control surface setup for devices intended to control transport, faders, pans, automation, and channel banking.",
        "Avoid configuring one device as both a control surface and generic controller unless the manual recommends it."
      ],
      body: `The words controller and control surface overlap, but in Logic they are not always the same. A keyboard controller may send notes, CCs, pitch bend, sustain, and aftertouch. You can record those messages into regions or map them to Smart Controls and plugin parameters. A control surface, such as a Mackie Control style mixer, communicates with Logic using an agreed control protocol for track faders, pans, solos, mutes, transport, automation modes, jog wheels, displays, and banking.

This distinction matters because setup paths differ. Generic MIDI devices are often handled through MIDI input and controller assignments. Control surfaces are added in Logic Pro's Control Surfaces setup and may use Mackie Control, HUI, EuCon, or a vendor-specific script. If you accidentally let a control surface's fader messages record into MIDI regions, or if Logic interprets keyboard notes as DAW commands, the setup becomes confusing. Decide whether each physical control is meant to play music, shape an instrument, or operate the DAW.`,
      symbolName: "dial.low",
      visualTitle: "Two Roles",
      visualCaption: "Play music or operate the DAW.",
      settings: {
        "Generic Controller": "Notes, CC, pedals, assignable controls",
        "Control Surface": "Transport, faders, pans, DAW feedback",
        "Setup Area": "Logic Control Surfaces for DAW protocols"
      },
      proTip:
        "Many modern keyboards have separate DAW and MIDI modes. Use the right mode before learning assignments.",
      avoidThis:
        "Do not map a motorized fader manually if the device already has a correct Mackie Control mode.",
      checkYourWork:
        "You can classify each of your devices as a performance controller, DAW control surface, or hybrid.",
      stepScreenshot: null
    },
    {
      number: 25,
      title: "Learn Mackie Control Universal",
      concept:
        "Mackie Control Universal, often called MCU, is a widely supported control surface protocol for DAW transport, mixer, banking, and automation control.",
      actions: [
        "Put compatible surfaces into Logic, MCU, or Mackie Control mode when required.",
        "Add the device as a Mackie Control surface in Logic when automatic detection does not work.",
        "Use banking, channel select, transport, faders, pans, mute, solo, record arm, and automation controls as designed."
      ],
      body: `Mackie Control Universal became a common language for hardware surfaces that control DAWs. Many devices from Mackie, Behringer, Icon, PreSonus, Nektar, SSL, and other manufacturers offer MCU or MCU-compatible modes. The protocol maps physical faders, v-pots, buttons, displays, and transport controls to DAW functions. In Logic Pro, MCU support can give you hands-on control of track volume, pan, mute, solo, record enable, track selection, automation modes, marker navigation, jog/shuttle behavior, plugin parameters, and channel banking.

MCU is not the same as normal MIDI Learn. It uses MIDI messages, but the messages have standardized meanings inside the control surface protocol. A motorized fader sends and receives position so it can follow Logic's mixer. Scribble strips can display track names. Bank buttons move the surface across groups of tracks. This two-way feedback is the reason MCU surfaces are useful for mixing. The limitation is that not every manufacturer implements every detail perfectly, so always follow the device's Logic or MCU setup instructions.`,
      symbolName: "slider.horizontal.below.rectangle",
      visualTitle: "MCU Surface",
      visualCaption: "Faders, transport, displays, banking.",
      settings: {
        "Protocol": "Mackie Control Universal",
        "Best For": "Mixer and transport control",
        "Key Feature": "Two-way feedback for faders and displays"
      },
      proTip:
        "If faders move in Logic but the hardware does not follow, check that both input and output ports are assigned for the control surface.",
      avoidThis:
        "Do not use generic MIDI Learn for core MCU faders unless you intentionally want to bypass the protocol.",
      checkYourWork:
        "You can explain why MCU needs both input from the surface and output back to the surface.",
      stepScreenshot: null
    },
    {
      number: 26,
      title: "Compare HUI, EuCon, NKS, and Vendor Scripts",
      concept:
        "MCU is common, but other control standards and integrations exist for specific hardware families and workflows.",
      actions: [
        "Use HUI when older or simpler surfaces require it.",
        "Use EuCon for compatible Avid surfaces when deep DAW control is needed.",
        "Use vendor scripts or dedicated apps when they provide better Logic integration than generic MIDI."
      ],
      body: `Control surface standards evolved around different products and eras. HUI is an older protocol originally associated with Pro Tools-era control surfaces and remains available on some devices for basic mixer and transport control. EuCon is a high-resolution Ethernet-based control protocol used by Avid surfaces and supported by several DAWs for deep, responsive integration. Native Instruments NKS is not a DAW mixer protocol in the same sense; it focuses on instrument browsing, parameter mapping, and hardware integration for compatible instruments and controllers. Other companies provide Logic scripts, companion apps, or custom modes.

The practical advice is to use the highest-quality integration your device supports for Logic Pro. If a keyboard offers a specific Logic mode, try that before generic mapping. If a surface offers MCU and HUI, MCU is usually more appropriate for Logic. If a vendor app creates ports, templates, or automatic assignments, read what those ports are for. Experts keep a short setup note with the chosen mode, port names, and Logic control surface entry so a future driver update does not become a mystery.`,
      symbolName: "list.bullet.rectangle",
      visualTitle: "Protocol Choices",
      visualCaption: "Use the mode built for your device.",
      settings: {
        "MCU": "Common Logic mixer control",
        "HUI": "Older basic control",
        "EuCon": "Avid networked control surfaces",
        "Vendor Scripts": "Device-specific integration"
      },
      proTip:
        "If two modes seem to work, choose the one whose displays, banking, and automation controls behave most predictably.",
      avoidThis:
        "Do not enable every available DAW mode at once. Duplicate ports can cause double commands and unstable control.",
      checkYourWork:
        "You can identify which protocol or integration mode your primary control surface is using with Logic.",
      stepScreenshot: null
    },
    {
      number: 27,
      title: "Connect a Control Surface to Logic Pro",
      concept:
        "A control surface must be recognized by macOS, assigned to the correct Logic control surface type, and mapped to the correct input and output ports.",
      actions: [
        "Install required drivers or companion software only if the manufacturer requires them.",
        "Open Logic Pro > Control Surfaces > Setup when manual configuration is needed.",
        "Add or scan for the device and choose the correct input and output MIDI ports."
      ],
      body: `A typical Logic control surface setup begins outside Logic. Confirm the device powers on, uses the intended DAW mode, and appears in Audio MIDI Setup or the manufacturer's app. Then open Logic's Control Surfaces setup. Some devices are detected automatically. Others need to be added manually as Mackie Control, HUI, or a vendor-specific surface. The critical detail is port assignment: the control surface input should be the port carrying messages from the hardware to Logic, and the output should be the port Logic uses to send feedback back to the hardware.

After setup, test transport, track banking, one fader, one pan, mute, solo, and record arm. If transport works but faders do not, the device may be in the wrong mode. If faders control Logic but motorized feedback or displays fail, output port assignment is likely wrong. If every command happens twice, the device may be configured both as a control surface and through generic MIDI assignments. Keep the first test simple before customizing buttons.`,
      symbolName: "gearshape.2",
      visualTitle: "Surface Setup",
      visualCaption: "Mode, input port, output port, test.",
      settings: {
        "Logic Menu": "Logic Pro > Control Surfaces > Setup",
        "Required Ports": "Input and output for two-way surfaces",
        "First Test": "Transport, fader, pan, bank"
      },
      proTip:
        "Take a screenshot or note the exact control surface port names after it works. Driver updates can rename ports.",
      avoidThis:
        "Do not troubleshoot advanced button maps until basic transport and one fader behave correctly.",
      checkYourWork:
        "You can move one hardware fader, see Logic respond, move Logic's fader with the mouse, and see the hardware follow.",
      stepScreenshot: null
    },
    {
      number: 28,
      title: "Use Controller Assignments and Learn Mode",
      concept:
        "Logic's Controller Assignments let you connect incoming MIDI controls to Logic commands, channel strip parameters, Smart Controls, and plugin parameters.",
      actions: [
        "Open Controller Assignments only when you know what physical control you want to map.",
        "Enable Learn Mode, move the Logic parameter, then move the hardware control.",
        "Turn Learn Mode off immediately after creating the assignment."
      ],
      body: `Controller Assignments are powerful because they let generic MIDI controls operate Logic. You can map a knob to a plugin cutoff, a fader to a Smart Control, a button to cycle, a pedal to a command, or a pad to a live performance function. The usual learning flow is simple: choose the target in Logic, enable Learn Mode, move the hardware control, verify the assignment, and turn Learn Mode off.

The danger is accidental learning. If Learn Mode stays on while you click around or move several controls, Logic may create assignments you did not intend. Those assignments can later steal notes, break transport buttons, or make parameters jump. Experts use assignment zones and modes to keep mappings organized by device and context. Beginners should create one assignment at a time, test it, name it if possible, then back up the working control surface preferences before building a large map. Mapping is best treated like programming a small instrument panel, not like random experimentation.`,
      symbolName: "hand.point.up.left",
      visualTitle: "Learn Flow",
      visualCaption: "Target, move control, verify, disable.",
      settings: {
        "Learn Mode": "Turn off after each assignment",
        "Good Targets": "Smart Controls, plugin parameters, commands",
        "Organization": "Use zones and names for larger maps"
      },
      proTip:
        "Map hardware controls to Smart Controls when possible. Smart Controls can then target different plugin chains while the hardware layout stays familiar.",
      avoidThis:
        "Do not leave Learn Mode on during normal work. Accidental assignments are one of the fastest ways to create confusing MIDI behavior.",
      checkYourWork:
        "You can create one mapping, test it, disable Learn Mode, and confirm no extra controls were captured.",
      stepScreenshot: null
    },
    {
      number: 29,
      title: "Remap Logic Pro Key Commands",
      concept:
        "Key commands are not MIDI notes by default, but Logic can assign computer keys or MIDI messages to commands for fast workflow control.",
      actions: [
        "Open Logic Pro > Key Commands > Edit to search for commands.",
        "Assign keyboard shortcuts for frequent actions before assigning obscure ones.",
        "Use MIDI-triggered commands carefully so musical notes do not accidentally operate the DAW."
      ],
      body: `Logic's Key Commands window is one of the most important productivity tools in the application. You can search commands by name, view existing assignments, create custom computer keyboard shortcuts, and assign MIDI messages to commands. Remapping is useful for functions such as capture recording, quantize, split by playhead, bounce in place, cycle, set locators, open editors, zoom, nudge, create track stack, show automation, or toggle low-latency mode.

MIDI key command assignments can be useful for foot pedals, spare buttons, pads, or dedicated controllers, but they must be chosen carefully. If a note from your keyboard controller is assigned to a command, playing that note may trigger Logic instead of music, depending on context. A safer approach is to use buttons that send CC messages or notes outside your playing range. Experts often build ergonomic command sets around the left hand, transport buttons, and foot switches. The goal is to remove repeated mouse travel while keeping performance input safe.`,
      symbolName: "command",
      visualTitle: "Command Map",
      visualCaption: "Computer keys and MIDI can trigger Logic.",
      settings: {
        "Menu Path": "Logic Pro > Key Commands > Edit",
        "Safe MIDI Sources": "Pedals, buttons, unused pads",
        "High-Value Commands": "Capture Recording, Quantize, Bounce in Place"
      },
      proTip:
        "Export or document your custom key command set after major changes so you can restore it on another Mac.",
      avoidThis:
        "Avoid assigning common playable notes to Logic commands unless the controller is dedicated to commands.",
      checkYourWork:
        "You can search for a command, assign a shortcut, test it, and remove or change it if it conflicts.",
      stepScreenshot: null
    },
    {
      number: 30,
      title: "Map Smart Controls for Performable Patches",
      concept:
        "Smart Controls give you a small, consistent performance panel that can target many instrument, effect, and channel strip parameters.",
      actions: [
        "Open Smart Controls on a software instrument track.",
        "Map macro knobs to the parameters you actually perform or automate.",
        "Save the patch after the controls behave musically."
      ],
      body: `Smart Controls are a practical bridge between MIDI mapping and sound design. A single Smart Control knob can target one parameter or multiple parameters with scaled ranges. For example, a macro labeled Brightness could open a filter, add a little saturation, and reduce low-pass resonance at the same time. A Space macro could raise reverb send and delay feedback. A Movement macro could increase chorus depth and modulation speed. Hardware knobs can then control these Smart Controls instead of directly chasing plugin parameters across different instruments.

In Logic, this creates a stable performance layer. Your controller's first eight knobs can always mean the same musical categories: brightness, movement, attack, release, space, drive, tone, and level. The underlying plugin can change from Alchemy to Sampler to a third-party synth, but the physical layout remains familiar. Beginners should map a few useful controls per patch. Experts can design entire live and writing templates around Smart Control macros that behave consistently across tracks.`,
      symbolName: "slider.horizontal.2.square",
      visualTitle: "Macro Panel",
      visualCaption: "One knob can control many targets.",
      settings: {
        "Best Targets": "Filter, envelope, effects, sends, plugin macros",
        "Hardware Layer": "Map knobs to Smart Controls",
        "Recall": "Save as patch"
      },
      proTip:
        "Name Smart Controls musically, such as Bite or Air, instead of copying technical plugin parameter names.",
      avoidThis:
        "Do not map a macro range so wide that a small knob move ruins the patch.",
      checkYourWork:
        "You can move one hardware knob and hear a controlled musical change through a Smart Control.",
      stepScreenshot: null
    },
    {
      number: 31,
      title: "Turn MIDI CC into Automation",
      concept:
        "MIDI controller data can remain inside regions, control instruments directly, or be converted into track automation depending on the workflow.",
      actions: [
        "Decide whether the movement belongs to the performance or the mix.",
        "Keep note-expression gestures in the MIDI region when they are part of playing the instrument.",
        "Use track automation when the movement should follow the mix timeline or affect audio plugins."
      ],
      body: `MIDI CC data and Logic automation can look similar because both are curves over time. They serve different purposes. MIDI CC data usually belongs to the performance being sent to an instrument: modulation, expression, sustain, filter movement, breath, or pedal gestures. Track automation belongs to the channel strip, plugin, send, pan, volume, or mix timeline. A synth filter cutoff might be controlled by MIDI CC inside the instrument, by Smart Control automation, or by plugin parameter automation. Each choice affects editing and portability.

Beginners should ask one question: if I move or copy the MIDI region, should this movement move with it? If yes, keeping the data in the region makes sense. If the movement belongs to a specific song section or mix event independent of the notes, track automation may be better. Experts often combine both: CC11 expression inside the region for phrasing, track volume automation for mix rides, and Smart Control automation for arrangement-wide sound changes.`,
      symbolName: "point.topleft.down.curvedto.point.bottomright.up",
      visualTitle: "Data or Automation",
      visualCaption: "Performance movement vs mix movement.",
      settings: {
        "Region Data": "Moves with MIDI performance",
        "Track Automation": "Lives on the mix timeline",
        "Common Region CC": "Expression, sustain, modulation"
      },
      proTip:
        "If a copied phrase loses its expression, inspect whether the movement was track automation instead of region MIDI data.",
      avoidThis:
        "Do not use track volume automation to fake instrument expression when CC11 or a performance macro would sound more natural.",
      checkYourWork:
        "You can choose whether a controller movement should stay with the MIDI region or live as track automation.",
      stepScreenshot: null
    },
    {
      number: 32,
      title: "Use MIDI Scripter for Custom Logic",
      concept:
        "Scripter is a Logic MIDI FX plugin that uses JavaScript to transform, generate, filter, or respond to MIDI events.",
      actions: [
        "Insert Scripter before a software instrument.",
        "Start with factory scripts before writing custom behavior.",
        "Use custom scripts for repeatable transformations that normal MIDI FX cannot handle."
      ],
      body: `Scripter is one of Logic's most advanced MIDI tools. It can receive MIDI events, modify them, generate new events, filter unwanted events, create user parameters, and pass data to the instrument. Factory scripts can demonstrate harmonizers, arpeggiator-like behavior, velocity tools, drum remaps, and other transformations. Custom scripts can solve unusual problems such as converting one controller range into another, blocking specific notes, remapping drum layouts, adding randomized variation, creating performance splits, or building composition helpers.

Beginners do not need Scripter to make music, but they should know it exists because it explains why Logic can be extended without leaving the MIDI FX chain. Experts should treat scripts like code inside a session: name them clearly, comment unusual behavior, save reusable presets, and test them with simple input before using them in a live or client project. A script that silently changes notes can be brilliant or dangerous depending on whether the next user understands it.`,
      symbolName: "curlybraces",
      visualTitle: "MIDI Code",
      visualCaption: "Custom event processing before the instrument.",
      settings: {
        "Plugin Type": "MIDI FX",
        "Language": "JavaScript-style Scripter API",
        "Use Cases": "Remap, filter, generate, transform"
      },
      proTip:
        "Save Scripter presets with descriptive names such as Drum Map GM to Producer Kit instead of vague names like Script 1.",
      avoidThis:
        "Do not use a custom script in a live set without testing stuck-note behavior and bypass recovery.",
      checkYourWork:
        "You can insert a factory Scripter preset, bypass it, and explain what MIDI behavior changes.",
      stepScreenshot: null
    },
    {
      number: 33,
      title: "Explore MPE and Expressive Controllers",
      concept:
        "MIDI Polyphonic Expression lets compatible controllers send independent expressive data for each note, enabling bends, slides, pressure, and timbre changes per finger.",
      actions: [
        "Use an MPE-capable controller and instrument when per-note expression is required.",
        "Confirm pitch bend range, pressure response, and timbre mapping.",
        "Record simple phrases first so you can see how much data MPE creates."
      ],
      body: `MPE, or MIDI Polyphonic Expression, is a way of using MIDI so each note can have its own expressive gestures. On a traditional keyboard, a pitch bend wheel bends the whole channel. On an MPE controller, one finger can bend up while another bends down, a third adds pressure, and a fourth slides timbre. This is essential for instruments such as ROLI Seaboard, LinnStrument, Haken Continuum-style devices, some grid controllers, and expressive software instruments that respond per note.

Logic Pro can work with expressive MIDI workflows when the controller and instrument are configured correctly. The setup usually involves channel-per-note behavior, bend ranges, and instrument-side MPE mode. Beginners should not start with MPE if they are still learning notes and velocity, because the data can be dense. Experts can use MPE for lifelike strings, winds, synth leads, pads, and experimental textures that cannot be achieved with a normal keyboard. The power is enormous, but the receiving instrument must understand the gestures.`,
      symbolName: "hand.draw",
      visualTitle: "Per-Note Motion",
      visualCaption: "Each finger can bend and shape sound.",
      settings: {
        "MPE Needs": "Compatible controller and instrument",
        "Data Density": "High",
        "Best Uses": "Expressive synths, strings, winds, leads"
      },
      proTip:
        "Before recording a complex MPE take, test one sustained note and confirm pressure, slide, and bend affect the intended parameters.",
      avoidThis:
        "Do not expect a non-MPE instrument to interpret per-note expression correctly.",
      checkYourWork:
        "You can describe why per-note pitch bend is different from moving a normal pitch wheel.",
      stepScreenshot: null
    },
    {
      number: 34,
      title: "Prepare MIDI for Live Performance",
      concept:
        "Live MIDI performance requires stable routing, low latency, predictable patch changes, and simple recovery if something goes wrong.",
      actions: [
        "Use dedicated tracks, patches, and controllers for live work.",
        "Reduce CPU load and buffer size enough for comfortable playing.",
        "Create emergency bypass, panic, or fallback sounds before the performance."
      ],
      body: `Logic can be part of a live MIDI rig, but live use changes the priorities. In the studio, you can stop and troubleshoot. On stage, the system must be predictable. Use a stable interface, reliable cables, powered devices, simple routing, and patches that load before the song starts. Avoid depending on huge sample instruments that might stream slowly or overload the CPU. If you need patch changes, test them in setlist order with the same controller and audio buffer you will use live.

Latency is both technical and psychological. A few extra milliseconds can make a keyboard feel disconnected. Low-latency mode, smaller buffers, frozen background tracks, lighter patches, and direct monitoring choices can help. Controllers should have clear roles. One keyboard might play sounds, a foot pedal might advance patches, and a small surface might control levels. Experts build a panic plan: stop stuck notes, switch to a backup patch, or bypass a failed external device quickly. Live MIDI rewards preparation more than complexity.`,
      symbolName: "play.circle",
      visualTitle: "Live Rig",
      visualCaption: "Stable, low-latency, recoverable.",
      settings: {
        "Buffer Goal": "As low as stable",
        "Patch Strategy": "Preload and test in order",
        "Recovery": "Panic, backup patch, bypass plan"
      },
      proTip:
        "Do a full no-stopping rehearsal with the exact controller, hub, interface, and power setup you plan to use.",
      avoidThis:
        "Do not debut a new controller mapping at a performance without rehearsing failure cases.",
      checkYourWork:
        "You can play through a set of patches without unexpected silence, stuck notes, or distracting latency.",
      stepScreenshot: null
    },
    {
      number: 35,
      title: "Fix Missing MIDI Input",
      concept:
        "When Logic does not respond to a controller, isolate whether the problem is device recognition, MIDI input, track selection, instrument loading, or monitoring.",
      actions: [
        "Check that macOS sees the device before changing Logic settings.",
        "Watch Logic's MIDI activity indicator or use a simple software instrument test track.",
        "Try a different cable, port, hub, or direct Mac connection if the device appears intermittently."
      ],
      body: `Missing MIDI input is frustrating because several layers can fail silently. Start with hardware: is the controller powered, connected, and in the correct mode? Then check macOS Audio MIDI Setup or the manufacturer's utility. If the Mac does not see the device, Logic cannot use it. Next, open Logic and watch for MIDI activity. If Logic sees input but you hear nothing, the selected track may not be a software instrument, the instrument plugin may be missing, the track may not be selected or record-enabled, or the audio output may be muted.

If the device uses Bluetooth, re-pair it and consider switching to USB for recording. If it uses a hub, connect directly. If it uses DIN, verify that MIDI Out goes to MIDI In and that the interface driver is working. If only one project fails, inspect control surface assignments, environment-style routing, or project-specific input filters. The fastest fix is a simple known-good test: one controller, one cable, one new Logic project, one stock instrument.`,
      symbolName: "exclamationmark.triangle",
      visualTitle: "No Input Tree",
      visualCaption: "Device, Logic, track, instrument, audio.",
      settings: {
        "First Test": "New project with stock instrument",
        "Hardware Check": "Power, cable, port, mode",
        "Logic Check": "MIDI activity and selected instrument track"
      },
      proTip:
        "Keep one tiny MIDI diagnostic project with a stock electric piano. It removes template complexity from troubleshooting.",
      avoidThis:
        "Do not reinstall Logic before checking the cable, hub, device mode, and a blank project.",
      checkYourWork:
        "You can determine whether a silent controller is failing before Logic, inside Logic input, or after the instrument track.",
      stepScreenshot: null
    },
    {
      number: 36,
      title: "Stop Stuck Notes and MIDI Loops",
      concept:
        "Stuck notes usually come from missing note-off messages, feedback loops, sustain pedal data, or devices receiving duplicate routes.",
      actions: [
        "Use Logic's panic or reset behavior when notes hang.",
        "Check sustain pedal CC64 data if piano or pad notes continue too long.",
        "Remove duplicate MIDI routes that send notes back into their source."
      ],
      body: `A stuck note occurs when an instrument receives note-on but never receives the matching note-off, or when sustain or hold data keeps the sound alive. This can happen after a cable disconnect, overloaded device, buggy plugin, MIDI feedback loop, or badly edited region. A MIDI loop happens when data leaves a device or app and returns to the same source, creating repeated notes, doubled triggers, runaway controller data, or strange timing flams.

Logic users should learn where to reset MIDI and how to stop all notes in an emergency. Then inspect the cause. If the problem happens only in one region, look for overlapping notes, missing note ends, or sustain pedal data stuck above the on threshold. If it happens when hardware is connected, check whether local control on a keyboard and Logic's MIDI thru are both triggering the same sound. If notes double, disconnect one route at a time. Experts design rigs so each device has a clear direction unless bidirectional communication is required.`,
      symbolName: "stop.circle",
      visualTitle: "Panic Path",
      visualCaption: "Reset notes, then remove the cause.",
      settings: {
        "Common Cause": "Missing note-off",
        "Pedal Data": "CC64 above sustain threshold",
        "Loop Symptom": "Doubled notes or runaway repeats"
      },
      proTip:
        "For hardware keyboards driving their own sound and Logic, check local control settings to prevent double triggering.",
      avoidThis:
        "Do not ignore stuck sustain data. Deleting notes will not fix a pedal lane that remains on.",
      checkYourWork:
        "You can stop hanging notes and identify whether the cause is sustain, overlap, feedback, or device interruption.",
      stepScreenshot: null
    },
    {
      number: 37,
      title: "Manage Latency and Feel",
      concept:
        "MIDI feel depends on controller response, audio buffer, plugin delay, instrument CPU load, and monitoring path.",
      actions: [
        "Lower the audio buffer when recording software instruments.",
        "Bypass or avoid latency-heavy plugins while performing.",
        "Use low-latency mode when a mix session becomes too heavy for comfortable playing."
      ],
      body: `MIDI itself is usually not the main source of delay in a modern USB controller setup. The audible delay often comes from the time it takes the computer to generate and monitor audio from the software instrument. The audio buffer, CPU load, plugin delay compensation, oversampling processors, linear-phase EQs, lookahead limiters, and heavy sample instruments can all affect feel. A controller can also have its own scan and transmission behavior, but in Logic sessions the audio path is often the first place to inspect.

For recording, use a lighter patch if necessary, lower the buffer, bypass mastering plugins, and enable low-latency mode when appropriate. For mixing, you can raise the buffer because you are no longer performing in real time. Experts separate writing, tracking, editing, and mixing states. A massive mix template may sound great but feel terrible for recording a new synth line. Print or freeze heavy tracks, then return to a responsive setup for performance. Musical confidence depends on the instrument feeling connected to your hands.`,
      symbolName: "speedometer",
      visualTitle: "Feel Chain",
      visualCaption: "Buffer and plugins shape playability.",
      settings: {
        "Recording Buffer": "64-128 samples when stable",
        "Mixing Buffer": "Higher is acceptable",
        "Watch Plugins": "Lookahead, linear phase, oversampling"
      },
      proTip:
        "If MIDI records early or late consistently after performance, test recording delay separately from the live monitoring feel.",
      avoidThis:
        "Do not blame the controller before bypassing latency-heavy audio plugins on the monitoring path.",
      checkYourWork:
        "You can make a software instrument feel more responsive by changing buffer or bypassing latency-heavy processing.",
      stepScreenshot: null
    },
    {
      number: 38,
      title: "Import, Export, and Share MIDI",
      concept:
        "Standard MIDI Files let you move musical data between Logic, notation apps, hardware sequencers, collaborators, and other DAWs.",
      actions: [
        "Export MIDI when a collaborator needs notes, tempo-related performance data, or a hardware-readable sequence.",
        "Bounce audio when the collaborator needs the sound exactly as produced by your instruments.",
        "Clean up track names, channels, tempo, and program information before sharing."
      ],
      body: `MIDI sharing is different from audio sharing. A Standard MIDI File can preserve notes, timing, channels, tempo, markers in some cases, controllers, program changes, and other performance data depending on export settings and receiving software. It usually does not preserve the exact sound of Logic's software instruments, third-party plugins, mix processing, or sample libraries. If you send someone MIDI for a piano part, they can play it through their own piano. If you need them to hear your exact piano sound, send audio too.

Logic can import MIDI files from notation programs, online libraries, hardware sequencers, and other DAWs. Imported files may bring odd channels, program changes, tempo maps, or controller data. Experts clean imported MIDI before arranging: remove unwanted program changes, normalize channels, inspect tempo, split drum parts if needed, and assign proper instruments. When exporting, label tracks clearly and include a reference audio bounce. MIDI gives collaborators flexibility, but audio gives them certainty.`,
      symbolName: "square.and.arrow.up",
      visualTitle: "Share Format",
      visualCaption: "MIDI shares notes; audio shares sound.",
      settings: {
        "MIDI File": "Editable performance data",
        "Audio Bounce": "Exact rendered sound",
        "Prep": "Names, channels, tempo, controller cleanup"
      },
      proTip:
        "Send both MIDI and a reference audio bounce when collaborating across different DAWs or instrument libraries.",
      avoidThis:
        "Do not promise that a MIDI export will sound identical on another system unless the same instruments and settings are available.",
      checkYourWork:
        "You can decide whether a collaborator needs MIDI, audio, or both for a given part.",
      stepScreenshot: null
    },
    {
      number: 39,
      title: "Build Expert MIDI Templates",
      concept:
        "A strong MIDI template turns repeated setup decisions into reliable defaults while keeping the project flexible.",
      actions: [
        "Create template tracks for your common instruments, controllers, surfaces, and external devices.",
        "Name ports, channels, Smart Controls, articulation sets, and controller maps clearly.",
        "Keep a simple fallback template for troubleshooting and writing away from the full studio rig."
      ],
      body: `Expert MIDI work is often less about exotic tricks and more about consistency. A template can include favorite software instruments, drum mappings, articulation sets, MIDI FX chains, Smart Controls, external synth tracks, control surface preferences, track stacks, color coding, and routing notes. This saves time and reduces mistakes because every session starts with known behavior. The challenge is keeping the template understandable. If a controller map only makes sense to you on the day you built it, it will slow you down later.

Create layers of templates. A writing template might be light, fast, and focused on low latency. A scoring template might be large, organized by orchestral family, articulations, and expression controls. A hardware template might include external MIDI tracks, audio returns, clock routing, and patch notes. A troubleshooting template should be intentionally tiny. Experts also version templates after major controller or driver changes. MIDI systems are living studio infrastructure, and documentation is part of the instrument.`,
      symbolName: "folder.badge.gearshape",
      visualTitle: "Reusable Rig",
      visualCaption: "Templates preserve routing and intent.",
      settings: {
        "Writing Template": "Light and responsive",
        "Scoring Template": "Articulations and expression",
        "Hardware Template": "Channels, ports, audio returns",
        "Diagnostic Template": "One simple stock instrument"
      },
      proTip:
        "Keep template notes inside the project or a studio document, including controller modes and external synth channel assignments.",
      avoidThis:
        "Do not let a giant template become the only way you can write. Keep a fast blank-canvas option.",
      checkYourWork:
        "You can open a template and understand every MIDI device, channel, map, and external return without guessing.",
      stepScreenshot: null
    },
    {
      number: 40,
      title: "Practice a Complete MIDI Workflow",
      concept:
        "The best way to learn MIDI is to move through a complete loop: connect, record, edit, shape, map, control, troubleshoot, and export.",
      actions: [
        "Create one short Logic project that uses a software instrument, MIDI FX, controller mapping, and automation or CC data.",
        "Add one control surface or hardware controller task, such as transport, Smart Control, or fader control.",
        "Export both an audio bounce and a MIDI file, then reopen them to verify the result."
      ],
      body: `A complete MIDI practice project can be small. Create a software instrument track with a stock synth or piano. Record an eight-bar chord or melody idea. Quantize it partially, edit a few note lengths, shape velocities, and add one CC movement such as modulation or expression. Insert a MIDI FX plugin and learn how bypass changes the performance. Map one hardware knob to a Smart Control. If you have a control surface, test transport or fader banking. If you have external hardware, send one part out and record the audio return.

Then troubleshoot deliberately. Mute the instrument and confirm the MIDI region still exists. Change the patch and hear how the same data produces a new sound. Export MIDI and audio, then reimport or reopen to understand what each format preserved. This loop teaches the entire concept better than memorizing definitions. Beginners finish with confidence that MIDI is editable musical instruction. Experts can repeat the loop with more advanced devices, MPE, MCU surfaces, articulation sets, Scripter, and hardware sync until the studio behaves like one integrated instrument.`,
      symbolName: "checkmark.seal",
      visualTitle: "Full Loop",
      visualCaption: "Connect, record, edit, control, export.",
      settings: {
        "Minimum Project": "8 bars, one instrument, one MIDI FX",
        "Control Task": "One mapped knob or surface command",
        "Final Proof": "Audio bounce plus MIDI export"
      },
      proTip:
        "Repeat this workflow whenever you buy a new controller. A controlled practice project reveals setup problems before a real session does.",
      avoidThis:
        "Do not judge your MIDI knowledge by definitions alone. The skill is making the whole path work under real project conditions.",
      checkYourWork:
        "You can complete a short Logic MIDI project from controller input through final audio and MIDI export without losing track of the signal path.",
      stepScreenshot: null
    }
  ]
};
