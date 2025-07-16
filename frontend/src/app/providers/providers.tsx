"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { PropsWithChildren, useState } from 'react'
import { ModalProvider } from './modal-provider'

export function Providers ({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }))

  return (
    <QueryClientProvider client={client}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <ModalProvider />
      </NextThemesProvider>
    </QueryClientProvider>
  )
}