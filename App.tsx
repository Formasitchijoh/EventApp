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
import { Screen1 } from './src/Screens/Home/home';
import { Screen2 } from './src/Screens/Participants/participants';
import { Screen3 } from './src/Screens/Event/event';
import { SignUp } from './src/Screens/SignUp/SignUp';


const Stack = createNativeStackNavigator()
function App(): JSX.Element {
  return (
    

  <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='SignUp' component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     {/* <Stack.Screen name='Home' component={LoginScreen}/> */}
    //     <Stack.Screen
    //     name='Home'
    //     component={Hscreen}
    //     options={{title:'Welcome'}}
    //     />
    //     <Stack.Screen name='Profile' component={Profile}/>
    //   </Stack.Navigator>
    
    // </NavigationContainer>
    );
}

export default App;
