import { Suspense } from "react";
import ResetPasswordForm from "../_components/ResetPasswordForm";

const page = () => {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default page;

