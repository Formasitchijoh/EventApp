// BlogForm.js
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity,

} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { CustomInput } from './Form_Input'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
export const Datepicker = () =>{

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const handleDateChange = newDate => {
    setDate(newDate);
  };


  return(
    <>

    <View style={{backgroundColor:'red'}}>
      <Text>Hello world</Text>
    </View>
    <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

{/* <DatePicker
        modal
        style={{ width: 200 }}
        date={date}
        mode="date"
        placeholder="Select date"
        format="YYYY-MM-DD"
        minDate="1900-01-01"
        maxDate="2100-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={handleDateChange}
      />
      <Button title="Selected Date" onPress={() => console.log(date)} /> */}
    {/* <Button title='Open' onPress={() =>setOpen(true)}/>
    <DatePicker
    modal
    open={open}
    date={date}
    onConfirm={(date) =>{
      setOpen(false)
      setDate(date)
    }}
    onCancel={() =>{
      setOpen(false)
    }}
    androidVariant='nativeAndroid'
    mode='datetime'
    confirmText='Select a date'
    theme='dark'
    locale='fr' //sets the date order to YYYY-MM-DD
    
    />
    { date && <Text>{date.toJSON()}</Text>} */}
    </>
  )
}


export const Blog = () => {

    const blogValidationSchema = yup.object().shape({
        title: yup
          .string()
          .required('Title is required'),
        post: yup
          .string()
          .min(20, ({ min, value }) => `${min - value.length} characters to go`)
          .required('Blog post is required'),
      })
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Datepicker/>
        <View style={styles.signupContainer}>
          <Text>Blog Screen</Text>
          <Formik
          validationSchema={blogValidationSchema}
            initialValues={{
              title: '',
              post: '',
            }}
            onSubmit={values => console.log(values)}
          >
            {({ handleSubmit, isValid, values,errors,touched, setFieldTouched, setFieldValue }) => (
              <>
                <Field
                  component={CustomInput}
                  name="title"
                  placeholder="Title"
                />
                <Field
                  component={CustomInput}
                  name="post"
                  placeholder="Write post..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical='top'
                />
                    <TouchableOpacity
                onPress={() =>{
                    ImagePicker.showImagePicker(
                        { title :'Select Photo'},(response) =>{
                            if(response.uri) setFieldValue('photo',response)
                            setFieldTouched('photo', true)
                        }
                    )
                }}
                    
                    >

                    </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={handleSubmit}
                  title="POST"
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
