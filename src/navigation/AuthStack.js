import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login'
import { ForgotPassword } from '../screens/ForgotPassword'
import { Register } from '../screens/Register'
import { Welcome } from '../screens/Welcome'

const Stack = createNativeStackNavigator()

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='welcome'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='welcome' component={Welcome} />
      <Stack.Screen name='login' component={Login} />
      <Stack.Screen name='forgotpassword' component={ForgotPassword} />
      <Stack.Screen name='register' component={Register} />
    </Stack.Navigator>
  )
}
