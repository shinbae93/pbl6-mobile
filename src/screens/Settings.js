import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Avatar, List, Paragraph, Switch, Text } from 'react-native-paper'
import { useAuthContext } from '../context/AuthContext'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { PRIMARY_COLOR_HEX } from '../common/constants'

export default function Settings() {
  const { currentUser } = useAuthContext()
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {currentUser && (
        <TouchableOpacity style={styles.card}>
          <List.Item
            title={currentUser.fullName}
            left={() => (
              <Avatar.Image source={{ uri: currentUser.avatar }} size={48} />
            )}
            right={() => (
              <View style={{ justifyContent: 'center' }}>
                <AntDesignIcon name='right' size={18} />
              </View>
            )}
            titleStyle={{
              marginLeft: 15,
              fontSize: 16,
              fontWeight: '700',
              fontFamily: 'Plus Jakarta Sans',
            }}
          />
        </TouchableOpacity>
      )}
      <View style={styles.card}>
        <List.Section>
          <List.Subheader style={styles.title}>About</List.Subheader>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <List.Item
                title='Language'
                left={() => (
                  <Ionicons name='language' style={styles.icon} size={18} />
                )}
                right={() => (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <Text
                      style={{ textAlignVertical: 'center', marginRight: 10 }}
                    >
                      English
                    </Text>
                    <AntDesignIcon
                      name='right'
                      size={18}
                      style={{ textAlignVertical: 'center' }}
                    />
                  </View>
                )}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <List.Item
                title='Notification'
                left={() => (
                  <Ionicons
                    name='notifications-outline'
                    style={styles.icon}
                    size={18}
                  />
                )}
                right={() => (
                  <Switch
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                    color={PRIMARY_COLOR_HEX}
                  />
                )}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <List.Item
                title='Introduction'
                left={() => (
                  <Ionicons name='book-outline' style={styles.icon} size={18} />
                )}
                right={() => (
                  <View style={{ justifyContent: 'center' }}>
                    <AntDesignIcon name='right' size={18} />
                  </View>
                )}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <List.Item
                title='FAQ'
                left={() => (
                  <MaterialIcons
                    name='contact-support'
                    style={styles.icon}
                    size={18}
                  />
                )}
                right={() => (
                  <View style={{ justifyContent: 'center' }}>
                    <AntDesignIcon name='right' size={18} />
                  </View>
                )}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <List.Item
                title='Help'
                left={() => (
                  <Ionicons
                    name='help-circle-outline'
                    style={styles.icon}
                    size={18}
                  />
                )}
                right={() => (
                  <View style={{ justifyContent: 'center' }}>
                    <AntDesignIcon name='right' size={18} />
                  </View>
                )}
              />
            </TouchableOpacity>
          </View>
        </List.Section>
      </View>
      <View style={styles.card}>
        <List.Section>
          <List.Subheader style={styles.title}>Security</List.Subheader>
          <View style={styles.listItem}>
            <TouchableOpacity>
              <List.Item
                title='Privacy policy'
                left={() => (
                  <MaterialIcons
                    name='lock-outline'
                    style={styles.icon}
                    size={18}
                  />
                )}
                right={() => (
                  <View style={{ justifyContent: 'center' }}>
                    <AntDesignIcon name='right' size={18} />
                  </View>
                )}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <List.Item
                title='Terms & Conditions'
                left={() => (
                  <Ionicons
                    name='clipboard-outline'
                    style={styles.icon}
                    size={18}
                  />
                )}
                right={() => (
                  <View style={{ justifyContent: 'center' }}>
                    <AntDesignIcon name='right' size={18} />
                  </View>
                )}
              />
            </TouchableOpacity>
          </View>
        </List.Section>
      </View>
      <TouchableOpacity style={styles.card}>
        <List.Item
          title='Log out'
          right={() => (
            <View style={{ justifyContent: 'center' }}>
              <Ionicons name='log-out-outline' size={18} />
            </View>
          )}
        />
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginBottom: 63,
  },
  card: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    margin: 10,
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    paddingLeft: 5,
    paddingRight: 15,
  },
  right: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rightBtn: {
    alignSelf: 'flex-end',
  },
  avatar: {},
  icon: {
    alignSelf: 'center',
  },
  content: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 15,
  },
  listItem: {
    marginLeft: 8,
  },
  title: {
    paddingVertical: 5,
    fontSize: 18,
  },
})
