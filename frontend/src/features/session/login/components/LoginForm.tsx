'use client'

import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { useLogin } from '../api/useLogin'
import { IAuthForm } from '@/entities/session/api/types'

export function LoginForm() {
  const form = useForm<IAuthForm>({ mode: 'onChange', defaultValues: { email: '', password: '' } })
  const { login, isPending } = useLogin(form.reset)

  return (
    <Form {...form} >
      <form
        className='w-1/4 m-auto shadow bg-sidebar rounded-xl p-4'
        onSubmit={form.handleSubmit(data => login(data))}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type='password' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className='w-100' 
          size='lg'
          loading={isPending}
        >
          Логин
        </Button>
      </form>
    </Form>
  )
}