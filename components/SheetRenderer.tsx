import type { CheatSheet } from "@/lib/sheet-schema";
import { CardsSection } from "@/components/sections/CardsSection";
import { ChainSection } from "@/components/sections/ChainSection";
import { ChecklistSection } from "@/components/sections/ChecklistSection";
import { ImageSection } from "@/components/sections/ImageSection";
import { TableSection } from "@/components/sections/TableSection";
import { cleanSectionTitle } from "@/lib/section-title";

interface SheetRendererProps {
  sheet: CheatSheet;
}

export function SheetRenderer({ sheet }: SheetRendererProps) {
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
            <div className="panningGraphic hardLR" role="img" aria-label="Hard left and hard right panning">
              <div className="panningAxis" />
              <span className="panMark panLeft">L</span>
              <span className="panMark panCenter">C</span>
              <span className="panMark panRight">R</span>
              <span className="panDot panDotLeft" />
              <span className="panDot panDotRight" />
            </div>
          </aside>
        ) : null}
      </header>

      {sheet.sections.map((section, index) => {
        const title = cleanSectionTitle(section.title);

        if (section.type === "chain") {
          return <ChainSection key={`${section.title}-${index}`} title={title} steps={section.steps} />;
        }

        if (section.type === "cards") {
          return (
            <CardsSection
              key={`${section.title}-${index}`}
              title={title}
              cards={section.cards}
              columns={section.columns}
            />
          );
        }

        if (section.type === "table") {
          return <TableSection key={`${section.title}-${index}`} title={title} table={section.table} />;
        }

        if (section.type === "checklist") {
          return <ChecklistSection key={`${section.title}-${index}`} title={title} items={section.items} />;
        }

        return (
          <ImageSection
            key={`${section.title}-${index}`}
            title={title}
            src={section.src}
            alt={section.alt}
            caption={section.caption}
          />
        );
      })}
    </main>
  );
}
