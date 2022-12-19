import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'

export default function Settings() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}></View>
      <View style={styles.card}></View>
      <View style={styles.card}></View>
      <View style={styles.card}></View>
      <View style={styles.card}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  avatar: {},
  card: {},
})
