import { redirect } from 'next/navigation'

import { createClient } from '../../../supabase/auth/server'
import { Button } from '@/components/ui/button'
import { signOut } from './actions'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return ( 
    <div>
      <p>Hello {data.user.email} {data.user.role} {data.user.id}</p>

      <Button onClick={signOut}>SignOut</Button>
    </div>
  )
}