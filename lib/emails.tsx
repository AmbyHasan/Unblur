import { Resend } from "resend";
import VerificationEmail from "@/components/emails/VerficationEmail";
import { render } from "@react-email/render";
import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string ,username:string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;


  //in the new version of react-email render , render() function returns a promise so we need to await it to get the html string
   const html =await render(
     <VerificationEmail username={username} verifyUrl={verifyUrl} />
  );

  await resend.emails.send({
    from: "KORE <noreply@amberhasan.me>",
    to: email,
    subject: "Verify your email",
    html ,
  });
}


export async function sendResetPasswordEmail(email: string, token: string  , username:string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;       
  //in the new version of react-email render , render() function returns a promise so we need to await it to get the html string
   const html =await render(
    <ResetPasswordEmail username={username} resetUrl={resetUrl} />
  );

  await resend.emails.send({
    from: "KORE <noreply@amberhasan.me>",
    to: email,
    subject: "Reset your password",
    html ,
  });
}

