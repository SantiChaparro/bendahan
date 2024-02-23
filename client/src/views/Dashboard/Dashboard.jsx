import React from 'react';
import Box from '@mui/material/Box';
import DashboardNavBar from '../../components/dashboardNavBar/dashboardNavBar';

const Dashboard = ({ drawerWidth, appHeight }) => {

    
    return (
      <Box sx={{
        position: 'fixed',
        border: 'solid 2px red',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        marginLeft: `${drawerWidth}px`,
        marginTop: `${appHeight}px`,
        height: `calc(100vh - ${appHeight}px)`,
        width: `calc(100% - ${drawerWidth}px)`, 
      }}>
        <DashboardNavBar />
      </Box>
    );
  };

export default Dashboard;