import React from 'react'
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import Search from './home/Search'
import Background from '../components/Background'
import Locations from './home/locations/index'
// import * as RootNavigation from '../utils/RootNavigation'

// const { height } = Dimensions.get('screen')

const bookings = [
  {
    title: 'Grand Luxury',
    image: require('../../assets/home/bookings/booking-1.png'),
    tag: 'Featured',
    members: 500,
    rating: 3,
  },
  {
    title: 'Otman Hall',
    image: require('../../assets/home/bookings/booking-2.png'),
    tag: 'New',
    members: 200,
    rating: 4,
  },
  {
    title: 'Grand Luxury',
    image: require('../../assets/home/bookings/booking-1.png'),
    tag: 'Featured',
    members: 500,
    rating: 3,
  },
  {
    title: 'Otman Hall',
    image: require('../../assets/home/bookings/booking-2.png'),
    tag: 'New',
    members: 200,
    rating: 4,
  },
]

const bookingTabs = [
  { key: 'popular', title: 'Popular' },
  { key: 'top_rated', title: 'Top rated' },
  { key: 'best_price', title: 'Best price' },
  { key: 'best_choice', title: 'Best for you' },
]

export default function Home() {
  return (
    <SafeAreaView>
      <View style={styles.homeHeader}>
        <Background image={require('../../assets/home/header-bg.png')} />
        <View style={styles.headerWrapper}>
          {/* <TopBar
            menuIcon='bars'
            profileImage={require('../../assets/home/avatar.png')}
            profileAction={() => RootNavigation.pop()}
          /> */}
          <Search
            title='Search your desire space'
            inputPlaceholder='Search the house, room, etc'
          />
        </View>
      </View>
      <Locations data={bookings} tabs={bookingTabs} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  homeHeader: {
    height: 60,
  },
  headerWrapper: {
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})
