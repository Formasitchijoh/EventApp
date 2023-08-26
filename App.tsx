/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {Button, Text, View} from 'react-native';
import {Login} from './src/Screens/Login/login';
import Header from './src/component/Header/header';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import Providers from './src/navigation';
import CreateEvent from './src/component/createEvent';
import HomeScreen from './src/Test/HomeScreen';
import LoginScreen from './src/Test/LoginScreen';
import { NavigationProp } from '@react-navigation/native';
import gestureHandlerRootHOC, { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignUp } from './src/Screens/SignUp/SignUp';
import { Home } from './src/Screens/Home/home';
import AddEvent from './src/Screens/AddEvent/AddEvent';
import { Participants } from './src/Screens/Participants/participants';
import {PassingParametersToRoutes_HomeScreen,PassingParametersToRoutes_DetailScreen,PassingParametersToRoutes_SetParams} from './src/React_Navigation/PassingParametersToRoutes';
import { Home_,Profile,Settings,Feed,Messages } from './src/React_Navigation/PassingParametersToRoutes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FormikComponent } from './src/component/Form_Input';
import SignUpScreen from './src/Test/SignupScreen';
import {Blog} from './src/component/BlogForm';
import { Avatar } from './src/component/ImageGallery/Avatar';
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
     <Stack.Screen name='Login' options={{headerShown:false}} component={AddEvent}/>
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