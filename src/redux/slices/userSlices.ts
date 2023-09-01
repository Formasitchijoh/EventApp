import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../Models/userType';
import {PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
export interface UsertState {
  users: User[];
  participants: User[];
  updateId?: string;
  editUser: User;
}

const initialState: UsertState = {
  users: [],
  participants: [],
  updateId: '',
  editUser: {
    Selected: false,
    id: 0,
    email: '',
    name: '',
    photoUrl: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<User[]>) {
      const newUser = action.payload;
      state.users = newUser;
      console.log(JSON.stringify(action.payload));
    },
    getSelectedUsers(state, action: PayloadAction<User>) {
      const {id, name, email, Selected, photoUrl} = action.payload;
      const SelectedUser = state.users.find(user => user.id === id);

      if (SelectedUser) {
        SelectedUser.Selected = !SelectedUser.Selected;
        const participantExists = state.participants.some(
          p => p.id === SelectedUser.id,
        );

        if (!participantExists) {
          state.participants.push(SelectedUser);
        } else {
          console.log('Participant already exists in the array.');
        }
        // SelectedUser.Selected = !SelectedUser.Selected
        // const participant = SelectedUser
        // state.participants.push(participant)
      } else {
        Alert.alert('No user found');
      }
    },
    deleteUser(state, action) {
      state.updateId = action.payload;
    },
    geteditUser(state, action) {
      const selected = state.users.find(user => user.id === action.payload);
      if (selected) {
        state.editUser = selected;
        Alert.alert('user found ');
      } else {
        Alert.alert('user not found in the store');
      }
    },
    editUser(state, action) {
      const selected = state.users.find(user => user.id === action.payload);
      if (selected) {
        const {email, name} = action.payload;
        selected.email = email;
        selected.name = name;
      }
    },
  },
});

export const {
  setUserData,
  getSelectedUsers,
  deleteUser,
  geteditUser,
  editUser,
} = userSlice.actions;

export default userSlice.reducer;
