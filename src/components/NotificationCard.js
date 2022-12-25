import { StyleSheet } from 'react-native'
import { Avatar, List, Text } from 'react-native-paper'
import { WARNING_COLOR_HEX } from '../common/constants'
import { FormatDatetime } from '../utilities/datetime'
import { useAxiosContext } from '../context/AxiosContext'
import { navigate } from '../navigation/RootNavigation'

export default function NotificationCard({ data }) {
  const { id, username, message, bookingId, createOn, isRead } = data

  const { Axios } = useAxiosContext()

  const readNoti = () => {
    Axios.put(`booking/bookings/noti/${id}/isRead`).catch((err) => {
      console.log(
        '🚀 ~ file: NotificationCard.js:20 ~ readNoti ~ err',
        err.message
      )
    })
  }

  return (
    <List.Item
      title={() => (
        <Text style={styles.text}>
          <Text style={styles.username}>{username}</Text>
          <Text> {message}</Text>
        </Text>
      )}
      left={() => (
        <Avatar.Image
          source={require('../../assets/notifications/icons-alarm.png')}
          style={styles.avatar}
        />
      )}
      description={FormatDatetime(createOn)}
      style={{
        backgroundColor: isRead ? '#ddd' : '#FAF8F1',
        padding: 15,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderWidth: isRead ? 0 : 1,
      }}
      onPress={() => {
        if (!isRead) {
          readNoti()
          navigate('booking-detail', {
            id: bookingId,
          })
        }
      }}
    />
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
