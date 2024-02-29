import { setAppointments } from "./appointmentSlice";
import axios from 'axios';


export const getAppointments = () => {

    return async(dispatch,getState) => {

        const resp = await axios.get('http://localhost:3001/appointment');
        console.log(resp);

        dispatch(setAppointments({appointments: resp.data}));
    };

};