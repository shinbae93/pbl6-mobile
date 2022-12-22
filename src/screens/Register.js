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
  Headline,
  Modal,
  Paragraph,
  Portal,
  Provider,
  Title,
} from 'react-native-paper'

export const Register = () => {
  const [passwordSecure, setPasswordSecure] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowModel, setIsShowModel] = useState(false)

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
        <Portal>
          <Modal
            visible={isShowModel}
            onDismiss={() => {
              setIsShowModel(false)
            }}
            style={styles.modal}
          >
            <Text>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <View style={styles.formContainer}>
          <View>
            <Title style={{ alignSelf: 'center', fontSize: 24 }}>
              Create an account.
            </Title>
            <Paragraph style={{ fontSize: 14, color: '#797875' }}>
              Already a member?{' '}
              <Paragraph
                style={{
                  fontSize: 14,
                  color: PRIMARY_COLOR_HEX,
                  fontWeight: '700',
                }}
                onPress={() => {
                  navigation.navigate('register')
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
                  value={email}
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
                  value={email}
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
                  value={email}
                  onChangeText={(text) => setPhone(text)}
                />
              </View>

              <TouchableOpacity style={[styles.inputGroup, { width: '48%' }]}>
                <View style={styles.row}>
                  <Text style={[styles.inputField, styles.inputEndingSpace]}>
                    {gender || 'Gender'}
                  </Text>
                  <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                    <Icon
                      name='chevron-down-sharp'
                      style={[styles.inputIcon, styles.inputEndingIcon]}
                      resizeMode='contain'
                      onPress={() => setIsShowModel(true)}
                    />
                  </View>
                </View>
              </TouchableOpacity>
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
    justifyContent: 'center',
    alignContent: 'center',
    colors: { backdrop: 'rgba(255, 255, 255, 0.7)' },
    marginTop: 25,
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
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
})
