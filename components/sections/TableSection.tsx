import type { SheetTable } from "@/lib/sheet-schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons";

interface TableSectionProps {
  title: string;
  table: SheetTable;
}

export function TableSection({ title, table }: TableSectionProps) {
  return (
    <section className="sheetSection">
      <h2 className="sectionHeading">
        <FontAwesomeIcon icon={faTableColumns} className="sectionHeadingIcon" />
        {title}
      </h2>
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
                {row.map((cell) => (
                  <td key={`${cell}-${index}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
