import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';
import {CustomButton} from '../component/SearchInput';
import firestore from '@react-native-firebase/firestore';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { editUser } from '../redux/slices/userSlices';

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
  hideModal: () => void,
  visible: boolean
}

export const AddParticipants: React.FC<UserInfoProp> = ({
  setUserInfo,
  userInfo,
  hideModal,
  visible
}) => {

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const [avatar, setavatar] = useState('');
  const [allAvatars, setAllAvatars] = useState<any[]>([]);
  const [email, setEmail] = useState(user.editUser.email)
  const [name, setName] = useState(user.editUser.name)

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
Alert.alert('am in')
    firestore()
      .collection('Users')
      .add(newUser)
      .then(value => {
        Alert.alert('successfully saved user');
        console.log();
        hideModal()
        
      })
      .catch(e => {
        console.log('error sending data' + e);
      });
  };

  const onEditUser = () =>{

    const id = user.updateId as unknown as string
    const updatedUser = { id, email, name }
    firestore()
  .collection('Users')
  .doc(id)
  .update(updatedUser)
  .then(() => {
    Alert.alert('User updated!');
    hideModal()
  });

  }
  return (
    <>
    {
      user.editUser.name == '' ? (
        <View style={[stylesn.container]}>
      <Text
        style={{
          fontFamily: 'Inter',
          fontSize: 20,
          fontStyle: 'normal',
          fontWeight: 'bold',
          marginVertical: 5,
        }}>
        Add Participant 
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
      <CustomButton width={40} title="Add" onAddUser={onAddUser
      } />
    </View>
      ):(
        <View style={[stylesn.container]}>
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 'bold',
            marginVertical: 5,
          }}>
     Edit   Participant
        </Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={value => setName(value)}
          style={[stylesn.text]}></TextInput>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={value => setEmail(value)}
          style={[stylesn.text]}></TextInput>
        <CustomButton width={40} title="Add" onAddUser={onEditUser} />
      </View>
      )
    }
    
    </>
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
