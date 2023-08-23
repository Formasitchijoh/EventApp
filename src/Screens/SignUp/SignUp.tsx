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
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Types/Types';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setUserData} from '../../redux/slices/userSlices';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {v4 as uuidv4} from 'uuid';
import {Formik} from 'formik';
import * as yup from 'yup';

type SignInProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};

export const SignUp: React.FC<SignInProps> = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const {users} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const onInputChange = (value: string, name: string) => {
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then(() => {
        const user = {
          id: uuidv4(),
          email: userDetails.email,
          password: userDetails.password,
        };
        dispatch(setUserData(user));
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
  };

  // useEffect(() => {
  //   console.log(JSON.stringify(users));
  // }, [users]);

  const loginValidationSchema = yup.object().shape({
    emails: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    passwd: yup
      .string()
      .min(8, ({min}) => `password must be at least ${min} characters`)
      .required(`Password is required`),
  });

  return (
    <View style={[styles.container]}>
      <Text
        style={{
          color: '#000',
          textShadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontSize: 30,
          fontWeight: '900',
          marginBottom: 10,
        }}>
        SignIn
      </Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{emails: '', passwd: ''}} 
        onSubmit={createUser}
        >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Enter email"
              value={values.emails}
              onChangeText={handleChange('emails')}
              onBlur={handleBlur('emails')}
              keyboardType="email-address"
              style={[styles.text]}
            />
            {errors.emails && touched.emails && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.emails}</Text>
            )}
            <TextInput
              value={values.passwd}
              onChangeText={handleChange('passwd')}
              onBlur={handleBlur('passwd')}
              placeholder="Enter password"
              style={[styles.text]}
            />
            {errors.passwd && touched.passwd && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.passwd}</Text>
            )}
            <TouchableOpacity
              style={{
                width: '90%',
                height: 50,
                borderRadius: 20,
                backgroundColor: '#180923',
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={!isValid}
              // onPress={createUser}
              >
              <Text style={{color: '#fff'}}>Create Acount</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '90%',
                height: 50,
                borderRadius: 20,
                backgroundColor: '#180923',
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('TabScreens')}>
              <Text style={{color: '#fff'}}>Next</Text>
            </TouchableOpacity>
           
          </>
        )}
      </Formik>
    </View>
  );
};

const testStyle = StyleSheet.create({
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
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
//  (
//   <View style={{ borderColor:'#000', padding:10, shadowOffset:{width:0, height:2}, shadowOpacity:0.8, shadowRadius:2, elevation:5, shadowColor:"#000"}}>
//     <Text style={{fontFamily:'sans serif', fontStyle:'normal', fontWeight:'bold', fontSize:30}}>Welcome </Text>
//     <Text style={{fontFamily:'sans serif', fontStyle:'normal', fontWeight:'bold', fontSize:20}}> {user.email}</Text>

//   </View>
// ) :

// const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
//   setUser(user);
//   if (initializing) setInitializing(false);
// };

// useEffect(() => {
//   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//   return subscriber;
// }, []);

// if (initializing) return null;

// if (!user) {
//   return (
//     <View>
//       <Text>Login</Text>
//     </View>
//   );
// }
