import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar from '../components/TabBar'
import Bookings from '../screens/Bookings'
import Home from '../screens/Home'
import Notifications from '../screens/Notifications'
import Settings from '../screens/Settings'

export function TabNavigator() {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName='home'
      tabBar={(props) => <TabBar {...props} />}
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      // screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name='home'
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name='bookings'
        component={Bookings}
        options={{ headerTitle: 'Bookings', headerTitleAlign: 'center' }}
      />
      <Tab.Screen
        name='notifications'
        component={Notifications}
        options={{ headerTitle: 'Notifications', headerTitleAlign: 'center' }}
      />
      <Tab.Screen
        name='settings'
        component={Settings}
        options={{ headerTitle: 'Settings', headerTitleAlign: 'center' }}
      />
    </Tab.Navigator>
  )
}
