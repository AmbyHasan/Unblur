"use client"

import { useForm } from 'react-hook-form';
import{  Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useTransition } from 'react';

import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { newPasswordSchema } from '../../schema/index';
import { newPassword } from '@/actions/new_password';
import { toast } from 'sonner';



const ResetPasswordForm = () => {


   const [isPending , startTransition]=useTransition();
   const searchParams=useSearchParams();;
   const token=searchParams.get("token");

      const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
        password:"" ,
       
        }
      })

        const onSubmit=(values : z.infer<typeof newPasswordSchema>)=>{ 
        


          startTransition(()=>{
          newPassword(values, token) //passing the form values to the server action
          .then((data)=>{
            if(data?.success) toast.success(data.success);
            else toast.error(data?.error);   
        
          })
          })
        }

  return (
     <div className="auth-root">
        <div className="bg-grid" />
        <div className="bg-glow" />

        <div className="card">
       <div className="form-body">
       <Form {...form}> 
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                >
                <div className="form-header">
                  
                 <div className="form-title"><img src="/kore-logo.png" className="h-full w-7"></img>KORE</div>
                  <div className="form-subtitle text-center">RESET YOUR PASSWORD</div>
                </div>

                <div className="field">
                <FormField
                  control={form.control}
                  name="password"  
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" placeholder="Enter your new password" disabled={isPending} className="input-field " />
                        </FormControl>
                    <FormMessage className="text-red-400" />

                      </FormItem>
                  )}
                  />
                </div>

        
               
                <button className="submit-btn rounded-lg" type="submit">RESET PASSWORD</button>

               <div className="text-center mt-4! text-sm text-white hover:underline cursor-pointer" onClick={()=>redirect("/auth")}>Back to Login</div>
               
                </form>
                  </Form>
            
            </div>
            </div>
            </div>
           

  )
};



export default ResetPasswordForm
