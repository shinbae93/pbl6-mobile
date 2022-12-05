import { NavigationContainer } from '@react-navigation/native'
import Loading from '../components/Loading'
import { useAuthContext } from '../context/AuthContext'
import { useLoadingContext } from '../context/LoadingContext'
import { navigationRef } from './RootNavigation'
import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'

const AppNavigation = () => {
  const { loading } = useLoadingContext()
  const { currentUser } = useAuthContext()

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <NavigationContainer ref={navigationRef}>
          {currentUser ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      )}
    </>
  )
}

export default AppNavigation
