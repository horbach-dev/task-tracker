export interface IAuthForm {
  password: string
  email: string
}

export interface IUser {
  id: string
  name?: string
  avatar?: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface IAuthResponse {
  user: IUser,
  accessToken: string
}