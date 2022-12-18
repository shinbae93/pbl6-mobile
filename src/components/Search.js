import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Search(props) {
  const { inputPlaceholder } = props

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name='search' color='#1a303d' size={20} />
        <View style={styles.inputWrapper}>
          <TextInput placeholder={inputPlaceholder} style={styles.input} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans',
    color: '#fff',
  },
  inputContainer: {
    height: 45,
    width: '90%',
    // marginTop: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputWrapper: {
    width: '90%',
    marginLeft: 10,
  },
  input: {
    fontSize: 13,
    color: '#1a303d',
  },
})
