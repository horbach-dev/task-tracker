import Cookies from 'js-cookie'

const ACCESS_TOKEN = 'accessToken'

export function getAccessToken() {
  const token = Cookies.get(ACCESS_TOKEN)
  return token ?? null
}

export function setToken(value: string) {
  Cookies.set(
    ACCESS_TOKEN,
    value, {
      domain: process.env.DOMAIN ?? 'localhost',
      sameSite: 'strict',
      expires: 1
    }
  )
}

export function removeToken() {
  Cookies.remove(ACCESS_TOKEN)
}