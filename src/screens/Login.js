import React, { useState } from 'react'
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
import Icon from 'react-native-vector-icons/FontAwesome5'
import { PRIMARY_COLOR_HEX, PRIMARY_UNDERLAY_COLOR } from '../common/constants'
import * as Keychain from 'react-native-keychain'
import { useAuthContext } from '../context/AuthContext'
import { useAxiosContext } from '../context/AxiosContext'
import { navigate } from '../navigation/RootNavigation'

export const Login = ({ navigation }) => {
  const [passwordSecure, setPasswordSecure] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setToken, setCurrentUser } = useAuthContext()
  const { Axios } = useAxiosContext()

  const onLogin = async () => {
    try {
      const response = await Axios.post('/v1/users/client/login', {
        email,
        password,
      })

      const { token, user } = response.data

      setToken(token)

      setCurrentUser(user)

      await Keychain.setGenericPassword('token', token)
    } catch (error) {
      navigation.navigate('home')
      console.log('🚀 ~ file: Login.js:54 ~ onLogin ~ error', error)
      Alert.alert('Login', 'Invalid username or password')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image
          resizeMode='contain'
          style={styles.backgroundImage}
          source={require('../../assets/login-background3.png')}
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('forgotpassword')
            }}
          >
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={PRIMARY_UNDERLAY_COLOR}
          style={styles.loginBtn}
          onPress={() => onLogin()}
        >
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableHighlight>

        <View style={styles.accountActions}>
          <Text style={styles.text}>
            Don't have an account?{' '}
            <Text
              style={styles.register}
              onPress={() => {
                navigation.navigate('register')
              }}
            >
              Register now
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  backgroundImage: {
    textAlign: 'center',
    height: '28%',
    width: '100%',
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
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: 'Plus Jakarta Sans',
    color: '#1a2f3b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
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
  forgotPassword: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Plus Jakarta Sans',
    alignSelf: 'flex-end',
    color: '#F16866',
  },
  register: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Plus Jakarta Sans',
    color: PRIMARY_COLOR_HEX,
  },
  loginBtn: {
    paddingVertical: 13,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: PRIMARY_COLOR_HEX,
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Plus Jakarta Sans',
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
  text: {
    fontFamily: 'Plus Jakarta Sans',
  },
})
