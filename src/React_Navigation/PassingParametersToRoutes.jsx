import React from 'react'
import { View,Button,Text } from 'react-native'


export const PassingParametersToRoutes_HomeScreen = ({navigation,route}) =>{

    const { itemId } = route.params;
    return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <Text>Home Screen</Text>
            <Text>itemId:{JSON.stringify(itemId)}</Text>
            <Button
            
            title='Go to details'
            onPress={() => navigation.navigate('Details',{itemId:86,otherParam:'anything you want here'})}
            />

        </View>
    )
}

export const PassingParametersToRoutes_DetailScreen = ({navigation,route}) =>{
    const { itemId,otherParam} = route.params;
    return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <Text>Details Sreen</Text>
            <Text>itemId:{JSON.stringify(itemId)}</Text>
            <Text>other prams:{JSON.stringify(otherParam)}</Text>

            <Button
            title='Go to details--- again'
            onPress={() =>{
                navigation.push('Details',{itemId:Math.floor(Math.random *100)})
            }}
            
            />

            <Button title='Go to Home' onPress={() => navigation.navigate('Home')}/>
            <Button title='Go back' onPress={() => navigation.goBack()}/>
            <Button title='Gos back' onPress={() => navigation.navigate('SetParams',{itemId:Math.ceil(Math.random*20)})}/>

        </View>
    )

}

export const PassingParametersToRoutes_SetParams = ({navigation,route}) =>{

    const { itemId } = route.params 
    return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <Text>Set Params</Text>
            <Text>itemId:{JSON.stringify(itemId)}</Text>
            <Button
            
            title='Go to details'
            onPress={() => navigation.setParams({itemId:Math.ceil(Math.random*20)})}
            />

        </View>
    )
}

export const Settings =({navigation,route}) =>{
    const { user }= route.params;
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
           
           <Text>UserParam:{JSON.stringify(user)}</Text>
            <Button
            onPress={()=>navigation.navigate('Profile')}
            />
        </View>
    )
}

// export const Root = () =>{
//     return(
//       <Stack.Navigator >
//         <Stack.Screen name='Settings' component={Settings_}/>
//         <Stack.Screen name='Profile' component={Profile}/>
//       </Stack.Navigator>
//     )
//   }

export const Profile= ({navigation}) =>{
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Profile page</Text>
        <Button
        title='Settings'
        onPress={()=>navigation.navigate("Settings")}
        />
</View>
    )
} 
export const Home_ = ({navigation}) =>{
   return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Button
    onPress={()=>navigation.navigate("Root",{
        screen: 'Settings',
        params: {user:{name:'formasit',age:23}}
    })}
    />
</View>
   )
}

export const Feed = ({navigation}) =>{
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Button
        title='Profile'
        onPress={()=>navigation.navigate("Profile")}
        />
    </View>
    )
}
export const Messages = () =>{
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Messages</Text>
        <Button
        title='Settings'
        onPress={()=>navigation.navigate("Settings")}
        />
    </View>
    )
}