import ConfirmPasswordForm from "@/components/auth/ConfirmPasswordForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-gray-500">Loading...</div>}>
      <ConfirmPasswordForm />
    </Suspense>
  );
}