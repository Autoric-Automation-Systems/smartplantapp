"use client";
import FormShell from "@/components/common/FormShell";
import FormField from "@/components/common/FormField";
import Input from "@/components/form/input/InputField";
import { updateData, State } from "@/query/devices/actions";
import { useActionState, useTransition } from "react";
import { Device } from "@/query/devices/definitions";

export default function DeviceEditForm({ device }: { device: Device }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateData, initialState);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    <FormShell
      title="Device"
      description="Name shown on the dashboard. The machine it belongs to is changed by moving the device."
      onSubmit={handleSubmit}
      pending={isPending}
      error={state?.message}
      submitLabel="Save changes"
    >
      <input type="hidden" name="id" value={device.id} />
      <input type="hidden" name="idmachine" value={device.idmachine ?? ""} />

      <FormField label="Name" htmlFor="name" errors={state?.errors?.name}>
        <Input id="name" name="name" type="text" defaultValue={device.name ?? ""} />
      </FormField>

      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-xl bg-gray-50 p-4 dark:bg-white/[0.03] sm:grid-cols-2">
        {[
          ["MAC", device.mac],
          ["Type", device.type],
          ["Version", device.version ?? "—"],
          ["Heartbeat interval", device.heartbeatInterval ?? "—"],
        ].map(([term, value]) => (
          <div key={term as string}>
            <dt className="text-xs text-gray-500 dark:text-gray-400">{term}</dt>
            <dd className="break-all text-sm font-medium text-gray-800 dark:text-white/90">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </FormShell>
  );
}
