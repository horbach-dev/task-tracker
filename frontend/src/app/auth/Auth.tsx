'use client'

import { LoginForm } from '@/features/session/login'

export default function Auth() {

  return (
    <div className='flex min-h-screen'>
      <LoginForm/>  
    </div>
  )
}