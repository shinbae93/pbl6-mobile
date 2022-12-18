import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LocationDetail from '../screens/LocationDetail'
import { TabNavigator } from './TabNavigator'

const Stack = createNativeStackNavigator()

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='main'>
      <Stack.Screen
        name='main'
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='location-detail'
        component={LocationDetail}
        options={{
          headerShown: true,
          title: 'Location Detail',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  )
}
