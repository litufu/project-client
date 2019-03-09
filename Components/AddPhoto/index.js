import React from 'react';
import { Button,  View, Text } from 'react-native';
import { Query, Mutation } from 'react-apollo'
import { ImagePicker } from 'expo';
import {CacheManager,Image} from "react-native-expo-image-cache"; 

import GET_PHOTO from '../../graphql/get_photo.query'
import POST_PHOTO from '../../graphql/post_photo.mutation'


export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Mutation
          mutation={POST_PHOTO}
        >
          {
            (postPhoto, { loading, error, data }) => {
              if (loading) return <Text>loading</Text>
              if (error) return <Text>{error.message}</Text>

              if (data) {

                const xhr = new XMLHttpRequest()
                xhr.open('PUT', data.postPhoto.url)
                xhr.onreadystatechange = function () {
                  if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                      console.log('Image successfully uploaded to oss')
                    } else {
                      console.log('Error while sending the image to oss')
                    }
                  }
                }
                xhr.setRequestHeader('Content-Type', 'image/jpeg')
                xhr.send({ uri: image, type: 'image/jpeg', name: data.postPhoto.name })

              }

              return (<Button
                title="Pick an image from camera roll"
                onPress={() => this._pickImage(postPhoto)}
              />)
            }
          }
        </Mutation>

        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async (postPhoto) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      postPhoto({ variables: { uri: result.uri } })
    }
  };
}