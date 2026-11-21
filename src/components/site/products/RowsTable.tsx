/**
 * Simple data table that becomes stacked rows below 640px, so phones never
 * need horizontal scrolling. First column is the row header.
 */
export function RowsTable({ columns, rows, minWidth = 560 }: { columns: string[]; rows: string[][]; minWidth?: number }) {
  return (
    <>
      <table className="hidden w-full border-collapse text-[15px] sm:table" style={{ minWidth }}>
        <thead>
          <tr className="border-b-2 border-black text-left">
            {columns.map((c) => (
              <th key={c} scope="col" className="py-2 pr-4 font-semibold last:pr-0">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-ip-rule align-top">
              {r.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="py-3 pr-4 text-left font-semibold">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="py-3 pr-4 text-ip-body last:pr-0">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <dl className="m-0 border-t-2 border-black sm:hidden">
        {rows.map((r) => (
          <div key={r[0]} className="border-b border-ip-rule py-4">
            <dt className="text-[16px] font-semibold">{r[0]}</dt>
            {r.slice(1).map((cell, i) => (
              <dd key={i} className="m-0 mt-1.5 text-[15px] leading-[1.5] text-ip-body">
                <span className="ip-label-sm mr-1.5">{columns[i + 1]}</span>
                {cell}
              </dd>
            ))}
          </div>
        ))}
      </dl>
    </>
  );
}
