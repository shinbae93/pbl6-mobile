import { Image, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { PRIMARY_COLOR_HEX } from '../common/constants'

export function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.topImage}
        source={require('../../assets/welcome.png')}
      />

      <View style={styles.bottomContent}>
        <Text style={styles.title}>Welcome to Shiba Booking</Text>
        <Text style={styles.slogan}>We make it easier to find your place</Text>
        <Button
          style={styles.button}
          mode='contained'
          color={PRIMARY_COLOR_HEX}
          uppercase={false}
          onPress={() => {
            navigation.navigate('login')
          }}
          dark={true}
        >
          Sign In
        </Button>
        <Button
          style={styles.button}
          mode='outlined'
          color={PRIMARY_COLOR_HEX}
          uppercase={false}
          onPress={() => {
            navigation.navigate('register')
          }}
        >
          Register
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  topImage: {
    height: '60%',
    marginTop: 15,
    borderRadius: 15,
    alignSelf: 'center',
  },
  bottomContent: {
    alignItems: 'center',
    marginVertical: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  slogan: {
    fontSize: 16,
    marginBottom: 25,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  button: {
    borderRadius: 15,
    width: '80%',
    marginVertical: 10,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: 700,
  },
})
