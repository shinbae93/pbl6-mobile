import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native'
import * as RootNavigation from '../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  CLIENT_ROLE_ID,
  PRIMARY_COLOR_HEX,
  PRIMARY_UNDERLAY_COLOR,
  SILVER_COLOR_HEX,
} from '../common/constants'
import { useAxiosContext } from '../context/AxiosContext'
import { Paragraph, Provider, Title } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'

export const Register = ({ navigation }) => {
  const [passwordSecure, setPasswordSecure] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
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
    <Provider>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View>
            <Title style={{ alignSelf: 'center', fontSize: 24 }}>
              Forgot your password?
            </Title>
            <Paragraph
              style={{ fontSize: 14, color: '#797875', textAlign: 'center' }}
            >
              Don't worry! Please enter the email address associated with your account.
            </Paragraph>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.inputGroup}>
              <Icon
                name='mail-outline'
                style={styles.inputIcon}
                resizeMode='contain'
              />
              <TextInput
                placeholder='Email Address'
                style={[styles.inputField]}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={{ height: 15 }} />

            <View style={styles.row}>
              <View
                style={[styles.inputGroup, { width: '48%', marginRight: 10 }]}
              >
                <Icon
                  name='person-outline'
                  style={styles.inputIcon}
                  resizeMode='contain'
                />
                <TextInput
                  placeholder='First Name'
                  style={[styles.inputField]}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                />
              </View>

              <View style={[styles.inputGroup, { width: '48%' }]}>
                <Icon
                  name='person-outline'
                  style={styles.inputIcon}
                  resizeMode='contain'
                />
                <TextInput
                  placeholder='Last Name'
                  style={[styles.inputField]}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                />
              </View>
            </View>

            <View style={{ height: 15 }} />

            <View style={styles.row}>
              <View
                style={[styles.inputGroup, { width: '48%', marginRight: 10 }]}
              >
                <Icon
                  name='person-outline'
                  style={styles.inputIcon}
                  resizeMode='contain'
                />
                <TextInput
                  placeholder='Phone number'
                  style={[styles.inputField]}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
              </View>

              <DropDownPicker
                placeholder='Select gender'
                open={isOpen}
                value={gender}
                items={items}
                setOpen={setIsOpen}
                setValue={setGender}
                setItems={setItems}
                style={{
                  borderWidth: 0,
                  paddingVertical: 5,
                }}
                containerStyle={{
                  zIndex: 9,
                  width: '48%',
                  marginLeft: 5,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  backgroundColor: '#fff',
                  borderWidth: 0,
                }}
                textStyle={{
                  color: SILVER_COLOR_HEX,
                  textAlign: 'center',
                }}
                dropDownContainerStyle={{}}
                selectedItemLabelStyle={{
                  fontWeight: 'bold',
                  color: PRIMARY_COLOR_HEX,
                }}
                listItemLabelStyle={{
                  textAlign: 'left',
                }}
                itemSeparator={true}
                itemSeparatorStyle={{
                  height: 0.5,
                  width: '90%',
                  alignSelf: 'center',
                }}
                showTickIcon={true}
              />
            </View>

            <View style={{ height: 15 }} />

            <View style={styles.inputGroup}>
              <Icon
                name='key-outline'
                style={styles.inputIcon}
                resizeMode='contain'
              />
              <TextInput
                placeholder='Password'
                secureTextEntry={passwordSecure}
                style={[styles.inputField, styles.inputEndingSpace]}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <TouchableWithoutFeedback>
                <View>
                  <Icon
                    name={passwordSecure ? 'eye-off-outline' : 'eye-outline'}
                    style={[styles.inputIcon, styles.inputEndingIcon]}
                    resizeMode='contain'
                    onPress={() => setPasswordSecure(!passwordSecure)}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={{ height: 15 }} />

            <View style={styles.inputGroup}>
              <Icon
                name='key-outline'
                style={styles.inputIcon}
                resizeMode='contain'
              />
              <TextInput
                placeholder='Confirm Password'
                secureTextEntry={passwordSecure}
                style={[styles.inputField, styles.inputEndingSpace]}
                value={confirmedPassword}
                onChangeText={(text) => setConfirmedPassword(text)}
              />
              <TouchableWithoutFeedback>
                <View>
                  <Icon
                    name={passwordSecure ? 'eye-off-outline' : 'eye-outline'}
                    style={[styles.inputIcon, styles.inputEndingIcon]}
                    resizeMode='contain'
                    onPress={() => setPasswordSecure(!passwordSecure)}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={PRIMARY_UNDERLAY_COLOR}
            style={styles.btn}
            onPress={() => onRegister()}
          >
            <Text style={styles.btnText}>Register</Text>
          </TouchableHighlight>
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
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 9,
    paddingHorizontal: '5%',
  },
  inputsContainer: {
    paddingVertical: 30,
    width: '100%',
  },
  row: {
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
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 20,
    fontSize: 18,
    // color: '#fff',
  },
  inputEndingIcon: {
    marginRight: 0,
    // color: '#fff',
  },
  inputField: {
    color: 'SILVER_COLOR_HEX',
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
    backgroundColor: PRIMARY_COLOR_HEX,
    width: '100%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Plus Jakarta Sans',
  },
})
