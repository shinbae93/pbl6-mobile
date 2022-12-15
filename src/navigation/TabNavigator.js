import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar from '../components/TabBar'
import Account from '../screens/Account'
import Home from '../screens/Home'
import Settings from '../screens/Settings'

export function TabNavigator() {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName='home'
      tabBar={(props) => <TabBar {...props} />}
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name='home' component={Home} />
      <Tab.Screen name='bookings' component={Account} />
      <Tab.Screen name='notifications' component={Account} />
      <Tab.Screen name='settings' component={Settings} />
    </Tab.Navigator>
  )
}
