import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServices, updateService } from "../../redux/slices/appointments/thunks";
import { Box, Container, Card, Grid, CardContent, Typography, Button, TextField,Snackbar,Alert } from "@mui/material";

const Services = () => {
    const  services  = useSelector((state) => state.services.services);
    const dispatch = useDispatch();
    const [openSnackBar , setOpenSanckBar] = useState(false);
    const [alertMessage , setAlertMessage] = useState('');
    const [severity , setSeverity] = useState('success');

    useEffect(() => {
        dispatch(getServices());
    }, [dispatch]);
    //console.log(services)
    const [allServices , setAllServices] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [serviceDataToUpdate, setServiceDataToUpdate] = useState({
        service_name: "",
        cost: ""
    });
 

    useEffect(()=>{

        setAllServices(services);
        console.log(services)
        console.log(allServices);

    },[services])

    const handleEdit = (service) => {
        setEditingService(service);
        setServiceDataToUpdate({
            service_name: service.service_name,
            cost: service.cost
        });
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setServiceDataToUpdate(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async(serviceDataToUpdate,id) => {
        
        const serviceData = Object.keys(serviceDataToUpdate).reduce((acc, key) => {
            if (serviceDataToUpdate[key] !== "") {
                acc[key] = serviceDataToUpdate[key];
            }
            return acc;
        }, {});
    
        if (Object.keys(serviceData).length > 0) {
            console.log(serviceData)

            const resp = await dispatch(updateService(serviceData,id));
            console.log(resp.data)
            
            if(resp.data.succesMessage){
                console.log(resp)
                setAlertMessage(resp.data.succesMessage);
                setSeverity('success');
                setOpenSanckBar(true);
            }else if(resp.error){
                setOpenSanckBar(true);
                setAlertMessage('');
                setSeverity('error');

            }
           
        }
        await dispatch(getServices())
        setEditingService(null);

    };

    const handleCancel = () => {
        setEditingService(null);
    };

    const handleCloseSnackBar = () => {

        setOpenSanckBar(false);
        //setAlertMessage('');
        //setSeverity('success')

    }

    return (
        <Container maxWidth="xl" style={{ height: '100vh', overflow: 'hidden', marginTop: '200px' }}>
            <Box sx={{ maxHeight: '100%', overflowY: 'auto' ,height: '100%', width: '100%' }}>
                {allServices.length > 0 ? (
                    <Grid container spacing={2}>
                        {allServices.map((service) => (
                            <Grid item xs={12} key={service.id}>
                                <Card variant="outlined">
                                    <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '20px',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {editingService === service ? (
                                            <>
                                                <TextField 
                                                    label="Servicio"
                                                    value={serviceDataToUpdate.service_name}
                                                    name="service_name"
                                                    onChange={handleFieldChange}
                                                />
                                                <TextField
                                                    label="Costo"
                                                    value={serviceDataToUpdate.cost}
                                                    name="cost"
                                                    onChange={handleFieldChange}
                                                />
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleSave(serviceDataToUpdate,service.id)}
                                                >
                                                    Guardar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleCancel}
                                                >
                                                    Cancelar
                                                </Button>
                                            </>
                                        ) : (
                                            <>  
                                                <Typography variant="h5" component="div" sx={{fontSize: '1rem'}}>
                                                    {service.service_name}
                                                </Typography>
                                                
                                                <Button onClick={() => handleEdit(service)}>Editar</Button>
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
            <Snackbar 
                open={openSnackBar} 
                autoHideDuration={2000} 
                onClose={handleCloseSnackBar}>
                <Alert variant="filled" severity={severity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Services;