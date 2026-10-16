"use client";
import FormShell from "@/components/common/FormShell";
import FormField from "@/components/common/FormField";
import Input from "@/components/form/input/InputField";
import { createData, State } from "@/query/areas/actions";
import { useActionState, useTransition } from "react";

export default function AreaCreateForm({
  closeModal,
  idplant,
}: {
  closeModal: () => void;
  idplant: string;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createData, initialState);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    <FormShell
      title="Add area"
      description="Areas group the machines of a plant."
      onClose={closeModal}
      onSubmit={handleSubmit}
      pending={isPending}
      error={state?.message}
      submitLabel="Create area"
    >
      <input type="hidden" name="idplant" value={idplant} />
      <FormField label="Name" htmlFor="name" errors={state?.errors?.name}>
        <Input id="name" name="name" type="text" placeholder="Ex.: Production" />
      </FormField>
    </FormShell>
  );
}
