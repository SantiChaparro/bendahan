import react, {useState} from 'react';

import React from 'react';
import Box from '@mui/material/Box';
import DashboardNavBar from '../../components/dashboardNavBar/dashboardNavBar';
import Customers from '../Customers/Customers';
import NewCustomerForm from '../NewCustomerForm/NewCustomerForm';
import Services from '../Services/Services';
import NewServiceForm from '../NewService/NewServiceForm';
import Professionals from '../profetionals/Professionals';
import NewProfessionalForm from '../NewProfessionalForm/NewProfessionalForm';


const Dashboard = ({ drawerWidth, appHeight }) => {

   const [opcionSeleccionada, setOpcionSeleccionada] = useState('clientes');  

   const handleOpcionSeleccionada = (opcion) => {
    console.log(opcion)
    setOpcionSeleccionada(opcion);
  };

  const renderizarVista = () => {
    switch (opcionSeleccionada) {
      case 'clientes':
        return <Customers/>;
      case 'servicios':
        return <Services />;
      case 'profesionales':
        return <Professionals />;
      case 'agregar_cliente':
        return <NewCustomerForm/>;
      case 'agregar_servicio':
        return <NewServiceForm/>;
      case 'agregar_profesional':
        return <NewProfessionalForm/>;     
      default:
        return <Customers />;
    }
  };

    return (
      <>
        <DashboardNavBar  onOpcionSeleccionada={handleOpcionSeleccionada}  />

        {renderizarVista()}

        
        
      </>
      
      
    );
  }; 

export default Dashboard;

//<Customers/>
//<NewCustomerForm/>
//<NewServiceForm/>
//<Services/>
//<Professionals/>
//
//<NewProfessionalForm/>