import React from 'react'
import { View,StyleSheet,Text,TextInput } from 'react-native'
import { Image } from 'react-native'

export const SearchInput = () => {
  return (
    <View style={[styles.container]}>
       <View style={[styles.text,styles.imageView]}>
       <TextInput
        placeholder='Search or type a command'
        style={{width:'70%'}}
        >
        </TextInput>
        <View style={{width:'20%',height:'80%', alignItems:'flex-end'}}>
        <Image source={require("../resources/color.png")}
        style={{height:'100%',width:'60%',tintColor:'#000',shadowColor:'#000'}}
        />
        </View>
       </View>
        
    </View>
  )
}

export const UserCmponent = () =>{
  return(
    <View>

      <View>
        <View>
        </View>
        <View>
          <Text>Formasit chijoh</Text>
          <Text>formasitf@gmail.com</Text>
        </View>
      </View>
    </View>
  )
} 
export const styles2 = StyleSheet.create({
  container :{
    width:'100%',
    height:'auto',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  view1:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  view2:{

  }
})

export const styles = StyleSheet.create({
    container :{
        width:'100%',
        height:'auto',
        justifyContent:'space-between',
        alignItems:'center',
      
    },
    text :{
      width:'90%',
      height:50,
      borderWidth:1,
      borderRadius:10,
      margin:10,
    },
    imageView:{
      display:'flex',
      flexDirection:'row',
      justifyContent:"center",
      alignItems:'center'
    }
})
