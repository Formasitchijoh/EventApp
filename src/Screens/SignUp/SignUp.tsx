import {
  View,
  StyleSheet,
  Image,
  Button,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
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
import {registerAdmin} from '../../redux/slices/AdminSlice';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
type SignInProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};

export const SignUp: React.FC<SignInProps> = ({navigation}) => {
 
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const [image, setImage] = useState('');
  const [avater, setavater] = useState('');

  const {users} = useAppSelector(state => state.user);
  const admin = useAppSelector(state => state.admin);
  const dispatch = useAppDispatch();

  const onInputChange = (value: string, name: string) => {
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const choose_image = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };

  const savePhoto = async () => {
    const uploaduri = image;
    let filename = uploaduri.substring(uploaduri.lastIndexOf('/') + 1);
    const reference = storage().ref().child('avatar').child(filename);
    const task = reference.putFile(uploaduri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    try {
      await task;
      const url = await reference.getDownloadURL();
      setavater(url);

      Alert.alert('Your image is saved! smile😇');
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const createUser = async () => {
    const value = await savePhoto();
    value && setImage(value);
    
    auth()
      .signInWithEmailAndPassword(userDetails.email, userDetails.password)
      .then(() => {
        const user = {
          email: userDetails.email,
          password: userDetails.password,
          photoUrl: avater,
        };
        firestore()
          .collection('Admin')
          .add({user})
          .then(() => {
            dispatch(registerAdmin(user));
            console.log('successfully signed in!' + JSON.stringify(user));
          })
          .catch(error => {
            console.log(`the error ${error}`);
          });

        navigation.navigate('Home');
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

    navigation.navigate('TabScreens');
  };
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


  type Props = {
    text: string;
    choose_image: () => void;
  };
  const HorizontalRule: React.FC<Props> = ({text, choose_image}) => {
    return (
      <View style={avatarStyle.container}>
        <View style={avatarStyle.rule} />
        <TouchableOpacity onPress={choose_image}>
          <Text style={avatarStyle.text}>{text}</Text>
        </TouchableOpacity>
        <View style={avatarStyle.rule} />
      </View>
    );
  };

  useEffect(() => {
    console.log(JSON.stringify(admin));
  }, [admin]);

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
        {' '}
        SignIn
      </Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => setUserDetails(values)}>
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
              value={userDetails.email}
              onChangeText={value => onInputChange(value, 'email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              style={[styles.text]}
            />
            {errors.email && touched.email && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
            )}
            <TextInput
              value={userDetails.password}
              onChangeText={value => onInputChange(value, 'password')}
              onBlur={handleBlur('password')}
              placeholder="Enter password"
              style={[styles.text]}
            />
            {errors.password && touched.password && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.password}
              </Text>
            )}
          </>
        )}
      </Formik>
      <HorizontalRule choose_image={choose_image} text="Upload Image" />
      {image && (
        <View
          style={{
            width: '60%',
            height: '18%',
            borderWidth: 0.2,
            borderRadius: 1,
            marginTop:10,
            padding:5,justifyContent:"center",
            alignItems:'center'
          }}>
          <TouchableOpacity onPress={() => choose_image()}>
            {image && (
              <Image source={{uri: image}} style={styles.image_picker} />
            )}
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderRadius: 20,
          backgroundColor: '#180923',
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
       
          
        }}
        onPress={() => createUser()}>
        <Text style={{color: '#fff'}}>Create Acount</Text>
      </TouchableOpacity>
      {userDetails && (
        <Text>
          {userDetails.email} and {userDetails.password}
        </Text>
      )}
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
  image_picker: {
    width: 150,
    height: 120,
    borderRadius: 10,
    
  },
});

const avatarStyle = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  rule: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

//  (
//   <View style={{ borderColor:'#000', padding:10, shadowOffset:{width:0, height:2}, shadowOpacity:0.8, shadowRadius:2, elevation:5, shadowColor:"#000"}}>
//     <Text style={{fontFamily:'sans serif', fontStyle:'normal', fontWeight:'bold', fontSize:30}}>Welcome </Text>
//     <Text style={{fontFamily:'sans serif', fontStyle:'normal', fontWeight:'bold', fontSize:20}}> {user.email}</Text>

//   </View>
// ) :
