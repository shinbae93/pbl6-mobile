import * as React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SearchFilter = () => {
  const [query, setQuery] = React.useState('')

  return (
    <TextInput
      left={
        <TextInput.Icon
          name={() => <Icon name='search-outline' color='#1a303d' size={20} />}
        />
      }
      right={
        <TextInput.Icon
          name={() => (
            <MaterialCommunityIcons name='tune' color='#1a303d' size={20} />
          )}
        />
      }
      value={query}
      forceTextInputFocus={true}
      onChangeText={(text) => setQuery(text)}
      style={styles.search}
      placeholder='Search the house, room, etc'
      underlineColor='#fff'
      activeUnderlineColor='#fff'
      placeholderTextColor='#ddd'
    />
  )
}

const styles = StyleSheet.create({
  search: {
    // width: '100%',
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
  },
})

export default SearchFilter
