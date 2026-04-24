import type { CardItem } from "@/lib/sheet-schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface CardsSectionProps {
  id?: string;
  title: string;
  cards: CardItem[];
  columns?: 2 | 3 | 4;
}

export function CardsSection({ id, title, cards, columns = 3 }: CardsSectionProps) {
  return (
    <section id={id} className="sheetSection">
      <h2 className="sectionHeading">
        <FontAwesomeIcon icon={faLayerGroup} className="sectionHeadingIcon" />
        {title}
      </h2>
      <div className={`cardsGrid columns${columns}`}>
        {cards.map((card) => (
          <article key={card.title} className="sheetCard">
            <h3>{card.title}</h3>
            <ul>
              {card.items.map((item) => {
                const entry = typeof item === "string" ? { text: item } : item;

                return (
                  <li key={entry.text} className={entry.imageSrc ? "itemWithPhoto" : ""}>
                    {entry.imageSrc ? (
                      <Image
                        src={entry.imageSrc}
                        alt={entry.imageAlt ?? `${card.title} plugin reference`}
                        width={68}
                        height={38}
                        className="pluginThumb"
                        style={entry.imagePosition ? { objectPosition: entry.imagePosition } : undefined}
                      />
                    ) : null}
                  <FontAwesomeIcon icon={faCircleCheck} className="itemIcon" />
                  <span>{entry.text}</span>
                </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
