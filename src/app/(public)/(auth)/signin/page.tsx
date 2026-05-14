"use client";
import SignInForm from "@/components/auth/SignInForm";
import { signOut } from "next-auth/react";
import { useEffect } from "react";


export default function SignIn() {
  useEffect(() => {
    signOut({ redirect: false });
  }, []);
  return <SignInForm />;
}
