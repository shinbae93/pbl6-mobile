import { useState } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  Alert,
} from 'react-native'
import {
  Caption,
  Dialog,
  Paragraph,
  Portal,
  Provider,
  Title,
} from 'react-native-paper'
import { PRIMARY_COLOR_HEX, PRIMARY_UNDERLAY_COLOR } from '../common/constants'
import Icon from 'react-native-vector-icons/Octicons'
import { ValidateNumber } from '../utilities/validation'
import { useAxiosContext } from '../context/AxiosContext'

export function OTP({ navigation, route }) {
  const { message, userId } = route.params
  console.log('🚀 ~ file: OTP.js:25 ~ OTP ~ userId', userId)
  console.log('🚀 ~ file: OTP.js:25 ~ OTP ~ message', message)

  const [otp, setOTP] = useState('')
  console.log('🚀 ~ file: OTP.js:28 ~ OTP ~ otp', otp)
  const [visible, setVisible] = useState(false)

  const { Axios } = useAxiosContext()

  const onSubmit = () => {
    if (ValidateNumber(otp)) {
      Axios.post(`v1/forgot-password/${userId}`, {
        otp,
      })
        .then((res) => {
          setVisible(true)
        })
        .catch((err) => {
          console.log(
            '🚀 ~ file: OTP.js:41 ~ onSubmit ~ err',
            err.response.data.message
          )
          Alert.alert('', err.response.data.message)
        })
    } else {
      setVisible(true)
    }
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Image
          resizeMode='contain'
          style={styles.backgroundImage}
          source={require('../../assets/mailbox.png')}
        />
        <View style={styles.contentContainer}>
          <Title style={{ textAlign: 'center', paddingHorizontal: '15%' }}>
            {message}
          </Title>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Icon name='number' style={styles.inputIcon} resizeMode='contain' />
            <TextInput
              placeholder='Your OTP'
              placeholderTextColor='#fff'
              style={[styles.inputField]}
              value={otp}
              onChangeText={(text) => setOTP(text)}
              keyboardType='numeric'
            />
          </View>
        </View>

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={PRIMARY_UNDERLAY_COLOR}
          style={styles.btn}
          onPress={() => onSubmit()}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableHighlight>

        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => {
              setVisible(false)
              navigation.navigate('changepassword', {
                userId,
              })
            }}
          >
            <Dialog.Title>Success</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                You have just reset your password. Change it now !
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
    marginTop: 15,
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
