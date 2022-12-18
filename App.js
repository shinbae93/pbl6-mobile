import React from 'react'
import { AuthProvider } from './src/context/AuthContext'
import { AxiosProvider } from './src/context/AxiosContext'
import { LoadingProvider } from './src/context/LoadingContext'
import AppNavigation from './src/navigation/AppNavigation'

export default function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <AxiosProvider>
          <AppNavigation />
        </AxiosProvider>
      </AuthProvider>
    </LoadingProvider>
  )
}
