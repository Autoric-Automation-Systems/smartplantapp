import SignUpForm from "@/components/auth/SignUpForm";
import infoAPP from "@/lib/infoapp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    `Sign Up | ${infoAPP.name}`,
  description: infoAPP.description,
};

export default function SignUp() {
  return <SignUpForm />;
}
