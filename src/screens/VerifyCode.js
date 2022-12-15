import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import * as RootNavigation from '../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  primaryColorLightOpacity,
  primaryUnderlayColor,
} from '../common/constants'
import * as SecureStore from 'expo-secure-store'
import { useAuthContext } from '../context/AuthContext'
import { useAxiosContext } from '../context/AxiosContext'

export const VerifyCode = () => {
  const [passwordSecure, setPasswordSecure] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setToken, setCurrentUser } = useAuthContext()
  const { userAxios } = useAxiosContext()

  const onLogin = async () => {
    try {
      const response = await userAxios.post('/users/client/login', {
        email,
        password,
      })

      const { accessToken, refreshToken, user } = response.data

      setToken({
        accessToken,
        refreshToken,
      })

      setCurrentUser(user)

      await SecureStore.setItemAsync('accessToken', accessToken)
      await SecureStore.setItemAsync('refreshToken', refreshToken)
    } catch (error) {
      console.log('🚀 ~ file: Login.js:54 ~ onLogin ~ error', error)
      Alert.alert('Login', 'Invalid username or password')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* <Text style={styles.subtitle}>Easy To Find Your Place</Text> */}
        <Image
          resizeMode='contain'
          style={styles.backgroundImage}
          // blurRadius={1}
          source={require('../../assets/login-background.png')}
        />
        <Text style={styles.title}>Shiba Booking</Text>
        <View style={styles.inputsContainer}>
          <View style={styles.inputGroup}>
            <Icon
              name='envelope'
              style={styles.inputIcon}
              resizeMode='contain'
            />
            <TextInput
              placeholder='Email Address'
              placeholderTextColor='#fff'
              style={[styles.inputField]}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={{ height: 25 }} />

          <View style={styles.inputGroup}>
            <Icon name='key' style={styles.inputIcon} resizeMode='contain' />
            <TextInput
              placeholder='Password'
              secureTextEntry={passwordSecure}
              placeholderTextColor='#fff'
              style={[styles.inputField, styles.inputEndingSpace]}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableWithoutFeedback>
              <View style={styles.endingAction}>
                <Icon
                  name={passwordSecure ? 'eye-slash' : 'eye'}
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
          underlayColor={primaryUnderlayColor}
          style={styles.loginBtn}
          onPress={() => onLogin()}
        >
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableHighlight>
        <View style={styles.accountActions}>
          <TouchableOpacity
            onPress={() => {
              RootNavigation.navigate('forgotpassword')
            }}
          >
            <Text style={styles.accountActionText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              RootNavigation.navigate('register')
            }}
          >
            <Text style={styles.accountActionText}>Register Now?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    colors: { backdrop: 'rgba(255, 255, 255, 0.7)' },
  },
  backgroundImage: {
    textAlign: 'center',
    height: '20%',
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
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#1a2f3b',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    // color: '#1a2f3b',
    textAlign: 'center',
  },
  inputsContainer: {
    paddingVertical: 30,
    width: '100%',
  },
  accountActions: {
    width: '100%',
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  accountActionText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'sans-serif',
  },
  loginBtn: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: primaryColorLightOpacity,
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'sans-serif',
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  inputIcon: {
    width: 15,
    height: 15,
    marginRight: 20,
    color: '#fff',
  },
  inputEndingIcon: {
    width: 15,
    height: 15,
    marginRight: 0,
    color: '#fff',
  },
  inputField: {
    color: '#ddd',
    fontSize: 13,
    width: '90%',
  },
  inputEndingSpace: {
    width: '80%',
  },
  endingAction: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
})
