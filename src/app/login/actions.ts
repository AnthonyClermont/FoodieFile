'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../supabase/auth/server'
import { formSchema } from './page'
import { z } from 'zod'

export async function login(formData: z.infer<typeof formSchema>) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  console.log("error is: ", error);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath('/', 'layout')
  redirect('/home')
}