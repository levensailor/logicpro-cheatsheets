import Link from "next/link";
import { cheatSheets } from "@/data/sheets";

export default function HomePage() {
  const chapterCount = cheatSheets.length;

  return (
    <main className="introMain">
      <section className="introHero">
        <div className="introHeroCopy">
          <p className="introEyebrow">🎛️ Logic Pro band production handbook</p>
          <h1>Record, mix, and master your band with a cheat-sheet book built for Logic Pro.</h1>
          <p className="introLead">
            This site is a visual workbook for turning raw band recordings into polished mixes. Each chapter gives
            you a fast path through levels, EQ, compression, panning, effects, plugin choices, workflow, and
            mastering decisions.
          </p>
          <div className="introActions">
            <Link className="introPrimaryAction" href="/sheets/tracking-band">
              🎙️ Start Tracking
            </Link>
            <Link className="introSecondaryAction" href="/sheets/plugins-reference">
              🧩 Choose Plugins
            </Link>
          </div>
        </div>

        <aside className="introBookCard" aria-label="Book contents preview">
          <div className="introBookCover">
            <span>📚</span>
            <strong>{chapterCount} chapters</strong>
            <p>Cheat sheets, plugin tables, glossary terms, and workflow reminders in one place.</p>
          </div>
          <div className="introMiniStats">
            <span>🎸 Guitars</span>
            <span>🥁 Drums</span>
            <span>🎤 Vocals</span>
            <span>🚌 Buses</span>
            <span>💿 Mastering</span>
            <span>📘 Appendix</span>
          </div>
        </aside>
      </section>

      <section className="introSection">
        <h2>✨ What is included</h2>
        <div className="introGrid">
          <article className="introFeatureCard">
            <span className="introFeatureIcon">🎙️</span>
            <h3>Tracking a Band</h3>
            <p>Session setup, recording flow, and practical reminders before the mix even starts.</p>
          </article>
          <article className="introFeatureCard">
            <span className="introFeatureIcon">🎚️</span>
            <h3>Instrument Mix Guides</h3>
            <p>Bass, guitar, kick, snare, toms, overheads, room mics, and vocals with EQ moves and chain order.</p>
          </article>
          <article className="introFeatureCard">
            <span className="introFeatureIcon">🚌</span>
            <h3>Audio Routing and Buses</h3>
            <p>Learn inserts, sends, instrument buses, automation moves, parallel paths, and master bus flow.</p>
          </article>
          <article className="introFeatureCard">
            <span className="introFeatureIcon">🧩</span>
            <h3>Interactive Plugin Finder</h3>
            <p>Filter plugins by instrument or bus, then narrow by EQ, compression, limiting, reverb, and more.</p>
          </article>
          <article className="introFeatureCard">
            <span className="introFeatureIcon">💿</span>
            <h3>Mastering Guide</h3>
            <p>Final mix checks, loudness, limiting, translation, and polish before sharing the song.</p>
          </article>
          <article className="introFeatureCard">
            <span className="introFeatureIcon">📘</span>
            <h3>Beginner Glossary</h3>
            <p>Plain-English definitions for gates, limiters, LUFS, shelves, filters, stereo, and other terms.</p>
          </article>
          <Link href="/articles/compression" className="introFeatureCard">
            <span className="introFeatureIcon">📖</span>
            <h3>In-Depth Articles</h3>
            <p>Comprehensive guides covering compression, EQ techniques, and advanced mixing concepts.</p>
          </Link>
        </div>
      </section>

      <section className="introSection introHowTo">
        <h2>🚀 How to use this book</h2>
        <ol className="introSteps">
          <li>
            <strong>Start with tracking.</strong>
            <span>Make sure the raw recordings are clean, labeled, and gain staged.</span>
          </li>
          <li>
            <strong>Open the matching instrument chapter.</strong>
            <span>Use the chain order, EQ ranges, panning cue, and plugin ideas for that source.</span>
          </li>
          <li>
            <strong>Build buses after the tracks feel right.</strong>
            <span>Route instruments into buses, automate important moments, and blend parallel returns carefully.</span>
          </li>
          <li>
            <strong>Use Plugins when you are choosing tools.</strong>
            <span>Pick the instrument or bus, choose a plugin type, and compare the best options.</span>
          </li>
          <li>
            <strong>Finish with mastering and the appendix.</strong>
            <span>Check loudness, translation, and any terms you want to understand more clearly.</span>
          </li>
        </ol>
      </section>
    </main>
  );
}
