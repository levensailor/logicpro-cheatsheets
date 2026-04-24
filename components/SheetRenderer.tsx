import Link from "next/link";
import type { CheatSheet } from "@/lib/sheet-schema";
import { CardsSection } from "@/components/sections/CardsSection";
import { ChainSection } from "@/components/sections/ChainSection";
import { ChecklistSection } from "@/components/sections/ChecklistSection";
import { ImageSection } from "@/components/sections/ImageSection";
import { PluginChooserSection } from "@/components/sections/PluginChooserSection";
import { TableSection } from "@/components/sections/TableSection";
import { cheatSheets } from "@/data/sheets";
import { cleanSectionTitle, slugifySectionTitle } from "@/lib/section-title";

interface SheetRendererProps {
  sheet: CheatSheet;
}

export function SheetRenderer({ sheet }: SheetRendererProps) {
  const sectionLinks = sheet.sections.map((section, index) => ({
    id: `${slugifySectionTitle(section.title)}-${index + 1}`,
    title: cleanSectionTitle(section.title)
  }));
  const currentIndex = cheatSheets.findIndex((candidate) => candidate.id === sheet.id);
  const previousSheet = currentIndex > 0 ? cheatSheets[currentIndex - 1] : undefined;
  const nextSheet = currentIndex >= 0 && currentIndex < cheatSheets.length - 1 ? cheatSheets[currentIndex + 1] : undefined;
  const panningSheetIds = new Set([
    "electric-guitar-mixing",
    "bass-guitar-mixing",
    "kick-drum-mixing",
    "snare-drum-mixing",
    "vocal-mixing",
    "toms-mixing-guide",
    "room-mic-mixing-guide",
    "overheads-mixing-guide"
  ]);
  const showPanning = panningSheetIds.has(sheet.id);
  const centerPanningSheetIds = new Set([
    "bass-guitar-mixing",
    "kick-drum-mixing",
    "snare-drum-mixing",
    "vocal-mixing",
    "room-mic-mixing-guide"
  ]);
  const isCenterPanning = centerPanningSheetIds.has(sheet.id);

  return (
    <main className="sheetMain">
      <header className={`sheetHeader tone-${sheet.header.accent}`}>
        <p className="sheetIcon">{sheet.header.icon}</p>
        <div className="sheetTitleBlock">
          <h1>{sheet.header.title}</h1>
          <p>{sheet.header.subtitle}</p>
        </div>
        {showPanning ? (
          <aside className="headerPanning" aria-label="Stereo panning reference">
            <p className="panningLabel">Panning</p>
            <div
              className={`panningGraphic ${isCenterPanning ? "" : "hardLR"}`.trim()}
              role="img"
              aria-label={isCenterPanning ? "Center panning" : "Hard left and hard right panning"}
            >
              <div className="panningAxis" />
              <span className="panMark panLeft">L</span>
              <span className="panMark panCenter">C</span>
              <span className="panMark panRight">R</span>
              {isCenterPanning ? (
                <span className="panDot" />
              ) : (
                <>
                  <span className="panDot panDotLeft" />
                  <span className="panDot panDotRight" />
                </>
              )}
            </div>
          </aside>
        ) : null}
      </header>

      {sheet.sections.map((section, index) => {
        const { id, title } = sectionLinks[index];

        if (section.type === "chain") {
          return <ChainSection key={`${section.title}-${index}`} id={id} title={title} steps={section.steps} />;
        }

        if (section.type === "cards") {
          return (
            <CardsSection
              key={`${section.title}-${index}`}
              id={id}
              title={title}
              cards={section.cards}
              columns={section.columns}
            />
          );
        }

        if (section.type === "table") {
          return <TableSection key={`${section.title}-${index}`} id={id} title={title} table={section.table} />;
        }

        if (section.type === "checklist") {
          return <ChecklistSection key={`${section.title}-${index}`} id={id} title={title} items={section.items} />;
        }

        if (section.type === "plugin-chooser") {
          return <PluginChooserSection key={`${section.title}-${index}`} id={id} title={title} entries={section.entries} />;
        }

        return (
          <ImageSection
            key={`${section.title}-${index}`}
            id={id}
            title={title}
            src={section.src}
            alt={section.alt}
            caption={section.caption}
          />
        );
      })}

      <nav className="sheetChapterNav" aria-label="Chapter navigation">
        {previousSheet ? (
          <Link className="chapterPagerLink previous" href={`/sheets/${previousSheet.id}`}>
            <span>Previous</span>
            <strong>
              {previousSheet.header.icon} {previousSheet.header.title}
            </strong>
          </Link>
        ) : (
          <Link className="chapterPagerLink previous" href="/">
            <span>Start</span>
            <strong>📚 Handbook Intro</strong>
          </Link>
        )}
        {nextSheet ? (
          <Link className="chapterPagerLink next" href={`/sheets/${nextSheet.id}`}>
            <span>Next</span>
            <strong>
              {nextSheet.header.icon} {nextSheet.header.title}
            </strong>
          </Link>
        ) : (
          <Link className="chapterPagerLink next" href="/">
            <span>Back to</span>
            <strong>📚 Handbook Intro</strong>
          </Link>
        )}
      </nav>
    </main>
  );
}
