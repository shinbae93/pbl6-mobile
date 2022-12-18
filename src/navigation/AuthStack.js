import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login'
import { ForgotPassword } from '../screens/ForgotPassword'
import { Register } from '../screens/Register'
import { Welcome } from '../screens/Welcome'

const Stack = createNativeStackNavigator()

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='welcome'>
      <Stack.Screen
        name='welcome'
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='login'
        component={Login}
        options={{
          headerShown: true,
          headerTransparent: true,
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name='forgotpassword'
        component={ForgotPassword}
        options={{
          headerShown: true,
          headerTransparent: true,
          title: 'Forgot password',
        }}
      />
      <Stack.Screen
        name='register'
        component={Register}
        options={{
          headerShown: true,
          headerTransparent: true,
          title: 'Register',
        }}
      />
    </Stack.Navigator>
  )
}
