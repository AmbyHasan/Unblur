"use server"

import { loginSchema } from "@/app/schema";
import z from "zod"
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/emails";

export const login = async(values:z.infer<typeof loginSchema>)=>{
    const validatedFields=loginSchema.safeParse(values);

    if(!validatedFields.success){
        return { error : "Invalid Input"}
    }
    
    const {email , password}=validatedFields.data;

    const exisitingUser = await getUserByEmail(email);

    if(!exisitingUser || !exisitingUser.password || !exisitingUser.email){
        return {error : "Invalid Account"}
    }
    
    //if the user exists but email is not verfied
    if(!exisitingUser.emailVerified){
        const verificationToken= await generateVerificationToken(exisitingUser.email);
        await sendVerificationEmail(exisitingUser.email, verificationToken.token, exisitingUser.name!);

        return {success : "Confirmation Email sent"}
     }

       
    try{
         await signIn("credentials", {
          email,
          password,
          redirectTo:"/dashboard",
        });

        return { success : "Logged in successfully"}
    }catch(error){
        if(error instanceof AuthError){
             switch(error.type){
              case "CredentialsSignin":
                  return { error : "Invalid email or password"}
              default:
                  return { error : "An unexpected error occurred. Please try again later."}
             }
        }
        throw error;
    }
};