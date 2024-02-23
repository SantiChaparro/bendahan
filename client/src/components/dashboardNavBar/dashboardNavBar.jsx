import * as React from 'react';
import { AppBar, Toolbar, Typography, Menu, MenuItem, styled } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const StyledMenuItem = styled(MenuItem)({
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#d3d3d3',
  },
});

const MenuContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px', // Espacio entre elementos
});

const CenteredToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'center',
  marginLeft: '240px', // Ajusta el margen izquierdo aquí
  marginTop: '50px'
});

const DashboardNavBar = () => {
  return (
    <AppBar position="fixed" color="primary">
      <CenteredToolbar>
        <MenuContainer>
          <PopupState variant="popover" popupId="clientes-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Typography variant="h6" color="inherit" noWrap {...bindTrigger(popupState)}>
                  Clientes
                </Typography>
                <Menu {...bindMenu(popupState)}>
                  <StyledMenuItem onClick={popupState.close}>Agregar Cliente</StyledMenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

          <PopupState variant="popover" popupId="servicios-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Typography variant="h6" color="inherit" noWrap {...bindTrigger(popupState)}>
                  Servicios
                </Typography>
                <Menu {...bindMenu(popupState)}>
                  <StyledMenuItem onClick={popupState.close}>Agregar Servicio</StyledMenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

          <PopupState variant="popover" popupId="profesionales-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Typography variant="h6" color="inherit" noWrap {...bindTrigger(popupState)}>
                  Profesionales
                </Typography>
                <Menu {...bindMenu(popupState)}>
                  <StyledMenuItem onClick={popupState.close}>Agregar Profesional</StyledMenuItem>
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

