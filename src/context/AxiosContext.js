import React, { createContext, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import * as Keychain from 'react-native-keychain'
import { bookingBaseAPI, userBaseAPI } from '../common/constants'

export const AxiosContext = createContext()

export const AxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext)

  const bookingAxios = axios.create({
    baseURL: bookingBaseAPI,
  })

  const userAxios = axios.create({
    baseURL: userBaseAPI,
  })

  bookingAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const refreshAuthLogic = async (failedRequest) => {
    const data = {
      refreshToken: authContext.authState.refreshToken,
    }

    const options = {
      method: 'POST',
      data,
      url: 'http://localhost:3001/api/refreshToken',
    }

    try {
      const tokenRefreshResponse = await axios(options)
      failedRequest.response.config.headers.Authorization =
        'Bearer ' + tokenRefreshResponse.data.accessToken

      authContext.setAuthState({
        ...authContext.authState,
        accessToken: tokenRefreshResponse.data.accessToken,
      })

      await Keychain.setGenericPassword(
        'accessToken',
        tokenRefreshResponse.data.accessToken
      )
      await Keychain.setGenericPassword(
        'refreshToken',
        authContext.authState.refreshToken
      )

      return await Promise.resolve()
    } catch (e) {
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
      })
    }
  }

  createAuthRefreshInterceptor(bookingAxios, refreshAuthLogic, {})

  return (
    <AxiosContext.Provider
      value={{
        bookingAxios,
        userAxios,
      }}
    >
      {children}
    </AxiosContext.Provider>
  )
}

export const useAxiosContext = () => {
  const context = useContext(AxiosContext)
  if (!context) {
    throw new Error('useAxiosContext must be used within AxiosProvider')
  }
  return context
}
