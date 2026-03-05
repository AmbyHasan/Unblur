import { Suspense } from "react";
import EmailVerificationForm from "../_components/EmailVerificationForm";

const page = () => {
  //During server rendering, the search params might not be immediately available, so Next.js may suspend rendering until the params are ready.
  return (
    <Suspense fallback={null}>
      <EmailVerificationForm />
    </Suspense>
  );
};

export default page;
