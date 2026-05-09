export interface FaqImage {
  src: string;
  alt: string;
  caption: string;
}

export interface FaqBlock {
  title: string;
  paragraphs: readonly string[];
  takeaways: readonly string[];
  image: FaqImage;
  symbolName: string;
  visualCaption: string;
  settings?: Record<string, string>;
  proTip: string;
  avoidThis: string;
  checkYourWork: string;
}

export interface FaqSection {
  id: string;
  shortTitle: string;
  question: string;
  answer: string;
  blocks: readonly FaqBlock[];
}

const assetPath = "/assets/articles/faq";

export const frequentlyAskedQuestionsArticle = {
  title: "Frequently Asked Questions",
  description:
    "Practical Logic Pro answers for saving projects, managing storage, choosing buffer sizes, using stock plugins, exporting songs, reading waveforms, comping takes, bouncing tracks, checking mono, and zooming waveforms.",
  updatedLabel: "Updated May 2026",
  sections: [
    {
      id: "logicx-file-or-folder",
      shortTitle: "Save Format",
      question: "Should I save to a .logicx file or to a folder? Does it matter?",
      answer:
        "Use a folder project when you are recording audio, moving sessions between drives, or collaborating. A package project is tidy for simple writing sessions, but folders make audio files easier to inspect, back up, and recover.",
      blocks: [
        {
          title: "Package projects are tidy, but folders are safer for recording",
          paragraphs: [
            "Logic Pro can save a project as a single package file with the .logicx extension or as a folder that contains the project file plus subfolders for audio, bounces, samples, and backups. The package is convenient because it behaves like one file in Finder, which is helpful when you are writing with software instruments or sketching an idea that has few external assets. The tradeoff is visibility: beginners often assume everything is safely inside the package even when some samples or recordings are still referenced from elsewhere.",
            "For band recording, a folder project is usually the better default. It lets you open the Audio Files folder, confirm that new takes are actually present, and copy the entire session to another drive without guessing what is hidden in a package. It also makes troubleshooting simpler if an audio file goes missing. The musical result is the same either way; the difference is project management, recovery, and how easily you can verify the session before archiving."
          ],
          takeaways: [
            "Choose Folder for serious audio recording and collaboration.",
            "Choose Package for small writing sessions when convenience matters.",
            "Always include assets when copying or archiving either format."
          ],
          image: {
            src: `${assetPath}/01-project-package.png`,
            alt: "Illustration comparing a compact Logic Pro package project with visible project contents.",
            caption: "A package keeps the session tidy, but it can hide where audio and external assets live."
          },
          symbolName: "doc.fill",
          visualCaption: "Package project: clean and compact.",
          settings: {
            "Best for": "Writing sketches, software-instrument ideas",
            "Watch out for": "Missing external audio or sample references"
          },
          proTip:
            "If you start as a package and the project becomes a real production, use Save As and switch to a folder before tracking the full band.",
          avoidThis:
            "Do not drag only the .logicx project file to a new drive and assume every recording, sample, impulse response, and bounce went with it.",
          checkYourWork:
            "Open the copied project on the destination drive and confirm the Audio Files folder or package assets contain the recent recordings."
        },
        {
          title: "Use folder projects when the session needs to be portable",
          paragraphs: [
            "A folder project is easier to audit because the project file sits next to the media it depends on. When a drummer records twenty takes, you can see the audio files appear inside the project folder. When you make a rough bounce for the singer, you can keep it in the Bounces folder. When the session is done, you can zip or copy one parent folder and know what you are sending. This plain structure matters when you revisit a song months later and cannot remember where the source files came from.",
            "The safest habit is to create a dedicated folder for each song before the first take. Name it clearly with artist, song title, and date or version. Keep the Logic project, audio, bounces, notes, and references together. If you collaborate, send the whole folder, not isolated pieces. If you archive, store the whole folder plus a final stereo bounce. That way the production remains understandable even if a plugin setting, computer path, or external drive changes later."
          ],
          takeaways: [
            "Keep one parent folder per song.",
            "Store audio, bounces, notes, and references with the project.",
            "Archive the folder plus a final WAV bounce."
          ],
          image: {
            src: `${assetPath}/02-folder-project.png`,
            alt: "Illustration of a Logic Pro folder project with visible audio and bounce folders.",
            caption: "A folder project makes session assets visible so copying and archiving are less mysterious."
          },
          symbolName: "folder.fill",
          visualCaption: "Folder project: portable and inspectable.",
          settings: {
            "Recommended for": "Band tracking, client work, collaboration",
            "Archive format": "Entire project folder plus final WAV"
          },
          proTip:
            "Before deleting anything, use File > Project Management > Consolidate to gather external media into the active project.",
          avoidThis:
            "Avoid saving several different songs inside one shared folder named something generic like New Project.",
          checkYourWork:
            "The project folder has a clear song name and contains the media needed to open the session on another machine."
        }
      ]
    },
    {
      id: "limited-drive-space",
      shortTitle: "Storage",
      question:
        "I have limited hard drive space on my computer. Is it okay to save files to a USB drive or network storage? What about plugins or samples?",
      answer:
        "External drives are fine for sessions if they are fast, reliable, and locally connected. Avoid recording directly to slow USB sticks or unstable network shares. Install plugins on the system drive, and put large sample libraries on a fast external SSD only when the sampler supports it.",
      blocks: [
        {
          title: "Record to a fast local drive, not a fragile thumb drive",
          paragraphs: [
            "Audio recording is continuous disk writing. If the drive stalls, sleeps, disconnects, or cannot keep up, Logic may stop recording or produce errors. A modern internal SSD is the most reliable place to record. A good external SSD connected by USB-C or Thunderbolt can also work very well, especially for large multitrack projects. A cheap USB thumb drive is a poor choice because sustained write speed and heat behavior are often much worse than the label suggests.",
            "Network storage is useful for backup and archiving, but it is risky as the live recording location. Wi-Fi dropouts, file locking, permissions, and latency can all interrupt a session. If storage is tight, record to a dependable local drive first, then copy the finished project to network storage after the session. Keep at least one separate backup before deleting local work. The goal is boring reliability: the drive should disappear from your attention so you can focus on the performance."
          ],
          takeaways: [
            "Use internal SSD or fast external SSD for active sessions.",
            "Avoid recording directly to USB thumb drives.",
            "Use network storage for backup after recording, not as the live work drive."
          ],
          image: {
            src: `${assetPath}/03-local-drive.png`,
            alt: "Illustration of a local drive used as the active Logic Pro recording destination.",
            caption: "Active recording wants a stable local disk path with dependable sustained write speed."
          },
          symbolName: "externaldrive.fill",
          visualCaption: "Record where the drive is fast and stable.",
          settings: {
            "Active session": "Internal SSD or external SSD",
            "Archive location": "Secondary drive or network backup",
            "Avoid": "Slow USB sticks for multitrack recording"
          },
          proTip:
            "Leave free space on the recording drive; an SSD that is nearly full can slow down and make session management harder.",
          avoidThis:
            "Do not trust a single portable drive as the only copy of an important recording.",
          checkYourWork:
            "Logic records a long test pass without disk warnings, and the session has at least one backup outside the active drive."
        },
        {
          title: "Keep plugins installed normally; move samples only with intent",
          paragraphs: [
            "Plugins are applications and system components. Install them where the manufacturer expects, usually on the system drive through the vendor installer. Moving plugin files manually can break validation, licensing, updates, and presets. The plugin itself rarely consumes the kind of space that ruins a music computer; sample libraries, impulse responses, and downloaded content are usually the real storage pressure.",
            "Large sample libraries can live on an external SSD if the instrument supports a custom library path. Kontakt, Spitfire, Superior Drummer, and many other tools can point to an external library location. The drive should be fast enough for streaming and should use a consistent name so the path does not change every time you plug it in. For Logic's own Sound Library, use the built-in Relocate Sound Library feature rather than dragging files by hand. After moving content, open a few projects and confirm instruments load before you erase the original copy."
          ],
          takeaways: [
            "Install plugins through vendor installers.",
            "Move sample libraries only through supported library-location tools.",
            "Use a fast external SSD for big sample content."
          ],
          image: {
            src: `${assetPath}/04-external-storage.png`,
            alt: "Illustration of sample libraries stored on a fast external SSD while plugins remain installed normally.",
            caption: "Move large libraries with supported tools; do not manually scatter plugin components."
          },
          symbolName: "shippingbox.fill",
          visualCaption: "Samples can move; plugins usually stay.",
          settings: {
            "Plugins": "System drive via installer",
            "Large samples": "Fast external SSD if supported",
            "Logic library": "Use Relocate Sound Library"
          },
          proTip:
            "Give the external sample drive a permanent, descriptive name so library paths remain consistent across restarts.",
          avoidThis:
            "Avoid dragging AU plugin components into random folders to save space; it often creates harder problems than it solves.",
          checkYourWork:
            "After relocation, open a project that uses the library and confirm patches load without missing-file prompts."
        }
      ]
    },
    {
      id: "buffer-recording-mixing",
      shortTitle: "Buffer",
      question: "Should I change the buffer when mixing or recording?",
      answer:
        "Yes. Use a lower buffer while recording to reduce latency, then raise it while mixing to give the computer more time for plugins and virtual instruments.",
      blocks: [
        {
          title: "Lower buffer sizes help performers feel connected",
          paragraphs: [
            "The I/O buffer size controls how much audio the computer collects before processing it. A smaller buffer, such as 64 or 128 samples, usually means lower monitoring latency. That matters when a singer hears their voice through headphones or a guitarist plays through amp simulation. If the delay feels like a slapback echo, the performance suffers. The cost is CPU pressure: the computer has less time to calculate plugins before the next audio chunk arrives.",
            "When recording, keep the session light. Turn off heavy mastering chains, oversampling, linear-phase processors, and lookahead limiters. Use direct monitoring through your interface if available, or use Logic's Low Latency Mode when software monitoring must stay on. If pops and overloads appear at 64 samples, try 128. The right value is the lowest stable buffer for that computer, interface, and session."
          ],
          takeaways: [
            "Use 64 or 128 samples as a recording starting point.",
            "Disable high-latency processors while tracking.",
            "Turn on Low Latency Mode when needed."
          ],
          image: {
            src: `${assetPath}/05-recording-buffer.png`,
            alt: "Illustration of a low buffer setting for recording with reduced monitoring latency.",
            caption: "Recording favors low latency, even if that means temporarily simplifying the mix session."
          },
          symbolName: "speedometer",
          visualCaption: "Low buffer for tracking.",
          settings: {
            "Recording start": "64-128 samples",
            "If unstable": "Try 256 samples or direct monitoring",
            "Helpful mode": "Low Latency Mode"
          },
          proTip:
            "Create a tracking version of the session with heavy mix-bus plugins bypassed before overdubs.",
          avoidThis:
            "Do not record vocals through a high-latency mastering chain and wonder why the singer feels behind the beat.",
          checkYourWork:
            "The performer can monitor comfortably without audible delay, clicks, or CPU overload messages."
        },
        {
          title: "Raise the buffer when latency no longer matters",
          paragraphs: [
            "Mixing is different because nobody is trying to perform in real time. You can raise the buffer to 512 or 1024 samples so the computer has more time to run EQs, compressors, reverbs, instruments, and analyzers. The session may feel slightly less instant when you press play or move controls, but it will usually be more stable. This is especially helpful near the end of a mix when plugin counts are high.",
            "A higher buffer does not change the quality of the bounce. It simply changes how the computer schedules audio processing. If you need to record one more vocal line late in the mix, temporarily lower the buffer again or make a reduced-latency tracking copy. Think of buffer size as a workflow switch: low for performance feel, high for processing headroom. Change it whenever the job changes."
          ],
          takeaways: [
            "Use 512 or 1024 samples while mixing dense sessions.",
            "Quality does not improve just because the buffer is larger.",
            "Lower it again for overdubs."
          ],
          image: {
            src: `${assetPath}/06-mixing-buffer.png`,
            alt: "Illustration of a high buffer setting for mixing with more CPU headroom.",
            caption: "Mixing favors stability and plugin headroom because monitoring latency is no longer critical."
          },
          symbolName: "cpu.fill",
          visualCaption: "High buffer for mixing.",
          settings: {
            "Mixing start": "512 samples",
            "Very dense mix": "1024 samples",
            "Late overdub": "Lower buffer or use a tracking copy"
          },
          proTip:
            "Freeze or bounce software-instrument tracks if a high buffer still cannot keep the session stable.",
          avoidThis:
            "Avoid troubleshooting mix CPU overloads while still running a tiny recording buffer for no reason.",
          checkYourWork:
            "The mix plays through without overloads, and latency is only lowered again when someone records."
        }
      ]
    },
    {
      id: "stock-or-paid-plugins",
      shortTitle: "Plugins",
      question: "Do I really need to buy plugins or can I use the stock plugins?",
      answer:
        "You can absolutely make finished records with Logic's stock plugins. Buy third-party plugins only when you understand the specific workflow, sound, or metering problem they solve for you.",
      blocks: [
        {
          title: "Logic stock plugins cover the core jobs",
          paragraphs: [
            "Logic Pro includes capable EQ, compression, noise gate, de-essing, saturation, reverb, delay, amp modeling, pitch tools, metering, and mastering processors. For a beginner or intermediate mixer, the limiting factor is usually not the lack of a famous plugin. It is level balance, arrangement, editing, gain staging, monitoring, and knowing what problem a processor is supposed to solve. Stock Channel EQ, Compressor, Space Designer, ChromaVerb, Tape Delay, Phat FX, Multipressor, Adaptive Limiter, and Loudness Meter can take a song a long way.",
            "Using stock tools also helps you learn transferable concepts. Threshold, ratio, attack, release, high-pass filters, shelves, send levels, and output gain work everywhere. Once your mixes improve with stock tools, you will recognize what a third-party plugin actually adds: a faster workflow, a particular color, better visual feedback, a favorite preset ecosystem, or specialized processing. Until then, buying more plugins can become a way to avoid making decisions."
          ],
          takeaways: [
            "Learn EQ, compression, sends, and metering with stock tools first.",
            "Logic has enough processing for professional results.",
            "Skill and monitoring beat plugin shopping."
          ],
          image: {
            src: `${assetPath}/07-stock-plugin-chain.png`,
            alt: "Illustration of a Logic Pro channel strip using stock-style EQ, compression, and effects modules.",
            caption: "Stock plugins cover the essential chain: gain, EQ, dynamics, space, and metering."
          },
          symbolName: "slider.horizontal.3",
          visualCaption: "Stock tools can finish a mix.",
          settings: {
            "Core chain": "Gain, EQ, compression, sends, metering",
            "Logic examples": "Channel EQ, Compressor, ChromaVerb",
            "Best investment": "Monitoring and practice"
          },
          proTip:
            "Build one reliable stock vocal chain and one stock drum bus chain before buying replacements.",
          avoidThis:
            "Do not buy a plugin because a tutorial used it if you cannot explain what it should improve in your mix.",
          checkYourWork:
            "You can identify the purpose of every plugin in the chain without naming a brand."
        },
        {
          title: "Buy plugins for a clear need, not for permission to finish",
          paragraphs: [
            "Paid plugins can be excellent. Some have faster interfaces, better presets, convincing analog color, deeper metering, or unique creative effects. A great limiter, vocal tuner, restoration tool, drum sample instrument, or room correction system can be worth the money when it solves a recurring problem. The key is to buy from friction, not fear. If you repeatedly hit the same limit with stock tools and can describe the missing feature, a purchase may be rational.",
            "Before buying, demo the plugin in an actual mix and level-match the output. Louder demos sell plugins. Ask whether the new tool helps you make better decisions faster, or whether it simply sounds exciting in solo. Also consider CPU, licensing, update reliability, and whether collaborators will have the same plugin. A finished song made with stock plugins is more valuable than an unfinished song waiting for another sale."
          ],
          takeaways: [
            "Demo in a real project before buying.",
            "Level-match before judging tone.",
            "Buy when the need repeats across sessions."
          ],
          image: {
            src: `${assetPath}/08-plugin-upgrade-choice.png`,
            alt: "Illustration of a decision point between stock plugins and a focused third-party upgrade.",
            caption: "A plugin upgrade should solve a repeatable workflow or sonic problem."
          },
          symbolName: "puzzlepiece.fill",
          visualCaption: "Upgrade with intent.",
          settings: {
            "Good reason": "Specific repeated problem",
            "Bad reason": "Fear that stock tools are not valid",
            "Before buying": "Demo, level-match, check CPU"
          },
          proTip:
            "Keep a short wish list of problems, not products. The right purchase becomes obvious when the same problem appears in several projects.",
          avoidThis:
            "Avoid stacking multiple paid processors just because each one sounds impressive in isolation.",
          checkYourWork:
            "The plugin makes the mix better at matched loudness and saves time on a problem you already understand."
        }
      ]
    },
    {
      id: "export-finished-song",
      shortTitle: "Export",
      question: "I finished a song. How do I export it?",
      answer:
        "Set the cycle or project end to include the full song and reverb tails, choose File > Bounce > Project or Section, export a full-quality WAV or AIFF, and create compressed copies only after you have checked the master file.",
      blocks: [
        {
          title: "Set the song range before bouncing",
          paragraphs: [
            "Exporting starts before the Bounce window. Make sure the project start and end cover exactly what should be heard. If you use Cycle mode, Logic can bounce the cycle range, which is useful when you intentionally set it around the song. If the cycle is left over from editing one chorus, you may accidentally export only that section. Include count-in only if it belongs in the file, and leave enough space at the end for reverb, delay, cymbal, and amp tails to decay naturally.",
            "Solo and mute states matter. Hidden tracks, muted buses, inactive sends, sidechains, and routing mistakes will print exactly as they are. Before bouncing, play the song from start to finish and watch the stereo output. There should be no red clipping indicators. If you are exporting a mix for mastering, leave headroom and avoid a loud limiter unless the mastering engineer asked for it. If you are exporting a final master, verify loudness and peak targets for the destination."
          ],
          takeaways: [
            "Set cycle or project end intentionally.",
            "Include effect tails.",
            "Watch the stereo output for clipping before export."
          ],
          image: {
            src: `${assetPath}/09-bounce-range.png`,
            alt: "Illustration of a Logic Pro bounce range covering the full song and effect tail.",
            caption: "The bounce range should include the whole song, not an accidental edit loop."
          },
          symbolName: "arrow.left.and.right",
          visualCaption: "Select the full song range.",
          settings: {
            "Mix for mastering": "24-bit WAV or AIFF, no clipping",
            "Final share": "Master WAV plus AAC/MP3 copy",
            "Tail safety": "Leave room after the last note"
          },
          proTip:
            "Place a marker at the real song end plus tails so future bounces use the same range.",
          avoidThis:
            "Do not bounce while a short editing cycle is still enabled unless that short section is the intended export.",
          checkYourWork:
            "The bounce starts and ends exactly where expected, including reverb and delay tails."
        },
        {
          title: "Export a high-quality master, then make delivery copies",
          paragraphs: [
            "In Logic, use File > Bounce > Project or Section. For an archive or mastering handoff, choose PCM, WAV or AIFF, the project sample rate, and 24-bit depth. If the bounce is a final master for casual sharing, you can also create AAC or MP3, but do not make the compressed file your only master. Keep the full-resolution file because every future upload, radio edit, video sync, or remaster can start from that clean source.",
            "After bouncing, listen to the exported file outside the project. Re-import it into a blank track or play it in Finder, Music, or another player. Check the first seconds, loudest chorus, quiet bridge, and final tail. Confirm there is no clipped start, missing bus, muted vocal, wrong sample rate, or accidental limiter bypass. Exporting is not finished until the file is verified. Many embarrassing delivery mistakes are simply unverified bounces."
          ],
          takeaways: [
            "Archive WAV or AIFF at 24-bit.",
            "Create compressed copies after the lossless master.",
            "Listen to the exported file before sending it."
          ],
          image: {
            src: `${assetPath}/10-export-settings.png`,
            alt: "Illustration of export settings for a full-quality song bounce.",
            caption: "Keep a lossless master file, then make compressed delivery versions when needed."
          },
          symbolName: "square.and.arrow.up",
          visualCaption: "Bounce, then verify.",
          settings: {
            "Archive format": "WAV or AIFF",
            "Bit depth": "24-bit",
            "Compressed copy": "AAC or MP3 after verification"
          },
          proTip:
            "Name bounces with song title, version, date, and purpose, such as SongName_mix_v03_24bit.wav.",
          avoidThis:
            "Avoid sending the first bounce without listening to the exported file from beginning to end.",
          checkYourWork:
            "The exported file plays correctly outside Logic and matches the intended version."
        }
      ]
    },
    {
      id: "waveform-recording-levels",
      shortTitle: "Waveform Levels",
      question:
        "I recorded a track but I barely see the waveform or the waveform is really large. What should I visually be looking for to know the levels are good?",
      answer:
        "Waveform size is a useful clue, but meters matter more. Aim for clean recordings with peaks roughly around -12 to -6 dBFS, no clipping, and enough visible waveform shape to edit comfortably.",
      blocks: [
        {
          title: "Tiny waveforms usually mean conservative level, not automatic failure",
          paragraphs: [
            "A small waveform can be perfectly usable if it was recorded cleanly above the noise floor. Digital recording does not require pushing levels near zero. In fact, recording too hot is a common beginner mistake because clipped audio cannot be repaired cleanly. If the performance sounds clear, the meter peaks are healthy, and there is no hiss problem when the track is balanced in the mix, a smaller waveform is not a crisis.",
            "The practical target for many sources is peaks around -12 to -6 dBFS while recording. Average level will be lower. Quiet acoustic instruments may peak lower, loud drums may jump higher, and controlled DI sources may sit more evenly. The visual waveform should show recognizable shape, not a flat hairline lost in noise. Use the channel meter and region gain together: if the recording is clean but visually small, increase waveform zoom for editing rather than recording dangerously hot next time."
          ],
          takeaways: [
            "Judge level with meters first.",
            "Clean small waveforms can be fine.",
            "Use waveform zoom for visibility instead of over-recording."
          ],
          image: {
            src: `${assetPath}/11-small-waveform.png`,
            alt: "Illustration of a small but clean waveform with safe recording headroom.",
            caption: "A smaller waveform can still be healthy if it is clean and well above the noise floor."
          },
          symbolName: "waveform",
          visualCaption: "Small does not always mean wrong.",
          settings: {
            "Typical peaks": "-12 to -6 dBFS",
            "Avoid": "Clipping at 0 dBFS",
            "For editing": "Use waveform zoom"
          },
          proTip:
            "If a microphone source is noisy, improve mic placement and preamp gain before solving everything with plugins.",
          avoidThis:
            "Do not normalize every quiet-looking region before understanding whether it is actually too quiet in the mix.",
          checkYourWork:
            "The track can be balanced with the fader in a normal range and no obvious noise or clipping."
        },
        {
          title: "Huge waveforms warn you to check clipping and input gain",
          paragraphs: [
            "A waveform that fills the region top to bottom may be loud, clipped, or simply zoomed vertically. First check the actual meters and the region itself. If flat squared-off tops are visible and the input or track clipped during recording, re-record if possible. Digital clipping is harsh because the waveform has hit the ceiling. Pulling the fader down afterward makes the clipped audio quieter, but it does not restore the lost transient detail.",
            "Healthy recordings leave headroom. Peaks can be strong without touching 0 dBFS. If the source is too hot, reduce the interface preamp, instrument output, pedal output, or plugin input before the recording stage. If the waveform only looks huge because vertical zoom is high, lower waveform zoom and keep working. The visual goal is a clear shape with transient peaks and body, not the largest block possible."
          ],
          takeaways: [
            "Look for flat tops and clip indicators.",
            "Lower input gain before the recording clips.",
            "Keep headroom even on loud sources."
          ],
          image: {
            src: `${assetPath}/12-healthy-waveform.png`,
            alt: "Illustration comparing a healthy waveform with meters that leave headroom.",
            caption: "Good recording levels show shape and punch while leaving room below digital zero."
          },
          symbolName: "waveform.path.ecg",
          visualCaption: "Healthy shape beats maximum size.",
          settings: {
            "Good peak zone": "-12 to -6 dBFS",
            "Danger zone": "Red clip lights or flat tops",
            "Fix before take": "Lower input gain"
          },
          proTip:
            "For drums and vocals, leave extra headroom because performers often get louder after the first test pass.",
          avoidThis:
            "Avoid using the track fader as a cure for clipped input audio.",
          checkYourWork:
            "The waveform has visible shape, the loudest peaks do not clip, and the meter never hits red."
        }
      ]
    },
    {
      id: "record-several-takes",
      shortTitle: "Takes",
      question: "Can I record several takes and choose parts of each?",
      answer:
        "Yes. Logic's take folders let you loop-record multiple passes, then swipe the best phrases into a comp without destroying the original takes.",
      blocks: [
        {
          title: "Use take folders for multiple performances",
          paragraphs: [
            "Logic is built for comping. When you record over the same section multiple times, Logic can create a take folder that stores each pass as a separate take lane. This is perfect for vocals, guitar solos, bass fixes, and any part where the best performance may be assembled from several passes. You are not cheating; comping is a normal production technique used on countless records.",
            "Before recording, set a cycle range that starts early enough for the performer to breathe and ends after the phrase naturally finishes. Record multiple full passes rather than stopping after every tiny mistake. The performer stays in the emotion of the song, and you get more choices. Afterward, open the take folder, listen through the takes, and mark phrases that feel confident, in tune, in time, and emotionally right."
          ],
          takeaways: [
            "Loop-record several complete passes.",
            "Use take folders for vocals, solos, and fixes.",
            "Choose performance feel, not only technical perfection."
          ],
          image: {
            src: `${assetPath}/13-take-folder.png`,
            alt: "Illustration of multiple take lanes inside a Logic Pro take folder.",
            caption: "Take folders keep alternate performances organized for quick comparison."
          },
          symbolName: "square.stack.3d.up.fill",
          visualCaption: "Several passes, one organized folder.",
          settings: {
            "Best for": "Vocals, solos, overdubs",
            "Cycle range": "Start before the phrase, end after the tail",
            "Mindset": "Capture options before editing"
          },
          proTip:
            "Record one or two safety takes after you think you have it; relaxed final passes are often the keeper.",
          avoidThis:
            "Avoid stopping every few seconds unless the performer specifically needs punch-ins.",
          checkYourWork:
            "The take folder contains complete alternate performances that can be auditioned without moving files around."
        },
        {
          title: "Swipe comp the best phrases, then clean transitions",
          paragraphs: [
            "Quick Swipe Comping lets you drag across the best part of each take to build a composite performance. Logic switches between take lanes and creates a comp lane at the top. Start with broad phrase choices before obsessing over syllables or notes. A comp that breathes like a real performance usually beats a technically perfect but emotionally stitched-together line.",
            "After choosing the sections, listen through the comp without looking. If an edit clicks, feels late, or changes room tone abruptly, adjust the boundary or add a short crossfade. Keep the original takes until the production is finished. You may later discover that a rougher take has better attitude in the full mix. Comping is powerful because it preserves options while creating one clear performance for editing and mixing."
          ],
          takeaways: [
            "Swipe broad phrases first.",
            "Listen for clicks and unnatural tone changes.",
            "Keep unused takes until the song is finished."
          ],
          image: {
            src: `${assetPath}/14-comp-swipes.png`,
            alt: "Illustration of swipe-selected regions from several takes creating one comp lane.",
            caption: "Comping combines the strongest moments while preserving the original takes underneath."
          },
          symbolName: "hand.draw.fill",
          visualCaption: "Swipe the keepers.",
          settings: {
            "First pass": "Phrase-level choices",
            "Cleanup": "Adjust boundaries and crossfades",
            "Keep": "Original takes until final"
          },
          proTip:
            "Comp with the full track playing sometimes; solo comping can overvalue tiny details that disappear in context.",
          avoidThis:
            "Do not flatten or delete all alternates before the arrangement and mix are approved.",
          checkYourWork:
            "The comp sounds like one believable performance with no distracting edit points."
        }
      ]
    },
    {
      id: "bounce-track-original",
      shortTitle: "Bounce Safety",
      question: "If I bounce a track do I lose the original?",
      answer:
        "Usually no, as long as you use non-destructive bounce workflows or keep the source track. Bounce in Place can create a new audio track while leaving the original muted or unchanged.",
      blocks: [
        {
          title: "Bounce in Place can create a new committed version",
          paragraphs: [
            "Bouncing a track means printing audio from a track, region, instrument, or effect chain. This is useful when a software instrument uses too much CPU, a guitar amp sound is finished, or a collaborator needs audio instead of plugins. In Logic, Bounce in Place can create a new audio track from the selected region or track. Depending on the options, Logic can mute the source, bypass plugins, include automation, or replace the region.",
            "Read the Bounce in Place options before confirming. If you want safety, create a new track and leave the source track muted, not deleted. Name the printed track clearly, such as Bass DI amp print or Vocal tuned print. The original then remains available if you need to change a MIDI note, plugin setting, comp, or automation move. Printing is a commitment for workflow, not a requirement to destroy the source."
          ],
          takeaways: [
            "Use Bounce in Place to print CPU-heavy or finished sounds.",
            "Choose options that create a new track when you want safety.",
            "Mute originals instead of deleting them during active production."
          ],
          image: {
            src: `${assetPath}/15-bounce-in-place.png`,
            alt: "Illustration of Bounce in Place creating a printed audio version from an original track.",
            caption: "Bounce in Place can print the sound while preserving the source track for revisions."
          },
          symbolName: "arrow.down.circle.fill",
          visualCaption: "Print a committed version.",
          settings: {
            "Safe choice": "Create new track",
            "Source handling": "Mute, do not delete",
            "Include": "Automation when it is part of the sound"
          },
          proTip:
            "Duplicate the track first if you are unsure which bounce options will be destructive.",
          avoidThis:
            "Avoid replacing the only copy of a MIDI instrument before the part, sound, and arrangement are approved.",
          checkYourWork:
            "The bounced track plays correctly and the original source is still available somewhere in the project."
        },
        {
          title: "Freeze, bounce, and export solve different problems",
          paragraphs: [
            "Freeze temporarily renders a track to save CPU while keeping the workflow reversible. Bounce in Place creates an audio version inside the project. Export sends tracks or regions out as files for another session or collaborator. All three are useful, but they answer different questions. If you only need CPU relief, freeze may be enough. If you need to edit audio or send a committed sound, bounce or export is more appropriate.",
            "Before any destructive-looking operation, save a new project alternative or version. This is especially important before flattening comps, printing tuning, or committing amp simulations. Storage is cheaper than recreating a performance. A cautious bounce workflow lets you simplify the session while still keeping the creative path back to the original if the song changes."
          ],
          takeaways: [
            "Freeze for temporary CPU relief.",
            "Bounce in Place for an internal printed audio track.",
            "Export when another project or person needs the file."
          ],
          image: {
            src: `${assetPath}/16-original-track-safe.png`,
            alt: "Illustration of an original source track preserved next to a bounced audio copy.",
            caption: "Keep the source nearby until the printed audio is truly final."
          },
          symbolName: "snowflake",
          visualCaption: "Preserve your escape route.",
          settings: {
            "CPU only": "Freeze",
            "Commit inside project": "Bounce in Place",
            "Send files": "Export tracks or regions"
          },
          proTip:
            "Use project alternatives before big print decisions so you can return to the pre-bounce version quickly.",
          avoidThis:
            "Do not delete the only raw vocal take because the tuned print sounds good today.",
          checkYourWork:
            "You know whether the operation created a reversible freeze, an internal audio print, or an exported file."
        }
      ]
    },
    {
      id: "mixing-mono-or-stereo",
      shortTitle: "Mono/Stereo",
      question: "Should I be mixing in mono or stereo?",
      answer:
        "Mix in stereo, but check mono regularly. Mono reveals balance, phase, masking, and arrangement problems that wide stereo can hide.",
      blocks: [
        {
          title: "Mono checks reveal balance and phase problems",
          paragraphs: [
            "Most modern music is mixed in stereo, and width is part of the emotional presentation. But mono is still an essential check because it collapses left and right into the center. When that happens, phase problems, overly wide effects, stereo synth tricks, and masking become obvious. A guitar that sounded huge may disappear. A stereo chorus may hollow out. A vocal that seemed clear may be buried by midrange instruments.",
            "Use mono as a diagnostic tool, not as punishment. Switch to mono for short periods while setting rough balances, EQing crowded midrange, and checking kick, snare, bass, and vocal relationships. If the core song works in mono, stereo will usually feel stronger. If the song only works because everything is spread wide, the arrangement or EQ probably needs attention."
          ],
          takeaways: [
            "Build the core balance so it survives mono.",
            "Use mono to find phase cancellation and masking.",
            "Return to stereo for width and emotion."
          ],
          image: {
            src: `${assetPath}/17-mono-check.png`,
            alt: "Illustration of stereo elements collapsing toward a mono center check.",
            caption: "Mono checks expose whether the center balance and phase relationships are solid."
          },
          symbolName: "circle.fill",
          visualCaption: "Collapse briefly to inspect the center.",
          settings: {
            "Core center": "Kick, snare, bass, lead vocal",
            "Check for": "Masking, phase loss, hollow effects",
            "Use duration": "Short diagnostic passes"
          },
          proTip:
            "Lower the monitor volume during mono checks; balance problems often become easier to hear quietly.",
          avoidThis:
            "Avoid making every final width decision in mono; it is a check, not the whole destination.",
          checkYourWork:
            "The main groove and vocal remain clear when the mix is summed to mono."
        },
        {
          title: "Stereo is where you place the finished picture",
          paragraphs: [
            "After the mono foundation works, stereo panning and width create separation, excitement, and scale. Keep foundational low-frequency elements centered unless there is a deliberate creative reason. Pan supporting instruments to reduce masking and create contrast. Use stereo reverbs and delays to create space around the lead elements, but check that those effects do not wash out the center or vanish in mono.",
            "A good stereo mix usually has a stable center plus interesting sides. The center carries the song; the sides add dimension. Use correlation meters or a mono switch when using stereo wideners, chorus, Haas delays, or phase-heavy effects. Wider is not automatically better. The best width decisions make the arrangement easier to understand and more emotionally engaging."
          ],
          takeaways: [
            "Keep low-end anchors stable in the center.",
            "Use panning to reduce masking.",
            "Check wideners for mono compatibility."
          ],
          image: {
            src: `${assetPath}/18-stereo-width.png`,
            alt: "Illustration of a stable mono center with supporting stereo width on the sides.",
            caption: "Stereo width should support a strong center, not replace it."
          },
          symbolName: "arrow.left.arrow.right",
          visualCaption: "Build width around a stable center.",
          settings: {
            "Center anchors": "Kick, bass, snare, lead vocal",
            "Sides": "Doubles, guitars, keys, effects",
            "Risky tools": "Wideners, Haas delay, heavy chorus"
          },
          proTip:
            "If a wide part disappears in mono, try narrowing it, changing the effect, or supporting it with a centered layer.",
          avoidThis:
            "Do not widen the master bus to fix a mix that lacks arrangement contrast.",
          checkYourWork:
            "Stereo feels spacious, but the song still communicates when collapsed to mono."
        }
      ]
    },
    {
      id: "make-waveform-bigger",
      shortTitle: "Waveform Zoom",
      question: "How do I make the waveform bigger so I can see it?",
      answer:
        "Use waveform zoom and track height controls. These change the display size without changing the audio level, which is exactly what you want for editing visibility.",
      blocks: [
        {
          title: "Waveform zoom changes the display, not the sound",
          paragraphs: [
            "Logic lets you enlarge waveforms visually so quiet recordings are easier to edit. This does not increase gain, does not normalize the audio, and does not change how the track sounds. It is like zooming into a photo. The pixels look larger, but the object has not changed. This distinction is important because beginners sometimes add gain just to see the waveform, then accidentally overload plugins or buses.",
            "Look for the waveform zoom control in the Tracks area and use vertical zoom or track height to make regions easier to inspect. You can also zoom horizontally to see timing details. For editing breaths, drum hits, fades, and comp boundaries, display zoom is the cleanest solution. If the track is truly too quiet in the mix, use clip gain or region gain intentionally after checking the meters."
          ],
          takeaways: [
            "Use display zoom for editing visibility.",
            "Do not add gain just to make pictures bigger.",
            "Use meters to decide whether audio level needs changing."
          ],
          image: {
            src: `${assetPath}/19-waveform-zoom-slider.png`,
            alt: "Illustration of a waveform zoom control enlarging visible audio shapes.",
            caption: "Waveform zoom makes editing easier without changing the recorded level."
          },
          symbolName: "magnifyingglass",
          visualCaption: "Zoom the view, not the gain.",
          settings: {
            "For visibility": "Waveform zoom",
            "For track size": "Vertical zoom or track height",
            "For real level": "Clip gain after meter check"
          },
          proTip:
            "Save a screenset with comfortable editing zoom if you do detailed vocal or drum cleanup often.",
          avoidThis:
            "Avoid boosting gain purely because a waveform looks small on screen.",
          checkYourWork:
            "The waveform is easy to edit, while the channel meter and mix balance remain unchanged."
        },
        {
          title: "Combine track height and horizontal zoom for detailed edits",
          paragraphs: [
            "Waveform visibility has two dimensions. Track height makes the lane taller, which gives the waveform more vertical room. Horizontal zoom spreads time across the screen, making transients, breaths, and edit points easier to place. For comping vocals or tightening drums, use both. A tall track with horizontal zoom lets you see phrase starts, consonants, cymbal hits, and fade boundaries without altering the audio.",
            "After editing, zoom back out and listen musically. Extreme visual zoom can make tiny imperfections look more important than they sound. The best workflow is to zoom in for precise operations, then zoom out to judge timing and feel in context. Treat the display as a microscope: useful for detail work, but not the final judge of whether the performance moves correctly."
          ],
          takeaways: [
            "Track height improves vertical detail.",
            "Horizontal zoom improves timing detail.",
            "Zoom out again to judge the performance musically."
          ],
          image: {
            src: `${assetPath}/20-region-zoom.png`,
            alt: "Illustration of multiple waveforms enlarged with track height and horizontal zoom controls.",
            caption: "Use both vertical and horizontal zoom for precise edits, then zoom out to listen."
          },
          symbolName: "magnifyingglass.circle.fill",
          visualCaption: "Use the right zoom for the edit.",
          settings: {
            "Vertical detail": "Increase track height",
            "Timing detail": "Horizontal zoom",
            "Final judgment": "Listen in context"
          },
          proTip:
            "For timing edits, trust your ears after using your eyes. A visually perfect grid edit can still feel worse.",
          avoidThis:
            "Do not stay zoomed in so long that every tiny waveform asymmetry becomes a fake emergency.",
          checkYourWork:
            "You can see the detail needed for editing and still confirm the edit sounds natural after zooming out."
        }
      ]
    }
  ]
} as const satisfies {
  title: string;
  description: string;
  updatedLabel: string;
  sections: readonly FaqSection[];
};

export const logicProFaqSections = frequentlyAskedQuestionsArticle.sections;
