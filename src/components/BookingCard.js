import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
  Chip,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { PRIMARY_COLOR_HEX } from '../common/constants'
import { FormatDatetime } from '../utilities/datetime'
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
      <Card.Cover source={{ uri: imgUrl }} style={styles.coverImg} />
      <Card.Content>
        <Title>Booking #{id}</Title>
        <Paragraph>Start: {FormatDatetime(startDay)}</Paragraph>
        <Paragraph>
          Duration: {monthNumber} {monthNumber >= 2 ? 'months' : 'month'}
        </Paragraph>
        <Paragraph>Room: {roomName}</Paragraph>
        <Text>
          Status: <Text style={styles.status}>{status}</Text>
        </Text>
        {overDueDay && <Paragraph>Overdue at: {overDueDay}</Paragraph>}
        <LineDivider />
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
    borderRadius: 10,
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
    backgroundColor: PRIMARY_COLOR_HEX,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    color: '#fff',
  },
})
