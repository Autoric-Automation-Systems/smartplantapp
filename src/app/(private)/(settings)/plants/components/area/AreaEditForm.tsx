"use client";
import FormShell from "@/components/common/FormShell";
import FormField from "@/components/common/FormField";
import Input from "@/components/form/input/InputField";
import { updateData, State } from "@/query/areas/actions";
import { useActionState, useTransition } from "react";
import { Area } from "@/query/areas/definitions";

export default function AreaEditForm({
  closeModal,
  area,
}: {
  closeModal: () => void;
  area: Area;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    updateData.bind(null, area.id),
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
      title="Edit area"
      description="Update the area name."
      onClose={closeModal}
      onSubmit={handleSubmit}
      pending={isPending}
      error={state?.message}
      submitLabel="Save changes"
    >
      <FormField label="Name" htmlFor="name" errors={state?.errors?.name}>
        <Input id="name" name="name" type="text" defaultValue={area.name} />
      </FormField>
    </FormShell>
  );
}
