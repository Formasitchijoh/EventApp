import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../Test/SignupScreen';
import LoginScreen from '../Test/LoginScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
} 