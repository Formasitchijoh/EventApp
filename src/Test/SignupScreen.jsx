import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { CustomInput } from '../component/Form_Input'

const SignUpScreen = () => {

  const signUpValidationSchema = yup.object().shape({
    fullName:yup
              .string()
              .matches(/(\w.+\s).+/,' Enter at least 2 name')
              .required('Full name required'),
    phoneNumber: yup
                .string()
                .matches(/(01)(\d){8}\b/,'Enter a valid phone number')
                .required('Phone number is required'),
    email: yup
            .string()
            .email('Please enter a valid email')
            .required('Email is required'),
    password: yup
              .string()
              .matches(/w*[a-z]\w*/)
              .matches(/\w*[A-Z]\w*/)
              .matches(/\d/)
              .matches(/[!@#$%^&*\-_"=+{}; :.<.>]/)
              .min(8,({min}) => `Password must be at least ${min}`)
              .required('password is required'),
    confirmPassword:yup
                      .string()
                      .oneOf([yup.ref('password')],'password does not match')
                      .required('confirm password is required')
              
  })
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Text>Sign Up Screen</Text>
          <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{fullName:'', email:'', phoneNumber:'', password:'', confirmPassword:''}}
          
          onSubmit={(values) =>console.log(values)}
          >
            {({handleSubmit, isValid}) =>(
              <>
              <Field
              component={CustomInput}
              name='fullName'
              placeholder='Full Name'
              />
              <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Field
                  component={CustomInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                />

                <Button
                  onPress={handleSubmit}
                  title="SIGN UP"
                  disabled={!isValid}
                />
              
              </>
            )}

          </Formik>

        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
})
export default SignUpScreen