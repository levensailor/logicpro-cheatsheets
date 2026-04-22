import type { CheatSheet } from "@/lib/sheet-schema";
import { CardsSection } from "@/components/sections/CardsSection";
import { ChainSection } from "@/components/sections/ChainSection";
import { ChecklistSection } from "@/components/sections/ChecklistSection";
import { ImageSection } from "@/components/sections/ImageSection";
import { TableSection } from "@/components/sections/TableSection";

interface SheetRendererProps {
  sheet: CheatSheet;
}

export function SheetRenderer({ sheet }: SheetRendererProps) {
  return (
    <main className="sheetMain">
      <header className={`sheetHeader tone-${sheet.header.accent}`}>
        <p className="sheetIcon">{sheet.header.icon}</p>
        <div>
          <h1>{sheet.header.title}</h1>
          <p>{sheet.header.subtitle}</p>
        </div>
      </header>

      <section className="sheetSummary">{sheet.summary}</section>

      {sheet.sections.map((section, index) => {
        if (section.type === "chain") {
          return <ChainSection key={`${section.title}-${index}`} title={section.title} steps={section.steps} />;
        }

        if (section.type === "cards") {
          return (
            <CardsSection
              key={`${section.title}-${index}`}
              title={section.title}
              cards={section.cards}
              columns={section.columns}
            />
          );
        }

        if (section.type === "table") {
          return <TableSection key={`${section.title}-${index}`} title={section.title} table={section.table} />;
        }

        if (section.type === "checklist") {
          return <ChecklistSection key={`${section.title}-${index}`} title={section.title} items={section.items} />;
        }

        return (
          <ImageSection
            key={`${section.title}-${index}`}
            title={section.title}
            src={section.src}
            alt={section.alt}
            caption={section.caption}
          />
        );
      })}
    </main>
  );
}
