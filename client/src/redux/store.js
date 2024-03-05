import { configureStore } from '@reduxjs/toolkit';
import {appointmentSlice} from './slices/appointments/appointmentSlice';
import { customerSlice } from './slices/customers/customerSlice';
import { newClientSlice } from './slices/customers/newClientSlice';

export const store = configureStore({
  reducer: {
    appointment: appointmentSlice.reducer,
    customer: customerSlice.reducer,
    newClient: newClientSlice.reducer

  },
})