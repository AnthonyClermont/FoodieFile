"use client"

import { Alert, AlertDescription } from '@/components/ui/alert';
import { signup } from './actions'
import { Button } from "@/components/ui/button";
import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AlertCircle, Loader2, X } from 'lucide-react';
import Link from 'next/link';

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is a required field." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)."})
    .max(16, { message: "Password at most can contain 16 character(s)."}),
  confirm: z
    .string()
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
});

export default function ProfileForm() {
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    var result = await signup(values);

    if (!result.success) {
        setErrMsg(result.message)
    }

    setLoading(false);
  }

  return (
    <div className='flex flex-col mx-auto max-w-sm pt-10'>
      <h1 className='pb-1 text-xl font-semibold text-center'>Welcome to Foodie 🍜.</h1>
      <small className='pb-10 text-center'>Already have an account? <Link className='underline' href='/login'>Login</Link></small>

      {errMsg &&
        <Alert className='mb-4 relative' variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {errMsg}
            
            <X className='absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 cursor-pointer' onClick={() => setErrMsg(null)} />
          </AlertDescription>
        </Alert>
      }

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='foodie@email.com' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span className='flex w-full justify-evenly pt-6'>
          {!loading ? (
            <Button size='sm' className="w-full" type="submit">
              Sign Up
            </Button>
          ) : (
            <Button size='sm' className="w-full" disabled>
              <Loader2 className="animate-spin" />
              Creating Account...
            </Button>
          )}
          </span>
        </form>
      </Form>
    </div>
  )
}

