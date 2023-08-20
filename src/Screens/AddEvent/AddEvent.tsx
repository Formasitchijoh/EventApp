import React from 'react'
import Form_Input from '../../component/Form_Input'
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackParamList } from '../../Types/Types'
import { StackNavigationProp } from '@react-navigation/stack'
import { Form_TextArea } from '../../component/Form_Input'
import { DateInput,TitleInput } from '../../component/Form_Input'

type AddEventProps = {
    navigation:StackNavigationProp<RootStackParamList,'AddEvent'>
}

export const AddEvent:React.FC<AddEventProps> = ({navigation}) => {
  return (
    <View style={[styles.container]}>
        <Text style={[styles.text]}>Schedule a Task </Text>
        <TitleInput name='Title'/>
        <Form_TextArea name='Description'/>
        <Form_Input name='Start date'/>
        <Form_Input name='End date'/>
        <DateInput/>
        <TitleInput name='Add Participants'/>
        <TouchableOpacity style={[styles.button]} onPress={() =>navigation.navigate('Participants')}>
            <Text style={[styles.textbtn]}>
                submit
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:0.5
    },
    text:{
        color: '#000',
        textShadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        fontFamily: 'Inter',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: '900',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:"8%"
    },
    textbtn:{
        textShadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        fontFamily: 'Inter',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '900',
        justifyContent: 'center',
        alignItems: 'center',
        color:'white'
    },
    button:{
        width:'30%',
        height:'8%',
        borderRadius:10,
        backgroundColor:'#230D34',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        marginLeft:'60%',
        
    }
})
export default AddEvent