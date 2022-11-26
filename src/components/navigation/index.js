import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { navigationRef } from '../../utils/RootNavigation'
import TabBar from './TabBar'
import Home from '../../views/Home'
import Login from '../../views/Login'
import ForgotPassword from '../../views/ForgotPassword'
import Register from '../../views/Register'
import Account from '../../views/Account'
import Location from '../../views/Location'
import Settings from '../../views/Settings'

const Stack = createStackNavigator()

function Main() {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName='home'
      tabBar={(props) => <TabBar {...props} />}
      sceneContainerStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen name='home' component={Home} />
      <Tab.Screen name='locations' component={Location} />
      <Tab.Screen name='bookings' component={Account} />
      <Tab.Screen name='notifications' component={Account} />
      <Tab.Screen name='settings' component={Settings} />
    </Tab.Navigator>
  )
}

export default () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator initialRouteName='login'>
      <Stack.Screen
        name='login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='forgotpassword'
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='register'
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='main'
        component={Main}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)
