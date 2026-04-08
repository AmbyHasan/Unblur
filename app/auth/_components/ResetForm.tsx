"use client"

import { useForm } from 'react-hook-form';
import {  resetPasswordSchema } from '../../schema/index';
import{  Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormError from './FormError';
import FormSuccess from './FormSuccess';
import { useTransition } from 'react';
import { useState} from 'react';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import { reset } from '../../../actions/reset';
import { toast } from 'sonner';



const ResetForm = () => {


   const [isPending , startTransition]=useTransition();

      const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
        email:"" ,
       
        }
      })

        const onSubmit=(values : z.infer<typeof resetPasswordSchema>)=>{ 
        


          startTransition(()=>{
          reset(values) //passing the form values to the server action
          .then((data)=>{
            if(data?.success) toast.success(data.success);
            else toast.error(data?.error);   
        
          })
          })
      };

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
                  name="email"  
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Enter your email" disabled={isPending} className="input-field " />
                        </FormControl>
                    <FormMessage className="text-red-400" />

                      </FormItem>
                  )}
                  />
                </div>

        
               
                <button className="submit-btn rounded-lg" type="submit">SEND PASSWORD RESET EMAIL</button>

               <div className="text-center mt-4! text-sm text-white hover:underline cursor-pointer" onClick={()=>redirect("/auth")}>Back to Login</div>
               
                </form>
                  </Form>
            
            </div>
            </div>
            </div>
           

  )
}

export default ResetForm
