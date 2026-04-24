import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faCheck } from "@fortawesome/free-solid-svg-icons";

interface ChecklistSectionProps {
  id?: string;
  title: string;
  items: string[];
}

export function ChecklistSection({ id, title, items }: ChecklistSectionProps) {
  return (
    <section id={id} className="sheetSection">
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
