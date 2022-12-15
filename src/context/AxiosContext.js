import React, { createContext, useContext } from 'react'
import axios from 'axios'
import { useAuthContext } from './AuthContext'
import { bookingBaseAPI, userBaseAPI } from '../common/constants'

export const AxiosContext = createContext()

export const AxiosProvider = ({ children }) => {
  const { token } = useAuthContext()

  const bookingAxios = axios.create({
    baseURL: bookingBaseAPI,
  })

  const userAxios = axios.create({
    baseURL: userBaseAPI,
  })

  bookingAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

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
