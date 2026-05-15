import SignUpForm from "@/components/auth/SignUpForm";
import infoAPP from "@/lib/infoapp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account with Smart Plant to access all features and benefits.",
};

export default function SignUp() {
  return <SignUpForm />;
}
