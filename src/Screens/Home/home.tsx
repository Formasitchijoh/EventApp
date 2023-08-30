import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar
} from 'react-native';
import {RootStackParamList} from '../../Types/Types';
import {StackNavigationProp} from '@react-navigation/stack';
import CreateEvent from '../../component/createEvent';
import {DarkTheme, RouteProp} from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export const Home: React.FC<HomeProps> = ({navigation}) => { 
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
  return (
    <>
    <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
   <SafeAreaView style={[styles.container]}>
   {/* <View > */}
      <View
        style={{
          width: '70%',
          marginBottom: '5%',
          height: '15%',
          paddingVertical: '5%',
        }}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <Text style={[styles.textw]}>Welcome</Text>
          <View style={{justifyContent: 'center'}}>
            <Text>to</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.textw]}>Scheduler</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.element]}
        onPress={() => navigation.navigate('AddEvent')}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Image
            source={require('../../iresources/rectangle.jpg')}
            style={{height: '40%', width: '30%', marginBottom: 10}}
          />
          <Text style={[styles.text]}>Create Event</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.element]}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            shadowRadius: 10,
          }}>
          <Image
            source={require('../../resources/img.jpg')}
            style={{height: '40%', width: '30%', marginBottom: 10}}
          />
          <Text style={[styles.text]}>Join an event</Text>
        </View>
      </View>
    {/* </View> */}
   </SafeAreaView>
    </>
    
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
  element: {
    width: '60%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: 'red',
    marginBottom: '10%',
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
  },
  text: {
    color: '#000',
    textShadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textw: {
    color: '#000',
    textShadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Inter',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '900',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
type Screen1Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Screen1'>;
};

export const Screen1: React.FC<Screen1Props> = ({navigation}) => {
  return (
    <View>
      <Button
        title="Go to Screen 2"
        onPress={() => navigation.navigate('Screen2')}
      />
    </View>
  );
};
