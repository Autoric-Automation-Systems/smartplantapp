import React from "react";

type IconActionProps = {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  tone?: "default" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
};

/**
 * Ação em ícone (editar, excluir...) com alvo de toque de 36px e nome acessível.
 * Padroniza as ações dos cards em todas as telas.
 */
const IconAction: React.FC<IconActionProps> = ({
  label,
  onClick,
  children,
  tone = "default",
  type = "button",
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    title={label}
    aria-label={label}
    className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border transition-colors disabled:opacity-50 ${
      tone === "danger"
        ? "border-gray-200 text-gray-500 hover:border-error-300 hover:bg-error-50 hover:text-error-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-error-500/40 dark:hover:bg-error-500/10 dark:hover:text-error-400"
        : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
    }`}
  >
    {children}
  </button>
);

export default IconAction;
