import { useEffect, useState } from 'react'
import { useAxiosContext } from '../context/AxiosContext'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Card, Paragraph, Text, Title } from 'react-native-paper'
import LineDivider from '../components/LineDivider'
import Icon from 'react-native-vector-icons/Ionicons'
import { FormatDatetime } from '../utilities/datetime'
import { BOOKING_STATUS_COLORS } from '../common/constants'

export default function BookingDetail({ route }) {
  const { id } = route.params
  const [booking, setBooking] = useState(null)

  const { Axios } = useAxiosContext()

  async function fetchBooking() {
    Axios.get(`booking/bookings/${id}`)
      .then((res) => {
        setBooking(res.data)
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: Location.js ~ line 23 ~ fetchRooms ~ err',
          err.request
        )
      })
  }

  useEffect(() => {
    fetchBooking()
  }, [])

  return (
    <SafeAreaView>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: booking?.imgUrl }} style={styles.coverImg} />
        <Card.Content>
          <Title>Booking #{booking?.id}</Title>
          <Paragraph>Start: {FormatDatetime(booking?.startDay)}</Paragraph>
          <Paragraph>
            Duration: {booking?.monthNumber}{' '}
            {booking?.monthNumber >= 2 ? 'months' : 'month'}
          </Paragraph>
          <Paragraph>Room: {booking?.roomName}</Paragraph>
          <Text>
            Status:{' '}
            <Text
              style={[
                styles.status,
                { backgroundColor: BOOKING_STATUS_COLORS[booking?.status] },
              ]}
            >
              {booking?.status}
            </Text>
          </Text>
          {booking?.overDueDay && (
            <Paragraph>Overdue at: {booking?.overDueDay}</Paragraph>
          )}
        </Card.Content>
        <Card.Content collapsable={false}>
          <LineDivider />
          <View style={styles.utilities}>
            <View style={styles.utilitiesTitle}>
              <View style={styles.icon}>
                <Icon name='md-list' resizeMode='contain' />
              </View>
              <Text style={styles.utilitiesTitleText}>Utilities</Text>
            </View>

            <View style={styles.utilityList}>
              {booking?.utilities?.map((utility, index) => {
                console.log(
                  '🚀 ~ file: BookingDetail.js:68 ~ {booking?.utilities?.map ~ utility',
                  utility
                )
                return (
                  <Text
                    style={[styles.text, styles.infoText, styles.utilityItem]}
                    key={index}
                  >{`${utility?.name}: ${utility?.price} VND`}</Text>
                )
              })}
            </View>
          </View>
        </Card.Content>
      </Card>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: '97%',
  },
  coverImg: {
    borderRadius: 10,
    margin: 10,
  },
  utilities: {
    marginTop: 15,
  },
  utilitiesTitle: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  utilitiesTitleText: {
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans',
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
  icon: {
    marginTop: 3,
    paddingRight: 5,
  },
  statusChip: {},
  status: {
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    color: '#fff',
  },
})
