import {createSlice} from '@reduxjs/toolkit';
import { User } from '../../Models/userType';
import { PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
export interface UsertState {
  users: User[],
  participants:User[],
  updateId?:string,
  editUser:any
}

const initialState:UsertState = {
  users:[],
  participants:[],
  updateId:'',
  editUser:{}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<User[]>) {
      const newUser = action.payload;
      state.users = newUser
      console.log(JSON.stringify(action.payload));
      
    },
    getSelectedUsers(state, action:PayloadAction<User>){
      const { id, name, email, Selected,photoUrl } = action.payload
      const SelectedUser = state.users.find(user => user.id === id)

      if(SelectedUser){
        SelectedUser.Selected = !SelectedUser.Selected
        const participant = SelectedUser
        state.participants.push(participant)    
      }else{
        Alert.alert('No user found')
      }
    },
    deleteUser(state, action){
        state.updateId = action.payload
    },
    editUser(state,action){
      const selected = state.users.find((user) => user.id === action.payload)
      if(selected){
        state.editUser = selected
      }else{
        console.log('user not found in the store');
      }
          
    }
    
  },
});

export const {setUserData, getSelectedUsers,deleteUser, editUser} = userSlice.actions;

export default userSlice.reducer;
