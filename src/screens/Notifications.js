import { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import LineDivider from '../components/Divider'
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
      <View>
        <NotificationCard data={item} />
        <LineDivider />
      </View>
    )
  }

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={{ paddingBottom: 15 }}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
  list: {
    marginHorizontal: 10,
  },
})
