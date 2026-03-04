"use server";
import { newPasswordSchema } from "@/app/schema";
import { getPasswordResetTokenByToken } from "@/data/password_rest_token";

import * as z from "zod";
import { getUserByEmail } from '../data/user';
import bcrypt from 'bcrypt';
import { db } from "@/lib/db";


export const newPassword= async( values: z.infer<typeof newPasswordSchema>, token?: string | null )=>{


    if(!token){
        return {error : "Missing token"}
    }


    
    const validatedFields= newPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return {error : "Invalid password. Password must be at least 6 characters long."}
    }

    const {password}= validatedFields.data!;

    const existingToken= await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return {error : "Invalid or expired token"}
    }

    const hasExpired=new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error : "Token has expired. Please request a new password reset."}
    }

    const existingUser= await getUserByEmail(existingToken.email);

    if(!existingUser){
        return {error : "User with this email not found"}
    }

    //now hash the new password and update the user's password in the database
    const newhashedPassword= await bcrypt.hash(password, 10);

    await db.user.update({
        where : {id : existingUser.id} ,
        data : {
            password : newhashedPassword
        }
    })

  return {success : "Password updated successfully. You can now log in with your new password."}
}
    