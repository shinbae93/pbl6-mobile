import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import Background from '../components/Background'
import Search from '../components/Search'

export default function Home() {
  return (
    <SafeAreaView>
      <View style={styles.homeHeader}>
        {/* <Background image={require('../../assets/home/header-bg.png')} /> */}
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
    marginTop: 25,
  },
})
