import React, {useState} from 'react';
import Form_Input from '../../component/Form_Input';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {RootStackParamList} from '../../Types/Types';
import {StackNavigationProp} from '@react-navigation/stack';
import {Form_TextArea} from '../../component/Form_Input';
import {DateInput, TitleInput} from '../../component/Form_Input';
import {Event} from '../../Models/userType';
import {v4 as uuid} from 'uuid';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {addEvent, getAllEvent} from '../../redux/slices/EventSlice';
import {CustomButton} from '../../component/SearchInput';
import moment from 'moment';

type AddEventProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddEvent'>;
};

export const AddEvent: React.FC<AddEventProps> = ({navigation}) => {
  const events = useAppSelector(state => state.event);
  const users = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const {SelectedEvent} = events;

  const [state, setState] = useState<Event>({
    id: '',
    title: '',
    desc: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    participants: [],
  });

  const [editState, setEditState] = useState({
    id: SelectedEvent.id ?? '',
    title: SelectedEvent.title ?? '',
    desc: SelectedEvent.desc ?? '',
    start_date: SelectedEvent.start_date ?? '',
    end_date: SelectedEvent.end_date ?? '',
    start_time: SelectedEvent.start_time ?? '',
    end_time: SelectedEvent.end_time ?? '',
    participants: SelectedEvent.participants,
  });

  const [date, setDate] = useState({
    start_date: new Date(),
    end_date: new Date(),
    start_time: new Date(),
    end_time: new Date(),
  });
  const [open, setOpen] = useState(false);

  const [isOpen, setIsOpen] = useState({
    start_date: false,
    end_date: false,
    start_time: false,
    end_time: false,
  });

  const handleInputchange = (value: string, name: string) => {
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputEditChange = (value: string, name: string) => {
    setEditState(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmit = () => {
    const newEvent = {
      ...state,
      participants: users.participants,
    };
    setState(
      {
        id: '',
        title: '',
        desc: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        participants: [],
      }
    )

    firestore()
      .collection('Events')
      .add({
        ...newEvent,
      })
      .then(() => {
        dispatch(addEvent(state));
        Alert.alert('data uploaded successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onEditEvent = () => {
    const id = events.SelectedEvent.id as unknown as string;
    const updatedParticipants = editState.participants?.concat(
      users.participants,
    );
    const updatedEvent = {...editState, participant: updatedParticipants};
    setEditState({
      id: '',
      title: '',
      desc: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      participants: [],
    })
    firestore()
      .collection('Events')
      .doc(id)
      .update(updatedEvent)
      .then(() => {
        Alert.alert('Event updated');
        navigation.navigate('Events');
      });
  };


  return (
   <>
   
   {
    events.SelectedEvent.title == '' ? ( 
      <View style={[styles.container]}>
      <Text style={[styles.text]}>Schedule a Task </Text>
      {/* <View style={[styles.container]}> */}
      <TextInput
        placeholder="Title"
        onChangeText={value => handleInputchange(value, 'title')}
        placeholderTextColor="#666"
        style={[stylesn.text]}></TextInput>
      {/* </View> */}

      <View style={[stylesn.container]}>
        <TextInput
          placeholder="Description"
          placeholderTextColor="#666"
          onChangeText={value => handleInputchange(value, 'desc')}
          style={[stylesn.text, stylesn.textarea]}
          multiline={true}></TextInput>
      </View>

      <View style={[stylesn.container]}>
        <View style={[stylesn.text, stylesn.imageView]}>
          <TextInput
            placeholder="start date"
            placeholderTextColor="#666"
            value={state.start_date}
            style={{width: '90%'}}></TextInput>
          <View
            style={{
              width: '7%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => setIsOpen({...isOpen, start_date: true})}
              style={{
                height: '50%',
                width: '100%',
                shadowColor: '#000',
              }}>
              <Image
                source={require('../../resources/calendar-month.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  tintColor: '#000',
                  shadowColor: '#000',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DatePicker
        modal
        androidVariant="nativeAndroid"
        mode="date"
        open={isOpen.start_date}
        date={date.start_date}
        onConfirm={date => {
          setIsOpen({...isOpen, start_date: false});
          setState({...state, start_date: moment(date).format('L')});
          setDate(prev => ({
            ...prev,
            start_date: date,
          }));
        }}
        onCancel={() => {
          setIsOpen({...isOpen, start_date: false});
        }}
      />
      <View style={[stylesn.container]}>
        <View style={[stylesn.text, stylesn.imageView]}>
          <TextInput
            placeholder="end date"
            placeholderTextColor="#666"
            value={state.end_date}
            style={{width: '90%'}}></TextInput>
          <View
            style={{
              width: '7%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => setIsOpen({...isOpen, end_date: true})}
              style={{
                height: '50%',
                width: '100%',
                shadowColor: '#000',
              }}>
              <Image
                source={require('../../resources/calendar-month.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  tintColor: '#000',
                  shadowColor: '#000',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DatePicker
        modal
        androidVariant="nativeAndroid"
        mode="date"
        open={isOpen.end_date}
        date={date.end_date}
        onConfirm={date => {
          setIsOpen({...isOpen, end_date: false});
          setState({...state, end_date: moment(date).format('L')});
          setDate(prev => ({
            ...prev,
            end_date: date,
          }));
        }}
        onCancel={() => {
          setIsOpen({...isOpen, end_date: false});
        }}
      />

      <View style={[stylesn.dateView]}>
        <View style={[stylesn.text, stylesn.date, stylesn.imageView]}>
          <TextInput
            placeholder="start time"
            placeholderTextColor="#666"
            value={state.start_time}
            style={{width: '85%'}}></TextInput>
          <View
            style={{
              width: '12%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => setIsOpen({...isOpen, start_time: true})}
              style={{
                height: '50%',
                width: '100%',
                shadowColor: '#000',
              }}>
              <Image
                source={require('../../resources/timer.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  tintColor: '#000',
                  shadowColor: '#000',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DatePicker
          modal
          androidVariant="nativeAndroid"
          mode="time"
          open={isOpen.start_time}
          date={date.start_time}
          onConfirm={date => {
            setIsOpen({...isOpen, start_time: false});
            setState({...state, start_time: moment(date).format('LT')});
            setDate(prev => ({
              ...prev,
              start_time: date,
            }));
          }}
          onCancel={() => {
            setIsOpen({...isOpen, start_time: false});
          }}
        />

        <View style={[stylesn.text, stylesn.date, stylesn.imageView]}>
          <TextInput
            placeholder="end time"
            placeholderTextColor="#666"
            value={state.end_time}
            style={{width: '85%'}}></TextInput>
          <View
            style={{
              width: '12%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => setIsOpen({...isOpen, end_time: true})}
              style={{
                height: '50%',
                width: '100%',
                shadowColor: '#000',
              }}>
              <Image
                source={require('../../resources/timer.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  tintColor: '#000',
                  shadowColor: '#000',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DatePicker
          modal
          androidVariant="nativeAndroid"
          mode="time"
          open={isOpen.end_time}
          date={date.end_time}
          onConfirm={date => {
            setIsOpen({...isOpen, end_time: false});
            setState({...state, end_time: moment(date).format('LT')});
            setDate(prev => ({
              ...prev,
              end_time: date,
            }));
          }}
          onCancel={() => {
            setIsOpen({...isOpen, end_time: false});
          }}
        />
      </View>
      <TouchableOpacity
        style={[styles.button2]}
        onPress={() => navigation.navigate('Participants',{action:''})}>
        {users.participants ? (
          users.participants.map((avatar: any, index: number) => (
            <View
              key={index}
              style={{
                position: 'absolute',
                left: index * 30,
                top: '10%',
                zIndex: 5,
                marginBottom: 20,
              }}>
              <Image
                source={{uri: avatar.photoUrl}}
                style={styles.image_returned}
              />
            </View>
          ))
        ) : (
          <Text>Add Participants</Text>
        )}
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button1]} onPress={onSubmit}>
        <Text style={[styles.textbtn]}>submit</Text>
      </TouchableOpacity>
    </View>

    ):(
      <View style={[styles.container]}>
      <Text style={[styles.text]}>Edit task { editState.title} </Text>
      {/* <View style={[styles.container]}> */}
      <TextInput
        placeholder="Title"
        onChangeText={value => handleInputEditChange(value, 'title')}
        placeholderTextColor="#666"
        value={editState.title}
        style={[stylesn.text]}></TextInput>
      {/* </View> */}

      <View style={[stylesn.container]}>
        <TextInput
          placeholder="Description"
          placeholderTextColor="#666"
          value={editState.desc}
          onChangeText={value => handleInputEditChange(value, 'desc')}
          style={[stylesn.text, stylesn.textarea]}
          multiline={true}></TextInput>
      </View>

      <View style={[stylesn.container]}>
        <View style={[stylesn.text, stylesn.imageView]}>
          <TextInput
            placeholder="start date"
            placeholderTextColor="#666"
            value={editState.start_date}
            style={{width: '90%'}}></TextInput>
          <View
            style={{
              width: '7%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => setIsOpen({...isOpen, start_date: true})}
              style={{
                height: '50%',
                width: '100%',
                shadowColor: '#000',
              }}>
              <Image
                source={require('../../resources/calendar-month.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  tintColor: '#000',
                  shadowColor: '#000',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DatePicker
        modal
        androidVariant="nativeAndroid"
        mode="date"
        open={isOpen.start_date}
        date={date.start_date}
        onConfirm={date => {
          setIsOpen({...isOpen, start_date: false});
          setEditState({...editState, start_date: moment(date).format('L')});
          setDate(prev => ({
            ...prev,
            start_date: date,
          }));
        }}
        onCancel={() => {
          setIsOpen({...isOpen, start_date: false});
        }}
      />
      <View style={[stylesn.container]}>
        <View style={[stylesn.text, stylesn.imageView]}>
          <TextInput
            placeholder="end date"
            placeholderTextColor="#666"
            value={editState.end_date}
            style={{width: '90%'}}></TextInput>
          <View
            style={{
              width: '7%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => setIsOpen({...isOpen, end_date: true})}
              style={{
                height: '50%',
                width: '100%',
                shadowColor: '#000',
              }}>
              <Image
                source={require('../../resources/calendar-month.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  tintColor: '#000',
                  shadowColor: '#000',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DatePicker
        modal
        androidVariant="nativeAndroid"
        mode="date"
        open={isOpen.end_date}
        date={date.end_date}
        onConfirm={date => {
          setIsOpen({...isOpen, end_date: false});
          setEditState({...editState, end_date: moment(date).format('L')});
          setDate(prev => ({
            ...prev,
            end_date: date,
          }));
        }}
        onCancel={() => {
          setIsOpen({...isOpen, end_date: false});
        }}
      />

      <View style={[stylesn.dateView]}>
        <View style={[stylesn.text, stylesn.date, stylesn.imageView]}>
          <TextInput
            placeholder="start time"
            placeholderTextColor="#666"
            value={editState.start_time}
            style={{width: '85%'}}></TextInput>
          <View
            style={{
              width: '12%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => setIsOpen({...isOpen, start_time: true})}
              style={{
                height: '50%',
                width: '100%',
                shadowColor: '#000',
              }}>
              <Image
                source={require('../../resources/timer.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  tintColor: '#000',
                  shadowColor: '#000',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DatePicker
          modal
          androidVariant="nativeAndroid"
          mode="time"
          open={isOpen.start_time}
          date={date.start_time}
          onConfirm={date => {
            setIsOpen({...isOpen, start_time: false});
            setEditState({...editState, start_time: moment(date).format('LT')});
            setDate(prev => ({
              ...prev,
              start_time: date,
            }));
          }}
          onCancel={() => {
            setIsOpen({...isOpen, start_time: false});
          }}
        />

        <View style={[stylesn.text, stylesn.date, stylesn.imageView]}>
          <TextInput
            placeholder="end time"
            placeholderTextColor="#666"
            value={editState.end_time}
            style={{width: '85%'}}></TextInput>
          <View
            style={{
              width: '12%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => setIsOpen({...isOpen, end_time: true})}
              style={{
                height: '50%',
                width: '100%',
                shadowColor: '#000',
              }}>
              <Image
                source={require('../../resources/timer.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  tintColor: '#000',
                  shadowColor: '#000',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DatePicker
          modal
          androidVariant="nativeAndroid"
          mode="time"
          open={isOpen.end_time}
          date={date.end_time}
          onConfirm={date => {
            setIsOpen({...isOpen, end_time: false});
            setEditState({...editState, end_time: moment(date).format('LT')});
            setDate(prev => ({
              ...prev,
              end_time: date,
            }));
          }}
          onCancel={() => {
            setIsOpen({...isOpen, end_time: false});
          }}
        />
      </View>
      <TouchableOpacity
        style={[styles.button2]}
        onPress={() => navigation.navigate('Participants', {action:''})}>
        {editState.participants ? (
          editState.participants.map((avatar: any, index: number) => (
            <View
              key={index}
              style={{
                position: 'absolute',
                left: index * 30,
                top: '10%',
                zIndex: 5,
                marginBottom: 20,
              }}>
              <Image
                source={{uri: avatar.photoUrl}}
                style={styles.image_returned}
              />
            </View>
          ))
        ) : (
          <Text>Add Participants</Text>
        )}
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button1]} onPress={onEditEvent}>
        <Text style={[styles.textbtn]}>submit</Text>
      </TouchableOpacity>
    </View>

    )
   }
   </>
  );
};

export const stylesn = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 10,
  },
  textarea: {
    height: 80,
  },
  date: {
    width: '42%',
  },
  dateView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
});
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  image_returned: {
    width: 50,
    height: 50,
    borderRadius: 90,
  },
  text: {
    color: '#000',
    textShadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Inter',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '900',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8%',
  },
  textbtn: {
    textShadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '900',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  textbtn1: {
    textShadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Inter',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '900',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },
  button: {
    width: '30%',
    height: '8%',
    borderRadius: 10,
    backgroundColor: '#230D34',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: '10%',
  },
  button1: {
    width: '90%',
    height: '8%',
    borderRadius: 10,
    backgroundColor: '#230D34',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button2: {
    width: '90%',
    height: '8%',
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    color: '#000',
    paddingLeft: 30,
    // marginLeft: '60%',
  },
});
export default AddEvent;
