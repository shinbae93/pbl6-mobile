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
import {
  Button,
  Caption,
  Dialog,
  Paragraph,
  Portal,
  Provider,
  Title,
} from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'

export const Register = ({ navigation }) => {
  const [passwordSecure, setPasswordSecure] = useState(true)
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
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
    if (password != confirmedPassword) {
      Alert.alert('Error', `Your confirm password doesn't match your password`)
    }
    try {
      await Axios.post('v1/client/sign-up', {
        firstName,
        lastName,
        phone,
        gender,
        email,
        password,
        roleId: CLIENT_ROLE_ID,
      })

      setVisible(true)
    } catch (error) {
      console.log(
        '🚀 ~ file: Register.js:73 ~ onRegister ~ error',
        error.message
      )
    }
  }

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View>
            <Title style={{ alignSelf: 'center', fontSize: 24 }}>
              Create an account
            </Title>
            <Paragraph
              style={{ fontSize: 14, color: '#797875', textAlign: 'center' }}
            >
              Already a member?{' '}
              <Paragraph
                style={{
                  fontSize: 14,
                  color: PRIMARY_COLOR_HEX,
                  fontWeight: '700',
                }}
                onPress={() => {
                  navigation.navigate('login')
                }}
              >
                Sign in
              </Paragraph>
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
                <Caption style={{ marginRight: 15 }}>+84</Caption>
                <TextInput
                  placeholder='Phone number'
                  style={[styles.inputField]}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  keyboardType='numeric'
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
                secureTextEntry={confirmPasswordSecure}
                style={[styles.inputField, styles.inputEndingSpace]}
                value={confirmedPassword}
                onChangeText={(text) => setConfirmedPassword(text)}
              />
              <TouchableWithoutFeedback>
                <View>
                  <Icon
                    name={
                      confirmPasswordSecure ? 'eye-off-outline' : 'eye-outline'
                    }
                    style={[styles.inputIcon, styles.inputEndingIcon]}
                    resizeMode='contain'
                    onPress={() =>
                      setConfirmPasswordSecure(!confirmPasswordSecure)
                    }
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
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => {
              setVisible(false)
            }}
          >
            <Dialog.Content>
              <Paragraph>
                congratulation! You have just create a new account. Login now.
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setVisible(false)
                  RootNavigation.navigate('login')
                }}
              >
                Login
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
    color: SILVER_COLOR_HEX,
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
