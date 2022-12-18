import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

export default function CountBadge({ count }) {
  return (
    <View>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.text}>{count}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
})
