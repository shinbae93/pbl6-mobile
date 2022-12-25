import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  CLIENT_ROLE_ID,
  PRIMARY_COLOR_HEX,
  PRIMARY_UNDERLAY_COLOR,
  SUCCESS_COLOR_HEX,
} from '../common/constants'
import { useAxiosContext } from '../context/AxiosContext'
import { Avatar, Provider, RadioButton, TextInput } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'
import { useAuthContext } from '../context/AuthContext'

export default function Profile() {
  const { Axios } = useAxiosContext()
  const { currentUser } = useAuthContext()

  const [me, setMe] = useState(currentUser)
  const [firstName, setFirstName] = useState(me?.firstName)
  const [lastName, setLastName] = useState(me?.lastName)
  const [phone, setPhone] = useState(me?.phone)
  const [gender, setGender] = useState(me?.gender)
  const [password, setPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState([
    {
      label: 'Male',
      value: true,
      icon: () => <Icon name='male' size={18} />,
    },
    {
      label: 'Female',
      value: false,
      icon: () => <Icon name='female' size={18} />,
    },
  ])

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
    <Provider>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View>
            <Avatar.Image
              source={{ uri: me?.avatar }}
              style={{ alignSelf: 'center' }}
              size={100}
            />
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={PRIMARY_UNDERLAY_COLOR}
              style={{
                backgroundColor: '#FED049',
                paddingVertical: 12,
                paddingHorizontal: 25,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                marginTop: 15,
              }}
              onPress={() => onRegister()}
            >
              <Text style={styles.btnText}>Change avatar</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.inputsContainer}>
            <TextInput
              label='Email'
              value={me?.email}
              disabled={true}
              mode='outlined'
              style={styles.input}
            />
            <TextInput
              label='First name'
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              mode='outlined'
              activeOutlineColor={PRIMARY_COLOR_HEX}
              style={styles.input}
            />
            <TextInput
              label='Last name'
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              mode='outlined'
              activeOutlineColor={PRIMARY_COLOR_HEX}
              style={styles.input}
            />
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                alignItems: 'flex-start',
              }}
            >
              <View
                style={{
                  width: '48%',
                  height: 30,
                  fontSize: 14,
                  marginRight: 20,
                }}
              >
                <TextInput
                  label='Phone number'
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  mode='outlined'
                  activeOutlineColor={PRIMARY_COLOR_HEX}
                />
              </View>
              <RadioButton.Group
                onValueChange={(newValue) => setGender(newValue)}
                value={gender}
              >
                <View style={{ flexDirection: 'column' }}>
                  <Text
                    variant='titleLarge'
                    style={{ textAlignVertical: 'center' }}
                  >
                    Gender:
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <RadioButton value={true} color={PRIMARY_COLOR_HEX} />
                      <Text style={{ marginTop: 8 }}>Male</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <RadioButton value={false} color={PRIMARY_COLOR_HEX} />
                      <Text style={{ marginTop: 8 }}>Female</Text>
                    </View>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={PRIMARY_UNDERLAY_COLOR}
              style={[styles.btn, { backgroundColor: '#EB455F' }]}
              onPress={() => onRegister()}
            >
              <Text style={styles.btnText}>Change password</Text>
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor={PRIMARY_UNDERLAY_COLOR}
              style={[styles.btn, { backgroundColor: PRIMARY_COLOR_HEX }]}
              onPress={() => onRegister()}
            >
              <Text style={styles.btnText}>Save</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 9,
    paddingHorizontal: '5%',
    marginVertical: 30,
  },
  inputsContainer: {
    paddingVertical: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 14,
  },
  inputGroup: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 20,
    fontSize: 18,
  },
  inputEndingIcon: {
    marginRight: 0,
  },
  inputField: {
    color: '#000',
    fontSize: 13,
    width: '90%',
  },
  inputEndingSpace: {
    width: '80%',
  },
  btn: {
    paddingVertical: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: '48%',
    alignItems: 'center',
    marginVertical: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Plus Jakarta Sans',
  },
  modal: {
    backgroundColor: '#fff',
    marginHorizontal: '25%',
    padding: 20,
    borderRadius: 15,
  },
})
