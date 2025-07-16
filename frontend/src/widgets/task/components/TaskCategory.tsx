'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { ReactNode } from 'react'
import { TrashIcon, CircleFadingPlus } from "lucide-react"
import { Button } from '@/shared/ui/button'

interface IProps {
  title: string
  projectId: string
  taskList: ReactNode
}

export function TaskCategory({ title, taskList }: IProps) {
  return (
    <Card className="shrink-0 w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>
          <Button variant="secondary" size="icon" className="size-8">
            <TrashIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {taskList}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant="outline"
        >
          <CircleFadingPlus />
          Добавить задачу
        </Button>
      </CardFooter>
    </Card>
  )
}