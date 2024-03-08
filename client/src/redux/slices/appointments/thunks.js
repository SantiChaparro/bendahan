import { setAppointments } from "./appointmentSlice";
import { setCustomers } from "../customers/customerSlice";
import { createNewClient , createNewClientFail , emptyMessages } from "../customers/newClientSlice";
import { setServices , updatedService } from '../services/servicesSlice';
import { createNewService , createNewServiceFail , emptyServiceMessages } from "../services/newServiceSlice";
import { setProfessionals , modifyProfessional } from "../professionals/professionalsSlice";
import { createNewProfessional , createNewProfessionalFail , emptyErrorMessages} from '../professionals/newProfessionalSlice';
import axios from 'axios';



export const getAppointments = () => {

    return async(dispatch,getState) => {

        const resp = await axios.get('http://localhost:3001/appointment');
        console.log(resp);

        dispatch(setAppointments({appointments: resp.data}));
    };

};

export const getCustomers = () => {

    return async(dispatch,getstate) => {

        const resp = await axios.get('http://localhost:3001/client');
        //console.log(resp)

        dispatch(setCustomers({customers: resp.data}));
    }

};


export const updateCustomer = (clientData, dni) => {
    return async (dispatch, getState) => {
        try {
            const resp = await axios.patch(`http://localhost:3001/client/${dni}`, clientData);
            // Despacha una acción para actualizar los clientes en el estado global de Redux
            dispatch(updateCustomerSuccess(resp.data));
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };
};

// Acción para actualizar los clientes en el estado global de Redux
export const updateCustomerSuccess = (updatedCustomerData) => ({
    type: 'customer/updateCustomerSuccess',
    payload: updatedCustomerData
});


export const postNewClient = (dni,name,DateOfBirth,phone,mail) => {
   
    return async (dispatch) => {

        try {

            const resp = await axios.post('http://localhost:3001/client',{dni,name,DateOfBirth,phone,mail});
            dispatch(createNewClient({newClient: resp.data}));
            console.log(resp)

        } catch (error) {
            dispatch(createNewClientFail({errorMessage: error.response.data.error}));
        }
        
        //console.log(resp)
       
       
    }
};

export const cleanMessages = () => {

    return (dispatch) => {
        dispatch(emptyMessages({errorMessage: null}))
    }

};


export const getServices = () => {

    return async(dispatch) => {
        
        const resp = await axios.get('http://localhost:3001/service');
        dispatch(setServices({services: resp.data}))
        return resp.data

    }

};

export const updateService = (serviceData,id) => {

    return async(dispatch) => {

        const resp = await axios.patch(`http://localhost:3001/service/${id}`,serviceData);
        console.log((resp.data));
        dispatch(updatedService({updatedService: resp.data}))
        return resp.data
    }
};

export const postNewService = (service_name,cost) => {

    return async(dispatch) => {

       try {

            const resp = await axios.post('http://localhost:3001/service',{service_name,cost});
            dispatch(createNewService({NewService: resp.data}))
            console.log(resp);
            
       } catch (error) {
            dispatch(createNewServiceFail({errorMessage: error.response.data.error}))
       }    

    }

}

export const cleanNewService = () => {

    return async(dispatch) => {
        dispatch(emptyServiceMessages())
    }

};

export const getProfessionals = () => {

   return async(dispatch) => {

    const resp = await axios.get('http://localhost:3001/professional');
    dispatch(setProfessionals({professionals: resp.data}));
    console.log(resp.data)

   }


};

export const updateProfessional = (updateData,dni) => {

    return async(dispatch) => {

        const resp = await axios.patch(`http://localhost:3001/professional/${dni}`,updateData);
        dispatch(modifyProfessional(updateData));
        console.log(resp.data);
        return resp.data;

    }

};

export const postNewProfessional = (dni,name,phone,mail,services) => {

    return async(dispatch) => {

        try {

            const resp = await axios.post('http://localhost:3001/professional',{dni,name,phone,mail,services});
            dispatch(createNewProfessional({newProfessional: resp.data}));
            console.log(resp.data)

        } catch (error) {

            dispatch(createNewProfessionalFail({errorMessage: error.response.data.error}));
            
        }

    
    }


};

export const emptyFormMessages = () => {

    return async(dispatch) => {

        dispatch(emptyErrorMessages({errorMessage: ''}))

    }

};


