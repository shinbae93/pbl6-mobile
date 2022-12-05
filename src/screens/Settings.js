import React from 'react'
import { Avatar } from 'react-native-paper'
import Placeholder from '../components/Placeholder'

export default function Settings() {
  return (
    <>
      {/* <Avatar.Image size={24} source={require('../assets/avatar.png')} /> */}
      <Placeholder
        size={220}
        title='ACCOUNT SETTINGS'
        source={require('../../assets/demos/settings.png')}
      />
    </>
  )
}

