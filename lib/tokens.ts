import {v4 as uuidv4} from "uuid"
import { getVerificationTokenByEmail } from "@/data/verification_token";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password_rest_token";



export const generateVerificationToken=async(email:string)=>{
  const token= uuidv4();
  const expires= new Date(new Date().getTime() + 60*60*1000) // token will be expired in 1 hour from now

  //check if we  had an existing token for this email in the db if yes then update it otherwise create a new one
  const existingTokenByEmail= await getVerificationTokenByEmail(email);

  if(existingTokenByEmail){
    await db.verificationToken.delete({
        where:{
            id:existingTokenByEmail.id
        }
    });
  }

  //generate new verification token
  const verificationToken= await db.verificationToken.create({
    data:{
        email ,
        token , 
        expires ,
    }
  });
  return verificationToken
}



export const generatePasswordResetToken=async(email:string)=>{
    const token= uuidv4();
    const expires= new Date(new Date().getTime() + 60*60*1000) // token will be expired in 1 hour from now    

    //check if we  had an existing token for this email in the db if yes then update it otherwise create a new one
    const existingTokenByEmail= await getPasswordResetTokenByEmail(email);

    if(existingTokenByEmail){
        await db.passwordResetToken.delete({
            where:{
                id:existingTokenByEmail.id
            }
        });
    }

    //generate new password reset token
    const passwordResetToken= await db.passwordResetToken.create({
        data:{
            email ,
            token , 
            expires ,
        }
      });
      return passwordResetToken;
}

