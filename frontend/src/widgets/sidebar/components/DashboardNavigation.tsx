"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, GalleryVerticalEnd } from "lucide-react"
import { useQuery } from '@tanstack/react-query'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar"
import { showModal } from "@/features/modal/lib/show-modal"
import { CreateProjectForm } from "@/features/project"
import { projectQueries } from "@/entities/project/api/queries"
import { Skeleton } from "@/shared/ui/skeleton"
import { useParams, useRouter } from "next/navigation"

const defaultProject = {
  title: 'Выберите проект',
  description: ''
}

export function DashboardNavigation() {
  const params = useParams()
  const { push } = useRouter()
  const { isMobile } = useSidebar()
  const { data, isPending } = useQuery(projectQueries.projects())

  const handleOpenCreateProjectModal = () => {
    showModal({ content: <CreateProjectForm />, header: { title: 'Создание проекта' }  })
  }

  if (isPending) {
    return (
      <div className="flex items-center space-x-4 pl-2">
      <Skeleton className="h-12 w-12 rounded-5" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
    )
  }

  const activeProjectData = () => {
    const project = data?.data?.find(project => project.id === params?.project)

    if (project) {
      return {
        title: project?.title,
        description: project?.description
      }
    }

    return defaultProject
  }

  const activeProject = params?.project ? activeProjectData() : defaultProject

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeProject.title}</span>
                {activeProject.description && (
                  <span className="truncate text-xs">
                    {activeProject.description}
                  </span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {data?.data.map(project => (
              <DropdownMenuItem
                key={project.title}
                onClick={() => push(`/main/${project.id}`)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <GalleryVerticalEnd className="size-3.5 shrink-0"/>
                </div>
                {project.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleOpenCreateProjectModal}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Добавить проект</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
