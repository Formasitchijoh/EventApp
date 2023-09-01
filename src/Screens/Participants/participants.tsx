import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import {RootStackParamList} from '../../Types/Types';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchInput, UserCmponent, styles2} from '../../component/SearchInput';
import {FlatList} from 'react-native';
import {FAB} from 'react-native-paper';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';
import {AddParticipants} from '../AddParticipants';
import {useCallback, useEffect, useState} from 'react';
import {FloatingAction} from 'react-native-floating-action';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {setUserData, getSelectedUsers, deleteUser} from '../../redux/slices/userSlices';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import DocumentData from '@react-native-firebase/firestore';
import {User} from '../../Models/userType';
import {CustomButton} from '../../component/SearchInput';
import {SelectedParticipants} from '../../component/SelectedParticipants';
import {ManageUser} from '../../component/ManageUser';
import { RouteProp } from '@react-navigation/native';
type participantsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Participants'>;
};


export const Participants: React.FC<participantsProps> = ({navigation}) => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [userInfo, setUserInfo] = useState({
    id: 0,
    name: '',
    email: '',
    photoUrl: '',
    Selected: false,
  });
  const [firebaseUsers, setFirebaseUsers] = useState<
    Array<FirebaseFirestoreTypes.DocumentData>
  >([]);
  const [AllUsers, setAllUsers] = useState<Array<User>>([]);
  const [Selected, setSelected] = useState(false);
  const [displayUpdate, setdisplayUpdate] = useState(false);
  const [collection_Name, setcollection_Name] = useState('')
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: 340,
    height: 500,
    marginLeft: 5,
    paddingTop: 10,
  };

  const conStyle = {
    backgroundColor: 'white',
    width: 200,
    height: 200,
    alignSelf: 'flex-end',
    marginRight: 30,
  };

  useEffect(() => {
    const getEventUsers = async () => {
      try {
        const users = await firestore().collection('Users').get();
        const userArray: FirebaseFirestoreTypes.DocumentData[] = [];
        for (const user of users.docs) {
          const data = user.data();
          const documentId = user.id; // Extracting the document ID
          const userData = { ...data, id: user.id }; // Adding the document ID to the user data
          userArray.unshift(userData);
        }        
        
        const convertedUserArray: User[] = userArray.map(
          (data: FirebaseFirestoreTypes.DocumentData) => {
            return {
              Selected: false,
              id: data.id,
              email: data.email ?? '',
              name: data.name ?? '', 
              photoUrl: data.photoUrl ?? '', 
            };
          },
        );
  
        // Now you can assign the converted array to the state
        setFirebaseUsers(convertedUserArray);
        setAllUsers(convertedUserArray); // setting all the users to the allUser component
        dispatch(setUserData(convertedUserArray));
      } catch (error) {
        console.error('Error fetching event users:', error);
      }
    
    
    };

    getEventUsers();
  }, [visible,displayUpdate]);

  
  const onClickUpdate = (id:string) => {
    dispatch(deleteUser(id))
    setdisplayUpdate(true);
  };
  const onhideUpdate = () => setdisplayUpdate(false);

  type DeleteProp = {
    collectionName:string,
    documentId:string,
    field:string
  }
  const deleteEntry =  (collectionName:string, documentId:string) => {

    if(documentId == ''){
      Alert.alert('documentId must be a number')
      return
    }
    try { 

       firestore().collection(collectionName).
      doc(documentId).delete().then(()=>{
        console.log('Document deleted successfully.');
        setdisplayUpdate(true);
      }).catch((e)=>{
        console.error('Error deleting document:', e);

      })
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleSelectedParticipants = () =>{
    console.log(JSON.stringify(user.participants))
    navigation.navigate('AddEvent')
  }
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            height: '6%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginTop: 20,
          }}>
          <CustomButton width={40} title={'Submit'} onAddUser={handleSelectedParticipants} />
        </View>
        <SearchInput />
        <ScrollView style={styles.scrollView}>
          {user.users
            ? user.users.map((data, index) => (
                <UserCmponent
                  id={data.id}
                  name={data.name}
                  email={data.email}
                  photoUrl={data.photoUrl}
                  key={index}
                  Selected={Selected}
                  onClickUpdate={onClickUpdate}
                />
              ))
            : null}
        </ScrollView>
        {/* <View>
          <Text>Floating Action example</Text>
          <FloatingAction
            position="right"
            onPressItem={name => {
              console.log(`selected button: ${name}`);
            }}
            onPressMain={showModal}
            onOpen={showModal}
          />
        </View> */}
      </View>

      {
        <Portal>
          <View style={{width: '100%', height: '100%'}}>
            <Modal
              visible={visible}
              onDismiss={hideModal} 
              style={{width: '100%', height: '100%'}}
              contentContainerStyle={containerStyle}>
              <AddParticipants
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                hideModal={hideModal}
                visible={visible}
              />
            </Modal>
          </View>
        </Portal>
      }
      {
        <Portal>
          <View style={{width: '100%', height: '100%'}}>
            <Modal
              visible={displayUpdate}
              onDismiss={onhideUpdate}
              style={{width: '100%', height: '100%'}}
              contentContainerStyle={conStyle}>
              <ManageUser deleteEntry={deleteEntry}  showModal={showModal} />
            </Modal>
          </View>
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
