"use client";
import FormShell from "@/components/common/FormShell";
import FormField from "@/components/common/FormField";
import Input from "@/components/form/input/InputField";
import { User } from "@/query/users/definitions";
import { updateData, State } from "@/query/users/actions";
import { useActionState, useTransition } from "react";
import FileInputExample from "@/components/form/form-elements/FileInputExample";

export default function EditForm({
  closeModal,
  user,
}: {
  closeModal: () => void;
  user: User;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    updateData.bind(null, user.id),
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
      title="Edit profile"
      description="Leave the password empty to keep the current one."
      onClose={closeModal}
      onSubmit={handleSubmit}
      pending={isPending}
      error={state?.message}
      submitLabel="Save changes"
    >
      <input type="hidden" name="role" value={user.role} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="First name" htmlFor="name" errors={state?.errors?.name}>
          <Input id="name" name="name" type="text" defaultValue={user.name} />
        </FormField>
        <FormField label="Last name" htmlFor="lastname" errors={state?.errors?.lastname}>
          <Input id="lastname" name="lastname" type="text" defaultValue={user.lastname} />
        </FormField>
        <FormField label="Email" htmlFor="email" errors={state?.errors?.email}>
          <Input id="email" name="email" type="email" defaultValue={user.email} readOnly />
        </FormField>
        <FormField label="Phone" htmlFor="phone">
          <Input id="phone" name="phone" type="text" defaultValue={user.phone} />
        </FormField>
        <FormField label="New password" htmlFor="password" errors={state?.errors?.password}>
          <Input id="password" name="password" type="password" placeholder="••••••••" />
        </FormField>
        <FormField label="Bio" htmlFor="bio">
          <Input id="bio" name="bio" type="text" defaultValue={user.bio} />
        </FormField>
      </div>

      <FormField label="Profile picture">
        <FileInputExample />
      </FormField>
    </FormShell>
  );
}
