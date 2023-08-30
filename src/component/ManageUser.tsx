import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';
import {CustomButton} from '../component/SearchInput';
import firestore from '@react-native-firebase/firestore';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { editUser } from '../redux/slices/userSlices';
type Props = {
  deleteEntry: (collectionName: string, documentId: string) => void,
  showModal: () => void
}
export const ManageUser:React.FC<Props> = ({deleteEntry,showModal}) => { 

  const user = useAppSelector(state => state.user) 
  const dispatch = useAppDispatch()

  const handleEdit = () =>{
       dispatch(editUser(user.updateId))
      showModal()
      Alert.alert(`successfully showing the edit modal`)
  }
 
  return (
    <View style={[stylesn.container]}>
     <TouchableOpacity style={[stylesn.butt]} onPress={() =>deleteEntry('Users', user.updateId ? user.updateId : '')}>
        <Text style={[stylesn.text]}>Delete</Text>
     </TouchableOpacity>
     <TouchableOpacity style={[stylesn.butt]} onPress={handleEdit}>
        <Text style={[stylesn.text]}>Edit</Text>
     </TouchableOpacity>
    </View>
  );
};

export const stylesn = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#000',
    marginTop:10
  },
  text: {
        fontFamily:'Inter',
        fontSize:20,
        fontStyle:'normal',
        fontWeight:'bold',
        marginLeft:10
    // backgroundColor: '#fbfa',
  },
  butt: {
    width: '90%',
    height: '25%',
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: '10%',
    justifyContent:'center',
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
    // borderRadius:2,
    // borderWidth:0.2,
    // padding:5,
    // width:'100%',
    // height:'20%',
    // marginBottom:10,
    // marginHorizontal:5,
    // shadowRadius: 5,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // elevation: 5,

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
