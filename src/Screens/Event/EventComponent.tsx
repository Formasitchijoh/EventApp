import {Button, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {RootStackParamList} from '../../Types/Types';
import {StackNavigationProp} from '@react-navigation/stack';
import {events} from './Events';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addEvent, getAllEvent } from '../../redux/slices/EventSlice';
import { firebase } from '@react-native-firebase/firestore';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Event } from '../../Models/userType';

type EventProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Events'>;
  };

  type Props = {
    month?: string,
    date?:  string,
    time?:string,
    agenda:string
  }
export const Events:React.FC<Props> = ({month, date, time, agenda}) => {
  return (
    <View style={events.container}>
      <View style={events.dayColor}></View>
      <View style={events.date}>
        <Text style={events.text1}>{month}</Text>
        <Text style={events.text1}> {date}</Text>
      </View>
      <View style={events.details}>
        <Text style={events.text4}>{time}</Text>
        <Text style={events.text3}>{agenda}</Text>
      </View>
      <View style={events.dots}>
        <View
          style={{
            width: '90%',
            height: '25%',
            borderRadius: 10,
            borderWidth: 0.5,
            backgroundColor: 'gray',
            opacity: 25,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              width: '10%',
              height: '10%',
              borderRadius: 3,
              borderWidth: 3,
              backgroundColor: 'white',
            }}>
            <Text>.</Text>
          </View>
          <View
            style={{
              width: '10%',
              height: '10%',
              borderRadius: 3,
              borderWidth: 3,
              backgroundColor: 'white',
            }}>
            <Text>.</Text>
          </View>
          <View
            style={{
              width: '10%',
              height: '10%',
              borderRadius: 3,
              borderWidth: 3,
              backgroundColor: 'white',
            }}>
            <Text>.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const EventComponent: React.FC<EventProps> = ({navigation}) => { 

    const event_s = useAppSelector(state => state.event)
    const dispatch = useAppDispatch() 
const [AllEvents, setAllEvents] = useState<Array<Event>>([])
const [firebaseEvents, setFirebaseEvents] = useState<Array<FirebaseFirestoreTypes.DocumentData>>([])

    useEffect(() =>{ 

    const getEvents = async() =>{
      const  events = await firestore().collection('Events').get();
      const eventsArray: FirebaseFirestoreTypes.DocumentData[] = [];

      for(const event of events.docs){
        const data = event.data()
        eventsArray.push(data);
        console.log('events' + data);
        
      }
        setFirebaseEvents(eventsArray)
      const convertedEventAray:Event[]= eventsArray.map((event:FirebaseFirestoreTypes.DocumentData) =>{
        return{
          id:event.id ?? '',
          title:event.title ?? '',
          desc:event.desc ?? '',
          start_date:event.start_date ?? ' ',
          end_date:event.end_date ?? ' ',
          start_time:event.start_time ?? ' ',
          end_time:event.end_time ?? '',
          participants:event.participants ?? ''

        }
      });
console.log('logint the firebase user that is about to be');
console.log(firebaseEvents);


      setAllEvents(convertedEventAray)
      dispatch(getAllEvent(convertedEventAray))
    }
       getEvents()
    }, [])

    const displayEvents = firebaseEvents.map((event) => (
        <Events  agenda={event.desc}/>

    )) 
  return (
   <>
    <View style={events.main}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '95%',
          height: 'auto',
          marginBottom: 10,
          marginTop:0,
        }}>
        <Text style={events.text2}>Your Schedule </Text>
        <Text style={events.text1}>Today is Friday,August 11 2023</Text>
      </View>
      <ScrollView >
        <View style={{ height:'100%'}}>
            {
               displayEvents
            }
        </View>
      </ScrollView>
    </View>
   </>
  );
};
