import { useEffect, useState } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import LineDivider from '../components/LineDivider'
import NotificationCard from '../components/NotificationCard'
import { useAxiosContext } from '../context/AxiosContext'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])

  const { Axios } = useAxiosContext()

  async function fetchNotifications() {
    Axios.get('/booking/bookings/noti')
      .then((res) => {
        setNotifications(res.data)
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: Location.js ~ line 23 ~ fetchLocations ~ err',
          err.message
        )
        Alert.alert('Error', err.message)
      })
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 5 }}>
        <NotificationCard data={item} />
      </View>
    )
  }

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View
          style={{
            height: '100%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../../assets/notifications/no-notifications.png')}
          />
          <Text style={{ textAlign: 'center' }}>No notifications.</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
  list: {
    marginHorizontal: 10,
  },
})
