import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { primaryColorHex } from '../common/constants'

export default function Loading() {
  return (
    <ActivityIndicator
      animating={true}
      color={primaryColorHex}
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
