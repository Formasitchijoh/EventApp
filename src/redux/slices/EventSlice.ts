import { createSlice,  } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../Models/userType";
import { Alert } from "react-native";

interface EventTypes {
    events:Array<Event>
}

const initialState:EventTypes ={
   events:[]
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
            state.events = state.events.concat(fetchedEvents)
    },

    }
})

export const { addEvent, getAllEvent } = EventSlice.actions
export default EventSlice.reducer