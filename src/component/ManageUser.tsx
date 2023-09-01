import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';
import {CustomButton} from '../component/SearchInput';
import firestore from '@react-native-firebase/firestore';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { geteditUser, editUser } from '../redux/slices/userSlices';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types/Types';
import { RouteProp } from '@react-navigation/native';
type UserProps = {
  deleteEntry: (collectionName: string, documentId: string) => void,
  showModal: () => void
}

export const ManageUser:React.FC<UserProps> = ({deleteEntry,showModal}) => { 

  const user = useAppSelector(state => state.user) 
  const dispatch = useAppDispatch()

  const handleEdit = () =>{
       dispatch(geteditUser(user.updateId))
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

type EventProps = {
  deleteEvent: (collectionName: string, documentId: string) => void
  closeModal: () => void,
  navigation?: StackNavigationProp<RootStackParamList, "Events">,
  route: RouteProp<{
    Participants: {
        action?: string;
    };
}, "Participants">
  
}
export const ManageEvent:React.FC<EventProps> = ({closeModal,deleteEvent,navigation}) => { 

  const events = useAppSelector(state => state.event) 
  const dispatch = useAppDispatch()

const handleEdit = () =>{
  closeModal()
  navigation?.navigate('AddEvent')
}
const handleAddParticpnant = () =>{
  closeModal()
  navigation?.navigate('Participants', { action: 'add' });}
 
  return (
    <View style={[stylesn.container]}>
        <View style={{width:'60%', height:'100%', backgroundColor:"white", paddingVertical:10, paddingHorizontal:5, borderRadius:10, marginTop:10}}>
        <TouchableOpacity style={[stylesn.butt]} onPress={()=> deleteEvent('Events', events.SelectedEvent? events.SelectedEvent.id : '')}>
        <Text style={[stylesn.text]}>Delete</Text>
     </TouchableOpacity>
     <TouchableOpacity style={[stylesn.butt]} onPress={handleEdit}>
        <Text style={[stylesn.text]}>Edit</Text>
     </TouchableOpacity>
     <TouchableOpacity style={[stylesn.butt]} onPress={handleAddParticpnant}>
        <Text style={[stylesn.text]}>Add Participant</Text>
     </TouchableOpacity>
        </View>
    </View>
  );
};

export const stylesn = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems:'flex-end',
    borderWidth: 0.2,
    borderColor: '#000',
    marginTop:10,
    justifyContent:"flex-start",
    paddingTop:20
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
    height: '22%',
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: '5%',
    justifyContent:'center',
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,

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
