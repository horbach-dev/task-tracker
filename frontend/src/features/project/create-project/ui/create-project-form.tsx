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
import { Textarea } from '@/shared/ui/textarea'
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { useAddProject } from '../api/useAddProject'

export function CreateProjectForm() {
  const form = useForm<{ title: string, description: string }>({ mode: 'onChange', defaultValues: { title: '', description: '' } })
  const { mutate, isPending } = useAddProject({ resetForm: form.reset })

  return (
    <Form {...form}>
      <form
        className='m-auto mt-10'
        onSubmit={form.handleSubmit(data => mutate(data))}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Заголовок</FormLabel>
              <FormControl>
                <Input placeholder="Название проекта" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Описание проекта в пару строк" {...field} />
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
          Создать проект
        </Button>
      </form>
      </Form>
  )
}