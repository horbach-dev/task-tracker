'use client'

import { ReactNode, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar"
import { Sidebar } from "@/widgets/sidebar"
import { Header } from "@/widgets/header"
import { useSessionStore } from "@/entities/session"
import { Loader } from "@/shared/ui/Loader"

export default function MainLayout({ children }: { children: ReactNode }) {
  const { user: { id }, getCurrentUser } = useSessionStore()

  useEffect(() => {
    getCurrentUser()
  }, [])

  if (!id) return <Loader />

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header />
        <div className="w-full h-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}