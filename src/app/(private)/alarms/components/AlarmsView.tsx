"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDownIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/button/Button";
import {
  ALARMS_PAGE_SIZE,
  type AlarmFilters,
  type AlarmRow,
} from "@/query/alarms/definitions";
import { eventLabel } from "@/lib/alarms/email";
import { formatDateTimeDb } from "@/lib/formatTime";

type Options = {
  events: string[];
  devices: { id: string; name: string | null }[];
};

const PERIODS: { value: AlarmFilters["period"]; label: string }[] = [
  { value: "all", label: "Todo o período" },
  { value: "24h", label: "Últimas 24h" },
  { value: "7d", label: "Últimos 7 dias" },
  { value: "30d", label: "Últimos 30 dias" },
];

const STATUSES: { value: AlarmFilters["status"]; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "unread", label: "Não lidos" },
  { value: "read", label: "Lidos" },
];

const SELECT =
  "h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300";

/** Severidade derivada do quanto o valor passou da faixa (a tabela não guarda). */
function severityOf(alarm: AlarmRow) {
  const match = alarm.message.match(/-?\d+(?:[.,]\d+)?/g);
  const value = match ? Number(match[0].replace(",", ".")) : null;
  const min = alarm.config_min != null ? Number(alarm.config_min) : null;
  const max = alarm.config_max != null ? Number(alarm.config_max) : null;
  if (value == null || (min == null && max == null)) return null;

  const limit = min != null && value < min ? min : max;
  if (limit == null) return null;
  const range = min != null && max != null && max > min ? max - min : Math.abs(limit) || 1;
  const deviation = Math.abs(value - limit) / range;

  if (deviation >= 0.2) {
    return { label: "Crítico", className: "bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400" };
  }
  if (deviation >= 0.1) {
    return { label: "Alto", className: "bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400" };
  }
  return { label: "Médio", className: "bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/10 dark:text-blue-light-400" };
}

