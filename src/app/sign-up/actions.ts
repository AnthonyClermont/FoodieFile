'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../supabase/auth/server'
import { formSchema } from './page'
import { z } from 'zod'

export async function signup(formData: z.infer<typeof formSchema>) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath('/', 'layout')
  redirect('/home')
}