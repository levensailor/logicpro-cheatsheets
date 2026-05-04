import type { CheatSheet } from "@/lib/sheet-schema";

const compressionVisualReferences = [
  {
    title: "Logic Studio VCA",
    src: "/assets/plugins/logic-studio-vca.jpg",
    alt: "Logic Pro Studio VCA compressor visual reference",
    caption: "Stock VCA-style compression for bus glue, punch, and fast in-the-box decisions."
  },
  {
    title: "FabFilter Pro-C 3",
    src: "/assets/plugins/fabfilter-pro-c-3.jpg",
    alt: "FabFilter Pro-C 3 compressor visual reference",
    caption: "Modern net-new compressor with clear metering, multiple styles, and deep sidechain control."
  },
  {
    title: "Waves CLA-76",
    src: "/assets/plugins/waves-cla76.png",
    alt: "Waves CLA-76 1176-style compressor visual reference",
    caption: "FET hardware emulation for fast vocal, drum, bass, and parallel compression color."
  },
  {
    title: "UAD 1176",
    src: "/assets/plugins/uad-1176.jpg",
    alt: "UAD 1176 compressor visual reference",
    caption: "Detailed 1176 emulation known for speed, attitude, and transient shaping."
  },
  {
    title: "Waves API 2500",
    src: "/assets/plugins/waves-api-2500.jpg",
    alt: "Waves API 2500 bus compressor visual reference",
    caption: "Punchy VCA bus compressor for drum buses, rock mixes, and forward rhythmic glue."
  },
  {
    title: "Waves SSL G-Master",
    src: "/assets/plugins/waves-ssl-g-master.jpg",
    alt: "Waves SSL G-Master bus compressor visual reference",
    caption: "Classic SSL-style mix-bus glue with familiar ratio, attack, release, and makeup gain controls."
  },
  {
    title: "UAD SSL 4000 G",
    src: "/assets/plugins/uad-ssl-4000-g.png",
    alt: "UAD SSL 4000 G compressor visual reference",
    caption: "Hardware-modeled SSL bus compression for cohesion when the mix already balances well."
  },
  {
    title: "Waves Abbey Road TG",
    src: "/assets/plugins/waves-abbey-road-tg.png",
    alt: "Waves Abbey Road TG dynamics visual reference",
    caption: "Abbey Road console-inspired dynamics with vintage color for buses and mastering chains."
  },
  {
    title: "Waves L2",
    src: "/assets/plugins/waves-l2.jpg",
    alt: "Waves L2 limiter visual reference",
    caption: "Limiter reference for understanding the extreme end of compression and ceiling control."
  },
  {
    title: "UAD Precision Limiter",
    src: "/assets/plugins/uad-precision-limiter.png",
    alt: "UAD Precision Limiter visual reference",
    caption: "Clean peak control used after compression when the job is level safety rather than tone."
  },
  {
    title: "Waves Trans-X",
    src: "/assets/plugins/waves-trans-x.png",
    alt: "Waves Trans-X transient shaper visual reference",
    caption: "Transient shapers are not compressors, but they solve some attack and sustain problems more directly."
  },
  {
    title: "Waves DeEsser",
    src: "/assets/plugins/waves-deesser.png",
    alt: "Waves DeEsser dynamics visual reference",
    caption: "Frequency-specific dynamics for sibilance, a reminder that compression can be narrow and targeted."
  }
] as const;

