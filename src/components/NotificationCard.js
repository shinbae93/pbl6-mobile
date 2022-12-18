import { StyleSheet } from 'react-native'
import { Avatar, List, Surface, Text } from 'react-native-paper'
import { WARNING_COLOR_HEX } from '../common/constants'
import { FormatDatetime } from '../utilities/datetime'
import Icon from 'react-native-vector-icons/Ionicons'

export default function NotificationCard({ data }) {
  const { username, message, bookingId, createOn } = data

  return (
    <Surface style={styles.container}>
      <List.Item
        title={() => (
          <Text style={styles.text}>
            <Text style={styles.username}>{username}</Text>
            <Text> {message}</Text>
          </Text>
        )}
        left={() => (
          <Avatar.Image
            // size={48}
            source={require('../../assets/notifications/icons-alarm.png')}
            style={styles.avatar}
          />
        )}
        description={FormatDatetime(createOn)}
        style={styles.card}
      />
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {},
  card: {},
  avatar: {
    backgroundColor: WARNING_COLOR_HEX,
    justifyContent: 'center',
    marginRight: 10,
  },
  icon: {
    color: '#fff',
    fontSize: 36,
  },
  username: {
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
  },
})
