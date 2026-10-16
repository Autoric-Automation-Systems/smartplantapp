"use client";
import React, { useId, useRef, useState } from "react";

type Tab = {
  id: string;
  label: string;
  /** Aviso numérico opcional (contagem de itens da aba). */
  badge?: number;
  content: React.ReactNode;
};

/**
 * Abas acessíveis (padrão ARIA tabs), usadas dentro dos modais de edição para
 * não empilhar todos os formulários em uma única rolagem.
 */
const Tabs: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
  const [selected, setSelected] = useState(tabs[0]?.id);
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  // derivado: se a aba atual sumir da lista, cai na primeira
  const active = tabs.some((tab) => tab.id === selected) ? selected : tabs[0]?.id;

  const move = (offset: number) => {
    const index = tabs.findIndex((tab) => tab.id === active);
    const next = (index + offset + tabs.length) % tabs.length;
    setSelected(tabs[next].id);
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  };

  return (
    <div>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Seções de edição"
        className="mb-4 flex gap-1 overflow-x-auto border-b border-gray-200 dark:border-gray-800"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
        }}
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setSelected(tab.id)}
              className={`-mb-px flex flex-shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                selected
                  ? "border-brand-500 text-brand-600 dark:border-brand-400 dark:text-brand-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {tab.label}
              {typeof tab.badge === "number" && (
                <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 dark:bg-white/5 dark:text-gray-400">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) =>
        tab.id === active ? (
          <div
            key={tab.id}
            id={`${baseId}-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${tab.id}`}
          >
            {tab.content}
          </div>
        ) : null
      )}
    </div>
  );
};

export default Tabs;
