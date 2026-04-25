import type { SheetTable } from "@/lib/sheet-schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons";

interface TableSectionProps {
  id?: string;
  title: string;
  table: SheetTable;
}

function detailIconForColumn(column: string): string {
  const normalized = column.toLowerCase();

  if (normalized.includes("why")) return "✨";
  if (normalized.includes("look") || normalized.includes("does") || normalized.includes("approach")) return "🔎";
  if (normalized.includes("use") || normalized.includes("best") || normalized.includes("fit")) return "🎯";
  if (normalized.includes("example") || normalized.includes("tip")) return "💡";
  if (normalized.includes("routing") || normalized.includes("standard")) return "🔀";
  if (normalized.includes("peak") || normalized.includes("lufs") || normalized.includes("recommended")) return "📏";
  if (normalized.includes("watch")) return "⚠️";

  return "•";
}

export function TableSection({ id, title, table }: TableSectionProps) {
  const layout = table.layout === "compact" || table.layout === "detailCards" ? table.layout : "standard";

  return (
    <section id={id} className="sheetSection">
      <h2 className="sectionHeading">
        <FontAwesomeIcon icon={faTableColumns} className="sectionHeadingIcon" />
        {title}
      </h2>
      {layout === "compact" ? (
        <div className="compactTableGrid">
          {table.rows.map((row, index) => (
            <article key={`${row[0]}-${index}`} className="compactTableTile">
              <p>{row[0]}</p>
              <strong>{row[1]}</strong>
            </article>
          ))}
        </div>
      ) : null}
      {layout === "detailCards" ? (
        <div className="detailTableGrid">
          {table.rows.map((row, index) => (
            <article key={`${row[0]}-${index}`} className="detailTableCard">
              <h3>{row[0]}</h3>
              <dl>
                {row.slice(1).map((cell, cellIndex) => (
                  <div key={`${cell}-${index}-${cellIndex}`}>
                    <dt title={table.columns[cellIndex + 1] ?? "Detail"} aria-label={table.columns[cellIndex + 1] ?? "Detail"}>
                      <span aria-hidden="true">{detailIconForColumn(table.columns[cellIndex + 1] ?? "Detail")}</span>
                    </dt>
                    <dd>{cell}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      ) : null}
      {layout === "standard" ? (
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                {table.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, index) => (
                <tr key={`${row[0]}-${index}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${index}`} data-label={table.columns[cellIndex]}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}
