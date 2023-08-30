import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';

import {utils} from '@react-native-firebase/app';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Image} from 'react-native';
import {object} from 'yup';
import {ScrollView} from 'react-native';
import { setUserData } from '../redux/slices/userSlices';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
// import image from '../resources/img.jpg'
export const ImageUpload = () => {
  const [image, setImage] = React.useState('');
  const [allAvatars, setAllAvatars] = useState<any[]>([]);
  const [testSate, settestSate] = useState('');
  const [textAvatars, settextAvatars] = useState<any[]>([]);

  const user = useAppSelector(state =>state.user)
  const dispatch = useAppDispatch()
  
  const TestFnction = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 50,
      cropping: true,
    }).then(result => {
      settestSate(result.path);
    });
  };

  const saveTestFunction = async () => {
    const upload = testSate;

    const filename = upload.substring(upload.lastIndexOf('/') + 1);
    const ref = storage().ref('image').child(filename);

    const task = ref.putFile(filename);

    task.on('state_changed', snapshot => {
      console.log(
        `${snapshot.bytesTransferred} transfere out of ${snapshot.totalBytes}`,
      );
    });

    try {
      await task;
      const url = ref.getDownloadURL();
      testlist();
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };

  const testlist = () => {
    const ref = storage().ref('image');

    ref.listAll().then(result => {
      result.items.forEach(res => {
        res.getDownloadURL().then(res => {
          settextAvatars(prev => [...prev, res]);
        });
      });
    });
  };

  const choose_photo = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(images => {
      console.log(images);
      setImage(images.path); //gets the path of the image from the users device
    });
  };

  const listFiles = () => {
    var storageRef = storage().ref('images');
    storageRef
      .listAll()
      .then(function (result) {
        if(result.items.length > 0){
          return displayImage(result.items[3])
        }else{
          console.log('Image not found');
          
        }
      })
      .catch(function (error) {});

    function displayImage(imageRef: any) {
      imageRef
        .getDownloadURL()
        .then((url: any) => {
          setAllAvatars(prevAvatars => [...prevAvatars, url]);
          dispatch(setUserData(allAvatars))
          console.log(url);
        })
        .catch(function (error: any) {
          console.log(error);
        });
    }
  };
  const savePhoto = async () => {
    const uploaduri = image;
    let filename = uploaduri.substring(uploaduri.lastIndexOf('/') + 1);

    const reference = storage().ref().child('images').child(filename);
    const task = reference.putFile(uploaduri);

    //set trandfered state

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    try {
      await task;
      const url = await reference.getDownloadURL();
      Alert.alert('Your image is saved! smile😇');
      listFiles();
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View style={[styles.container]}>
      <ScrollView>
        <View style={styles.container_images}>
          <TouchableOpacity onPress={() => choose_photo()}>
            {image && (
              <Image source={{uri: image}} style={styles.image_picker} />
            )}
            {!image && (
              <Image
                source={require('../resources/img.jpg')}
                style={styles.image_picker}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => listFiles()}
          style={{
            width: 'auto',
            height: 'auto',
            backgroundColor: '#fafb',
            padding: 5,
            marginTop: 10,
          }}>
          <Text
            style={{fontSize: 30, fontFamily: 'Inter', fontStyle: 'italic'}}>
            save
          </Text>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            width: '100%',
          }}
          >
          
        </View>
        {allAvatars
            ? allAvatars.map((avatar: any, index: number) => (
                <View
                  key={index}
                  style={{ position:'absolute', left: index * 15, top:'50%', zIndex: 1}}>
                  <Image source={{uri: avatar}} style={styles.image_returned} />
                </View>
              ))
            : null}

            { user !== null && <Text>hojo</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image_picker: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  image_returned: {
    width: 50,
    height: 50,
    borderRadius: 90,
  },
  container_images: {
    alignItems: 'center',
    marginTop: '1%',
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
  },
});
