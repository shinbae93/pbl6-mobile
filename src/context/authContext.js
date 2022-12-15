import React, { createContext, useContext, useState } from 'react'
import * as Keychain from 'react-native-keychain'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const logout = async () => {
    await Keychain.resetGenericPassword()
    setToken(null)
  }

  const getToken = async () => {
    const token = token || (await token.getGenericPassword()).password
    return token
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        getToken,
        currentUser,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}
