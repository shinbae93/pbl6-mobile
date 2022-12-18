import React, { createContext, useContext } from 'react'
import axios from 'axios'
import { useAuthContext } from './AuthContext'
import { BASE_API } from '../common/constants'

export const AxiosContext = createContext()

export const AxiosProvider = ({ children }) => {
  const { token } = useAuthContext()

  const Axios = axios.create({
    baseURL: BASE_API,
  })

  Axios.interceptors.request.use(
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
        Axios,
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
