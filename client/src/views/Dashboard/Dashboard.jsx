import React from 'react';
import Box from '@mui/material/Box';
import DashboardNavBar from '../../components/dashboardNavBar/dashboardNavBar';
import Customers from '../Customers/Customers';
import NewCustomerForm from '../NewCustomerForm/NewCustomerForm';

const Dashboard = ({ drawerWidth, appHeight }) => {

    
    return (
      <>
        <DashboardNavBar />
        
        <NewCustomerForm/>
      </>
      
      
    );
  }; 

export default Dashboard;

//<Customers/>