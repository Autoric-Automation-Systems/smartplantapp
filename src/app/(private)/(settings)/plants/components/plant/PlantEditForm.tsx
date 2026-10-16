"use client";
import FormShell from "@/components/common/FormShell";
import FormField from "@/components/common/FormField";
import Input from "@/components/form/input/InputField";
import { updateData, State } from "@/query/plants/actions";
import { useActionState, useTransition } from "react";
import { Plant } from "@/query/plants/definitions";

export default function PlantEditForm({
  closeModal,
  plant,
}: {
  closeModal: () => void;
  plant: Plant;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    updateData.bind(null, plant.id),
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
      title="Edit plant"
      description="Update the plant name."
      onClose={closeModal}
      onSubmit={handleSubmit}
      pending={isPending}
      error={state?.message}
      submitLabel="Save changes"
    >
      <FormField label="Name" htmlFor="name" errors={state?.errors?.name}>
        <Input id="name" name="name" type="text" defaultValue={plant.name} />
      </FormField>
    </FormShell>
  );
}
