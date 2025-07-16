import { axiosClassic, axiosWithAuth } from "@/shared/api/interceptors";
import { IAuthForm, IAuthResponse } from "./types";
import { IUser } from '../model/types';
import { removeToken, setToken } from "@/shared/api/token.service";

export const sessionService = {
  async login (data: IAuthForm) {
    const response = await axiosClassic.post<IAuthResponse>('/auth/login', data)

    if (response.data.accessToken) {
      setToken(response.data.accessToken)
    }

    return response
  },
  async getUserData () {
    const response = await axiosWithAuth.get<IUser>('/user')
    return response
  },
  async logout() {
    const response = await axiosClassic.post<boolean>('/auth/logout')

    if (response.data) {
      removeToken()
    }

    return response
  },
  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>('/auth/refresh')

    if (response.data.accessToken) {
      setToken(response.data.accessToken)
    }

    return response
  }
}