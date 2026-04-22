import type { CardItem } from "@/lib/sheet-schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface CardsSectionProps {
  title: string;
  cards: CardItem[];
  columns?: 2 | 3 | 4;
}

export function CardsSection({ title, cards, columns = 3 }: CardsSectionProps) {
  return (
    <section className="sheetSection">
      <h2 className="sectionHeading">
        <FontAwesomeIcon icon={faLayerGroup} className="sectionHeadingIcon" />
        {title}
      </h2>
      <div className={`cardsGrid columns${columns}`}>
        {cards.map((card) => (
          <article key={card.title} className="sheetCard">
            <h3>{card.title}</h3>
            <ul>
              {card.items.map((item) => (
                <li key={item}>
                  <FontAwesomeIcon icon={faCircleCheck} className="itemIcon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
