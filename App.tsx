/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {Login} from './src/Screens/Login/login';
import Header from './src/component/Header/header';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import { SignUp } from './src/Screens/SignUp/SignUp';
import { Home } from './src/Screens/Home/home';
import AddEvent from './src/Screens/AddEvent/AddEvent';
import { Participants } from './src/Screens/Participants/participants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageUpload } from './src/component/ImageUpload';

// import { ImageUpload } from './src/component/ImageUpload';
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()


const AllScreens = () =>{
  return (
    <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' options={{headerShown:false}} component={Home}/>
        <Stack.Screen name='AddEvent' options={{headerShown:false}} component={AddEvent}/>
        <Stack.Screen name='Participants' options={{headerShown:false}} component={Participants}/>
      </Stack.Navigator>

  )
}

const Tabs = () =>{
  
  return(
    <Tab.Navigator
  screenOptions={{
    headerStyle:{
      backgroundColor:'#fff',
    },
    headerTintColor:"#fff",
   headerTitleStyle:{
    fontWeight:'bold'
   },
  }}
  initialRouteName="FirstScreen">
    <Tab.Screen name='FirstScreen' options={{headerShown:false}} component={AllScreens}  />

    {/* <Tab.Screen
        name='SecondScreen'
        component={AddEvent}
        options={{
          tabBarLabel: 'home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      /> */}
    <Tab.Screen name='SecondScreen' options={{headerShown:false}} component={AddEvent}/>
    <Tab.Screen name='ThirdScreen'  options={{headerShown:false}} component={Participants}/>
    </Tab.Navigator>
  )

}
function App(): JSX.Element { 
  return (
  <NavigationContainer>

    <Stack.Navigator
    screenOptions={{
      headerStyle:{
        backgroundColor:'#fff',
      },
      headerTintColor:"#fff",
     headerTitleStyle:{
      fontWeight:'bold'
     },
     headerShown:false
    
    }}
    initialRouteName="Login">
     <Stack.Screen name='Login' options={{headerShown:false}} component={ImageUpload}/>
        <Stack.Screen name='SignUp' options={{headerShown:false}} component={SignUp}/>
          <Stack.Screen name='TabScreens' options={{headerShown:false}} component={Tabs}/>
      </Stack.Navigator>
    </NavigationContainer>
   
    );
}

export default App;
{/* <Stack.Screen name='Home' initialParams={{itemId:23}}  options={{title:'My home'}} component={Profile}/> 
     <Stack.Screen name='Profile'  component={ Profile} />
       <Stack.Screen name='Settings'  component={Settings}/> */}