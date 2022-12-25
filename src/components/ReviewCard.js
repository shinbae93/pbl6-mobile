import { Image, StyleSheet, View } from 'react-native'
import { List, Text, Surface, Avatar } from 'react-native-paper'
import { DEFAULT_IMG, PRIMARY_COLOR_HEX } from '../common/constants'
import Icon from 'react-native-vector-icons/Ionicons'

export default function ReviewCard({ data }) {
  const { id, name, imgUrl, rating, comment, avatar } = data

  function Comment() {
    return (
      <View>
        <Text style={{ marginBottom: 15 }}>{comment}</Text>
        {imgUrl && (
          <Image
            source={{ uri: imgUrl }}
            resizeMode='cover'
            style={styles.image}
          />
        )}
      </View>
    )
  }

  return (
    <Surface style={styles.container} key={id}>
      <List.Item
        title={() => (
          <List.Item
            style={styles.card}
            title={() => <Text style={styles.title}>{name}</Text>}
            description={() => <Comment />}
            left={() => (
              <Avatar.Image source={{ uri: avatar }} resizeMode='cover' />
            )}
            right={() => (
              <View>
                <View>
                  <Icon
                    name='star'
                    style={styles.iconItem}
                    resizeMode='contain'
                    size={24}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'justify',
                    marginLeft: 2,
                    fontWeight: '700',
                  }}
                >
                  {parseFloat(Math.round(rating * 10) / 10).toPrecision(2)}
                </Text>
              </View>
            )}
          />
        )}
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
    color: '#f1c40f',
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
