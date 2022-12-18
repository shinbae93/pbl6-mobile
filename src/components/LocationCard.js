import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Title, Paragraph, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigate } from '../navigation/RootNavigation'

export default function LocationCard({ data }) {
  const { id, name, address, imgUrl } = data

  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigate('location-detail', {
          id,
          imgUrl,
        })
      }
    >
      <Card.Cover source={{ uri: imgUrl }} style={styles.cardImg} />
      <Card.Content style={styles.cardContent}>
        <Title style={styles.cardTitle}>
          {/* <Icon
            name='home-outline'
            style={{ marginRight: 20 }}
            resizeMode='contain'
          /> */}
          <Text style={styles.cardTitleText}>{name}</Text>
        </Title>

        <Paragraph style={styles.cardParagraph}>
          <Icon
            name='location-outline'
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
    marginHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardImg: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'contain',
  },
  cardContent: {
    // borderRadius: 15,
  },
  cardTitle: {
    marginTop: 10,
    // color: '#fff',
  },
  cardTitleText: {
    // color: '#fff',
    fontSize: 18,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: 'bold',
  },
  cardTitleIcon: {
    margin: 20,
  },
  cardParagraph: {
    fontFamily: 'Plus Jakarta Sans',
    // color: '#fff',
  },
  cardParaIcon: {
    margin: 20,
  },
  cardParaText: {
    // color: '#fff',
    fontFamily: 'Plus Jakarta Sans',
    color: '#65647C',
  },
})
