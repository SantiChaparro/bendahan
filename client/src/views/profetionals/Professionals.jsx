import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Card, Grid, CardContent, Typography, Button, TextField, Snackbar, SnackbarContent, Alert} from "@mui/material";
import { getProfessionals , updateProfessional } from '../../redux/slices/appointments/thunks';

const Professionals = () => {
    const { professionals: professionalData } = useSelector((state) => state.professionals);
    //const {professional: editprofessional} = useSelector((state)=>state.professionals);
    const [successMessage , setSuccessMessage] = useState('');
    const [openSnackBar , setOpenSnackBar ] = useState(false)
    const [editingProfessional, setEditingProfessional] = useState(null);
    const [severity , setSeverity] = useState('success');
    const dispatch = useDispatch();
    const [professionalDataToUpdate, setProfessionalDataToUpdate] = useState({
        dni:'',
        name: "",
        phone: "",
        mail: ""
    });
<<<<<<< HEAD
    // console.log(professionalData)
    // console.log(successMessage);
=======
    console.log(professionalData)
    console.log(successMessage);
>>>>>>> 6f5f2b1c176f01715817ac9f0e53e27856384239
    useEffect(() => {
        dispatch(getProfessionals());
    }, [dispatch]);

    const handleEdit = (professional) => {
        setEditingProfessional(professional);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setProfessionalDataToUpdate(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async(professionalDataToUpdate, dni) => {
        const updateData = Object.keys(professionalDataToUpdate).reduce((acc, key) => {
            if (professionalDataToUpdate[key] !== "") {
                acc[key] = professionalDataToUpdate[key];
            }
            return acc;
        }, {});

        if (Object.keys(updateData).length > 0) {
           const resp = await dispatch(updateProfessional(updateData,dni));
           if(resp.successMessage){
            setSeverity('success')
            setSuccessMessage(resp.successMessage);
            setOpenSnackBar(true);
           }else{
            setSeverity('error');
            setSuccessMessage('Error al modificar');
            setOpenSnackBar(true)
           }
        }
        await dispatch(getProfessionals());
        setEditingProfessional(null);
    };

    const handleCancel = () => {
        setEditingProfessional(null);
    };

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false); 
    };

    return (
        <Container maxWidth="xl" style={{ height: '100vh', overflow: 'hidden', marginTop: '30px' }}>
            <Box sx={{ width: '100%', overflowY: 'scroll', height: 'calc(100vh - 30px)', marginTop:'150px' }}>
                {professionalData.length > 0 ? (
                    <Grid container spacing={2}>
                        {professionalData.map((professional, index) => (
                            <Grid item xs={12} key={index}>
                                <Card variant="outlined">
                                    <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '20px',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {editingProfessional === professional ? (
                                            <>
                                                <TextField
                                                    label="Nombre"
                                                    defaultValue={professional.name}
                                                    name="name"
                                                    onChange={handleFieldChange}
                                                />
                                                <TextField
                                                    label="DNI"
                                                    defaultValue={professional.dni}
                                                    disabled
                                                />
                                               
                                                <TextField
                                                    label="Teléfono"
                                                    defaultValue={professional.phone}
                                                    name="phone"
                                                    onChange={handleFieldChange}
                                                />
                                                <TextField
                                                    label="Correo electrónico"
                                                    defaultValue={professional.mail}
                                                    name="mail"
                                                    onChange={handleFieldChange}
                                                />
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleSave(professionalDataToUpdate, professional.dni)}
                                                    sx={{
                                                        backgroundColor: '#b4cbb7',
                                                        color: '#ffffff',
                                                        padding: '10px 20px',
                                                        '&:hover': {
                                                            backgroundColor: '#5a5a5b',
                                                        },
                                                    }}
                                                >
                                                    Guardar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleCancel}
                                                    sx={{
                                                        backgroundColor: '#b4cbb7',
                                                        color: '#ffffff',
                                                        padding: '10px 20px',
                                                        '&:hover': {
                                                            backgroundColor: '#5a5a5b',
                                                        },
                                                    }}
                                                >
                                                    Cancelar
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Typography variant="h5" component="div" sx={{ fontSize: '1rem' }}>
                                                    {professional.name}
                                                </Typography>
                                                <Typography color="text.secondary" component='div' sx={{ fontSize: '1rem' }}>
                                                    DNI: {professional.dni}
                                                </Typography>
                                                {/* Agrega más detalles del profesional aquí según tu estructura de datos */}
                                                <Button onClick={() => handleEdit(professional)}>Editar</Button>
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
                        {successMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Professionals;

