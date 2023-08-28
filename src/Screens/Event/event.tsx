import { Button, View } from "react-native";
import { RootStackParamList } from "../../Types/Types";
import { StackNavigationProp } from "@react-navigation/stack";


type Screen3Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Screen3'>;
  };
  
  export const Screen3: React.FC<Screen3Props> = ({ navigation }) => {
    return (
      <View>
        <Button
          title="Go back to Screen 2"
          onPress={() => navigation.navigate('Screen2')}
        />
      </View>
    );
  };
  