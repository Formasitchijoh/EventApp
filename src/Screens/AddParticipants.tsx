import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';
import {CustomButton} from '../component/SearchInput';
import firestore from '@react-native-firebase/firestore';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';

interface UserInfoProp {
  userInfo: {
    id:number,
    name: string;
    email: string;
    photoUrl: any;
    Selected:boolean
  };
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      id:number,
      name: string;
      email: string;
      photoUrl: any;
      Selected:boolean
    }>
  >;
}

export const AddParticipants: React.FC<UserInfoProp> = ({
  setUserInfo,
  userInfo,
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [avatar, setavatar] = useState('');
  const [allAvatars, setAllAvatars] = useState<any[]>([]);
  const containerStyle = {backgroundColor: 'white', padding: 20, height: 200};
  const onChangeUserInfo = (value: string, name: string) => {
    setUserInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const displayImage = (avatarurl: FirebaseStorageTypes.ListResult) => {
    if (avatarurl.items.length > 1) {
      avatarurl.items[1].getDownloadURL().then(res => {
        setavatar(res);
      });
    }
  };

  useEffect(() => {
    const Avatar = Math.ceil(Math.random() * 10);
    storage()
      .ref('images')
      .listAll()
      .then(result => {
        if (result.items.length > 0) {
          result.items[Avatar].getDownloadURL().then(url => {
            setAllAvatars(prevAvatars => [...prevAvatars, url]);
            setavatar(url);
          });
        } else {
          console.log('Image not found');
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, []);

  const onAddUser = () => {
    const newUser = {
      id:Math.ceil(Math.random() * 20),
      name: userInfo.name,
      email: userInfo.email,
      photoUrl: avatar,
      Selected:false
    };

    firestore()
      .collection('Users')
      .add(newUser)
      .then(value => {
        Alert.alert('successfully saved user');
        console.log();

        hideModal();
      })
      .catch(e => {
        console.log('error sending data' + e);
      });
  };

  return (
    <View style={[stylesn.container]}>
      <Text
        style={{
          fontFamily: 'Inter',
          fontSize: 20,
          fontStyle: 'normal',
          fontWeight: 'bold',
          marginVertical: 5,
        }}>
        {' '}
        Add a Participant
      </Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor="#666"
        value={userInfo.name}
        onChangeText={value => onChangeUserInfo(value, 'name')}
        style={[stylesn.text]}></TextInput>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        value={userInfo.email}
        onChangeText={value => onChangeUserInfo(value, 'email')}
        style={[stylesn.text]}></TextInput>
      <CustomButton title="Add" onAddUser={onAddUser} />

      {userInfo.email !== '' && userInfo.name !== '' && (
        <Text>{JSON.stringify(userInfo)}</Text>
      )}
    </View>
  );
};

export const stylesn = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#000',
  },
  con: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  text: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 10,
    // backgroundColor: '#fbfa',
  },
  textarea: {
    height: 80,
  },
  date: {
    width: '42%',
  },
  dateView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
});
