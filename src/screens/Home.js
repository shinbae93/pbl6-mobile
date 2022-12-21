import React, { useEffect, useState } from 'react'
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import LocationCard from '../components/LocationCard'
import { useAxiosContext } from '../context/AxiosContext'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Home() {
  const [locations, setLocations] = useState([])
  const [query, setQuery] = useState('')

  const { Axios } = useAxiosContext()

  async function fetchLocations() {
    Axios.get('/booking/locations/all')
      .then((res) => {
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
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View>
        <LocationCard data={item} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        left={
          <TextInput.Icon
            name={() => (
              <Icon name='search-outline' color='#1a303d' size={20} />
            )}
          />
        }
        right={
          <TextInput.Icon
            name={() => (
              <Icon name='options-outline' color='#1a303d' size={20} />
            )}
          />
        }
        value={query}
        onChangeText={(text) => setQuery(text)}
        style={styles.search}
        placeholder='Search by location name, address'
        underlineColor='#fff'
        activeUnderlineColor='#fff'
        placeholderTextColor='#ddd'
      />

      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  search: {
    overflow: 'hidden',
    alignSelf: 'center',
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: 10,
  },
  list: {
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
