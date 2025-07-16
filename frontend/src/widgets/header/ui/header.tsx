'use client'

import { projectQueries } from "@/entities/project/api/queries"
import { ToggleThemeMode } from "@/shared"
import { SidebarTrigger } from "@/shared/ui/sidebar"
import { Skeleton } from "@/shared/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { useParams } from 'next/navigation'

export function Header() {
  const params = useParams()
  const { data, isPending } = useQuery(projectQueries.project(params?.project as string))

  return (
    <header className="sticky top-0 bg-background flex h-16 shrink-0 items-center gap-2 justify-between transition-[width,height] border-solid border-b border-inherit ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        {isPending ? <Skeleton className="h-5 w-[200px]" /> : (data?.data?.title || 'Project title')}
          
      </div>
      <div className="flex items-center gap-2 px-4">
        <ToggleThemeMode />
      </div>
    </header>
  )
}