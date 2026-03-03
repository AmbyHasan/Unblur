import NextAuth from "next-auth"

import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { type JWT } from "next-auth/jwt";

 
export const { auth, handlers, signIn, signOut } = NextAuth({

    pages:{
        signIn:"/auth" ,
        error:"/auth/error"
    } ,
   //when the user will use OAUTH provider in order to login that we will automatically fill the email verified field in the db cause we do not have to do any email verification for him
   events:{ //these are triggered when any side effect happens in the authentication flow like sign in , sign out , error 
      async linkAccount({user}){
        await db.user.update({
          where:{id:user.id} ,
          data: {emailVerified: new Date()}
        })
      }

   } ,
   callbacks:{

     async jwt({token ,user}: {token: JWT, user: any}){ //jwt callback is called whenever a jwt token is created or updated..it is called after the authorize function in credentials provider


        //my strategy is to inculcate as much data as i can in the TOKEN so that i have to minimize the db queries i.e whatever i want to have i can fethc it directly from the jwt payload4
      //Case 1: Credential login ..
    if (user) {   //shifting data from user to token
    token._id = user._id?.toString();
    token.email = user.email;
    token.name = user.name;
    token.role=user.role;
  }



   //case 2: OAuth login
     if(!token._id && token.email){
        const existingUser= await db.user.findUnique({
          where:{email:token.email}
        })

        if(existingUser){
          token._id=existingUser.id;
          token.role=existingUser.role;
        }
     }
    return token;
     },


    
     async session({session, token}: {session: any, token: JWT}) {
        if (session.user) { //shighting data from token to session
          session.user._id = token._id;
          session.user.email = token.email;
          session.user.name = token.name;
          session.user.role=token.role;
        }
        return session;
     }
   } ,
   adapter: PrismaAdapter(db),
   session: { strategy: "jwt" },
  
  ...authConfig,
})