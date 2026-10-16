"use client";
import FormShell from "@/components/common/FormShell";
import FormField from "@/components/common/FormField";
import Input from "@/components/form/input/InputField";
import { createData, State } from "@/query/plants/actions";
import { useActionState, useTransition } from "react";

export default function PlantCreateForm({
  closeModal,
  idcompany,
}: {
  closeModal: () => void;
  idcompany: string;
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
      title="Add plant"
      description="Plants group the areas, machines and devices of a site."
      onClose={closeModal}
      onSubmit={handleSubmit}
      pending={isPending}
      error={state?.message}
      submitLabel="Create plant"
    >
      <input type="hidden" name="idcompany" value={idcompany} />
      <FormField label="Name" htmlFor="name" errors={state?.errors?.name}>
        <Input id="name" name="name" type="text" placeholder="Ex.: Factory Alpha" />
      </FormField>
    </FormShell>
  );
}
