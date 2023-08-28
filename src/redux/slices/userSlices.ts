import {createSlice} from '@reduxjs/toolkit';
import { User } from '../../Models/userType';
import { PayloadAction } from '@reduxjs/toolkit';
export interface UsertState {
  users: User[]
}

const initialState:UsertState = {
  users:[],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData:(state, action) => {
      state.users.push(action.payload)
    }
  },
});

export const {setUserData} = userSlice.actions;

export default userSlice.reducer;
