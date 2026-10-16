"use client";
import React, { useState, useTransition } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void> | void;
  onClose: () => void;
};

/**
 * Confirmação de exclusão. Substitui o antigo botão "segure por 3 segundos",
 * que não era descobrível e não funcionava bem no desktop.
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
  onClose,
}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleConfirm = () => {
    setError(null);
    startTransition(async () => {
      try {
        await onConfirm();
      } catch {
        setError("Não foi possível concluir a operação. Tente novamente.");
      }
    });
  };

  return (
    <Modal isOpen={open} onClose={onClose} className="m-4 max-w-md">
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h4>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>

        {error && (
          <p role="alert" className="mt-3 rounded-lg bg-error-50 p-3 text-sm text-error-600 dark:bg-error-500/10 dark:text-error-400">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button size="sm" variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleConfirm}
            disabled={isPending}
            className="bg-error-500 hover:bg-error-600 disabled:bg-error-300"
          >
            {isPending ? "Deleting..." : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
