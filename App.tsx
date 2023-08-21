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


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function Homep() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}
function App(): JSX.Element { 
  return (
  <NavigationContainer>

    <Stack.Navigator
    screenOptions={{
      headerStyle:{
        backgroundColor:'#f4511e',
      },
      headerTintColor:"#fff",
     headerTitleStyle:{
      fontWeight:'bold'
     },
    }}
    initialRouteName="SignUp">
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='AddEvent' component={AddEvent}/>
        <Stack.Screen name='Participants' component={Participants}/>
      </Stack.Navigator>
    </NavigationContainer>
   
    );
}

export default App;
{/* <Stack.Screen name='Home' initialParams={{itemId:23}}  options={{title:'My home'}} component={Profile}/> 
     <Stack.Screen name='Profile'  component={ Profile} />
       <Stack.Screen name='Settings'  component={Settings}/> */}