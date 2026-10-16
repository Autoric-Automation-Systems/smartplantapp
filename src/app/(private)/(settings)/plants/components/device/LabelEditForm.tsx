"use client";
import FormShell from "@/components/common/FormShell";
import FormField from "@/components/common/FormField";
import Input from "@/components/form/input/InputField";
import { updateData, State } from "@/query/labels/actions";
import { useActionState, useTransition } from "react";
import { Label as LabelDefinition } from "@/query/labels/definitions";

const EVENTS = [1, 2, 3] as const;

/**
 * Rótulos exibidos no dashboard para os eventos de contagem. Os três eventos
 * são gerados em loop: antes cada um repetia o mesmo bloco de markup.
 */
export default function LabelEditForm({ label }: { label: LabelDefinition }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateData, initialState);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  };

  const value = (key: keyof LabelDefinition) =>
    (label[key] as string | null | undefined) ?? "";

  return (
    <FormShell
      title="Labels"
      description="Names shown on the dashboard for the counting events."
      onSubmit={handleSubmit}
      pending={isPending}
      error={state?.message}
      submitLabel="Save labels"
    >
      <input type="hidden" name="id" value={label.id} />
      <input type="hidden" name="device_id" value={label.device_id ?? ""} />

      <FormField label="Counter" htmlFor="count">
        <Input id="count" name="count" type="text" defaultValue={value("count")} />
      </FormField>

      <div className="space-y-3">
        {EVENTS.map((n) => (
          <div
            key={n}
            className="rounded-xl border border-gray-200 p-3 dark:border-gray-800"
          >
            <p className="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">
              Event {n}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <FormField label="Name" htmlFor={`event${n}`}>
                <Input
                  id={`event${n}`}
                  name={`event${n}`}
                  type="text"
                  defaultValue={value(`event${n}` as keyof LabelDefinition)}
                />
              </FormField>
              <FormField label="On" htmlFor={`event${n}_on`}>
                <Input
                  id={`event${n}_on`}
                  name={`event${n}_on`}
                  type="text"
                  defaultValue={value(`event${n}_on` as keyof LabelDefinition)}
                />
              </FormField>
              <FormField label="Off" htmlFor={`event${n}_off`}>
                <Input
                  id={`event${n}_off`}
                  name={`event${n}_off`}
                  type="text"
                  defaultValue={value(`event${n}_off` as keyof LabelDefinition)}
                />
              </FormField>
            </div>
          </div>
        ))}
      </div>
    </FormShell>
  );
}
