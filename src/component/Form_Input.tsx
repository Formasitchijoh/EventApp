import React from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import { Formik } from 'formik';
import { styles2 } from './SearchInput';
import * as yup from 'yup'
import { Event } from '../Models/userType';

type placeholder = {
  name: string;
};
export const Form_Input: React.FC<placeholder> = ({name}) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.text,styles.imageView]}>
      <TextInput
        placeholder={name}
        placeholderTextColor="#666"
        style={{width:'90%'}}></TextInput>
        <View style={{width:'7%', height:'100%',display:'flex', alignItems:'flex-end',justifyContent:'flex-end',marginBottom:10}}>
        <Image source={require("../resources/calendar-month.png")}
        style={{height:'50%',width:'100%',tintColor:'#000',shadowColor:'#000'}}
        /></View> 
      </View>
    </View>
  );
};
export const TitleInput: React.FC<placeholder> = ({name}) => {
    return (
        <View style={[styles.container]}>
        <TextInput
           placeholder={name}
           placeholderTextColor="#666"
           style={[styles.text]}
          
           ></TextInput>
       </View>
    );
  };

export const Form_TextArea: React.FC<placeholder> = ({name}) => {
  return (
    <View style={[styles.container]}>
     <TextInput
        placeholder={name}
        placeholderTextColor="#666"
        style={[styles.text,styles.textarea]}
        multiline={true}></TextInput>
    </View>
  );
};

export const DateInput = () => {
  return (
    <View style={[styles.dateView]}>
         <View style={[styles.text,styles.date, styles.imageView]}>
      <TextInput
        placeholder='start date'
        placeholderTextColor="#666"
        style={{width:'85%',}}></TextInput>
        <View style={{width:'12%', height:'100%',display:'flex', alignItems:'flex-end',justifyContent:'flex-end',marginBottom:10}}>
        <Image source={require("../resources/timer.png")}
        style={{height:'50%',width:'100%',tintColor:'#000',shadowColor:'#000'}}
        /></View> 
      </View>
      <View style={[styles.text,styles.date, styles.imageView]}>
      <TextInput
        placeholder='end date'
        placeholderTextColor="#666"
        style={{width:'85%',}}></TextInput>
        <View style={{width:'12%', height:'100%',display:'flex', alignItems:'flex-end',justifyContent:'flex-end',marginBottom:10}}>
        <Image source={require("../resources/timer.png")}
        style={{height:'50%',width:'100%',tintColor:'#000',shadowColor:'#000'}}
        /></View> 
      </View>
    </View>
  );
};


const loginValSchema = yup.object().shape({
  email: yup.string()
          .email('please enter valid email')
          .required('Email Address is required'),
  password : yup.string()
              .min(8,({min}) =>  `Password must be ${min} charactes or more`)
              .required('password required'),

})
export const FormikComponent = () =>{
  return(
    <View>
      <Text>Login Screen</Text>

      <Formik 
      validationSchema={loginValSchema}
      initialValues={{email:'', password:''}}
      onSubmit={(values) => console.log(values)
      
      }
      >
        {({handleChange, handleBlur, handleSubmit, values,errors, touched, isValid}) =>(
          <>
          <TextInput
          placeholder='Enter your email'
          style={styles.text}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          >
          </TextInput>
          {( errors.email && touched.email) && <Text style={{fontSize:10, color:'red'}}>{errors.email}</Text>}
          <TextInput
          placeholder='Enter your password'
          style={styles.text}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          >
          </TextInput>
          { (errors.password && touched.password) && <Text style={{fontSize:10, color:'red'}}>{errors.password}</Text>}
          <Button onPress={() => handleSubmit()} title='LOGIN' disabled={!isValid}/>
          { values && <Text>{values.email} and the passwd is {values.password}</Text>}
          </>
        )}
      </Formik>
    </View>
  )
}

export const CustomInput = ( props:any) =>{

  const {
    field:{name, onBlur, onChange, value},
    form :{ errors, touched, setFieldTouched},
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]
  return(
    <>
    <TextInput 
    style={[styles.text,
    props.multiline && { height: props.numberOfLines * 40 },
    hasError && styles.errorInput
    ]}
    value={value}
    onChangeText={(text) => onChange(name)(text)}
    onBlur={() =>{
      setFieldTouched(name)
      onBlur(name)
    }}
    {...inputProps}
    />
    { hasError && <Text style={{fontSize:10, color:'red'}}>{errors[name]}</Text>}
    </>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'blue',
  },
  text: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 10,
    // backgroundColor: '#fbfa',
  },
  textarea: {
    height: 80,
  },
  date: {
    width: '42%',
  },
  dateView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageView :{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  errorInput: {
    borderColor: 'red',
  }
});
export default Form_Input;
