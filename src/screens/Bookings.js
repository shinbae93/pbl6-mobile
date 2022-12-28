import { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import { BOOKING_STATUSES, BOOKING_STATUS_COLORS } from '../common/constants'
import BookingCard from '../components/BookingCard'
import { useAxiosContext } from '../context/AxiosContext'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState(null)

  const { Axios } = useAxiosContext()

  async function fetchBookings() {
    Axios.get(
      `/booking/bookings/current-user${
        status != null ? `?status=${status}` : ''
      }`
    )
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
  }, [status])

  const renderItem = ({ item }) => {
    return (
      <View>
        <BookingCard data={item} />
      </View>
    )
  }

  const StatusTab = ({ data }) => {
    console.log('🚀 ~ file: Bookings.js:49 ~ StatusTab ~ data', data)
    return (
      <View
        style={{
          paddingBottom: 5,
          borderBottomWidth: 3,
          borderBottomColor:
            status == data?.id ? BOOKING_STATUS_COLORS[data?.name] : '#fff',
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: 5,
            paddingVertical: 5,
            paddingHorizontal: 15,
          }}
          onPress={() => setStatus(data?.id)}
        >
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              fontWeight: 'bold',
              color: BOOKING_STATUS_COLORS[data?.name],
            }}
          >
            {data?.name}
          </Text>
        </TouchableOpacity>
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
      ListHeaderComponent={() => {
        return (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.listTab}
            horizontal={true}
          >
            {Object.values(BOOKING_STATUSES).map((status, index) => {
              return <StatusTab data={status} key={index} />
            })}
          </ScrollView>
        )
      }}
      ListEmptyComponent={() => (
        <View
          style={{
            alignSelf: 'center',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Image source={require('../../assets/EmptyInbox.png')} />
          <Text style={{ textAlign: 'center' }}>No bookings.</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  listTab: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  tab: {},
})
