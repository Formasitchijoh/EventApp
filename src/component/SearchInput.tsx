import React, { useState } from 'react';
import {View, StyleSheet, Text, TextInput, Image} from 'react-native';
import CheckBox from 'react-native-check-box';
export const SearchInput = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.text, styles.imageView]}>
        <TextInput
          placeholder="Search or type a command"
          style={{width: '70%'}}></TextInput>
        <View style={{width: '20%', height: '80%', alignItems: 'flex-end'}}>
          <Image
            source={require('../resources/color.png')}
            style={{
              height: '100%',
              width: '60%',
              tintColor: '#000',
              shadowColor: '#000',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export const UserCmponent = () => { 

  const [state, setState] = useState(false)
  return (
    <View style={styles2.viewAll}>
      <View style={{width:'15%', height:'100%', justifyContent:'center',alignItems:'flex-end'}}>
        <CheckBox
          style={{flex: 1, marginTop:15, marginRight:10}}
          onClick={() => {
            setState(!state);
          }}
          isChecked={state}
        />
      </View>
      <View style={styles2.viewImage}>
        <Image
          source={require('../resources/img.jpg')}
          style={{width: '90%', height: '60%'}}
        />
      </View>
      <View style={styles2.view2}>
        <Text style={styles2.text}>Formasit chijoh</Text>
        <Text>formasitf@gmail.com</Text>
      </View>
    </View>
  );
};
export const styles2 = StyleSheet.create({
  container: {
    width: '100%',
    height: '20%',
  },
  viewAll: {
    width: '90%',
    height: '15%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 2,
    borderWidth: 0.1,
    marginBottom: 15,
   shadowRadius:5,
   shadowColor:"#000",
   shadowOpacity:0.1,
   elevation:3,
   shadowOffset:{width:0,height:2}
  },
  viewImage: {
    width: '20%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    width: '60%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 2,
    backgroundColor: 'faff',
  },

  text: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '800',
    textShadowColor: '#fafa',
  },
});

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
