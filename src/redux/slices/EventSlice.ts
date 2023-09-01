import { createSlice,  } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../Models/userType";
import { Alert } from "react-native";
import { events } from "../../Screens/Event/Events";

interface EventTypes {
    events:Array<Event>,
    SelectedEvent:Event,
    eventId:string,
    reloadEdit:boolean
}

const initialState:EventTypes ={
   events:[],
   SelectedEvent:{
       id: '',
       title: "",
       desc: "",
       start_date:'',
       end_date: '',
       start_time: '',
       end_time: ''
   },
   eventId:'',
   reloadEdit:false
}


const EventSlice = createSlice({
    name:'event',
    initialState,
    reducers:{
       addEvent:(state, action:PayloadAction<Event>) =>{
        state.events.push(action.payload)
    },
    getAllEvent:(state, action:PayloadAction<Event[]>) =>{
            const fetchedEvents = action.payload
            state.events = fetchedEvents
    },
    getEventId(state, action){
        state.eventId = action.payload
    },
    getSelectedEvent(state, action){
        const id= action.payload
        const selected_event = state.events.find(event => event.id === id)
        if(selected_event){
            state.SelectedEvent = selected_event
        }else{
            console.log(`No such event found`);
            
        }
    },
    editEvent(state,action:PayloadAction<Event>){
        const event_s = action.payload
        let selected_event = state.events.find(event => event.id ==event_s.id )
        if(selected_event){
            selected_event = {...event_s}
            state.reloadEdit = true
        }

    }

    }
})

export const { addEvent, getAllEvent, getEventId, getSelectedEvent } = EventSlice.actions
export default EventSlice.reducer