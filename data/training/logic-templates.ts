import type { TrainingLesson } from "@/lib/sheet-schema";

const body = (...paragraphs: string[]) => paragraphs.join("\n\n");

export const logicTemplatesLesson: TrainingLesson = {
  id: "logic-templates",
  title: "Logic Templates for Recording, Mixing, and Mastering",
  series: "Workflow Systems",
  summary:
    "Build reusable Logic Pro templates that make every band session faster, more consistent, and easier to hand off without turning the music into a preset.",
  duration: "45 min read",
  symbolName: "rectangle.stack.badge.plus",
  badges: ["New", "Workflow", "Templates"],
  isFeatured: true,
  checklist: [
    "Define the purpose of the template before adding tracks or plugins.",
    "Set project sample rate, bit depth, I/O labels, metering, and save behavior first.",
    "Create named tracks for every recurring source: drums, bass, guitars, vocals, keys, references, print, and notes.",
    "Build summing stacks and aux returns for the instrument groups you mix every time.",
    "Color, icon, and order tracks by family so sessions read the same in every project.",
    "Add only purposeful default plugins, leaving heavy or taste-based processors bypassed or documented.",
    "Set conservative gain targets so recordings hit plugins and buses at usable levels.",
    "Save with File > Save As Template, organize the template folder, and test by starting a new project from My Templates.",
    "Keep a simple version history and update the template only after real sessions prove the change is useful."
  ],
  steps: [
    {
      number: 1,
      title: "Understand Why Templates Matter",
      concept:
        "A template is not a shortcut for taste; it is a repeatable starting system that protects attention for the performance.",
      actions: [
        "Write down the sessions you repeat most: full-band tracking, overdubs, mixing, mastering, podcast, songwriting, or live capture.",
        "List the setup chores you repeat every time: track creation, colors, routing, cue sends, reverbs, reference tracks, print tracks, and metering.",
        "Decide which chores are safe to standardize and which decisions should remain song-specific."
      ],
      body: body(
        "Logic Pro templates are valuable because they turn recurring session setup into a prepared environment. Every engineer eventually notices the same friction at the start of a project: creating the same drum tracks, naming the same buses, inserting the same tuner, opening the same metering plugin, setting the same click options, and rebuilding the same headphone sends. None of those actions are creative. They are necessary, but they are not the part of the session where the band plays better or the mix becomes more emotionally convincing. A good template moves those predictable chores out of the critical listening window.",
        "The first benefit is consistency. If drums are always yellow, bass is always orange, guitars are always green, vocals are always blue, and mix references are always slate, your brain stops spending energy decoding the session. If every project uses the same broad bus hierarchy, you know where to find the drum sum, vocal effects, parallel compression, print track, and reference track without searching. Consistency also helps collaboration. When another engineer, producer, or future version of you opens the project, the layout explains itself.",
        "The second benefit is speed. A template can turn a long preflight routine into a few minutes of confirmation. Speed matters most when musicians are waiting, when a vocalist is warmed up, when a drummer is finally comfortable, or when inspiration arrives before the session is neatly organized. The point is not to rush decisions. The point is to remove the nonmusical delays that prevent decisions from happening.",
        "The third benefit is process normalization. Templates let a studio define minimum standards for gain staging, file organization, headphone routing, backups, technical settings, and handoff labels. Instead of hoping every session remembers the same checklist, the checklist lives in the project itself. That reduces errors such as recording at the wrong sample rate, forgetting a talkback channel, printing a mix without headroom, or routing a reverb return directly to the stereo output when the rest of the effects are supposed to feed an effects bus.",
        "The danger is that templates can become bloated or dogmatic. If every project opens with dozens of heavy plugins, unused instruments, and highly opinionated tone shaping, the template stops being a workflow tool and starts being a preset mix. Build the template around reliable structure, not fixed taste. Leave space for the band, the room, the song, and the arrangement to tell you what processing is actually needed."
      ),
      symbolName: "speedometer",
      visualTitle: "Template Purpose",
      visualCaption: "Standardize chores, not taste.",
      settings: {
        "Primary Goal": "Consistency + speed",
        "Best Default": "Routing, names, colors, metering",
        "Avoid": "Heavy processing before listening"
      },
      proTip:
        "Make one template per repeatable workflow instead of one giant template for everything. A full-band tracking template, a mix-start template, and a mastering template can each stay cleaner than a single universal session.",
      avoidThis:
        "Do not add a plugin just because you sometimes use it. Add it only if it solves a setup problem or documents a recurring decision.",
      checkYourWork:
        "You can explain in one sentence what this template is for and which decisions it intentionally leaves open.",
      stepScreenshot: "/assets/training/logic-templates/step1_template_benefits.png"
    },
    {
      number: 2,
      title: "Choose the Template Type and Technical Standard",
      concept:
        "The most important template decisions happen before the first track is created: purpose, sample rate, bit depth, project assets, and monitoring assumptions.",
      actions: [
        "Pick the workflow: tracking, mixing, mastering, writing, podcast editing, live capture, or rehearsal recording.",
        "Set project sample rate and recording bit depth before saving the template.",
        "Decide whether the template should copy assets into each new project package or keep references external."
      ],
      body: body(
        "Start by choosing a narrow template type. A tracking template prepares inputs, cue sends, markers, talkback, track names, record-enable behavior, and monitoring tools. A mixing template prepares imported audio lanes, submix routing, shared effects, reference tracks, analysis meters, and print paths. A mastering template prepares stereo input tracks, loudness metering, reference routing, album sequencing, and export notes. A songwriting template prepares software instruments, writing markers, scratch vocal tracks, and quick bounce options. Each type needs different defaults.",
        "Set the technical standard early. In Logic Pro, sample rate lives in the project settings and affects how audio is recorded, played, and converted. For most music projects, 44.1 kHz or 48 kHz are the practical defaults; 48 kHz is common when video is involved. For recording and mixing, 24-bit is the normal working depth because it gives healthy dynamic range and lets you record with conservative headroom. People sometimes say bitrate when they mean bit depth. Bitrate is usually a compressed-delivery concept, such as MP3 or AAC export. For a Logic recording template, think sample rate and bit depth first.",
        "Decide how project assets should be handled. Apple documents that Logic projects can save as packages or folders, and that assets can be copied into the project or referenced elsewhere. For a band template, a project package is often cleaner because each song becomes a self-contained file that can be moved, backed up, and archived. For massive sample libraries, do not copy the library into every project; keep the instrument references external and let the project store only the performance data and settings. For active multitrack recording, copy recorded audio into the project so no take is stranded in a temporary folder.",
        "Also define the monitoring environment. If the room always uses the same interface, name the inputs and outputs clearly before saving. Create outputs for control room, headphones, and alternate monitors only if they exist in your studio. If the template will travel between rigs, keep hardware-specific choices lighter and include a setup note reminding the user to verify I/O before recording. A template should remove predictable decisions, not hide assumptions that can break when a different interface is connected.",
        "Finally, decide whether Advanced Tools should be visible in Logic settings for the intended user. Many template workflows rely on detailed routing, track stacks, marker workflows, and project settings. If a beginner cannot see a command mentioned in the lesson, the fix may be enabling the relevant advanced features. Put that reminder in the template notes so the setup is reproducible."
      ),
      symbolName: "gearshape.2",
      visualTitle: "Technical Foundation",
      visualCaption: "Set format before routing.",
      settings: {
        "Music Sample Rate": "44.1 or 48 kHz",
        "Video Workflows": "48 kHz",
        "Recording Depth": "24-bit",
        "Project Format": "Package for portability"
      },
      proTip:
        "Keep a short text note in the template with the intended interface, sample rate, headphone routing, and export target. Future you will trust the session faster.",
      avoidThis:
        "Do not save a template after a random client project unless you have removed audio, unused tracks, automation, personal files, and song-specific processing.",
      checkYourWork:
        "A new project created from the template opens at the intended sample rate, bit depth, asset behavior, and monitoring assumptions.",
      stepScreenshot: null
    },
    {
      number: 3,
      title: "Plan What Belongs in the Template",
      concept:
        "A useful template contains recurring structure: tracks, instruments, sends, buses, pans, plugins, gain settings, channel strips, and documentation.",
      actions: [
        "Make a template inventory before building in Logic.",
        "Separate always-needed items from optional items.",
        "Use disabled or bypassed placeholders for heavy instruments and taste-based processors."
      ],
      body: body(
        "A Logic template can store far more than a list of empty audio tracks. It can include software instruments, aux returns, sends, buses, panning, channel strip settings, plugin chains, gain settings, markers, arrangement sections, screensets, control surface assignments, icons, colors, track stacks, notes, and output routing. The art is deciding what should be present by default and what should remain a conscious choice.",
        "For instruments, add only the software instruments you genuinely use at the beginning of a session. A songwriting template might include a piano, drum machine, bass synth, pad, and click-friendly percussion. A rock-band tracking template probably does not need multiple synth stacks unless the band frequently overdubs them during tracking. If an instrument is useful but CPU-heavy, leave it disabled or saved as a patch rather than loaded and active on every project.",
        "For sends and buses, include the shared effects that speed up monitoring and rough mixes. Common returns include short room, plate reverb, hall reverb, slap delay, quarter-note delay, parallel drum compression, parallel vocal compression, and a tuning or monitoring aux if your workflow uses one. Name them clearly: FX ROOM, FX PLATE, FX SLAP, DRUM PAR, VOX PAR. A template should make routing obvious from the mixer and track list.",
        "For pans, decide only the defaults that are safe. Many engineers center kick, snare, bass, lead vocal, and mono room or talkback channels. Stereo overheads, room pairs, piano, and doubled guitars can open with conventional left-right placement, but leave enough flexibility for the actual arrangement. For gain, set a conservative target. Many producers aim for average levels around the analog-calibrated neighborhood of -18 dBFS feeding plugins, with peaks safely below clipping. You do not need every track to hit an identical number, but the template should encourage headroom.",
        "For plugins and channel strips, think in modules. On audio tracks, you might include Gain or Utility, Channel EQ, Compressor, a tuner on guitar-related tracks, and a meter. On buses, you might include a bypassed bus compressor, EQ, saturation, and metering. On the stereo output, include analysis tools and perhaps a bypassed safety limiter, but avoid mixing into a loud mastering chain by accident. For channel strips, save reusable patches for common sources such as Kick In, Snare Top, Bass DI, Rhythm Guitar, Lead Vocal, and Backing Vocal. A channel strip can document the normal starting order without pretending every source needs the same settings.",
        "Do not forget documentation. A blank notes track, project notes, or a muted text item can hold session instructions: input list, color key, bus map, gain target, headphone sends, export instructions, and a reminder to save the project under a new song name immediately. The more people use the template, the more valuable these notes become."
      ),
      symbolName: "checklist",
      visualTitle: "Template Inventory",
      visualCaption: "Add recurring structure only.",
      settings: {
        "Always Include": "Tracks, buses, colors, notes",
        "Often Include": "Shared FX, meters, cue sends",
        "Optional": "Heavy instruments, taste plugins"
      },
      proTip:
        "Create a muted track named READ ME at the top of the template and put the input list, bus map, and update notes in the track notes or project notes.",
      avoidThis:
        "Avoid saving a template with active automation from a previous song. Hidden automation can make the next session feel haunted.",
      checkYourWork:
        "Every item in the template has a recurring purpose, and optional items are bypassed, disabled, or clearly labeled.",
      stepScreenshot: null
    },
    {
      number: 4,
      title: "Create the Clean Logic Project",
      concept:
        "The safest template starts as a new empty project, not a recycled mix full of hidden history.",
      actions: [
        "Create a new empty project in Logic Pro.",
        "Set project settings, metronome behavior, count-in, recording file type, and asset handling.",
        "Add tracks and routing from your inventory, then save a normal project copy before saving as a template."
      ],
      body: body(
        "Open a new empty Logic project and build deliberately. Starting from a clean project prevents invisible baggage: old audio files, unused alternatives, tempo maps, muted automation, plugin states, hidden tracks, and project-specific metadata. If you must base the template on a successful previous project, first save a copy, delete all audio and MIDI regions, remove unused files from the project, clear automation, reset markers, and confirm no artist-specific assets remain. A template should feel like a studio setup, not like yesterday's song with the audio removed.",
        "Begin with project settings. Set the sample rate, recording bit depth, metronome, count-in, bar ruler, tempo, and key signature defaults. Add arrangement markers if your band sessions usually follow a verse-chorus structure, but keep them generic: Intro, Verse, Chorus, Bridge, Outro. For live band work, create extra markers such as Setup, Line Check, Take Notes, and Edit Start if they help the engineer move quickly. If the template is for mastering, markers may represent songs or reference sections instead.",
        "Next create the track layout. Put global utility tracks at the top: notes, talkback, reference, print, and possibly scratch vocal. Then create instrument families in the order you usually record or mix: drums, bass, guitars, keys, vocals, effects, mix print. Within each family, order tracks from low-frequency foundation to high-frequency detail or from close mics to distant mics. For drums, a practical order is Kick In, Kick Out, Snare Top, Snare Bottom, Hat, Rack Tom, Floor Tom, Overhead L, Overhead R, Room L, Room R, Crush, and Drum Print.",
        "Build routing after the tracks exist. Route each family to the right summing stack or aux. Create sends to shared effects, but leave send amounts low or off unless the effect is necessary for monitoring. Add a reference track routed directly to the monitor path or a dedicated reference bus so it does not pass through the mix bus processing. Add a print track or bounce destination if your workflow records mixes back into the session. Label buses clearly enough that the mixer window reads like a map.",
        "Before saving as a template, save a normal project copy with a name such as TEMPLATE BUILD - Rock Band Tracking. This gives you an editable source file separate from the installed template. Then use File > Save As Template. Keeping the source build file matters because installed templates can be harder to audit than a normal project kept in your studio admin folder."
      ),
      symbolName: "doc.badge.gearshape",
      visualTitle: "Clean Build",
      visualCaption: "Start empty, then save deliberately.",
      settings: {
        "Build Source": "New empty project",
        "Marker Defaults": "Generic sections",
        "Reference Routing": "Bypass mix bus processing"
      },
      proTip:
        "After creating the template, immediately create a new test project from it and record thirty seconds of silence or scratch audio. This reveals missing routes faster than visual inspection alone.",
      avoidThis:
        "Do not use Save As Template while a client song is still open with personal audio, scratch lyrics, imported references, or unused takes attached.",
      checkYourWork:
        "The template source project contains no song-specific regions, hidden automation, client audio, or unexplained routing.",
      stepScreenshot: "/assets/training/logic-templates/step4_save_as_template.png"
    },
    {
      number: 5,
      title: "Save, Organize, and Reopen the Template",
      concept:
        "A template is not finished when it saves; it is finished when a new project can open from My Templates and behave correctly.",
      actions: [
        "Choose File > Save As Template and give the template a workflow-specific name.",
        "Use folders in the template dialog if you maintain several template families.",
        "Open Project Chooser > My Templates and create a new project from the saved template."
      ],
      body: body(
        "Apple's Logic Pro guide describes the core save path plainly: choose File > Save As Template, enter a name, then access the result from My Templates in the Project Chooser. That simple command hides an important discipline: name templates by job, not by vague aspiration. Rock Band Tracking + Mix Start is clearer than Best Template. Vocal Overdub - Apollo x8 is clearer than Vocal Template if it assumes a particular interface. Mastering Album Assembly is clearer than Mastering because it tells the user the template is for sequencing and delivery, not for mixing stems.",
        "Use folders when the number of templates grows. A studio might keep folders for Tracking, Mixing, Mastering, Writing, Podcast, Live Capture, and Archive. Inside Tracking, you might have Rock Band, Acoustic Duo, Drum Day, and Vocal Overdub. Folder names appear in the Project Chooser, so they become part of the user interface. Keep them short enough that they are readable on a laptop screen.",
        "After saving, close the source project and test from the front door. Open Logic's Project Chooser, click My Templates, select the template, and create a new project. Confirm that the new project is not the source file; it should behave as a fresh project based on the template. Save it under a fake song name and verify that project assets go where expected. Record-enable a few tracks, check meters, send signal to cue mixes, instantiate software instruments, and bounce a short test.",
        "Version templates with restraint. If the template changes in a meaningful way, add a visible version note in the project notes or READ ME track: v1.1 added dedicated room mic stack, v1.2 changed vocal slap bus, v1.3 removed default limiter. Avoid putting dates in every track name, but keep enough history that a recurring collaborator can understand why a session looks different from last month. If you work in a commercial studio, store the source build projects in a shared admin location and back them up like any other important asset.",
        "If the template breaks, fix the source build project, save a new template, and test again. Do not rely on memory to manually repair each new session. The whole point of a template is that the starting state is trustworthy."
      ),
      symbolName: "folder.badge.plus",
      visualTitle: "My Templates",
      visualCaption: "Save it, then test it.",
      settings: {
        "Menu Path": "File > Save As Template",
        "Project Chooser": "My Templates",
        "Naming": "Workflow + key assumption"
      },
      proTip:
        "Name templates by use case and constraint: Rock Band Tracking, Vocal Overdub, Mix Start - Stems, Mastering - Singles. The name should warn users about hidden assumptions.",
      avoidThis:
        "Do not overwrite a proven template in the middle of a paid session. Save a copy, test later, then promote the change.",
      checkYourWork:
        "A new project created from My Templates opens cleanly, routes signal correctly, and saves under a new song name.",
      stepScreenshot: "/assets/training/logic-templates/step5_my_templates.png"
    },
    {
      number: 6,
      title: "Design the Routing Architecture",
      concept:
        "Routing is the backbone of a template: sends feed buses, buses create aux returns, and stacks make large sessions controllable.",
      actions: [
        "Create subgroup buses for drums, bass, guitars, keys, vocals, effects, and mix print as needed.",
        "Create shared reverb, delay, parallel compression, and utility aux returns.",
        "Route reference tracks so they do not get colored by mix bus processing."
      ],
      body: body(
        "In Logic, sends, buses, and auxes are related but not identical. A send is the channel-strip control that sends part of a signal somewhere else. A bus is the pathway. An aux is the channel strip that receives the bus and can hold plugins, fader level, mute, solo, and routing. Good templates make that relationship visible through names. If a vocal track sends to Bus 21 and an aux named FX PLATE receives Bus 21, the session tells you what is happening. If everything is still named Aux 14, the template is not finished.",
        "Start with subgroups. For a band, useful sums include DRUM SUM, BASS SUM, GTR SUM, KEYS SUM, VOX SUM, BGV SUM, FX SUM, MUSIC SUM, and MIX PRINT. You do not need all of them in every session, but the ones you use should be predictable. Drums often benefit from a summing stack or drum bus because close mics, overheads, rooms, and parallel channels need collective control. Vocals often benefit from a lead vocal bus and a backing vocal bus before hitting a full vocal sum. Guitars can route through a guitar sum for broad tone shaping and automation.",
        "Then create shared effects. A short room return can help headphones and rough mixes feel less sterile. A plate can support vocals and snare. A slap delay can help lead vocal confidence during tracking. A longer delay can be muted until mix time. Parallel drum compression can be available but bypassed or pulled down. Label returns with both function and style: FX ROOM, FX PLATE, FX SLAP, FX 1/4 DELAY, DRUM CRUSH. Route all effects to an FX SUM if you like controlling ambience as a group.",
        "Keep reference tracks honest. A reference track should usually bypass your mix bus compressor, EQ, saturation, limiter, and loudness chain. Otherwise the reference is no longer a reference; it is your reference through your processing. Create a REF track or REF SUM and route it to the stereo output or monitor output in a way that avoids the mix bus color. If your interface or monitor controller supports alternate outputs, document the intended path.",
        "Plan print paths. Many mixers create a PRINT track that records the mix output in real time, plus a separate bounce workflow for final exports. Others rely on Bounce. Either approach is fine if the template makes it obvious. Add a muted PRINT track, a MIX BUS, or a print aux only when you know how it will be used. Ambiguous print routing is dangerous because it can accidentally create feedback or double monitoring.",
        "Finally, audit feedback loops and latency. A template full of auxes can hide circular routing mistakes. Send signal through each family, watch meters, and make sure no bus feeds itself. Keep look-ahead limiters, linear-phase processors, and high-latency restoration tools out of active tracking paths. Those processors may be useful later, but they are poor defaults when musicians need responsive monitoring."
      ),
      symbolName: "point.3.connected.trianglepath.dotted",
      visualTitle: "Routing Map",
      visualCaption: "Name every path.",
      settings: {
        "Core Sums": "Drums, bass, guitars, vocals, FX",
        "Shared FX": "Room, plate, slap, delay",
        "Reference Track": "Bypass mix bus color"
      },
      proTip:
        "Reserve bus ranges by category if your sessions get large. For example, 1-10 drums, 11-20 vocals, 21-30 FX, 31-40 print and utility.",
      avoidThis:
        "Avoid routing every track directly to the stereo output if the template is supposed to teach repeatable group control.",
      checkYourWork:
        "You can mute any major instrument family with one fader, and every send destination has a readable aux name.",
      stepScreenshot: null
    },
    {
      number: 7,
      title: "Use Track Stacks, Names, Colors, and Icons",
      concept:
        "Track stacks turn high-track-count sessions into readable chapters; colors and icons make those chapters fast to navigate.",
      actions: [
        "Use summing stacks when the group needs shared audio processing.",
        "Use folder stacks when the group only needs organization and VCA-style control.",
        "Assign stable colors and icons by instrument family before saving the template."
      ],
      body: body(
        "Logic Pro has two broad stack choices. Folder stacks organize tracks and let the main track control the group without changing audio routing. Apple describes the folder stack master as functioning like a VCA-style control for the folder. This is useful for arrangement organization, large MIDI sections, or groups that should collapse without creating a new audio subgroup. Summing stacks route the subtracks to an aux bus, so the main stack can hold plugins, sends, and shared processing. Use summing stacks when you want a real audio subgroup, such as drums, guitars, vocals, or a multi-output instrument.",
        "For a band template, summing stacks are usually the workhorse. A DRUMS summing stack can hold close mics, overheads, rooms, and drum parallel returns. A BASS summing stack can hold DI, amp, sub, and grit tracks. A GTRS summing stack can hold left, right, lead, and texture tracks. A VOX summing stack can hold lead, doubles, harmonies, and ad libs. The stack main tracks become chapter headers, mix handles, and processing points.",
        "Names should be short, consistent, and sortable. Prefer Kick In, Kick Out, Snare Top, Snare Bottom, OH L, OH R, Room L, Room R over vague labels like Audio 1. For buses and auxes, uppercase names can help distinguish group returns from source tracks: DRUM SUM, VOX PLATE, GTR SLAP, MIX BUS. If your studio uses input numbers, combine musical names with input references only where useful: Kick In - In 01. Do not make every track name so long that the mixer becomes unreadable.",
        "Colors should carry meaning. Pick a stable color language and keep it across templates. Drums might be yellow, bass orange, guitars green, keys purple, vocals blue, effects pink, references gray, and print tracks red. Some producers use brighter colors for lead elements and muted colors for utility tracks. The exact palette matters less than repetition. When every session follows the same color grammar, the arrange window becomes a map before you read any text.",
        "Icons add one more scanning layer. Use a drum icon for the drum stack, bass icon for bass, guitar icon for guitars, microphone icon for vocals, sparkle or echo icon for effects, speaker or waveform icon for print and reference. Avoid decorative chaos. Icons are there to speed recognition, not to make the session cute.",
        "Track stacks also support arrangement focus. During tracking, collapse everything except the active source. During mixing, collapse edited groups and expand the family you are balancing. During client playback, collapse technical utility tracks so the session looks calm. A good template should make those focus changes effortless."
      ),
      symbolName: "rectangle.3.group",
      visualTitle: "Session Chapters",
      visualCaption: "Stacks make big sessions readable.",
      settings: {
        "Summing Stack": "Audio subgroup + plugins",
        "Folder Stack": "Organization + VCA-style control",
        "Color Rule": "Same family, same color"
      },
      proTip:
        "Create the stack first, then route and color the child tracks. It is easier to audit one family at a time than to fix a fully built template later.",
      avoidThis:
        "Do not use folder stacks when you expect bus EQ, bus compression, or shared sends on the group. Use a summing stack for that.",
      checkYourWork:
        "With all stacks collapsed, the project still communicates the whole session structure at a glance.",
      stepScreenshot: "/assets/training/logic-templates/step7_track_stacks_colors.png"
    },
    {
      number: 8,
      title: "Set Channel Strips, Plugins, Pans, and Gain",
      concept:
        "Template processing should prepare a clean signal path while avoiding premature mix decisions.",
      actions: [
        "Add utility, EQ, compression, and meters only where they support a recurring workflow.",
        "Leave taste-heavy processors bypassed, disabled, or documented.",
        "Set default pans and gain targets conservatively."
      ],
      body: body(
        "Think of each channel strip as a starting lane, not a finished mix. A practical audio-track default might include Gain or a trim tool first, Channel EQ second, Compressor third, and a meter or tuner where relevant. On a vocal track, you might also include a de-esser slot but leave it bypassed. On a guitar track, a tuner or amp-sim placeholder may be useful. On a drum close mic, a gate slot can exist but should not be active unless your workflow depends on it. The template should remind you of the normal order while still requiring you to listen.",
        "Stock Logic plugins are excellent for templates because every user has them. Channel EQ, Compressor, Noise Gate, DeEsser, Multipressor, Direction Mixer, Gain, Tape Delay, ChromaVerb, Space Designer, Step FX, Phat FX, and the Vintage EQ Collection can cover a large amount of work without adding license problems. If you use third-party plugins, consider whether collaborators and mobile rigs will have them. A missing plugin on a template can slow the session more than no plugin at all.",
        "Use plugin states deliberately. Active plugins should be safe and low-latency. Bypassed plugins can document common options. Disabled or inactive tracks can hold heavier chains that are useful later but should not burden every new project. On the mix bus, analysis tools are safer defaults than tonal processors. A loud limiter on the stereo output can encourage bad gain staging if it is active from the start. If you include one for protection or rough exports, label it clearly and keep it bypassed until needed.",
        "Set pans only where the default is musically stable. Center kick, snare, bass, lead vocal, mono room, talkback, and print tracks. For stereo pairs, hard left-right may be a useful placeholder for overheads and rooms, but real sessions still need phase and image checks. For doubled guitars, opening rhythm left and rhythm right can speed a rough mix, but the final width depends on the arrangement. Save useful starting points, not rules you will forget to challenge.",
        "Gain staging matters because plugins respond differently depending on level. Many analog-modeled plugins expect moderate input, often around the neighborhood of -18 dBFS average level. A template can encourage this by placing trim tools first and by leaving faders near unity until after recording levels are set. For tracking, the real goal is no clipping and enough headroom. Peaks around -12 to -6 dBFS are usually comfortable for digital recording. For mixing imported tracks, use clip gain or region gain before plugin chains so every source enters the template at a predictable level.",
        "Finally, save channel-strip settings for recurring sources. Logic channel strip settings can turn a well-tested starting lane into a reusable source preset. Build Kick In, Snare Top, Bass DI, Bass Amp, Rhythm Guitar, Lead Vocal, and Backing Vocal as conservative strips. Name them by source and intent, not by fantasy. Lead Vocal Clean Start is better than Magic Vocal."
      ),
      symbolName: "slider.horizontal.3",
      visualTitle: "Signal Lanes",
      visualCaption: "Prepare, then listen.",
      settings: {
        "Tracking Peaks": "-12 to -6 dBFS",
        "Plugin Input Goal": "Moderate, not hot",
        "Mix Bus": "Meters active, tone optional"
      },
      proTip:
        "Put gain or trim before tone plugins. It gives you one obvious place to correct input level without rewriting the whole chain.",
      avoidThis:
        "Avoid active high-latency mastering processors in a tracking template. They can make performers feel disconnected from the session.",
      checkYourWork:
        "A raw source can pass through each default channel strip without clipping, obvious latency, or heavy tone coloration.",
      stepScreenshot: null
    },
    {
      number: 9,
      title: "Build an Albini-Inspired Rock Band Template",
      concept:
        "For a rock band, use the template to prioritize capture, phase, room tone, and fast headphone confidence rather than heavy preset processing.",
      actions: [
        "Create source tracks for a live rhythm section: drums, bass DI/amp, guitars, scratch vocal, room, and talkback.",
        "Use summing stacks for drums, bass, guitars, vocals, and effects.",
        "Keep processing light, with room mics, phase checks, and monitoring sends treated as first-class template elements."
      ],
      body: body(
        "A Steve Albini-inspired Logic template should not pretend to reproduce his rooms, microphones, console, or exact working methods inside a preset. Albini was known for prioritizing the band, the room, microphone placement, phase relationships, and honest capture over heavy producer-imposed processing. The useful lesson for a Logic template is philosophical: build a session that helps you document a real band quickly, with minimal friction, and without forcing the audio through a fashionable chain before you know what it sounds like.",
        "Start with drums because they define the physical picture of many rock records. Create a DRUMS summing stack with Kick In, Kick Out, Snare Top, Snare Bottom, Hat, Rack Tom, Floor Tom, OH L, OH R, Room Near L, Room Near R, Room Far Mono, and Drum Crush. Put a Gain plugin first on each source, then a bypassed Channel EQ. Leave compressors bypassed on close mics unless they are part of the headphone sound. Put a phase or gain utility where you can quickly flip polarity on kick, snare bottom, and multi-mic sources. The template should remind you to listen for phase before reaching for EQ.",
        "Give room microphones a real place in the template. Albini-associated discussions often emphasize room sound and natural ambience. In Logic, that means room tracks should not be afterthoughts at the bottom of the session. Name them clearly, color them with the drum family, and route them to the drum sum or a dedicated ROOM SUM. Include a note to check room mics against overheads and close mics before blending. If the room is bad, the template does not make it good; it simply keeps the decision visible.",
        "For bass, create a BASS summing stack with Bass DI, Bass Amp, and Bass Parallel. Keep DI centered and clean. Put a tuner or meter at the top, then a trim, then bypassed EQ/compression. If you often blend amp grit, add a muted parallel track or aux but do not force it on. For guitars, create a GTRS summing stack with Gtr L, Gtr R, Lead Gtr, Texture, and Amp Room if you mic a room or hallway. Pan rhythm placeholders left and right only as a starting picture. Keep corrective EQ bypassed until the arrangement says what is masking what.",
        "For vocals, create Lead Vox, Double, BGV L, BGV R, and Scratch Vox. During live tracking, scratch vocals need comfort and communication more than polish. A slap delay and plate return can be available for headphones, but keep printed vocal processing minimal unless the performer needs a specific sound. Route talkback clearly and make it impossible to confuse with the lead vocal track.",
        "Create effects returns that support the rock template without turning it into a preset mix: FX ROOM, FX PLATE, FX SLAP, and DRUM CRUSH. The room return can be short and subtle for monitoring. The plate can support vocal or snare in the rough mix. The slap can help singers perform. The drum crush can be pulled up only if the song wants aggression. Save the template with these returns labeled and mostly down, because the record should still be built from the players and microphones first.",
        "This template also benefits from practical session tracks: REF, PRINT, NOTES, TALKBACK, CLICK, and TUNER. REF bypasses mix coloration. PRINT records rough mixes if desired. NOTES stores input list, take notes, mic choices, and problems. TALKBACK routes to headphones only. CLICK is easy to mute and route. TUNER is available for guitars and bass without hunting for a plugin. Those utility details are not glamorous, but they are exactly what keeps a full band day from becoming chaotic."
      ),
      symbolName: "guitars",
      visualTitle: "Rock Band Start",
      visualCaption: "Capture first, process lightly.",
      settings: {
        "Drum Priority": "Phase + room mics",
        "Bass Tracks": "DI + amp + optional parallel",
        "Guitar Default": "Doubles ready, tone open",
        "Vocal FX": "Comfort sends, not printed hype"
      },
      proTip:
        "Put a phase-check reminder in the DRUMS stack note. Before EQ, compare kick in/out, snare top/bottom, overheads, and rooms at matched level.",
      avoidThis:
        "Do not label a preset chain as an exact Albini sound. Treat it as an inspired workflow focused on natural capture and restraint.",
      checkYourWork:
        "A band can walk in, line check, hear a headphone mix, and record a complete live take without you creating new core tracks.",
      stepScreenshot: "/assets/training/logic-templates/step9_rock_band_template.png"
    },
    {
      number: 10,
      title: "Add Producer Workflow Tips and Tricks",
      concept:
        "The best templates include small studio habits that prevent avoidable mistakes during real sessions.",
      actions: [
        "Add markers, notes, key commands, and visual cues that speed session decisions.",
        "Create cue-send defaults and reference routing before musicians arrive.",
        "Add quality-control checkpoints for mono, phase, loudness, and export."
      ],
      body: body(
        "Producer template advice online tends to repeat the same high-value themes: organize first, route once, gain stage early, use shared effects, keep references close, and make the first creative move fast. Those ideas are simple, but a template makes them automatic. Add them as visible behaviors instead of hoping you remember them under pressure.",
        "Use markers as workflow anchors. A tracking template can include Setup, Line Check, Take 1, Comp Notes, Edit, Rough Mix, and Bounce. A songwriting template can include Intro, Verse, Pre, Chorus, Bridge, and Outro. A mastering template can include Song 1, Song 2, Reference, Loudness Check, and Export Notes. Markers help producers jump quickly during playback and talk about arrangement without dragging the playhead around randomly.",
        "Use notes aggressively. Logic project notes or a dedicated notes track can hold the input list, headphone assignments, rough mix reminders, and template version. In a band session, notes can list who is on which headphone mix, which guitar amp is mic'd, which take was strongest, and what needs fixing later. Notes turn the template into a session document, not just a mixer layout.",
        "Create cue-send defaults if you record musicians. Headphone sends should be named, routed, and tested before anyone asks for more vocal. Keep sends pre-fader or post-fader according to your monitoring strategy and label the choice. If the studio uses multiple cue mixes, create CUE A, CUE B, CUE C, and CUE D returns or outputs with clear ownership. A well-built cue section can save more time than any plugin chain.",
        "Add reference and mix-check tools. A REF track, mono check utility, correlation meter, loudness meter, and spectrum analyzer can live in the template. Keep them organized and avoid routing references through mix bus processors. Add a muted checklist region or note near the end of the session: mono check, low-volume check, headphones check, reference check, no clipping, export settings confirmed.",
        "Use inactive placeholders for optional workflows. If you often need a parallel vocal crush, a drum sample support track, a bass reamp track, or a guitar DI safety track, include it but mute or disable it. The placeholder reminds you it exists without consuming attention. Producers often move faster because their options are visible and named, not because every option is active.",
        "Build a reset habit. At the end of a project, write down which template changes would have saved time. Do not update the template during emotional moments when a mix finally works. Wait until the session is over, then decide whether the change is generally useful. Templates improve by surviving real projects, not by absorbing every one-off trick."
      ),
      symbolName: "lightbulb",
      visualTitle: "Studio Habits",
      visualCaption: "Make good habits visible.",
      settings: {
        "Cue Sends": "Named and tested",
        "Markers": "Workflow + arrangement",
        "References": "Close, level matched, unprocessed"
      },
      proTip:
        "Keep a TEMPLATE CHANGELOG note inside the source project. Add ideas during sessions, then promote only the ones that helped more than once.",
      avoidThis:
        "Avoid making the template bigger every time a session gets difficult. Sometimes the correct fix is a better note, not another track.",
      checkYourWork:
        "The template includes visible reminders for monitoring, references, export, and session notes without cluttering the creative workspace.",
      stepScreenshot: null
    },
    {
      number: 11,
      title: "Make a Mix and Master Start Template",
      concept:
        "A mix template and a mastering template need different defaults from a tracking template, especially around references, loudness, and print paths.",
      actions: [
        "Create import lanes and group buses for stems or multitracks.",
        "Add reference, analysis, print, and loudness tools while keeping tonal processing optional.",
        "Separate rough-loudness tools from final delivery decisions."
      ],
      body: body(
        "A tracking template helps capture performances. A mix template helps turn recorded material into a finished balance. A mastering template helps sequence, quality-control, and deliver final files. Do not force one template to do all three jobs unless your projects are extremely simple. The defaults that help a drummer monitor comfortably can be the wrong defaults for mastering a stereo mix.",
        "For a mix-start template, create lanes for imported tracks or stems. If you mix from raw multitracks, keep the family structure familiar: drums, bass, guitars, keys, vocals, effects, references, print. If you mix from stems, create fewer lanes: DRUM STEM, BASS STEM, GTR STEM, KEYS STEM, VOX STEM, BGV STEM, FX STEM. Include a clear import note telling the user to check file start time, sample rate, bit depth, tempo, and whether files are mono or stereo. A surprising number of mix problems begin as import problems.",
        "Mix templates can include more processing than tracking templates, but they still should not make the mix before the song arrives. Bus EQs, compressors, saturators, and effects can be present as bypassed starting points. Shared reverbs and delays can be ready. A rough limiter can exist for client previews, but it should be labeled ROUGH LOUDNESS and bypassed while balancing. Include gain staging tools before bus processors because imported tracks can arrive too hot, too quiet, or inconsistently printed.",
        "For mastering, create a different template with stereo source tracks, reference tracks, analysis meters, loudness meters, true-peak monitoring, notes, and export lanes. Add sections for streaming master, high-resolution archive, instrumental, clean version, or vinyl pre-master only if you actually deliver them. Keep the mastering chain modular: corrective EQ, compression, saturation, stereo control, limiting, dither. The template can show the order, but settings must come from the material.",
        "Be careful with bit depth and export. During recording and mixing, 24-bit files are common. Final delivery may require 24-bit WAV, 16-bit WAV with dither, AAC, MP3, or platform-specific loudness targets. The template should document expected delivery formats but not confuse bit depth with bitrate. If a client asks for a 320 kbps MP3, that is a compressed bitrate deliverable. If they ask for a 24-bit WAV, that is an uncompressed bit-depth deliverable.",
        "Add a print and verification section. A mix template can have PRINT MIX, PRINT INST, PRINT TV, and PRINT ACAPELLA tracks if you often deliver alternates. A mastering template can have final bounce notes and a checklist for start/end trims, fades, metadata notes, silence, loudness, true peak, and file naming. These checklists are perfect template material because they reduce avoidable delivery mistakes."
      ),
      symbolName: "waveform.badge.magnifyingglass",
      visualTitle: "Finish Workflows",
      visualCaption: "Mix and master need separate starts.",
      settings: {
        "Mix Template": "Groups + FX + print",
        "Master Template": "Meters + sequence + export",
        "Rough Limiter": "Bypassed until preview"
      },
      proTip:
        "Keep reference tracks on their own path in both mix and mastering templates. Level-match them manually so the louder file does not always seem better.",
      avoidThis:
        "Do not master through a chain that is active just because the template opened that way. Every processor should earn its place on the current song.",
      checkYourWork:
        "The mix template can import raw tracks cleanly, and the mastering template can verify loudness, true peak, fades, and file naming.",
      stepScreenshot: null
    },
    {
      number: 12,
      title: "Maintain, Audit, and Retire Templates",
      concept:
        "Templates are living studio infrastructure; they need testing, versioning, cleanup, and retirement when they stop helping.",
      actions: [
        "Audit the template after real sessions and remove anything unused.",
        "Keep a source build project and version notes for meaningful changes.",
        "Retire old templates so Project Chooser stays trustworthy."
      ],
      body: body(
        "A template is only useful if it remains trusted. Over time, even good templates collect dust: old plugin choices, obsolete interface outputs, unused sends, abandoned mix-bus chains, missing third-party licenses, old color systems, broken cue routing, and tracks created for clients who never returned. Schedule a periodic audit after a few projects. Open a new project from the template and ask which tracks were used, which tracks were hidden every time, which plugins were always bypassed, and which setup chores still had to be done manually.",
        "Use real sessions as evidence. If you created the same aux by hand in three different projects, it may belong in the template. If a default plugin was bypassed in every project, it probably does not. If every vocalist asked for the same slap delay, make the return easier to reach. If every drummer complained about headphone latency, remove high-latency processors from the tracking path. The template should evolve from repeated observation, not from anxiety.",
        "Keep a source build project for each template. Installed templates are convenient for starting work, but the source build project is the maintainable document. Store it in a folder such as Studio Templates Source, with one project per template and a short changelog note inside. When you make a change, update the source, save as a new template, create a test project, and confirm the Project Chooser version is the one you expect.",
        "Retire aggressively. Old templates are dangerous because they look official. If a template assumes an interface you no longer own, a plugin subscription you cancelled, or a routing setup the studio no longer uses, move it to an archive folder or remove it from the active My Templates list. A beginner should not have to guess which template is current.",
        "Back up templates. Logic user templates live in the user's Music and Audio Music Apps template area, and they can disappear during machine changes if you do not migrate them. Keep backups of the source projects and, if needed, the installed template files. In a studio with multiple Macs, document how templates are distributed and how changes are approved. Otherwise each room slowly drifts into a different workflow.",
        "Finally, keep the template humble. A great template gets you to the first meaningful decision quickly. It does not guarantee a good recording, make a weak arrangement strong, or replace listening. The best sign is that musicians do not notice it. They simply feel that the session starts smoothly, headphone mixes arrive quickly, files are organized, and the engineer stays focused on the performance."
      ),
      symbolName: "wrench.and.screwdriver",
      visualTitle: "Template Health",
      visualCaption: "Audit what real sessions prove.",
      settings: {
        "Promote": "Repeated useful changes",
        "Remove": "Unused clutter",
        "Archive": "Obsolete interfaces or plugins"
      },
      proTip:
        "When a session ends, write one template note: keep, add, remove, or fix. Tiny maintenance notes compound into a much better studio system.",
      avoidThis:
        "Avoid keeping five nearly identical active templates. If people cannot tell which one to use, the template library is part of the problem.",
      checkYourWork:
        "The active template list contains only current, tested, named workflows with source projects and clear version notes.",
      stepScreenshot: null
    }
  ]
};
