import { Suspense } from "react";
import AuthFormClient from "./_components/AuthFormClient";

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthFormClient />
    </Suspense>
  );
}