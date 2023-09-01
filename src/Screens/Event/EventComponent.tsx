import {

  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {RootStackParamList} from '../../Types/Types';
import {StackNavigationProp} from '@react-navigation/stack';
import {events} from './Events';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  addEvent,
  getAllEvent,
  getEventId,
  getSelectedEvent,
} from '../../redux/slices/EventSlice';
import {firebase} from '@react-native-firebase/firestore';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Event} from '../../Models/userType';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import {CustomButton} from '../../component/SearchInput';
import {Alert} from 'react-native';
import {ManageEvent, ManageUser} from '../../component/ManageUser';
import { Portal,Modal, Button, PaperProvider} from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';

type EventProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Events'>;
  route:RouteProp<{ Participants: { action?: string} },'Participants'>;

};

type Props = {
  id: string;
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  agenda: string;
  title:string;
  openModal: () => void;
 getSelected_Event: (id: string) => void;
};
export const Events: React.FC<Props> = ({
  id,
  start_date,
  end_date,
  start_time,
  end_time,
  agenda,
  title,
  openModal,
  getSelected_Event,
}) => {
  const handleEventId = () => {
    getSelected_Event(id);
    openModal();
  };

  if(start_date){
   console.log(`${start_date} and the endtime is ${end_time}`)
  }
  const formattedDate = moment(start_date, 'MM/DD/YYYY').format('DD');
  const formattedDateName = moment(start_date,'MM/DD/YYYY').format('MMMM')
  const formattedName = moment(start_date,'MM/DD/YYYY').format('dddd')

  return (
    <View style={events.container}>
      <View style={events.dayColor}>

      </View>
      <View style={events.date}>
        <Text style={events.text1}>{formattedDateName.slice(0,3)}</Text>
        <Text style={events.text1}>{formattedDate} </Text>
      </View>
      <View style={events.details}>
        <Text style={events.text4}>{` ${formattedName.slice(0,3)} ${start_time} to ${end_time}`}</Text>
        <Text style={events.text3}>
          {title}
        </Text>
      </View>
      <View style={events.dots}>
        <TouchableOpacity
          style={{
            width: '100%',
            marginTop: 10,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: '90%',
          }}
          onPress={handleEventId}>
          <Entypo name="dots-three-vertical" size={25} color={'#000'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const EventComponent: React.FC<EventProps> = ({navigation,route}) => {
  const event_s = useAppSelector(state => state.event);
  const dispatch = useAppDispatch();

  const [AllEvents, setAllEvents] = useState<Array<Event>>([]);
  const [firebaseEvents, setFirebaseEvents] = useState<
    Array<FirebaseFirestoreTypes.DocumentData>
  >([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [displayUpdate, setdisplayUpdate] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const getSelected_Event = (id: string) => {
    dispatch(getSelectedEvent(id));
  };
  const handleEdit = () => {
    closeModal();
  };

  const handleDelete = () => {
    dispatch(getSelectedEvent(event_s.eventId));
    closeModal();
  };

  const deleteEvent = (collectionName: string, documentId: string) => {
    if (documentId == '') {
      Alert.alert('document must be a string');
      return;
    }

    try {
      firestore()
        .collection(collectionName)
        .doc(documentId)
        .delete()
        .then(() => {
          closeModal();
          Alert.alert('document deleted successfully');
          
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      const events = await firestore().collection('Events').get();
      const eventsArray: FirebaseFirestoreTypes.DocumentData[] = [];

      for (const event of events.docs) {
        const data = event.data();
        const eventData = {...data, id: event.id};
        eventsArray.unshift(eventData);
        console.log('events' + data);
      }
      setFirebaseEvents(eventsArray);
      const convertedEventAray: Event[] = eventsArray.map(
        (event: FirebaseFirestoreTypes.DocumentData) => {
          return {
            id: event.id ?? '',
            title: event.title ?? '',
            desc: event.desc ?? '',
            start_date: event.start_date ?? ' ',
            end_date: event.end_date ?? ' ',
            start_time: event.start_time ?? ' ',
            end_time: event.end_time ?? '',
            participants: event.participants ?? '',
          };
        },
      );
      setAllEvents(convertedEventAray);
      dispatch(getAllEvent(convertedEventAray));

    };
    getEvents();
  }, [modalVisible, event_s.reloadEdit]);

  const displayEvents = event_s.events.map(event => (
    <Events
      id={event.id}
      agenda={event.desc}
      start_date={event.start_date}
      end_date={event.end_date}
      start_time={event.start_time}
      end_time={event.end_time}
      title={event.title}
      openModal={openModal}
      getSelected_Event={getSelected_Event}
    />
  ));
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: 240,
    height: 300,
    paddingTop: 10,
  };
  return (
    <>
     <PaperProvider>
     <View style={events.main}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '95%',
            height: 'auto',
            marginBottom: 10,
            marginTop: 0,
          }}>
          <Text style={events.text2}>Your Schedule </Text>
          <Text style={events.text1}>Today is Friday,August 11 2023</Text>
        </View>
        <ScrollView>
          <View style={{height: '100%'}}>
            <ScrollView style={events.scrollView}>{displayEvents}</ScrollView>
          </View>
          {/* <View>{modalVisible && <ProductModal />}</View> */}
          {
            <View style={{width: '100%', height: '100%', display:'flex', justifyContent:'flex-end', alignItems:'flex-end', backgroundColor:'gray'}}>
            <Portal>
            <Modal
              visible={modalVisible}
              onDismiss={closeModal} 
              style={{width: '50%', height: '100%'}}
              contentContainerStyle={styles.modalCont}>
              <ManageEvent route={route} deleteEvent={deleteEvent} closeModal={closeModal } navigation={navigation}  />
            </Modal>
        </Portal>
          </View>
      }
        </ScrollView>
      </View>
     </PaperProvider>
    </>
  );
};
export const styles3 = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: 200,
    maxHeight: 300,
  },
});

const styles = {
  modalContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCont: {
    padding: 20,
    width: 360,
    height: 300,
    maginLeft:10,
    // paddingTop: 10,
    // alignSelf: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: 200,
    marginBottom: 5,
    marginRight: 10,
  },
  modalContent1: {
    backgroundColor: 'white',
    padding: 30,
    width: 200,
  },
};
