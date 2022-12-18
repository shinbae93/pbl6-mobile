import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import LineDivider from './Divider'

export default function BookingCard({ data }) {
  const {
    id,
    startDay,
    monthNumber,
    status,
    roomName,
    imgUrl,
    overDueDay,
    utilities,
  } = data

  return (
    <Card style={styles.card} key={id}>
      <Card.Cover source={{ uri: imgUrl }} />
      <Card.Content>
        <Title>Booking #{id}</Title>
        <Paragraph>Start day: {startDay}</Paragraph>
        <Paragraph>
          Duration: {monthNumber} {monthNumber >= 2 ? 'months' : 'month'}
        </Paragraph>
        <Paragraph>Room: {roomName}</Paragraph>
        <Paragraph>Status: {status}</Paragraph>
        {overDueDay && <Paragraph>Overdue at: {overDueDay}</Paragraph>}
        <Paragraph>
          <LineDivider />
        </Paragraph>
        <Paragraph>
          <View style={styles.utilities}>
            <View style={styles.utilitiesTitle}>
              <View style={styles.icon}>
                <Icon name='md-list' resizeMode='contain' />
              </View>
              <Text style={styles.utilitiesTitleText}>Utilities</Text>
            </View>
            <View style={styles.utilityList}>
              {utilities?.map((utility, index) => (
                <View key={index} style={styles.utilityItem}>
                  <Text
                    style={[styles.text, styles.infoText]}
                  >{`${utility?.name}: ${utility?.price} VND`}</Text>
                </View>
              ))}
            </View>
          </View>
        </Paragraph>
      </Card.Content>
    </Card>
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
    borderRadius: 15,
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
