import type { ArrivalRow } from "@/lib/data/types";

export function ArrivalTable({ rows }: { rows: ArrivalRow[] }) {
  return (
    <div className="prose-tow">
      <table>
        <thead>
          <tr>
            <th>Bölge</th>
            <th>Tahmini Varış Süresi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.area}>
              <td>{r.area}</td>
              <td>{r.minutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
