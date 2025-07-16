import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const {url, cookies} = request
  const isAuth = url.includes('/auth')
  const isMain = url.includes('/main')
  const accessToken = cookies.get('accessToken')?.value

  // скрываю страницы авторизации если у пользователя есть токен
  if (isAuth && accessToken) {
    return NextResponse.redirect(new URL('/main', url))
  }

  if (isMain && !accessToken) {
    return NextResponse.redirect(new URL('/auth', url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/main', '/auth/:path*'],
}