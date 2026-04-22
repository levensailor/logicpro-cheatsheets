import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faCheck } from "@fortawesome/free-solid-svg-icons";

interface ChecklistSectionProps {
  title: string;
  items: string[];
}

export function ChecklistSection({ title, items }: ChecklistSectionProps) {
  return (
    <section className="sheetSection">
      <h2 className="sectionHeading">
        <FontAwesomeIcon icon={faListCheck} className="sectionHeadingIcon" />
        {title}
      </h2>
      <ul className="checklist">
        {items.map((item) => (
          <li key={item}>
            <FontAwesomeIcon icon={faCheck} className="itemIcon" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
