import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';

export const AddParticipants = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {backgroundColor: 'white', padding: 20, height: 200};
  return (
    <View style={[stylesn.container]}>
      <TextInput
        placeholder="Title"
        placeholderTextColor="#666"
        style={[stylesn.text]}></TextInput>
      <TextInput
        placeholder="Title"
        placeholderTextColor="#666"
        style={[stylesn.text]}></TextInput>
    </View>
  );
};

export const stylesn = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  con: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
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
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
});
