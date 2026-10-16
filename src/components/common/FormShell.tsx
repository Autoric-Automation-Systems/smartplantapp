"use client";
import React from "react";
import Button from "@/components/ui/button/Button";

type FormShellProps = {
  title: string;
  description?: string;
  /** Sem onClose o rodapé mostra apenas a ação principal (uso em abas). */
  onClose?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  pending?: boolean;
  error?: string | null;
  children: React.ReactNode;
  /** Conteúdo extra entre os campos e os botões (usado no formulário de config). */
  footer?: React.ReactNode;
};

/**
 * Estrutura única de formulário de modal: título, descrição, campos, erro e
 * ações no rodapé. Antes cada formulário repetia (e variava) esse arranjo, e
 * alguns colocavam os botões "Salvar/Cancelar" no topo, ao lado do título.
 */
const FormShell: React.FC<FormShellProps> = ({
  title,
  description,
  onClose,
  onSubmit,
  submitLabel = "Save changes",
  pending = false,
  error,
  children,
  footer,
}) => (
  <form onSubmit={onSubmit} className="flex flex-col p-5 sm:p-7">
    <header className="pr-10">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h4>
      {description && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </header>

    {error && (
      <p
        role="alert"
        className="mt-4 rounded-lg bg-error-50 p-3 text-sm text-error-600 dark:bg-error-500/10 dark:text-error-400"
      >
        {error}
      </p>
    )}

    <div className="mt-5 space-y-4">{children}</div>

    {footer}

    <footer className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
      {onClose && (
        <Button size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      )}
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Saving..." : submitLabel}
      </Button>
    </footer>
  </form>
);

export default FormShell;
