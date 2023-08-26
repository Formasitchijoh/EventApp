import {configureStore} from '@reduxjs/toolkit';
import userSlices from './slices/userSlices';
import EventSlice from './slices/EventSlice';
export const store = configureStore({
  reducer: {
    user: userSlices,
    event:EventSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type Appdispatch = typeof store.dispatch