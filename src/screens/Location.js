import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import axios from 'axios'
import { Searchbar } from 'react-native-paper'
import { List, Avatar } from 'react-native-paper'
import LocationCard from '../components/LocationCard'

export default function Location() {
  const [locations, setLocations] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  async function fetchLocations() {
    axios
      .get(
        'https://pbl6-prod-pbl-dspnq9.mo6.mogenius.io/api/booking/locations/all'
      )
      .then((res) => {
        console.log('🚀 ~ file: Location.js:25 ~ .then ~ res', res.headers)
        console.log('🚀 ~ file: Location.js ~ line 22 ~ .then ~ res', res.data)
        setLocations(res.data)
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: Location.js ~ line 23 ~ fetchLocations ~ err',
          err
        )
        Alert.alert('Error', err.message)
      })

    setLocations(locations)
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View>
        {/* <List.Item
          title={name}
          description={address}
          left={() => <Avatar.Image size={44} source={{ uri: imgUrl }} />}
        /> */}
        <LocationCard data={item} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder='Search your place'
        onChangeText={(text) => {
          setSearchQuery(text)
        }}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // padding: 120,
    // paddingBottom: 120,
  },
  searchbar: {
    // paddingTop: 20,
    // height: 100,
    // width: '80%',
    // alignItems: 'center',
    marginBottom: 10,
  },
  list: {
    marginBottom: 100,
  },
})
