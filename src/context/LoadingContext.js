import { createContext, useContext, useState } from 'react'

export const LoadingContext = createContext()

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoadingContext = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoadingContext must be used within LoadingProvider')
  }
  return context
}
