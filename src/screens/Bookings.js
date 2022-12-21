import { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import BookingCard from '../components/BookingCard'
import { useAxiosContext } from '../context/AxiosContext'

export default function Bookings() {
  const [bookings, setBookings] = useState([])

  const { Axios } = useAxiosContext()

  async function fetchBookings() {
    Axios.get('/booking/bookings/current-user')
      .then((res) => {
        setBookings(res.data)
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
    fetchBookings()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View>
        <BookingCard data={item} />
      </View>
    )
  }

  return (
    <FlatList
      data={bookings}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={{ paddingTop: 15, paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  list: {},
})
