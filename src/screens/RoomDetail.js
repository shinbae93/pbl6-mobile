import { Image, SafeAreaView, StyleSheet, View } from 'react-native'

export default function RoomDetail({ route }) {
  const { id, locationId } = route.params
  const [room, setRoom] = useState(null)
  const { bookingAxios } = useAxiosContext()
  const { name, imgUrl, capacity, price, availableDay } = room

  async function fetchRoom() {
    bookingAxios
      .post(`booking/locations/${locationId}/rooms/${id}`)
      .then((res) => {
        console.log('🚀 ~ file: Location.js ~ line 22 ~ .then ~ res', res.data)
        setRoom(res.data)
      })
      .catch((err) => {
        console.log('🚀 ~ file: Location.js ~ line 23 ~ fetchRooms ~ err', err)
        Alert.alert('Error', err.message)
      })
  }

  useEffect(() => {
    fetchRoom()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: imgUrl }}
        resizeMode='contain'
        style={styles.image}
      />
      <View>
        <Text>{name}</Text>
        <Text>
          <Icon
            name='person-outline'
            style={styles.cardIcon}
            resizeMode='contain'
          />
          {`${capacity} ${capacity > 2 ? 'people' : 'person'}`}
        </Text>
        <Text>$ {price} VND</Text>/month
        <Text>
          <Icon
            name='today-sharp'
            style={styles.cardIcon}
            resizeMode='contain'
          />
          Available from: {availableDay}
        </Text>
      </View>
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
