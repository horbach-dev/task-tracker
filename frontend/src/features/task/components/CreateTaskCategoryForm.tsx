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
import { useCreateTaskCategory } from '../api/useCreateTaskCategory'

interface ICreateProjectForm {
  title: string
  projectId: string
}

interface IProps {
  projectId: string
}

export function CreateTaskCategoryForm({ projectId }: IProps) {
  const form = useForm<ICreateProjectForm>({ mode: 'onChange', defaultValues: { title: '', projectId } })
  const { isPending, create } = useCreateTaskCategory(form.reset)

  return (
    <Form {...form} >
      <form
        className='m-auto'
        onSubmit={form.handleSubmit(data => create(data))}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='mb-5'>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Название категории" {...field} />
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
          Создать категорию задачи
        </Button>
      </form>
    </Form>
  )
}