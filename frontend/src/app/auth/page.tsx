import type { Metadata } from 'next'
import Auth from './Auth'

export const metadata: Metadata = {
  title: 'Авторизация',
  description: 'Страница авторизации'
}

export default function AuthPage() {
  return <Auth />
}