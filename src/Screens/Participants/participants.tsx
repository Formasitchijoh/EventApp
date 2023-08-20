import { Button, View,StyleSheet } from "react-native";
import { RootStackParamList } from "../../Types/Types";
import { StackNavigationProp } from '@react-navigation/stack';
import { SearchInput } from "../../component/SearchInput";

type participantsProps = {
  navigation:StackNavigationProp<RootStackParamList,'Participants'>
}
export const Participants:React.FC<participantsProps> =({navigation}) =>{
  return (
    <View style={[styles.container]}>
      <SearchInput/>
    </View>
  )
}

export const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:'auto',
    backgroundColor:'#fff'
  }
})

type Screen2Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Screen2'>;
  };


export const Screen2: React.FC<Screen2Props> = ({ navigation }) => {
    return (
      <View>
        <Button
          title="Go to Screen 3"
          onPress={() => navigation.navigate('Screen3')}
        />
        <Button
          title="Go back to Screen 1"
          onPress={() => navigation.navigate('Screen1')}
        />
      </View>
    );
  };
  