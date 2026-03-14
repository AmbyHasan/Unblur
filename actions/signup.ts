"use server"

import { signupSchema } from "@/app/schema";
import z from "zod"
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from '../lib/tokens';
import { sendVerificationEmail } from "@/lib/emails";
import { signupLimiter } from "@/lib/rateLimiter";



export const signup = async(values:z.infer<typeof signupSchema>)=>{
    //now i will validate these fields again as client side validation can always be bypassed

    const validatedFields=signupSchema.safeParse(values);

    if(!validatedFields.success){
        return { error : "Invalid Input"}
    }

    //extract the validated fields
    const {name , email , password}=validatedFields.data;

    //APPLYING RATE LIMITING
      try {
        await signupLimiter.consume(email);
    } catch {
        return { error: "Too many requests. Please wait before trying again." };
    }

    //hashing the password
    const hashedPassword= await bcrypt.hash(password , 10);

    //checking if the user witht this email already exists
    try {
        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return { error : "User with this email already exists"}
        }

        //creating the user in the database
        await db.user.create({
            data:{
                name ,
                email , 
                password:hashedPassword ,
            } ,
        })

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(email, verificationToken.token, name);

        return { success : "Confirmation Email Sent!"}
    } catch (error) {
        console.error('Signup error:', error);
        return { error: "Failed to create account. Please try again." };
    }
   

};