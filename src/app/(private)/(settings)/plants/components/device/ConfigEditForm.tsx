"use client";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";
import { updateData, State } from "@/query/configs/actions";
import { useActionState, useState, useTransition } from "react";
import { Config } from "@/query/configs/definitions";

/**
 * Uma linha por evento monitorado: alarme ligado/desligado e faixa Min/Max.
 * Antes cada configuração era um formulário completo, com título e botões
 * próprios, empilhado dentro do modal do dispositivo.
 */
export default function ConfigEditForm({ config }: { config: Config }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateData, initialState);
  const [isPending, startTransition] = useTransition();
  const [alarm, setAlarm] = useState(config.alarm ?? false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (alarm) formData.set("alarm", "on");
    startTransition(() => formAction(formData));
  };

  const eventLabel =
    config.event_name === "event1" || config.event_name === "event2" || config.event_name === "event3"
      ? `Event ${config.event_name.slice(-1)}`
      : config.event_name.charAt(0).toUpperCase() + config.event_name.slice(1);

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 p-3 dark:border-gray-800 sm:p-4"
    >
      <input type="hidden" name="id" value={config.id} />
      <input type="hidden" name="device_id" value={config.device_id ?? ""} />
      <input type="hidden" name="event_name" value={config.event_name ?? ""} />

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-gray-800 dark:text-white/90">
          {eventLabel}
        </span>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Checkbox checked={alarm} onChange={setAlarm} />
          Raise alarm outside the range
        </label>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[7rem] flex-1">
          <Label htmlFor={`min-${config.id}`}>Min</Label>
          <Input
            id={`min-${config.id}`}
            name="min"
            type="number"
            defaultValue={config.min ?? ""}
            error={!!state?.errors?.min}
          />
        </div>
        <div className="min-w-[7rem] flex-1">
          <Label htmlFor={`max-${config.id}`}>Max</Label>
          <Input
            id={`max-${config.id}`}
            name="max"
            type="number"
            defaultValue={config.max ?? ""}
            error={!!state?.errors?.max}
          />
        </div>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>

      {state?.message && (
        <p role="alert" className="mt-2 text-sm text-error-600 dark:text-error-400">
          {state.message}
        </p>
      )}
    </form>
  );
}
