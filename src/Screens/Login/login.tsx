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
import { SvgXml } from 'react-native-svg';
import auth from '@react-native-firebase/auth';
import { useState,useEffect } from 'react';
import { useAppDispatch,useAppSelector } from '../../hooks/hooks';
import { setUserData } from '../../redux/slices/userSlices';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Types/Types';


type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export const Login:React.FC<LoginProps> = ({navigation}) => { 

  return (
    <View style={[styles.container]}>
      <Text
        style={{
          color:'#000',
          textShadowColor:'0px 4px 4px rgba(0, 0, 0, 0.25)',
          fontFamily:'Inter',
          fontSize: 50,
          fontStyle:'normal',
          fontWeight: '900',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:20
        }}>
        Scheduler
      </Text>
      <View style={{ width: '90%', height: 'auto', marginLeft: 2}}>
        <View style={{width: '90%', height: 'auto', marginLeft: 2}}>
          <Text style={{
            color:'#000',
            textShadowColor:'0px 4px 4px rgba(0, 0, 0, 0.25)',
            fontFamily:'Inter',
            fontSize: 20,
            fontStyle:'normal',
            fontWeight: '500',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom:20
          }}>
            Manage your Team and schedule events in the best way you possibly
            can
          </Text>
        </View>
      </View>
      <Image
        source={require('../../resources/20944999.jpg')}
        style={{
          width: '95%',
          height: '50%',
          backgroundColor: 'blue',
          borderRadius: 3,
          borderColor: 'blue',
          marginTop:0
        }}
      />

      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderRadius: 20,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }} onPress={() => navigation.navigate('SignUp') }
        >
        <Text style={{color: '#fff'}}>Create Acount</Text>
      </TouchableOpacity>
      
    </View>
  );
};

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


// type ProfileParamList = { 
//   Profile:{name:string}
// }
// type HscreenNavigationProp = StackNavigationProp<ProfileParamList,'Profile'>;
// type HscreenRouteProp = RouteProp<ProfileParamList,'Profile'>;


// interface HscreenProps {
//   navigation: HscreenNavigationProp;
//   route:HscreenRouteProp;
// }



// const HscreenS: React.FC<HscreenProps> = ({navigation}) =>{
//   return(
//     <Button
//     title='Go to Janes profile'
//     onPress={() =>{
//       navigation.navigate('Profile',{name:'jane'});
//     }}
    
//     />
//   )
// }


// type LoginParamList = {
//   SignIn:{name:string}
// }
// interface LoginProp {
//   navigation:LoginNavigationProp,
//   route:LoginRouteProp
// }
// type LoginNavigationProp = StackNavigationProp<LoginParamList,'SignIn'>;
// type LoginRouteProp = RouteProp<LoginParamList,'SignIn'>