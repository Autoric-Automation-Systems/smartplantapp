"use client";
import FormShell from "@/components/common/FormShell";
import FormField from "@/components/common/FormField";
import Input from "@/components/form/input/InputField";
import { Company } from "@/query/companies/definitions";
import { updateCompany, State } from "@/query/companies/actions";
import { useActionState, useTransition } from "react";

export default function EditForm({
  closeModal,
  company,
}: {
  closeModal: () => void;
  company: Company;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    updateCompany.bind(null, company.id),
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
      title="Edit company"
      description="The company name is shown across the whole app."
      onClose={closeModal}
      onSubmit={handleSubmit}
      pending={isPending}
      error={state?.message}
      submitLabel="Save changes"
    >
      <FormField label="Company name" htmlFor="name" errors={state?.errors?.name}>
        <Input id="name" name="name" type="text" defaultValue={company.name} />
      </FormField>
    </FormShell>
  );
}
