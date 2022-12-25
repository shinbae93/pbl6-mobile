import { Image, StyleSheet, View } from 'react-native'
import { List, Text, Surface, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { navigate } from '../navigation/RootNavigation'
import { baseStyles } from '../common/baseStyles'
import { FormatDatetime } from '../utilities/datetime'
import LineDivider from './LineDivider'
import { PRIMARY_COLOR_HEX } from '../common/constants'

export default function RoomCard({ data }) {
  const { id, name, imgUrl, capacity, price, availableDay } = data

  return (
    <Surface style={styles.container} key={id}>
      <List.Item
        title={() => (
          <List.Item
            style={styles.card}
            title={() => <Text style={styles.title}>{name}</Text>}
            description={() => (
              <View>
                <View>
                  <Text>
                    <View style={styles.icon}>
                      <FontAwesome5Icon
                        name='dollar-sign'
                        resizeMode='contain'
                        style={styles.iconItem}
                      />
                    </View>
                    <Text style={baseStyles.text}> Price:</Text>
                    <Text style={baseStyles.text}> {price}</Text>
                    <Text style={baseStyles.text}> VND/month</Text>
                  </Text>
                  <Text>
                    <View style={styles.icon}>
                      <Icon
                        name='person-outline'
                        style={styles.iconItem}
                        resizeMode='contain'
                      />
                    </View>
                    <Text style={baseStyles.text}>Capacity: </Text>
                    <Text style={baseStyles.text}>{`${capacity} ${
                      capacity >= 2 ? 'people' : 'person'
                    }`}</Text>
                  </Text>
                  <Text>
                    <View style={styles.icon}>
                      <Icon
                        name='today-sharp'
                        style={styles.iconItem}
                        resizeMode='contain'
                      />
                    </View>
                    <Text style={baseStyles.text}>
                      Available from: {FormatDatetime(availableDay)}
                    </Text>
                  </Text>
                  <LineDivider />
                  <Button mode='contained' style={styles.button}>
                    Rent now
                  </Button>
                </View>
              </View>
            )}
            left={() => (
              <Image
                source={{ uri: imgUrl }}
                resizeMode='cover'
                style={styles.image}
              />
            )}
          />
        )}
        onPress={() =>
          navigate('room-detail', {
            id,
          })
        }
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
    backgroundColor: '#fff',
  },
  card: {},
  icon: {
    paddingRight: 5,
    alignSelf: 'baseline',
  },
  iconItem: {
    color: '#34383D',
  },
  image: {
    width: 120,
    height: 150,
    borderRadius: 12,
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Plus Jakarta Sans',
  },
  price: {
    fontWeight: '700',
  },
  button: {
    marginTop: 10,
    backgroundColor: PRIMARY_COLOR_HEX,
  },
})
