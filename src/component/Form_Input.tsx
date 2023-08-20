import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';

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
  }
});
export default Form_Input;
