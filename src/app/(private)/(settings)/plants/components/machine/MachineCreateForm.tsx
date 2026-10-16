"use client";
import FormShell from "@/components/common/FormShell";
import FormField from "@/components/common/FormField";
import Input from "@/components/form/input/InputField";
import { createData, State } from "@/query/machines/actions";
import { useActionState, useTransition } from "react";

export default function MachineCreateForm({
  closeModal,
  idarea,
}: {
  closeModal: () => void;
  idarea: string;
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
      title="Add machine"
      description="Machines group the devices of an area."
      onClose={closeModal}
      onSubmit={handleSubmit}
      pending={isPending}
      error={state?.message}
      submitLabel="Create machine"
    >
      <input type="hidden" name="idarea" value={idarea} />
      <FormField label="Name" htmlFor="name" errors={state?.errors?.name}>
        <Input id="name" name="name" type="text" placeholder="Ex.: Line 1" />
      </FormField>
    </FormShell>
  );
}
