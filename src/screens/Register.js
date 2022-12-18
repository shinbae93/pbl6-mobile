import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import * as RootNavigation from '../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  CLIENT_ROLE_ID,
  PRIMARY_COLOR_HEX,
  PRIMARY_LIGHT_COLOR,
  PRIMARY_UNDERLAY_COLOR,
} from '../common/constants'
import { useAxiosContext } from '../context/AxiosContext'
import { TextInput } from 'react-native-paper'

export const Register = () => {
  const [passwordSecure, setPasswordSecure] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { Axios } = useAxiosContext()

  const onRegister = async () => {
    try {
      await Axios.post('/users/client/login', {
        firstName,
        lastName,
        phone,
        gender,
        email,
        password,
        roleId: CLIENT_ROLE_ID,
      })
    } catch (error) {
      console.log('🚀 ~ file: Login.js:54 ~ onLogin ~ error', error.message)
      Alert.alert('Login', 'Invalid username or password')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.nameContainer}>
          <TextInput
            label='First name'
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            mode='outlined'
            style={styles.inputName}
            activeOutlineColor={'#65647C'}
          />
          <TextInput
            label='First name'
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            mode='outlined'
            style={styles.inputName}
            activeOutlineColor={'#65647C'}
          />
        </View>
        <TextInput
          label='First name'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          mode='outlined'
          style={styles.input}
          activeOutlineColor={'#65647C'}
        />
        <TextInput
          label='First name'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          mode='outlined'
          style={styles.input}
          activeOutlineColor={'#65647C'}
        />
        <TextInput
          label='First name'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          mode='outlined'
          style={styles.input}
          activeOutlineColor={'#65647C'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    colors: { backdrop: 'rgba(255, 255, 255, 0.7)' },
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 9,
    paddingHorizontal: '8%',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputName: {
    flex: 1,
    height: 40,
    width: '40%',
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
})
