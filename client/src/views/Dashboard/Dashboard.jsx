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

    
    return (
      <>
        <DashboardNavBar />

      <NewProfessionalForm/>
        
        
      </>
      
      
    );
  }; 

export default Dashboard;

//<Customers/>
//<NewCustomerForm/>
//<NewServiceForm/>
//<Services/>
//<Professionals/>