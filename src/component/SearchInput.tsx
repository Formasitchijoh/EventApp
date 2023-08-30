import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { User } from '../Models/userType';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getSelectedUsers } from '../redux/slices/userSlices';
import Entypo  from 'react-native-vector-icons/Entypo'

export const SearchInput = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.text, styles.imageView]}>
        <TextInput
          placeholder="Search or type a command"
          style={{width: '70%'}}></TextInput>
        <View style={{width: '20%', height: '80%', alignItems: 'flex-end'}}>
          <Image
            source={require('../resources/color.png')}
            style={{
              height: '100%',
              width: '60%',
              tintColor: '#000',
              shadowColor: '#000',
            }}
          />
        </View>
      </View>
    </View>
  );
};
type UserProp = {
  id:number,
  photoUrl:string,
  name:string,
  email:string,
  Selected: boolean,
  onClickUpdate: (id: string) => void,
  
}

export const UserCmponent: React.FC<UserProp> = ({ id, photoUrl, name, email, Selected,onClickUpdate }) => {
  const [isSelected, setIsSelected] = useState(Selected)
 
  const users = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

 const ids = id as unknown as string

  const handleIsSelected = () => { 
    const selectedUser = {id, photoUrl, name, email, Selected}
    dispatch(getSelectedUsers(selectedUser))
    setIsSelected(!isSelected)
  };

  return (
    <View style={styles2.viewAll}>
      <View
        style={{
          width: '15%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <CheckBox
          style={{ flex: 1, marginTop: 15, marginRight: 10 }}
          onClick={handleIsSelected}
          isChecked={isSelected}
        />
      </View>
      <View style={styles2.viewImage}>
        <Image source={{ uri: photoUrl }} style={{ width: '90%', height: '60%' }} />
      </View>
      <View style={styles2.view2}>
        <Text style={styles2.text}>{name}</Text>
        <Text>{email}</Text>
      </View>
      <TouchableOpacity style={{width:'5%', justifyContent:'flex-start',alignItems:'flex-start',height:'90%'}} onPress={() =>onClickUpdate(ids)}>
        <Entypo
        name='dots-three-vertical'
        size={25}
        color={'#000'}
        />
      </TouchableOpacity>
    </View>
  );
};

type ButtonProps = {
  title: string;
  onAddUser?:() =>void,
  width:number
};

export const CustomButton: React.FC<ButtonProps> = ({title,onAddUser,width}) => {
  return ( 
    <>
      <TouchableOpacity
        style={{
          width: `${width}%`,
          height: 50,
          borderRadius: 20,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }} 
        onPress={onAddUser}
        >
        <Text style={{color: '#fff'}}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export const styles2 = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
  },
  viewAll: {
    width: '95%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 2,
    borderWidth: 0.1,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    marginHorizontal: 10,
  },
  viewImage: {
    width: '20%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    width: '55%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 2,
    backgroundColor: 'faff',
  },

  text: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '800',
    textShadowColor: '#fafa',
  },
  buttonContainer:{
  width: '90%',
  height: 50,
  borderRadius: 20,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  },
  buttonContainer1:{
    width:'100%',
    height:'100%',
   display:'flex',
   flexDirection:"row",
   justifyContent:'flex-end',
   alignItems:'center',
   paddingVertical:1
  },
  button:{
    width:'90%',
    height:'100%',
    shadowColor:'#000',
    shadowOpacity:50,
    elevation:10,
    shadowRadius:10,
    backgroundColor:'#180923',
    justifyContent:'center',
    marginRight:10,
    borderRadius:10,
    // alignItems:'flex-end',
    alignItems:'center',
    paddingVertical:10,
    paddingHorizontal:5,
    color:'white'
    

  },
  buttonText:{
    fontFamily:'sans serif',
    fontSize:15,
    fontStyle:'normal',
    fontWeight:'bold',
  alignSelf:"center",
  color:'white'
  }
});

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:10,
    marginTop:5
  },
  text: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
