import { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  List,
  Paragraph,
  Portal,
  Provider,
  Text,
  TextInput,
  Title,
} from 'react-native-paper'
import { PRIMARY_COLOR_HEX } from '../common/constants'
import LineDivider from '../components/LineDivider'
import { useAxiosContext } from '../context/AxiosContext'
import { FormatDatetime, MaxDate } from '../utilities/datetime'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { navigate } from '../navigation/RootNavigation'

export default function CreateBooking({ route }) {
  const { roomId, locationId } = route.params

  const [utilities, setUtilities] = useState([])
  console.log(
    '🚀 ~ file: CreateBooking.js:47 ~ CreateBooking ~ utilities',
    utilities.map((utility) => utility.selected)
  )
  const [room, setRoom] = useState(null)
  const [monthNumber, setMonthNumber] = useState(1)
  const [startDay, setStartDay] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const [visible, setVisible] = useState(false)

  const { Axios } = useAxiosContext()

  async function fetchUtilitiesConfig() {
    Axios.get(`booking/locations/${locationId}/utilities`)
      .then((res) => {
        setUtilities(
          res.data.map((item) => {
            return { ...item, selected: false }
          })
        )
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: CreateBooking.js:17 ~ Axios.get ~ err',
          err.message
        )
      })
  }

  const onPickDate = (event, selectedDate) => {
    if (event.type == 'dismissed') {
      setShow(false)
    } else {
      setShow(false)
      setStartDay(selectedDate)
    }
  }

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true)
    }
    setMode(currentMode)
  }

  async function fetchRoom() {
    Axios.get(`booking/rooms/${roomId}/detail`)
      .then((res) => {
        setRoom(res.data)
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: CreateBooking.js:35 ~ fetchRoom ~ err',
          err.request
        )
        Alert.alert('', err.response.data.message)
      })
  }

  useEffect(() => {
    fetchUtilitiesConfig()
    fetchRoom()
  }, [])

  function CreateBooking() {
    const inputUtils = utilities
      .filter((utility) => utility.selected)
      .map((utility) => {
        delete utility.selected
        utility.price = String(utility.price).replace('.', '')
        return utility
      })

    Axios.post(`booking/bookings`, {
      roomId,
      startDay,
      monthNumber,
      utilities: inputUtils,
    })
      .then((res) => {
        console.log(
          '🚀 ~ file: CreateBooking.js:105 ~ CreateBooking ~ res',
          res.data
        )
        navigate('booking-detail', {
          id: res?.data?.response,
        })
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: CreateBooking.js:108 ~ CreateBooking ~ err',
          err.message
        )
        Alert.alert('', err.response.data.message)
      })
  }

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <Card style={styles.card} mode='elevated'>
          <Text variant='titleMedium' style={{ marginTop: 10, marginLeft: 15 }}>
            Room Information
          </Text>
          <LineDivider />
          <Card.Cover
            source={{ uri: room?.imgUrl }}
            style={{ marginHorizontal: 10, height: 200, marginTop: 10 }}
          />
          <Card.Content>
            <Title style={{ marginTop: 10 }}>{room?.name}</Title>
            <Paragraph>
              Capacity:{' '}
              {room?.capacity &&
                `${room?.capacity} ${
                  room?.capacity >= 2 ? 'people' : 'person'
                }`}
            </Paragraph>
            <Paragraph>
              Price: {room?.price && `${room?.price} VND/month`}
            </Paragraph>
            <Paragraph>
              Available from:{' '}
              {room?.availableDay && FormatDatetime(room?.availableDay)}
            </Paragraph>
            <Paragraph>Rating: {room?.rating && room?.rating}</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card} mode='elevated'>
          <Card.Content>
            <TextInput
              label='Start day'
              value={FormatDatetime(startDay)}
              editable={false}
              right={
                <TextInput.Icon
                  icon='calendar'
                  onPress={() => {
                    showMode('date')
                  }}
                />
              }
              mode='outlined'
              activeOutlineColor={PRIMARY_COLOR_HEX}
              style={{ backgroundColor: '#fff', marginVertical: 5 }}
            />
            <TextInput
              label='Duration'
              value={`${monthNumber}`}
              keyboardType='numeric'
              onChangeText={(text) => setMonthNumber(text)}
              mode='outlined'
              activeOutlineColor={PRIMARY_COLOR_HEX}
              style={{
                backgroundColor: '#fff',
                marginBottom: 5,
                marginTop: 10,
              }}
              right={
                <TextInput.Affix text={monthNumber < 2 ? 'month' : 'months'} />
              }
            />
          </Card.Content>
        </Card>
        <Card style={styles.card} mode='elevated'>
          <Text variant='titleMedium' style={{ marginTop: 10, marginLeft: 15 }}>
            Utilities
          </Text>
          <LineDivider />
          <View>
            {utilities?.map((utility, index) => (
              <List.Item
                title={utility?.name}
                description={utility?.price && `${utility?.price} VND/month`}
                right={(props) => (
                  <Checkbox.Item
                    {...props}
                    status={utility?.selected ? 'checked' : 'unchecked'}
                    onPress={() => {
                      const newUtilities = [...utilities]
                      newUtilities[index].selected =
                        !newUtilities[index].selected
                      setUtilities(newUtilities)
                    }}
                  />
                )}
                style={{ width: '100%', paddingRight: 0, paddingVertical: 0 }}
                key={index}
              />
            ))}
          </View>
        </Card>
        <Button
          mode='contained'
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            backgroundColor: PRIMARY_COLOR_HEX,
          }}
          textColor='#fff'
          onPress={() => setVisible(true)}
        >
          Create Booking
        </Button>
        <View>
          {show && (
            <RNDateTimePicker
              value={new Date(room?.availableDay)}
              mode={mode}
              onChange={onPickDate}
              minimumDate={MaxDate(new Date(room?.availableDay), new Date())}
            />
          )}
        </View>

        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Create Booking</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Do you want to create this booking ?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setVisible(false)
                  CreateBooking()
                }}
              >
                Create
              </Button>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    backgroundColor: '#fff',
  },
})
