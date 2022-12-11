import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabNavigator } from './TabNavigator'

const Stack = createNativeStackNavigator()

export const AppStack = () => {
  // const { authState, setAuthState } = useAuthContext()
  // const [isLoading, setLoading] = useState(true)
  // const loadJWT = useCallback(async () => {
  //   try {
  //     const value = await Keychain.getGenericPassword()
  //     const jwt = JSON.parse(value.password)
  //     setAuthState({
  //       accessToken: jwt.accessToken || null,
  //       refreshToken: jwt.refreshToken || null,
  //       currentUser: jwt.currentUser || null,
  //     })
  //     setLoading(false)
  //   } catch (error) {
  //     setLoading(false)
  //     console.log(`Keychain Error: ${error.message}`)
  //     setAuthState({
  //       accessToken: null,
  //       refreshToken: null,
  //       currentUser: null,
  //     })
  //   }
  // }, [])
  // useEffect(() => {
  //   loadJWT()
  // }, [loadJWT])
  // if (isLoading) {
  //   return <Loading />
  // }
  // if (!authState?.currentUser) {
  //   return <Login />
  // }
  // return <Navigation />

  return (
    <Stack.Navigator
      initialRouteName='main'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='main'
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
