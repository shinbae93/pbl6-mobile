import React from 'react'
import { AuthProvider } from './src/context/AuthContext'
import { AxiosProvider } from './src/context/AxiosContext'
import { LoadingProvider } from './src/context/LoadingContext'
import AppNavigation from './src/navigation/AppNavigation'

// const App = () => {
//   const { authState, setAuthState } = useAuthContext()
//   const [isLoading, setLoading] = useState(true)

//   const loadJWT = useCallback(async () => {
//     try {
//       const value = await Keychain.getGenericPassword()
//       const jwt = JSON.parse(value.password)

//       setAuthState({
//         accessToken: jwt.accessToken || null,
//         refreshToken: jwt.refreshToken || null,
//         currentUser: jwt.currentUser || null,
//       })
//       setLoading(false)
//     } catch (error) {
//       setLoading(false)
//       console.log(`Keychain Error: ${error.message}`)
//       setAuthState({
//         accessToken: null,
//         refreshToken: null,
//         currentUser: null,
//       })
//     }
//   }, [])

//   useEffect(() => {
//     loadJWT()
//   }, [loadJWT])

//   if (isLoading) {
//     return <Loading />
//   }

//   if (!authState?.currentUser) {
//     return <Login />
//   }
//   return <Navigation />
// }

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
