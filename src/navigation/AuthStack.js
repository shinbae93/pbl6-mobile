import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login'
import { ForgotPassword } from '../screens/ForgotPassword'
import { Register } from '../screens/Register'
import { Welcome } from '../screens/Welcome'
import { OTP } from '../screens/OTP'
import { ChangePassword } from '../screens/ChangePassword'

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
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name='forgotpassword'
        component={ForgotPassword}
        options={{
          headerShown: true,
          title: 'Forgot Password',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name='resetpassword'
        component={ForgotPassword}
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name='otp'
        component={OTP}
        options={{
          headerShown: true,
          title: 'OTP',
        }}
      />
      <Stack.Screen
        name='changepassword'
        component={ChangePassword}
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name='register'
        component={Register}
        options={{
          headerShown: true,
          title: 'Register',
        }}
      />
    </Stack.Navigator>
  )
}
