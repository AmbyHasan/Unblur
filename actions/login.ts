"use server"

import { loginSchema } from "@/app/schema";
import z from "zod"
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const login = async(values:z.infer<typeof loginSchema>)=>{
    const validatedFields=loginSchema.safeParse(values);

    if(!validatedFields.success){
        return { error : "Invalid Input"}
    }
    
    const {email , password}=validatedFields.data;
    
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