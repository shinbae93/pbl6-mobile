import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { PRIMARY_COLOR_HEX } from '../common/constants'

export default function Loading() {
  return (
    <ActivityIndicator
      animating={true}
      color={PRIMARY_COLOR_HEX}
      size='large'
      style={styles.loading}
    />
  )
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})
