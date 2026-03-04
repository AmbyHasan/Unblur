"use server"

import *  as z from "zod"

import { resetPasswordSchema } from "@/app/schema";

import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByEmail } from "@/data/password_rest_token";
import { sendResetPasswordEmail } from "@/lib/emails";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset= async(values:z.infer<typeof resetPasswordSchema>)=>{
    const validatedFields=resetPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return {error : "Invalid Email Address"}
    }
   
    const {email}= validatedFields.data!;

    const existingUser= await getUserByEmail(email);

    if(!existingUser){
        return {error : "No account found with this email"}
    }

    const passwordResetToken=await generatePasswordResetToken(email);

    await sendResetPasswordEmail(existingUser.email!, passwordResetToken!.token, existingUser.name!);    

    return {success:"Reset email sent "}


}
