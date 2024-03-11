import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers } from "../../redux/slices/appointments/thunks";
import { Box, Container, Card, Grid, CardContent, Typography, Button, TextField } from "@mui/material";
import { updateCustomer } from "../../redux/slices/appointments/thunks";

const Customers = () => {
  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [clientDataToUpdate  , setClientDataToUpdate ] = useState(
    {
      name: "",
      DateOfBirth: "",
      phone: "",
      mail: ""

    });
    

    useEffect(() => {
      dispatch(getCustomers());
    }, [dispatch]);

    console.log(customers) //en este log no muestra actualizado al estado pero en redux dev tools veo que si esta actualizado

    
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
   
  };

  const handleFieldChange = (e) => {

    const { name, value } = e.target;
    setClientDataToUpdate(prevState => ({
      ...prevState,
      [name]: value
      
    }));

    console.log(clientDataToUpdate)
  };

  
  const handleSave = (clientDataToUpdate,dni) => {
      
    const clientData = Object.keys(clientDataToUpdate).reduce((acc, key) => {
      if (clientDataToUpdate[key] !== "") {
        acc[key] = clientDataToUpdate[key];
      }
      return acc;
    }, {});

  
      if (Object.keys(clientData).length > 0) {
        dispatch(updateCustomer(clientData, dni));
      }

    
    setEditingCustomer(null);
     
  };


  const handleCancel = () => {
    setEditingCustomer(null);
  };

  return (
    <Container maxWidth="xl" style={{ height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ maxHeight: '100%', overflowY: 'auto' ,height: '100%', width: '100%' }}>
        {customers.length > 0 ? (
          <Grid container spacing={2}>
            {customers.map((customer, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined" sx={{
                  transition: 'transform 0.5s ease', // Transición más lenta y suave
                  '&:hover': {
                    transform: 'scale(1.05)' // Aumenta ligeramente el tamaño cuando se pasa el mouse sobre la tarjeta
                  },
                  transform: editingCustomer === customer ? 'scale(1)' : 'scale(1)' // Escala la tarjeta cuando está en modo de edición
                }}>
                  <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {editingCustomer === customer ? (
                      <>
                        <TextField 
                            label="Nombre"
                            defaultValue={customer.name}
                            name="name"
                            onChange={handleFieldChange}
                            
                        />
                        <TextField
                            label="DNI"
                            defaultValue={customer.dni}
                            disabled
                           
                        />
                        <TextField
                            label="FECHA NACIMIENTO"
                            defaultValue={customer.DateOfBirth}
                            name="DateOfBirth"
                            onChange={handleFieldChange}
                           
                        />
                        <TextField
                            label="TELEFONO"
                            defaultValue={customer.phone}
                            name="phone"
                            onChange={handleFieldChange}
                           
                            // Maneja cambios en el teléfono
                        />
                        <TextField
                            label="MAIL"
                            defaultValue={customer.mail}
                            name="mail"
                            onChange={handleFieldChange}
                            
                            // Maneja cambios en el correo electrónico
                        />  
                       
                       <Button
                            variant="contained"
                            onClick={() => handleSave(clientDataToUpdate,customer.dni)}
                            sx={{
                                backgroundColor: '#b4cbb7', // Color de fondo del botón
                                color: '#ffffff', // Color del texto del botón
                                padding: '10px 20px', // Relleno del botón
                                '&:hover': {
                                backgroundColor: '#5a5a5b', // Cambio de color al pasar el mouse sobre el botón
                                },
                            }}
                            >
                            Guardar
                        </Button>
                        <Button
                                variant="contained"
                                onClick={handleCancel}
                                sx={{
                                    backgroundColor: '#b4cbb7', // Color de fondo del botón
                                    color: '#ffffff', // Color del texto del botón
                                    padding: '10px 20px', // Relleno del botón
                                    '&:hover': {
                                    backgroundColor: '#5a5a5b', // Cambio de color al pasar el mouse sobre el botón
                                    },
                                }}
                                >
                                Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Typography variant="h5" component="div" sx={{fontSize: '1rem'}}>
                          {customer.name}
                        </Typography>
                        <Typography color="text.secondary" component='div' sx={{fontSize: '1rem'}}>
                          DNI: {customer.dni}
                        </Typography>
                        {/* Agrega más detalles del cliente aquí según tu estructura de datos */}
                        <Button onClick={() => handleEdit(customer)}>Editar</Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>El array está vacío</p>
        )}
      </Box>
    </Container>
  );
};

export default Customers;