export const compressionArticleSheet: CheatSheet = {
  id: "compression-everything-to-know",
  header: {
    title: "Everything to Know About Compression",
    subtitle: "Attack, release, ratio, tone, and musical control",
    icon: "🎚️",
    accent: "purple"
  },
  summary:
    "A long-form compression guide covering the core terms, plugin choices, hardware emulation versus modern compressors, instrument starting points, and alternate opinions from famous engineers.",
  sections: [
    {
      type: "article",
      title: "Compression Article",
      dek:
        "Compression is one of the most useful and most overused tools in recording, mixing, and mastering. Use this chapter as a practical map for hearing what each control does before reaching for presets.",
      visualReferences: compressionVisualReferences.map((reference) => ({ ...reference })),
      blocks: [
        {
          heading: "What compression actually does",
          paragraphs: [
            "A compressor is an automatic volume rider. When the signal gets louder than a chosen point, the compressor turns it down by an amount you control. That simple idea creates many different musical results: smoother vocals, punchier drums, steadier bass, glued buses, thicker parallel tracks, or a mix that feels finished without every fader moving constantly. The danger is that the same tool can also remove excitement, flatten grooves, pull up room noise, blur transients, and make a performance feel smaller. The goal is not to compress because a track exists. The goal is to decide whether the source needs leveling, punch, density, tone, movement, or protection from peaks.",
            "Compression changes dynamic range, which is the distance between the quiet and loud parts of a signal. A wide dynamic range can feel natural and exciting, especially on acoustic instruments, expressive vocals, and open arrangements. A narrower dynamic range can feel controlled and forward, which can help a bass line stay audible on small speakers or help a lead vocal remain understandable over loud guitars. Neither is automatically better. The right dynamic range is the one that supports the song. A folk vocal may need breath and space. A modern rock vocal may need to stay locked in front of cymbals and guitars. A room mic may sound boring when clean but huge when crushed.",
            "In Logic Pro, start by listening before looking. Put the compressor on, set makeup gain so bypassed and active levels are similar, and ask what improved. If the compressed version only sounds better because it is louder, you have not made a reliable decision. Level matching is the fastest way to learn compression honestly. When the active version is the same apparent volume as bypass, you can hear whether the groove got tighter, the attack got better, the sustain became more useful, or the performance simply lost life."
          ]
        },
        {
          heading: "Threshold, ratio, and knee",
          paragraphs: [
            "Threshold is the level where compression begins. Set the threshold high and only the loudest peaks cross it. Set it low and much more of the performance gets controlled. A common beginner mistake is to set the threshold by sight instead of by intent. If you want gentle vocal leveling, lower the threshold until normal phrases create a few dB of gain reduction. If you only want to catch a snare spike, keep the threshold higher so the compressor reacts only to the sharpest hits. The gain reduction meter is useful, but it is not the goal. It is a clue about how much the compressor is working.",
            "Ratio decides how strongly the compressor reacts after the signal crosses the threshold. At 2:1, a signal that goes 2 dB over the threshold comes out only 1 dB over. At 4:1, 4 dB over becomes 1 dB over. Higher ratios such as 8:1, 12:1, or 20:1 move toward limiting. Low ratios often feel natural because the compressor bends the performance instead of clamping it. Higher ratios can sound exciting on drums, aggressive vocals, bass peaks, or parallel tracks, but they reveal mistakes quickly. When you are unsure, try a moderate ratio first and make the threshold do the work.",
            "Knee controls how abruptly compression starts around the threshold. A hard knee waits until the signal crosses the line, then acts decisively. That can sound punchy, obvious, or controlled. A soft knee eases into compression before and around the threshold, which often sounds smoother on vocals, bass, acoustic guitar, and mix bus work. Think of hard knee as a corner and soft knee as a curve. Neither setting is universally correct. If a compressor feels grabby or too noticeable, soften the knee if the plugin allows it. If it feels vague and you need more attitude, a harder knee can help."
          ]
        },
        {
          heading: "Attack, release, transient, and groove",
          paragraphs: [
            "Attack is how quickly the compressor starts turning the signal down after it crosses the threshold. This control has a huge effect on transients, which are the first fast bursts of energy at the front of sounds. Pick noise on bass, the crack of a snare, the beater click of a kick, consonants in a vocal, and the front edge of an acoustic guitar strum are all transient information. A very fast attack can shave those peaks and make the source smoother, darker, or smaller. A slower attack lets the transient through before compression begins, which can make drums punchier and preserve articulation.",
            "Release is how quickly the compressor stops reducing gain after the signal falls back below the threshold. Too fast can create distortion, chatter, or a nervous pumping sound. Too slow can keep the compressor clamped down into the next note, which reduces energy and makes the track feel dull. The best release often moves with the tempo. On drums, watch the gain reduction return close to zero before the next hit unless you want obvious pumping. On vocals, release should usually recover between phrases without making breaths jump out. On bass, release can shape sustain; too fast may wobble, too slow may hide note changes.",
            "Attack and release are where compression becomes musical. If a snare loses crack, slow the attack. If a vocal consonant hurts, use a faster attack or a de-esser. If a drum bus breathes in time with the groove, you may have found the pocket. If cymbals splash upward every time the kick hits, the release or detector may be wrong. Do not memorize one setting as correct. Loop the section, exaggerate the control so you can hear the direction, then back it off until it supports the performance."
          ]
        },
        {
          heading: "Makeup gain, loudness bias, and gain staging",
          paragraphs: [
            "Makeup gain raises the output after compression. Because compression turns down peaks or average level, the processed signal may sound quieter until you add gain back. The trap is that louder almost always sounds more exciting at first. If you add too much makeup gain, you may approve a worse setting simply because it got louder. Match the output to the bypass level, then judge tone and movement. In Logic Pro, use the output knob, a Gain plugin after the compressor, or the channel strip meter to keep comparisons honest.",
            "Gain staging matters because compressors react to level. If a track hits a compressor 12 dB hotter than expected, a preset may behave completely differently. That is one reason old analog-style plugins can feel unpredictable: they are often calibrated around a nominal level such as -18 dBFS RMS, not around tracks peaking near zero. Before compression, use clip gain or a Gain plugin to put the source in a reasonable range. After compression, trim the output so the next plugin receives a controlled level. This is not about obeying a magic number. It is about making each processor respond in a useful range.",
            "A good test is to bypass the entire compressor and listen at the same loudness. Did the vocal become easier to understand? Did the bass stop disappearing? Did the kick get punchier or just smaller? Did the mix bus feel glued or did the chorus lose lift? Makeup gain is a necessary tool, but it should not be the argument for the setting. The musical result should be the argument."
          ]
        },
        {
          heading: "Hardware emulation versus net-new compressors",
          paragraphs: [
            "Popular compressor plugins fall into two broad families: hardware emulations and net-new digital designs. Hardware emulations model specific circuits or familiar hardware behaviors: 1176-style FET compressors, LA-2A-style optical levelers, Fairchild-style tube limiters, SSL bus compressors, API 2500-style VCA units, dbx-style punch boxes, and vari-mu mastering compressors. Engineers love these because they make decisions quickly. The limited controls push you toward a sound. A 1176 invites speed and attitude. An LA-2A invites smooth leveling. An SSL bus compressor invites subtle mix glue. The color, detector behavior, saturation, and non-linearities are part of the appeal.",
            "Net-new compressors such as FabFilter Pro-C, clean stock compressors, multiband dynamics, and modern mastering tools are less tied to one piece of hardware. They usually provide clearer metering, sidechain filters, lookahead, oversampling, program-dependent release options, dry/wet blend, mid-side modes, range controls, and styles that move from transparent to colored. These are excellent when you need precision, education, recall, or problem solving. If you are learning compression, a modern visual compressor can teach you what the detector is hearing and how gain reduction relates to the waveform.",
            "The choice is not analog versus digital as a religion. Use hardware emulation when its constraints and color help you move fast. Use net-new designs when you need transparent control, flexible routing, or detailed feedback. A common professional workflow uses both: a clean compressor for gentle leveling, a character compressor for tone, a bus compressor for cohesion, and a limiter only at the end for peak safety. Logic's stock Compressor is useful because it bridges these worlds with multiple model styles in one plugin."
          ]
        },
        {
          heading: "Serial, parallel, sidechain, and multiband compression",
          paragraphs: [
            "Serial compression means using more than one compressor in a row, with each doing a small job. A vocal might use clip gain first, then a fast FET-style compressor catching peaks, then an optical-style compressor adding smooth leveling. Each stage may only reduce 1 to 3 dB, but together they create a vocal that stays present without one compressor working too hard. Serial compression is often more natural than forcing one plugin to do every job. It also lets you separate tone from control.",
            "Parallel compression blends a heavily compressed version with the dry signal. This can add density, sustain, and excitement while preserving the original transient. It is common on drums, vocals, bass, and room mics. In Logic, you can use a send to an aux, compress the aux hard, then blend it under the original. You can also use a compressor's mix knob if it has one. The parallel path should usually sound exaggerated by itself. The magic happens when it is tucked underneath and the source feels bigger without obviously sounding crushed.",
            "Sidechain compression uses another signal to trigger the compressor. The classic example is bass ducking slightly when the kick hits, but sidechains are also useful for vocal-forward reverbs, guitars that move around vocals, or overhead compression that ignores low-end kick energy with a high-pass sidechain filter. Multiband compression splits the frequency range and compresses bands independently. Use it when only part of the spectrum needs control, such as low bass notes jumping out or harsh upper mids spiking. Do not use multiband compression to avoid making a better EQ, arrangement, or automation decision."
          ]
        },
        {
          heading: "Common settings by instrument",
          paragraphs: [
            "Vocals usually need a combination of automation and compression. Start with clip gain or region gain so phrases are not wildly uneven before the compressor. For natural leveling, try 2:1 to 4:1, medium attack, medium release, and 2 to 5 dB of gain reduction. For modern dense mixes, serial compression often works better: a faster compressor catches peaks and a smoother one controls phrases. If sibilance jumps out after compression, use a de-esser before or after the main compressor depending on what triggers the harshness.",
            "Bass often benefits from steadier sustain because low notes can disappear on small speakers or jump out in the room. Try 3:1 to 6:1, medium attack, and release timed so each note recovers naturally. Faster attack can tame hard plucks, but too much can remove articulation. Kick and snare settings depend on whether you want punch or control. For punch, try slower attack around 10 to 30 ms so the transient passes, then release before the next hit. For peak control, use faster attack and less overall gain reduction. Toms may need little compression if editing and gating already make them consistent.",
            "Electric guitars are already compressed when distorted, so extra compression may add noise and reduce size. Clean guitars, funk parts, and arpeggios may like 2:1 to 4:1 with medium-fast attack and release. Acoustic guitar often needs gentle control, but heavy compression can exaggerate pick noise and room tone. Drum buses often use 1.5:1 to 2:1 with slow or medium attack, auto or tempo-based release, and only 1 to 3 dB of gain reduction. Mix bus compression should be even gentler: if the chorus gets smaller, the compressor is not helping."
          ]
        },
        {
          heading: "How famous engineers disagree about compression",
          paragraphs: [
            "Famous engineers do not all treat compression the same way, and that is the lesson. Butch Vig is often associated with powerful rock records where compression, saturation, and layered production create size and urgency, yet his broader lesson is not to crush everything. It is to make the record feel emotionally larger than the raw tracks. On a dense rock chorus, that may mean controlled vocals, explosive rooms, and guitars that stay forward. On a quieter section, it may mean letting dynamics breathe so the loud moment matters.",
            "Some engineers prefer to commit compression while tracking because a singer, bassist, or drummer performs differently when the headphone mix feels finished. Others avoid printing heavy compression because they want maximum flexibility later. Chris Lord-Alge-style rock mixing is often discussed in terms of confident compression, parallel energy, and bold hardware choices. Steve Albini's recorded aesthetic, by contrast, is often associated with preserving performance dynamics, microphone balance, and natural room behavior rather than polishing every source into a controlled product. Both approaches can make compelling records because each serves a different value system.",
            "Andrew Scheps has often emphasized mixing into a sound and using parallel processing creatively, while many mastering engineers warn that mix-bus compression can reduce punch if it is used to fix a weak balance. The alternate opinion worth remembering is simple: compression is not proof of professionalism. Sometimes the professional move is to automate a word, move a microphone, ask for another take, change the arrangement, or turn the compressor off. A great engineer is not the person who uses the most compression. It is the person who knows what the song is asking for."
          ]
        },
        {
          heading: "A practical compression workflow in Logic Pro",
          paragraphs: [
            "Start with the problem statement. Say it out loud: the vocal jumps between lines, the bass sustain is uneven, the snare transient hurts, the room mic needs excitement, the drum bus needs glue, or the mix bus needs half a dB of movement. Insert the compressor only after you know the job. Choose a plugin style that matches that job. Use a transparent compressor for invisible leveling, FET for speed and edge, optical for smoothness, VCA for punch or glue, vari-mu for gentle thickening, and multiband only when the problem lives in a specific frequency range.",
            "Next, exaggerate and then refine. Lower the threshold until you clearly hear compression. Move attack from fastest to slower and notice the transient return. Move release from slow to fast and listen for recovery, pumping, or distortion. Set the ratio lower for natural movement or higher for firmer control. Adjust knee if available. Then back off the threshold until the compressor only does the amount required. Level-match with makeup gain. Listen in the full mix, not solo, because compression decisions are context decisions.",
            "Finally, compare against alternatives. Would clip gain solve it more cleanly? Would volume automation preserve emotion better? Would saturation add sustain without gain reduction? Would a transient shaper restore attack after compression? Would changing the bass part or kick pattern solve the conflict without sidechain pumping? The best compression workflow keeps other tools available. Compression is powerful because it is automatic, but automatic decisions are not always musical. Use your ears, references, and the song's emotional arc as the final authority."
          ]
        }
      ]
    },
    {
      type: "table",
      title: "Core Compression Terms",
      table: {
        columns: ["Term", "Meaning", "Listen For"],
        layout: "detailCards",
        rows: [
          ["Attack", "How quickly gain reduction begins after the signal crosses threshold.", "Fast attack smooths peaks; slower attack preserves punch and transient edge."],
          ["Release", "How quickly the compressor stops reducing gain after the signal falls back.", "Too fast can chatter or distort; too slow can dull the next note."],
          ["Knee", "How gradually or abruptly compression begins around the threshold.", "Soft knee sounds smoother; hard knee sounds more decisive and obvious."],
          ["Ratio", "How strongly level is reduced above the threshold.", "Low ratios breathe; high ratios control, clamp, or limit."],
          ["Threshold", "The level where compression starts acting.", "Lower threshold means more of the performance is compressed."],
          ["Dynamic Range", "The distance between quiet and loud parts.", "Narrower range feels controlled; wider range feels natural and expressive."],
          ["Makeup Gain", "Output gain added after compression.", "Use it to level-match, not to trick yourself with loudness."],
          ["Transient", "The fast front edge of a sound.", "Preserve it for punch; control it for smoothness or safety."]
        ]
      }
    },
    {
      type: "table",
      title: "Common Starting Settings by Source",
      table: {
        columns: ["Source", "Starting Point", "Goal", "Watch Out For"],
        layout: "detailCards",
        rows: [
          ["Lead vocal", "2:1 to 4:1, medium attack/release, 2-5 dB GR", "Consistent phrases that stay forward.", "Sibilance, breath jumps, and over-flattened emotion."],
          ["Bass guitar", "3:1 to 6:1, medium attack, release by groove, 3-6 dB GR", "Even notes and useful sustain.", "Losing pick/finger articulation or creating low-end wobble."],
          ["Kick drum", "3:1 to 6:1, 10-30 ms attack, medium release", "Punch and controlled peaks.", "Fast attack making the kick smaller."],
          ["Snare", "3:1 to 6:1, 10-30 ms attack, 50-150 ms release", "Crack, body, or controlled sharpness.", "Cymbal bleed and flattened transient snap."],
          ["Drum bus", "1.5:1 to 2:1, slow/medium attack, auto or tempo release, 1-3 dB GR", "Glue without losing impact.", "Cymbal pumping and smaller choruses."],
          ["Room mics", "Light 1-3 dB GR for natural rooms or heavy limiting for effect", "Space, excitement, and size.", "Noise, splashy cymbals, and phase problems."],
          ["Clean electric guitar", "2:1 to 4:1, medium-fast attack/release", "Even strums or funk articulation.", "Pick noise and lifeless sustain."],
          ["Distorted guitar", "Often none, or very light bus glue", "Preserve size and wall-of-sound density.", "Adding hiss and shrinking already-compressed amps."],
          ["Acoustic guitar", "2:1 to 3:1, medium attack, medium release", "Control strum peaks while keeping movement.", "Pick harshness and room tone jumping forward."],
          ["Mix bus", "1.5:1 to 2:1, slow/medium attack, auto release, 0.5-2 dB GR", "Subtle cohesion after the mix already works.", "Using bus compression to fix bad balances."]
        ]
      }
    },
    {
      type: "cards",
      title: "Plugin Families and When to Reach for Them",
      columns: 3,
      cards: [
        {
          title: "FET / 1176 Style",
          items: [
            "Fast, aggressive, and colorful.",
            "Great for vocals, drums, bass peaks, parallel crush, and attitude.",
            "Watch the attack: fastest settings can erase transients."
          ]
        },
        {
          title: "Optical / LA-2A Style",
          items: [
            "Smooth, slower, and program-dependent.",
            "Great for vocals, bass, and sustained melodic sources.",
            "Often better for leveling than for precise transient control."
          ]
        },
        {
          title: "VCA / SSL / API Style",
          items: [
            "Punchy, controlled, and excellent on buses.",
            "Use SSL-style for glue and API-style for forward punch.",
            "Small amounts often work better than obvious gain reduction."
          ]
        },
        {
          title: "Vari-Mu / Tube Style",
          items: [
            "Smooth, thick, and often mastering-friendly.",
            "Useful when tone and gentle movement matter more than tight control.",
            "Can soften transients if pushed too hard."
          ]
        },
        {
          title: "Modern Digital",
          items: [
            "Precise, visual, and flexible.",
            "Use for transparent leveling, sidechain filtering, lookahead, and education.",
            "Great when you need to understand exactly what is happening."
          ]
        },
        {
          title: "Limiter / Specialty Dynamics",
          items: [
            "Limiters, de-essers, transient shapers, and multiband tools solve narrower problems.",
            "Use when a normal full-band compressor is too broad.",
            "Do not replace balance and automation with specialty processing by default."
          ]
        }
      ]
    },
    {
      type: "checklist",
      title: "Compression Decision Checklist",
      items: [
        "Name the problem before inserting a compressor.",
        "Set input level so the compressor reacts in a reasonable range.",
        "Exaggerate attack and release to learn the direction, then back off.",
        "Level-match with makeup gain before approving the setting.",
        "Listen in the full mix, not only in solo.",
        "Check whether clip gain, automation, EQ, saturation, or a new take would solve the issue better.",
        "Use serial compression for separate small jobs instead of one compressor doing everything.",
        "Use parallel compression when you want density without losing the dry transient.",
        "Use sidechain or multiband compression only when the trigger or frequency-specific problem is clear.",
        "Bypass often and keep the version that best serves the song."
      ]
    }
  ]
};
