import React from "react";

type TreeSectionProps = {
  title: string;
  /** Quantidade de itens, exibida como contador ao lado do título. */
  count?: number;
  /** Slot de ação no cabeçalho (botão "adicionar", por exemplo). */
  action?: React.ReactNode;
  /** Ações da própria entidade (editar/excluir) para o nível 1. */
  actions?: React.ReactNode;
  /** Nível na hierarquia: 0 = raiz (Plant), 1 = Area, 2 = Machine, 3 = Device. */
  depth?: number;
  /** Rótulo de tipo exibido acima do título, ajuda a ler a hierarquia. */
  eyebrow?: string;
  /** Linha de metadados abaixo do título (mac, tipo, horário...). */
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
};

/**
 * Um nível da árvore de ativos (Planta > Área > Máquina > Dispositivo).
 *
 * A partir do nível 1 os filhos são indentados com um trilho vertical em vez de
 * caixas com borda dentro de caixas com borda, que era o que deixava a tela
 * com cinco molduras aninhadas e o conteúdo cada vez mais estreito.
 */
const TreeSection: React.FC<TreeSectionProps> = ({
  title,
  count,
  action,
  actions,
  depth = 0,
  eyebrow,
  subtitle,
  children,
}) => {
  const header = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        {eyebrow && (
          <span className="mb-0.5 block text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            {eyebrow}
          </span>
        )}
        <div className="flex items-center gap-2">
          <h3 className="break-words text-base font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {typeof count === "number" && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-white/5 dark:text-gray-400">
              {count}
            </span>
          )}
        </div>
        {subtitle && (
          <div className="mt-1 break-words text-xs text-gray-500 dark:text-gray-400">
            {subtitle}
          </div>
        )}
      </div>
      <div className="flex flex-shrink-0 items-center gap-2">
        {action}
        {actions}
      </div>
    </div>
  );

  if (depth === 0) {
    return (
      <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] sm:p-5">
        {header}
        {children && <div className="mt-4">{children}</div>}
      </section>
    );
  }

  return (
    <section className="relative pl-4 sm:pl-5">
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 bottom-0 w-px bg-gray-200 dark:bg-gray-800"
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-6 h-px w-3 bg-gray-200 dark:bg-gray-800 sm:w-4"
      />
      <div className="rounded-xl border border-gray-100 bg-gray-25/60 p-3 dark:border-gray-800/60 dark:bg-white/[0.02] sm:p-4">
        {header}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </section>
  );
};

export default TreeSection;
