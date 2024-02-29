import { configureStore } from '@reduxjs/toolkit';
import {appointmentSlice} from './slices/appointments/appointmentSlice';

export const store = configureStore({
  reducer: {
    appointment: appointmentSlice.reducer
  },
})