export default function AlarmsView({
  alarms,
  total,
  page,
  filters,
  options,
}: {
  alarms: AlarmRow[];
  total: number;
  page: number;
  filters: AlarmFilters;
  options: Options;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState(filters.search ?? "");
  const [pending, startTransition] = useTransition();
  const [read, setRead] = useState<Record<string, boolean>>({});

  const totalPages = Math.max(1, Math.ceil(total / ALARMS_PAGE_SIZE));

  const isRead = useCallback(
    (alarm: AlarmRow) => read[alarm.id] ?? alarm.readed,
    [read]
  );

  const unreadOnPage = useMemo(
    () => alarms.filter((alarm) => !isRead(alarm)).length,
    [alarms, isRead]
  );

  const pushParams = useCallback(
    (changes: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(changes)) {
        if (!value) next.delete(key);
        else next.set(key, value);
      }
      next.delete("page");
      startTransition(() => router.push(`/alarms?${next.toString()}`));
    },
    [router, searchParams]
  );

  const markAsRead = useCallback(
    async (id: string) => {
      setRead((prev) => ({ ...prev, [id]: true }));
      const res = await fetch(`/api/alarms/${id}/read`, { method: "POST" });
      if (!res.ok) {
        setRead((prev) => ({ ...prev, [id]: false }));
        return;
      }
      router.refresh();
    },
    [router]
  );

  const markAllAsRead = useCallback(async () => {
    const ids = alarms.filter((a) => !isRead(a)).map((a) => a.id);
    setRead(Object.fromEntries(ids.map((id) => [id, true])));
    const res = await fetch("/api/alarms/read-all", { method: "POST" });
    if (!res.ok) setRead({});
    else router.refresh();
  }, [alarms, isRead, router]);

  const activeFilterCount = [
    filters.status !== "all",
    filters.period !== "all",
    Boolean(filters.event),
    Boolean(filters.device),
    Boolean(filters.search),
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-end gap-3">
          <form
            className="min-w-[12rem] flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              pushParams({ q: search.trim() || null });
            }}
          >
            <label htmlFor="alarm-search" className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Buscar
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="alarm-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Mensagem ou dispositivo"
                className={`${SELECT} pl-9`}
              />
            </div>
          </form>

          <div className="w-full sm:w-40">
            <label htmlFor="alarm-status" className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Status
            </label>
            <select
              id="alarm-status"
              value={filters.status}
              onChange={(e) => pushParams({ status: e.target.value })}
              className={SELECT}
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-44">
            <label htmlFor="alarm-event" className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Evento
            </label>
            <select
              id="alarm-event"
              value={filters.event ?? ""}
              onChange={(e) => pushParams({ event: e.target.value || null })}
              className={SELECT}
            >
              <option value="">Todos os eventos</option>
              {options.events.map((event) => (
                <option key={event} value={event}>{eventLabel(event)}</option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-44">
            <label htmlFor="alarm-device" className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Dispositivo
            </label>
            <select
              id="alarm-device"
              value={filters.device ?? ""}
              onChange={(e) => pushParams({ device: e.target.value || null })}
              className={SELECT}
            >
              <option value="">Todos os dispositivos</option>
              {options.devices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name ?? device.id}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-44">
            <label htmlFor="alarm-period" className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
              Período
            </label>
            <select
              id="alarm-period"
              value={filters.period}
              onChange={(e) => pushParams({ period: e.target.value })}
              className={SELECT}
            >
              {PERIODS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {activeFilterCount > 0 && (
            <Link
              href="/alarms"
              className="inline-flex h-10 items-center rounded-lg px-3 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Limpar ({activeFilterCount})
            </Link>
          )}
        </div>
      </div>

      {/* Lista */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-4 dark:border-gray-800">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white/90">
              Alarms <span className="font-normal text-gray-500 dark:text-gray-400">({total})</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {unreadOnPage > 0
                ? `${unreadOnPage} não lido(s) nesta página`
                : "Nenhum não lido nesta página"}
            </p>
          </div>
          {unreadOnPage > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={markAllAsRead}
              disabled={pending}
            >
              Mark all as read
            </Button>
          )}
        </div>

        {alarms.length === 0 ? (
          <div className="p-10 text-center">
            <ExclamationTriangleIcon className="mx-auto mb-3 h-8 w-8 text-gray-300 dark:text-gray-600" />
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
              {activeFilterCount > 0 ? "Nenhum alarme com esses filtros" : "Nenhum alarme registrado"}
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {activeFilterCount > 0
                ? "Ajuste ou limpe os filtros para ver mais resultados."
                : "Os alarmes aparecem aqui quando uma leitura sai da faixa configurada no módulo."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {alarms.map((alarm) => {
              const readState = isRead(alarm);
              const severity = severityOf(alarm);
              const isOpen = expanded === alarm.id;
              const place = [alarm.plant_name, alarm.area_name, alarm.machine_name]
                .filter(Boolean)
                .join(" › ");

              return (
                <li
                  key={alarm.id}
                  className={readState ? "" : "bg-error-25/60 dark:bg-error-500/[0.04]"}
                >
                  <div className="flex flex-wrap items-start gap-x-4 gap-y-2 p-4">
                    <span
                      aria-hidden="true"
                      className={`mt-2 h-2 w-2 flex-shrink-0 rounded-full ${
                        readState ? "bg-gray-300 dark:bg-gray-600" : "bg-error-500"
                      }`}
                    />

                    <div className="min-w-[14rem] flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800 dark:text-white/90">
                          {eventLabel(alarm.event_name)}
                        </span>
                        {severity && (
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${severity.className}`}>
                            {severity.label}
                          </span>
                        )}
                        {!readState && (
                          <span className="rounded-full bg-error-50 px-2 py-0.5 text-xs font-medium text-error-600 dark:bg-error-500/10 dark:text-error-400">
                            Novo
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {alarm.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {alarm.device_name ?? alarm.device_mac} · {alarm.device_type}
                        {place ? ` · ${place}` : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <time
                        dateTime={alarm.created_at}
                        className="whitespace-nowrap text-xs text-gray-500 dark:text-gray-400"
                        title={formatDateTimeDb(alarm.created_at)}
                      >
                        {new Date(alarm.created_at).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>

                      {!readState && (
                        <Button size="sm" variant="outline" onClick={() => markAsRead(alarm.id)}>
                          Mark read
                        </Button>
                      )}

                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : alarm.id)}
                        aria-expanded={isOpen}
                        aria-controls={`alarm-detail-${alarm.id}`}
                        title={isOpen ? "Ocultar detalhes" : "Ver detalhes"}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
                      >
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div
                      id={`alarm-detail-${alarm.id}`}
                      className="border-t border-gray-100 bg-gray-50/60 px-4 py-3 dark:border-gray-800 dark:bg-white/[0.02]"
                    >
                      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          ["Status", readState ? "Lido" : "Não lido"],
                          ["Dispositivo", alarm.device_name ?? "—"],
                          ["MAC", alarm.device_mac],
                          ["Módulo", alarm.device_type],
                          ["Planta", alarm.plant_name ?? "—"],
                          ["Área", alarm.area_name ?? "—"],
                          ["Máquina", alarm.machine_name ?? "—"],
                          [
                            "Faixa configurada",
                            alarm.config_min != null && alarm.config_max != null
                              ? `${alarm.config_min} a ${alarm.config_max}`
                              : "—",
                          ],
                          ["Registrado em", formatDateTimeDb(alarm.created_at)],
                        ].map(([term, value]) => (
                          <div key={term} className="min-w-0">
                            <dt className="text-xs text-gray-500 dark:text-gray-400">{term}</dt>
                            <dd className="break-words text-sm font-medium text-gray-800 dark:text-white/90">
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 p-4 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Página {page} de {totalPages}
            </p>
            <div className="flex items-center gap-2">
              {page > 1 && (
                <Link
                  href={`/alarms?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: String(page - 1) })}`}
                  className="inline-flex h-9 items-center rounded-lg border border-gray-300 px-3 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Anterior
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/alarms?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: String(page + 1) })}`}
                  className="inline-flex h-9 items-center rounded-lg border border-gray-300 px-3 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Próxima
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
