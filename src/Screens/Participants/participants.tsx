import { Button, View } from "react-native";
import { RootStackParamList } from "../../Types/Types";
import { StackNavigationProp } from '@react-navigation/stack';

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
  