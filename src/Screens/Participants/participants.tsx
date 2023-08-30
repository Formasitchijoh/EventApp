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
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { setUserData, getSelectedUsers } from '../../redux/slices/userSlices';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import  DocumentData from '@react-native-firebase/firestore';
import { User } from '../../Models/userType';
import { CustomButton } from '../../component/SearchInput';
type participantsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Participants'>;
};

type Props = {
  displayParticipant:boolean,
  participants:User[],
  Selected:boolean
}

// export const Marticipants:React.FC<Props> = ({displayParticipant,participants,Selected}) => {
//   return(
//     <View>
//       {  displayParticipant ?(
//         participants.map((data, index) => (
//           <UserCmponent
//              id={data.id}
//             name={data.name}
//             email={data.email}
//             photoUrl={data.photoUrl}
//             key={index}
//             Selected={Selected}
            
//           />
//       )
//         ))  
//       }
//     </View>
//   )
// }
export const Participants: React.FC<participantsProps> = ({navigation}) => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [userInfo, setUserInfo] = useState({
    id:0,
    name: '',
    email: '',
    photoUrl:'',
    Selected:false
  });
  const [firebaseUsers, setFirebaseUsers] = useState<Array<FirebaseFirestoreTypes.DocumentData>>([])
  const [AllUsers, setAllUsers] = useState<Array<User>>([])
const [Selected, setSelected] = useState(false)
const [displayParticipant, setdisplayParticipant] = useState(false)
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: 340,
    height: 300,
    marginLeft: 5,
  };

  useEffect(() => {
    const getEventUsers = async () => {
      const users = await firestore().collection('Users').get();
      const userArray: FirebaseFirestoreTypes.DocumentData[] = []; // Assuming this is the original array of DocumentData objects

  
      for (const user of users.docs) {
        const data = user.data()
        userArray.unshift(data);
        console.log('User', data);
      }
      
      const convertedUserArray: User[] = userArray.map((data: FirebaseFirestoreTypes.DocumentData) => {
        return {
          Selected: false,
          id:data.id,
          email: data.email ?? '', // Replace 'email' with the actual field name in the DocumentData object
          name: data.name ?? '', // Replace 'name' with the actual field name in the DocumentData object
          photoUrl: data.photoUrl ?? '', // Replace 'photoUrl' with the actual field name in the DocumentData object
          // Set the default value for 'isSelected' property
        };
      });
      
      // Now you can assign the converted array to the state
      setFirebaseUsers(convertedUserArray);
      setAllUsers(convertedUserArray) // setting all the users to the allUser component
      setFirebaseUsers(userArray);
      dispatch(setUserData(convertedUserArray))
      console.log("see eh i do de joke");
      console.log(JSON.stringify(firebaseUsers) + 'and more');
      
    };
  
    getEventUsers();
  }, []);
  
  const onSelectParticipants = () =>{ 
   setdisplayParticipant(true)
  }
  const onSubmitParticipants = () => setdisplayParticipant(false)

  
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={{width:'100%', height:'6%', justifyContent:'center', marginTop:20}}>
          <CustomButton title={'Submit'} onAddUser={onSelectParticipants}/> 
        </View>
        <SearchInput />
        <ScrollView style={styles.scrollView}>
          { (user.users && user.participants.length <=0) ? 
        (  
          user.users.map((data, index) => (
            <UserCmponent
               id={data.id}
              name={data.name}
              email={data.email}
              photoUrl={data.photoUrl}
              key={index}
              Selected={Selected}
              
            />
          ))
        ):(
          (user.users && user.participants) && 
          (  
           user.participants.map((data, index) => (
             <UserCmponent
                id={data.id}
               name={data.name}
               email={data.email}
               photoUrl={data.photoUrl}
               key={index}
               Selected={Selected}
               
             />
           ))
         )
        )
        }
          
        </ScrollView>
        <View>
          <Text>Floating Action example</Text>
          <FloatingAction
            position="right"
            onPressItem={name => {
              console.log(`selected button: ${name}`);
            }}
            onPressMain={showModal}
            // onOpen={showModal}
          />
        </View>
      </View>
      {/* Add participants modal */}
      {
        <Portal>
          <View style={{width: '100%', height: '100%'}}>
            <Modal
              visible={visible}
              onDismiss={onSubmitParticipants}
              style={{width: '100%', height: '100%'}}
              contentContainerStyle={containerStyle}>
            
            </Modal>
          </View>
        </Portal>
      }

{
        <Portal>
          <View style={{width: '100%', height: '100%'}}>
            <Modal
              visible={displayParticipant}
              onDismiss={hideModal}
              style={{width: '100%', height: '100%'}}
              contentContainerStyle={containerStyle}>
              <AddParticipants userInfo={userInfo} setUserInfo={setUserInfo} />
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
