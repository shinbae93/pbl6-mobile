import { Image, StyleSheet, Text, View } from 'react-native'
import { List, Surface } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigate } from '../navigation/RootNavigation'
import moment from 'moment'

export default function RoomCard({ data }) {
  const { id, name, imgUrl, capacity, price, availableDay } = data

  return (
    <Surface style={styles.container}>
      <List.Item
        style={styles.card}
        title={() => <Text style={styles.title}>{name}</Text>}
        description={() => (
          <View>
            <Text>
              <View style={styles.icon}>
                <Icon
                  name='person-outline'
                  style={styles.cardIcon}
                  resizeMode='contain'
                />
              </View>
              <Text>{`${capacity} ${capacity > 2 ? 'people' : 'person'}`}</Text>
            </Text>
            <Text>
              <Text style={styles.price}>$ {price} VND</Text>
              <Text>/month</Text>
            </Text>
            <Text>
              <Icon
                name='today-sharp'
                style={styles.cardIcon}
                resizeMode='contain'
              />
              <Text>
                Available from: {moment(availableDay).format('DD/MM/YYYY')}
              </Text>
            </Text>
          </View>
        )}
        left={() => (
          <Image
            source={{ uri: imgUrl }}
            resizeMode='cover'
            style={styles.image}
          />
        )}
        onPress={() => {
          navigate('room-detail', {
            id,
          })
        }}
      />
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.62,
    elevation: 2,
  },
  card: {},
  icon: {
    paddingRight: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 15,
    marginLeft: 2,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  price: {
    fontWeight: '700',
  },
})
