interface ChecklistSectionProps {
  title: string;
  items: string[];
}

export function ChecklistSection({ title, items }: ChecklistSectionProps) {
  return (
    <section className="sheetSection">
      <h2>{title}</h2>
      <ul className="checklist">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
