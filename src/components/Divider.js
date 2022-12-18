import { StyleSheet } from 'react-native'
import { Divider } from 'react-native-paper'

export default function LineDivider() {
  return <Divider style={styles.divider} />
}

const styles = StyleSheet.create({
  divider: {
    marginTop: 12,
    width: '100%',
    alignSelf: 'center',
    height: 1,
    color: '#000',
  },
})
