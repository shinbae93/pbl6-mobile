import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Title, Paragraph, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'

export default function LocationCard({ data }) {
  const { name, address, imgUrl } = data

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imgUrl }} style={styles.cardImg} />
      <Card.Content style={styles.cardContent}>
        <Title style={styles.cardTitle}>
          <Icon name='home' style={{ marginRight: 20 }} resizeMode='contain' />
          <Text style={styles.cardTitleText}>{name}</Text>
        </Title>

        <Paragraph style={styles.cardParagraph}>
          <Icon
            name='location'
            style={styles.cardParaIcon}
            resizeMode='contain'
          />
          <Text style={styles.cardParaText}>{address}</Text>
        </Paragraph>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    // paddingHorizontal: 5,
    backgroundColor: '#1a303d',
  },
  cardImg: {
    // marginTop: 10,
    resizeMode: 'contain',
  },
  cardTitle: {
    marginTop: 10,
    color: '#fff',
  },
  cardTitleText: {
    color: '#fff',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  cardTitleIcon: {
    margin: 20,
  },
  cardParagraph: {
    fontFamily: 'sans-serif',
    color: '#fff',
  },
  cardParaIcon: {
    margin: 20,
  },
  cardParaText: {
    color: '#fff',
    fontFamily: 'sans-serif',
  },
})
