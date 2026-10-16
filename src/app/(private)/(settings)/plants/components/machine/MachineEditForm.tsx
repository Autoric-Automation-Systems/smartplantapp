"use client";
import FormShell from "@/components/common/FormShell";
import FormField from "@/components/common/FormField";
import Input from "@/components/form/input/InputField";
import { updateData, State } from "@/query/machines/actions";
import { useActionState, useTransition } from "react";
import { Machine } from "@/query/machines/definitions";

export default function MachineEditForm({
  closeModal,
  machine,
}: {
  closeModal: () => void;
  machine: Machine;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    updateData.bind(null, machine.id),
    initialState
  );
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    <FormShell
      title="Edit machine"
      description="Update the machine name."
      onClose={closeModal}
      onSubmit={handleSubmit}
      pending={isPending}
      error={state?.message}
      submitLabel="Save changes"
    >
      <FormField label="Name" htmlFor="name" errors={state?.errors?.name}>
        <Input id="name" name="name" type="text" defaultValue={machine.name} />
      </FormField>
    </FormShell>
  );
}
