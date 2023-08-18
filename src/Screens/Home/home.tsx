import { Button, View } from "react-native";
import { RootStackParamList } from "../../Types/Types";
import { StackNavigationProp } from '@react-navigation/stack';

type Screen1Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Screen1'>;
  };


  export const Screen1: React.FC<Screen1Props> = ({ navigation }) => {
    return (
      <View>
        <Button
          title="Go to Screen 2"
          onPress={() => navigation.navigate('Screen2')}
        />
      </View>
    );
  };