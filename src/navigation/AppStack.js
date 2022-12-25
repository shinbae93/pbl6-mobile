import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookingDetail from '../screens/BookingDetail'
import LocationDetail from '../screens/LocationDetail'
import RoomDetail from '../screens/RoomDetail'
import Profile from '../screens/Profile'
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
      <Stack.Screen
        name='room-detail'
        component={RoomDetail}
        options={{
          headerShown: true,
          title: 'Room Detail',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='booking-detail'
        component={BookingDetail}
        options={{
          headerShown: true,
          title: 'Booking Detail',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='profile'
        component={Profile}
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  )
}
