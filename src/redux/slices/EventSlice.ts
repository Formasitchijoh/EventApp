import { createSlice,  } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../Models/userType";

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
        [...state.events,action.payload]
    }

    }
})

const { addEvent } = EventSlice.actions
export default EventSlice.reducer