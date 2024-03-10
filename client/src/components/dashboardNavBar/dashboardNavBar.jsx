import * as React from 'react';
import { Container, AppBar, Toolbar, Typography, Menu, MenuItem, styled } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const StyledMenuItem = styled(MenuItem)({
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#d3d3d3',
  },
  zIndex: 1000
});

const MenuContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px', // Espacio entre elementos
  zIndex: 1000
});

const CenteredToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'center',
  marginLeft: '240px', // Ajusta el margen izquierdo aquí
  marginTop: '50px',
  zIndex: 1000
});

const DashboardNavBar = ({onOpcionSeleccionada}) => {

  return (
      <AppBar position="fixed" color="primary">
        <CenteredToolbar>
          <MenuContainer>
            <PopupState variant="popover" popupId="clientes-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <div onClick={() => onOpcionSeleccionada('clientes')}>
                    <Typography variant="h6" color="inherit" noWrap {...bindTrigger(popupState)} >
                      Clientes
                    </Typography>
                  </div>
                  
                  <Menu {...bindMenu(popupState)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <StyledMenuItem 
                    onClick={()=>{
                      onOpcionSeleccionada('agregar_cliente');
                      popupState.close();
                    }}>
                      Agregar Cliente
                    </StyledMenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
    
            <PopupState variant="popover" popupId="servicios-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <div onClick={() => onOpcionSeleccionada('servicios')}>
                    <Typography variant="h6" color="inherit" noWrap {...bindTrigger(popupState)}>
                      Servicios
                    </Typography>
                  </div>
                  
                  <Menu {...bindMenu(popupState)}>
                    <StyledMenuItem onClick={()=>{
                      onOpcionSeleccionada('agregar_servicio');
                      popupState.close();
                    }}>Agregar Servicio</StyledMenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
    
            <PopupState variant="popover" popupId="profesionales-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <div onClick={() => onOpcionSeleccionada('profesionales')}>
                    <Typography variant="h6" color="inherit" noWrap {...bindTrigger(popupState)}>
                      Profesionales
                    </Typography>
                  </div>
                 
                  <Menu {...bindMenu(popupState)}>
                    <StyledMenuItem onClick={()=>{
                      onOpcionSeleccionada('agregar_profesional');
                      popupState.close();
                    }}>Agregar Profesional</StyledMenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </MenuContainer>
        </CenteredToolbar>
      </AppBar>
    );
};


export default DashboardNavBar;

// return (
//   <AppBar position="fixed" color="primary">
//     <CenteredToolbar>
//       <MenuContainer>
//         <PopupState variant="popover" popupId="clientes-popup-menu">
//           {(popupState) => (
//             <React.Fragment>
//               <Typography variant="h6" color="inherit" noWrap {...bindTrigger(popupState)} onClick={() => onOpcionSeleccionada('clientes')}>
//                 Clientes
//               </Typography>
//               <Menu {...bindMenu(popupState)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <StyledMenuItem 
//                 onClick={()=>{
//                   onOpcionSeleccionada('agregar_cliente');
//                   popupState.close();
//                 }}>
//                   Agregar Cliente
//                 </StyledMenuItem>
//               </Menu>
//             </React.Fragment>
//           )}
//         </PopupState>

//         <PopupState variant="popover" popupId="servicios-popup-menu">
//           {(popupState) => (
//             <React.Fragment>
//               <Typography variant="h6" color="inherit" noWrap {...bindTrigger(popupState)} onClick={() => onOpcionSeleccionada('servicios')}>
//                 Servicios
//               </Typography>
//               <Menu {...bindMenu(popupState)}>
//                 <StyledMenuItem onClick={()=>{
//                   onOpcionSeleccionada('agregar_servicio');
//                   popupState.close();
//                 }}>Agregar Servicio</StyledMenuItem>
//               </Menu>
//             </React.Fragment>
//           )}
//         </PopupState>

//         <PopupState variant="popover" popupId="profesionales-popup-menu">
//           {(popupState) => (
//             <React.Fragment>
//               <Typography variant="h6" color="inherit" noWrap {...bindTrigger(popupState)} onClick={() => onOpcionSeleccionada('profesionales')}>
//                 Profesionales
//               </Typography>
//               <Menu {...bindMenu(popupState)}>
//                 <StyledMenuItem onClick={()=>{
//                   onOpcionSeleccionada('agregar_profesional');
//                   popupState.close();
//                 }}>Agregar Profesional</StyledMenuItem>
//               </Menu>
//             </React.Fragment>
//           )}
//         </PopupState>
//       </MenuContainer>
//     </CenteredToolbar>
//   </AppBar>
// );

