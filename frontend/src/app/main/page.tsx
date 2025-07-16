import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Страница c задачами'
}

export default function MainPage() {
  return (<div>Главная страница раздела Main</div>)
}