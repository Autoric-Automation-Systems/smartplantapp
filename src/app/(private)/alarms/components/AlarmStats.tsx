import Link from "next/link";
import type { AlarmsSummary } from "@/query/alarms/definitions";
import { eventLabel } from "@/lib/alarms/email";

const CARD = "rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]";

/**
 * Indicadores do topo: volume, pendências e distribuição por evento, para dar
 * leitura rápida sem depender da tabela.
 */
export default function AlarmStats({ summary }: { summary: AlarmsSummary }) {
  const cards = [
    {
      label: "Alarms",
      value: summary.total,
      hint: "no histórico",
      tone: "text-gray-800 dark:text-white/90",
    },
    {
      label: "Unread",
      value: summary.unread,
      hint: summary.unread > 0 ? "precisam de atenção" : "tudo em dia",
      tone: summary.unread > 0 ? "text-error-600 dark:text-error-400" : "text-gray-800 dark:text-white/90",
    },
    {
      label: "Last 24h",
      value: summary.last24h,
      hint: "novas ocorrências",
      tone: "text-gray-800 dark:text-white/90",
    },
  ];

  return (
    <div className="mb-5 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className={CARD}>
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {card.label}
            </p>
            <p className={`mt-1 text-2xl font-semibold tabular-nums ${card.tone}`}>
              {card.value}
            </p>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{card.hint}</p>
          </div>
        ))}

        <div className={CARD}>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Top events
          </p>
          {summary.byEvent.length === 0 ? (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">—</p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {summary.byEvent.slice(0, 4).map((row) => (
                <li key={row.event_name} className="flex items-center gap-2">
                  <Link
                    href={`/alarms?event=${encodeURIComponent(row.event_name)}`}
                    className="min-w-0 flex-1 truncate rounded-md py-1 text-sm text-gray-700 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
                  >
                    {eventLabel(row.event_name)}
                  </Link>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${
                      row.unread > 0
                        ? "bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400"
                        : "bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400"
                    }`}
                  >
                    {row.total}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
