import {
    View,
    StyleSheet,
    Image,
    Button,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
  } from 'react-native';
  import Header from '../../component/Header/header';
import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/Types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setUserData } from '../../redux/slices/userSlices';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

// type SignInList = {
//   SignIn:{name:string}
// }

// type SignInNavigationProp = StackNavigationProp<SignInList,'SignIn'>
// type SignInRouteProp = RouteProp<SignInList,'SignIn'>

// interface SignInProps {
//   navigation:SignInNavigationProp,
//   route:SignInRouteProp
// }

type SignInProps= {
  navigation: StackNavigationProp<RootStackParamList,'SignUp'>
}
export const SignUp:React.FC<SignInProps> = ({navigation}) => { 

  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [test, settest] = useState('')

  const dispatch = useAppDispatch()
  const { users } = useAppSelector(state =>state.user)
  const user = {
    id:1,
    email:email,
    password:password,
  }


  useEffect(() => {
    if(user){
      dispatch(setUserData(user))

    }
  }, [])
  
 
  const createUser = () => {
    auth()
  .createUserWithEmailAndPassword(email,password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });

 
  }
        return (
          <View style={[styles.container]}>
            <Text style={{
        color:'#000',
         textShadowColor:'0px 4px 4px rgba(0, 0, 0, 0.25)',
         fontFamily:'Inter',
         fontStyle:'normal',
         fontSize:30,
         fontWeight:'900',
         marginBottom:10
         }}>
        SignIn
      </Text>
      <TextInput
       placeholder='Enster email' 
       value={email}
       onChange={(e:any) => setEmail(e)}
       style={[styles.text]} />
      <TextInput
      value={password}
      onChange={(e:any) => setPassword(e) }
       placeholder='Enter password'
        style={[styles.text]} />
      
      <TouchableOpacity 
      style={{
        width:'90%',
        height:50,
        borderRadius:20,
        backgroundColor:'#180923',
        marginTop:50,
        justifyContent:'center',
        alignItems:'center'
      }} 
      onPress={ () =>  navigation.navigate('Login')}
      >
        <Text style={{color:'#fff'}}>Create Acount</Text>
      </TouchableOpacity>
           {/* <TextInput placeholder='Enter email' style={[styles.text]} />
            <TextInput placeholder='Enter password' style={[styles.text]} />
            <TouchableOpacity 
            style={{
              width:'90%',
              height:50,
              borderRadius:20,
              backgroundColor:'#000',
              marginTop:50,
              justifyContent:'center',
              alignItems:'center'
            }} 
            onPress={() => navigation.navigate('SignUp') }
            >
              <Text style={{color:'#fff'}}>Create Acount</Text>
            </TouchableOpacity>  */}
          </View>
        );
    
}

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 55,
      borderWidth: 0.5,
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',
    },
    text: {
      width: '90%',
      height: 55,
      borderWidth: 0.5,
      borderRadius: 20,
      paddingLeft: 20,
      margin: 10,
    },
    button: {
      width: '90%',
      height: 50,
      borderRadius: 20,
      marginTop: 50,
    },

  });


