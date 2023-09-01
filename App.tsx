/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { View, Text } from 'react-native';
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
import { AddParticipants } from './src/Screens/AddParticipants';
import { events } from './src/Screens/Event/Events';
import {EventComponent} from './src/Screens/Event/EventComponent';
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIconsfrom  from 'react-native-vector-icons/MaterialIcons'
import { Members } from './src/Screens/Members/Members';
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
    <Tab.Screen name='FirstScreen'
    options={{
      tabBarIcon:({focused}) =>(
        <View>
          <Feather
          name='home'
          size={25}
          color={focused? '#8ac3ee' : '#d9d9d9'}
          />
        </View>
      ),
      headerShown:false
    }}
     component={AllScreens}  />
    <Tab.Screen name='AddEvent'
     options={{
      tabBarIcon:({focused}) =>(
        <View>
          <MaterialIconsfrom
          name='assignment-add'
          size={25}
          color={focused? '#8ac3ee' : '#d9d9d9'}
          />
        </View>
      ),
      headerShown:false
    }} 
     component={AddEvent}/>
    <Tab.Screen name='Members' 
     options={{
      tabBarIcon:({focused}) =>(
        <View>
          <MaterialIconsfrom
          name='person-add'
          size={25}
          color={focused? '#8ac3ee' : '#d9d9d9'}
          />
        </View>
      ),
      headerShown:false
    }}
      component={Members}/>
    <Tab.Screen name='Events'  
    options={{
      tabBarIcon:({focused}) =>(
        <View>
          <MaterialIconsfrom
          name='event-available'
          size={25}
          color={focused? '#8ac3ee' : '#d9d9d9'}
          />
        </View>
      ),
      headerShown:false
    }}
    component={EventComponent}/>
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
    initialRouteName="TabScreens">
     {/* <Stack.Screen name='Login' options={{headerShown:false}} component={Login}/>
        <Stack.Screen name='SignUp' options={{headerShown:false}} component={SignUp}/> */}
          <Stack.Screen name='TabScreens' options={{headerShown:false}} component={Tabs}/>
      </Stack.Navigator>
    </NavigationContainer>
   
    );
}

export default App;
