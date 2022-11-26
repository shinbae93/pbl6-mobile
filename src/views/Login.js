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
} from 'react-native'
import * as RootNavigation from '../utils/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'

export default function Login() {
  const [passwordSecure, setPasswordSecure] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  return (
    <View style={styles.container}>
      <Image
        resizeMode='cover'
        style={styles.backgroundImage}
        blurRadius={2}
        source={require('../../assets/login/background2.jpg')}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Shiba Booking</Text>
        <Text style={styles.subtitle}>Easy To Find Your Place</Text>
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
          underlayColor='rgba(34, 163, 159, 0.6)'
          style={styles.loginBtn}
          onPress={() => {
            console.log(email)
            console.log(password)

            axios
              .post(
                'https://user-service-prod-pbl6-4jcro6.mo1.mogenius.io/api/v1/users/client/login',
                // 'http://192.168.20.44:3000/api/v1/users/login',
                {
                  email,
                  password,
                }
              )
              .then((res) => {
                // TODO: add token
                console.log(res.data)
                // navigate to main
                RootNavigation.navigate('main')
              })
              .catch((err) => {
                console.log(err)
              })
          }}
        >
          <Text style={styles.loginText}>LOGIN</Text>
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
    backgroundColor: '#fff',
  },
  backgroundImage: {
    textAlign: 'right',
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
    color: '#1a2f3b',
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
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'sans-serif',
  },
  loginBtn: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'rgba(34, 163, 159, 0.8)',
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
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
