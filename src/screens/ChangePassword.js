import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from 'react-native'
import * as RootNavigation from '../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  PRIMARY_COLOR_HEX,
  PRIMARY_UNDERLAY_COLOR,
  SILVER_COLOR_HEX,
} from '../common/constants'
import { useAxiosContext } from '../context/AxiosContext'
import { Dialog, Paragraph, Portal, Provider, Title } from 'react-native-paper'

export const ChangePassword = ({ route }) => {
  const { userId } = route.params

  const [passwordSecure, setPasswordSecure] = useState(true)
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true)
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const { Axios } = useAxiosContext()

  const onChangePassword = async () => {
    if (password != confirmedPassword) {
      Alert.alert('Error', `Your confirm password doesn't match your password`)
    } else {
      try {
        await Axios.post(`v1/reset-password/${userId}`, {
          password,
        })

        setVisible(true)
      } catch (error) {
        console.log(
          '🚀 ~ file: Register.js:73 ~ onRegister ~ error',
          error.message
        )
      }
    }
  }

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View>
            <Title style={{ alignSelf: 'center', fontSize: 24 }}>
              Change your password
            </Title>
          </View>
          <View style={styles.inputsContainer}>
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
            onPress={() => onChangePassword()}
          >
            <Text style={styles.btnText}>Change password</Text>
          </TouchableHighlight>
        </View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => {
              setVisible(false)
              RootNavigation.navigate('login')
            }}
          >
            <Dialog.Content>
              <Paragraph>
                congratulation! You have just create a new account. Login now.
              </Paragraph>
            </Dialog.Content>
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
