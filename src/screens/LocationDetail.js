import { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import { PRIMARY_COLOR_HEX } from '../common/constants'
import RoomCard from '../components/RoomCard'
import { useAxiosContext } from '../context/AxiosContext'
import Icon from 'react-native-vector-icons/Ionicons'
import LineDivider from '../components/LineDivider'

export default function LocationDetail({ route }) {
  const { id } = route.params
  console.log('🚀 ~ file: LocationDetail.js:8 ~ LocationDetail ~ id', id)
  const [rooms, setRooms] = useState([])
  const [location, setLocation] = useState(null)

  const { Axios } = useAxiosContext()

  async function fetchLocation() {
    Axios.get(`booking/locations/${id}`)
      .then((res) => {
        setLocation(res.data)
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: Location.js ~ line 23 ~ fetchRooms ~ err',
          err.request
        )
        Alert.alert('Error', err.message)
      })
  }

  async function fetchRooms() {
    Axios.post(`booking/locations/${id}/rooms/all`, {})
      .then((res) => {
        console.log('🚀 ~ file: LocationDetail.js:42 ~ .then ~ res', res.data)
        setRooms(res.data)
      })
      .catch((err) => {
        console.log('🚀 ~ file: Location.js ~ line 23 ~ fetchRooms ~ err', err)
        Alert.alert('Error', err.message)
      })
  }

  useEffect(() => {
    fetchLocation()
    fetchRooms()
  }, [])

  const renderItem = ({ item }) => {
    return <RoomCard data={{ ...item }} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.locationCard}>
            <Image
              source={{ uri: location?.imgUrl }}
              resizeMode='cover'
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={[styles.title, styles.text]}>{location?.name}</Text>
              <Text>
                <View style={styles.icon}>
                  <Icon name='location-outline' resizeMode='contain' />
                </View>
                <Text style={[styles.text, styles.infoText]}>
                  {location?.address || ''}
                </Text>
                <Text style={[styles.text, styles.infoText]}>
                  {location?.wards ? ', ' + location?.wards : ''}
                </Text>
                <Text style={[styles.text, styles.infoText]}>
                  {location?.district ? ', ' + location?.district : ''}
                </Text>
                <Text style={[styles.text, styles.infoText]}>
                  {location?.city ? ', ' + location?.city : ''}
                </Text>
              </Text>
              <Text>
                <View style={styles.icon}>
                  <Icon name='clipboard-outline' resizeMode='contain' />
                </View>
                <Text style={[styles.text, styles.infoText]}>
                  {location?.description}
                </Text>
              </Text>
              <LineDivider />
              <View style={styles.utilities}>
                <View style={styles.utilitiesTitle}>
                  <View style={styles.icon}>
                    <Icon name='md-list' resizeMode='contain' />
                  </View>
                  <Text style={styles.utilitiesTitleText}>Utilities</Text>
                </View>
                <View style={styles.utilityList}>
                  {location?.utilityResponses.map((utility) => (
                    <View key={utility?.id} style={styles.utilityItem}>
                      <Text
                        style={[styles.text, styles.infoText]}
                      >{`${utility?.name}: ${utility?.price} VND`}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    marginTop: 10,
    position: 'absolute',
  },
  locationCard: {
    position: 'relative',
    backgroundColor: '#fff',
    borderTopWidth: 8,
    borderTopColor: PRIMARY_COLOR_HEX,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  image: {
    height: 200,
    borderRadius: 12,
  },
  info: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  icon: {
    marginTop: 3,
    paddingRight: 5,
  },
  text: {
    fontFamily: 'Plus Jakarta Sans',
  },
  infoText: {
    color: '#34383D',
  },
  row: {
    flexDirection: 'row',
  },
  utilities: {
    marginTop: 15,
  },
  utilitiesTitle: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  utilitiesTitleText: {
    fontWeight: '700',
  },
  utilityList: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  utilityItem: {
    flexBasis: '50%',
    marginVertical: 3,
  },
})
