import type { SheetTable } from "@/lib/sheet-schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons";

interface TableSectionProps {
  id?: string;
  title: string;
  table: SheetTable;
}

export function TableSection({ id, title, table }: TableSectionProps) {
  return (
    <section id={id} className="sheetSection">
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
    </section>
  );
}
