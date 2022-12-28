import { useState } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
} from 'react-native'
import { Caption, HelperText, Title } from 'react-native-paper'
import { PRIMARY_COLOR_HEX, PRIMARY_UNDERLAY_COLOR } from '../common/constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ValidateEmail } from '../utilities/validation'
import { useAxiosContext } from '../context/AxiosContext'

export function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('')
  const [visible, setVisible] = useState(false)

  const { Axios } = useAxiosContext()

  const onGetOTP = () => {
    if (ValidateEmail(email)) {
      Axios.post('v1/forgot-password', {
        email,
        realEmail: 'sine.hungnguyen@gmail.com',
      })
        .then((result) => {
          navigation.navigate('otp', {
            message: result.data.message,
            userId: result.data.userId,
          })
        })
        .catch((err) => {
          console.log(
            '🚀 ~ file: ForgotPassword.js:35 ~ onGetOTP ~ err',
            err.message
          )
        })
    } else {
      setVisible(true)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        resizeMode='contain'
        style={styles.backgroundImage}
        source={require('../../assets/forgotpassword-background.png')}
      />
      <View style={styles.contentContainer}>
        <Title>Forgot your password?</Title>
        <Caption style={{ textAlign: 'center', paddingHorizontal: '15%' }}>
          Don't worry! Please enter the email address associated with your
          account.
        </Caption>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Icon name='envelope' style={styles.inputIcon} resizeMode='contain' />
          <TextInput
            placeholder='Email Address'
            placeholderTextColor='#fff'
            style={[styles.inputField]}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <HelperText
          type='error'
          visible={visible}
          style={{ fontSize: 16, color: 'red', marginLeft: 15 }}
        >
          Invalid email.
        </HelperText>
      </View>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor={PRIMARY_UNDERLAY_COLOR}
        style={styles.btn}
        onPress={() => onGetOTP()}
      >
        <Text style={styles.btnText}>Get OTP</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingHorizontal: '5%',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  backgroundImage: {
    textAlign: 'top',
    height: '35%',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    paddingTop: 50,
    width: '100%',
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
  btn: {
    paddingVertical: 13,
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
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Plus Jakarta Sans',
  },
})
