import { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { PRIMARY_COLOR_HEX, BASE_API } from '../common/constants'
import { useAxiosContext } from '../context/AxiosContext'
import Icon from 'react-native-vector-icons/Ionicons'
import ReviewCard from '../components/ReviewCard'
import { FormatDatetime } from '../utilities/datetime'
import { baseStyles } from '../common/baseStyles'
import { useAuthContext } from '../context/AuthContext'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { Rating } from 'react-native-ratings'
import DocumentPicker from 'react-native-document-picker'

export default function RoomDetail({ route }) {
  const { id } = route.params
  const [reviews, setReviews] = useState([])
  const [room, setRoom] = useState(null)
  const [img, setImg] = useState(null)
  const [imgId, setImgId] = useState(null)
  const [comment, setComment] = useState(null)
  const [rating, setRating] = useState(0)
  const { token } = useAuthContext()

  const { Axios } = useAxiosContext()

  async function fetchRoom() {
    Axios.get(`booking/rooms/${id}/detail`)
      .then((res) => {
        setRoom(res.data)
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: Location.js ~ line 23 ~ fetchRooms ~ err',
          err.request
        )
        Alert.alert('Error', err.message)
      })
  }

  async function fetchReviews() {
    Axios.get(`booking/rooms/${id}/reviews`)
      .then((res) => {
        setReviews(res.data)
      })
      .catch((err) => {
        console.log('🚀 ~ file: Location.js ~ line 23 ~ fetchRooms ~ err', err)
        Alert.alert('Error', err.message)
      })
  }

  useEffect(() => {
    fetchRoom()
    fetchReviews()
  }, [])

  const handleDelete = () => {
    if (!imgId) return

    axios
      .delete(`${BASE_API}/booking/photos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ImgId: imgId,
        },
      })
      .then((res) => {
        setImg(null)
        setImgId(null)
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: ReviewCard.js:58 ~ handleDelete ~ err',
          err.message
        )
      })
  }

  const handleUpload = () => {
    DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    })
      .then((res) => {
        const formData = new FormData()
        formData.append('Img', res[0])

        if (res.length) {
          if (imgId) {
            console.log('🚀 ~ file: RoomDetail.js:108 ~ .then ~ imgId', imgId)
            handleDelete()
          }

          axios
            .post(
              'https://pbl6-prod-pbl-dspnq9.mo6.mogenius.io/api/booking/photos/upload',
              formData,
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              console.log('🚀 ~ file: RoomDetail.js:110 ~ .then ~ res', res)
              setImg(res?.data.imgUrl)
              setImgId(res?.data.imgId)
            })
            .catch((err) => {
              console.log(
                '🚀 ~ file: RoomDetail.js:117 ~ .then ~ err',
                err.message
              )
            })
        }
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: RoomDetail.js:96 ~ launchImageLibrary ~ err',
          err.message
        )
      })
  }

  const handleAddReview = () => {
    if (rating != null && comment) {
      console.log('abc', rating, comment, imgId)
      Axios.post(`booking/rooms/${id}/reviews`, {
        rating,
        comment,
        imgId,
      })
        .then((res) => {
          setComment(null)
          setRating(0)
          fetchReviews()
        })
        .catch((err) => {
          Alert.alert('', err.response.data.message)
          setImg(null)
          setImgId(null)
          setComment(null)
          setRating(0)
          console.log(
            '🚀 ~ file: RoomDetail.js:143 ~ handleAddReview ~ err',
            err.message
          )
        })
    }
  }

  const renderItem = ({ item }) => {
    return <ReviewCard data={{ ...item }} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.locationCard}>
              <Image
                source={{ uri: room?.imgUrl }}
                resizeMode='cover'
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={[styles.title, styles.text]}>{room?.name}</Text>
                <Text>
                  <View style={styles.icon}>
                    <FontAwesome5Icon
                      name='dollar-sign'
                      resizeMode='contain'
                      style={styles.iconItem}
                    />
                  </View>
                  <Text style={baseStyles.text}> Price:</Text>
                  <Text style={baseStyles.text}> {room?.price}</Text>
                  <Text style={baseStyles.text}> VND/month</Text>
                </Text>
                <Text>
                  <View style={styles.icon}>
                    <Icon
                      name='person-outline'
                      style={styles.iconItem}
                      resizeMode='contain'
                    />
                  </View>
                  <Text style={baseStyles.text}>Capacity: </Text>
                  <Text style={baseStyles.text}>{`${room?.capacity} ${
                    room?.capacity >= 2 ? 'people' : 'person'
                  }`}</Text>
                </Text>
                <Text>
                  <View style={styles.icon}>
                    <Icon
                      name='today-sharp'
                      style={styles.iconItem}
                      resizeMode='contain'
                    />
                  </View>
                  <Text style={baseStyles.text}>
                    Available from: {FormatDatetime(room?.availableDay)}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 15 }}>
              <Text variant='titleLarge' style={{ marginLeft: 10 }}>
                Reviews
              </Text>
            </View>
            <View style={styles.inputField}>
              <TextInput
                placeholder='Writing your view here...'
                mode='outlined'
                value={comment}
                onChangeText={(text) => setComment(text)}
                outlineColor={'#fff'}
                outlineStyle={{
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}
                right={<TextInput.Icon icon='camera' onPress={handleUpload} />}
                style={{ backgroundColor: '#fff' }}
                activeOutlineColor={PRIMARY_COLOR_HEX}
              />
              {img && (
                <Image
                  source={{ uri: img }}
                  resizeMode='cover'
                  style={[styles.image, { margin: 15 }]}
                  on
                />
              )}
              <Rating
                style={{ paddingVertical: 10 }}
                ratingCount={5}
                onFinishRating={(value) => setRating(~~value)}
                startingValue={rating}
                imageSize={30}
              />
              <Button
                mode='contained'
                onPress={handleAddReview}
                buttonColor={PRIMARY_COLOR_HEX}
                style={{ marginHorizontal: '30%', marginBottom: 10 }}
              >
                Add review
              </Button>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center' }}>No reviews yet.</Text>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    marginTop: 10,
    position: 'absolute',
  },
  locationCard: {
    position: 'relative',
    backgroundColor: '#fff',
    borderTopWidth: 8,
    borderTopColor: PRIMARY_COLOR_HEX,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  inputField: {
    fontSize: 13,
    backgroundColor: '#fff',
    borderWidth: 0,
    marginBottom: 15,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  image: {
    height: 200,
    borderRadius: 12,
  },
  info: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  icon: {
    paddingRight: 5,
    alignSelf: 'baseline',
  },
  iconItem: {
    color: '#34383D',
  },
  text: {
    fontFamily: 'Plus Jakarta Sans',
  },
  infoText: {
    color: '#34383D',
  },
  row: {
    flexDirection: 'row',
  },
  reviewContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
})
