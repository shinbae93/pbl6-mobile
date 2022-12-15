import { useEffect, useState } from 'react'
import { Alert, FlatList, Image, SafeAreaView, StyleSheet } from 'react-native'
import RoomCard from '../components/RoomCard'
import { useAxiosContext } from '../context/AxiosContext'

export default function LocationDetail({ route }) {
  const { id, imgUrl } = route.params
  console.log('🚀 ~ file: LocationDetail.js:8 ~ LocationDetail ~ id', id)
  const [rooms, setRooms] = useState([])

  const { bookingAxios } = useAxiosContext()

  async function fetchRooms() {
    bookingAxios
      .post(`booking/locations/${id}/rooms/all`, {})
      .then((res) => {
        console.log('🚀 ~ file: Location.js ~ line 22 ~ .then ~ res', res.data)
        setRooms(res.data)
      })
      .catch((err) => {
        console.log('🚀 ~ file: Location.js ~ line 23 ~ fetchRooms ~ err', err)
        Alert.alert('Error', err.message)
      })
  }

  useEffect(() => {
    fetchRooms()
  }, [id])

  const renderItem = ({ item }) => {
    return <RoomCard data={item} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: imgUrl }} resizeMode='cover' style={styles.image} />
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  image: {
    width: '100%',
    height: '35%',
  },
  list: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
})
