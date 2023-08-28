import { View, StyleSheet,TouchableOpacity, ScrollView} from 'react-native';
import {RootStackParamList} from '../../Types/Types';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchInput, UserCmponent, styles2} from '../../component/SearchInput';
import {FlatList} from 'react-native';
import {FAB} from 'react-native-paper';
import {Modal, Portal,Button, PaperProvider} from 'react-native-paper';
import {AddParticipants} from '../AddParticipants';
import {useState} from 'react';
import  Icon  from 'react-native-paper';
type participantsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Participants'>;
};

export const Participants: React.FC<participantsProps> = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: 350,
    height: 200,
  };

  const CustomButton = () => (
    <FAB icon="plus" style={styles.fab} onPress={showModal} />
  );
  const CustomButtons = () => (
    <TouchableOpacity style={styles.button} onPress={() => console.log('Pressed')}>
      <Icon name="plus" size={20} color="#FFFFFF" />
    </TouchableOpacity>
  );
  return (
    <PaperProvider>
      <View style={styles.container}>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
        <CustomButtons />
        <SearchInput />
        <ScrollView style={styles.scrollView}>
          <UserCmponent />
          <UserCmponent />
          <UserCmponent />
          <UserCmponent />
          <UserCmponent />
          <UserCmponent />
          <UserCmponent />
          <UserCmponent />
          <UserCmponent />
          <UserCmponent />
        </ScrollView>
      </View>
      {
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <AddParticipants />
          </Modal>
        </Portal>
      }
       
    </PaperProvider>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // margin:'auto',
    backgroundColor: '#fff',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

