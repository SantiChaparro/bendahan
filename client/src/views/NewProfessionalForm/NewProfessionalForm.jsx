import react, {useState , useEffect} from 'react';
import { UseSelector ,  useDispatch, useSelector } from "react-redux";
import { FormControl, TextField, Button ,Snackbar, Select, MenuItem, InputLabel, Alert, Typography} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useFormik } from 'formik';
import { getServices , postNewProfessional , emptyFormMessages} from '../../redux/slices/appointments/thunks';

const initialValues = {
    name: '',
    dni: '',
    phone: '',
    mail: ''
}

const validate = (values) => {
    let errors = {};

    if(!values.name){
        errors.name = 'El campo es requerido';
    }else if(!/^[a-zA-Z\s\W]+$/.test(values.name)){
        errors.name = 'El campo solo admite letras';
    }

    if(!values.dni){
        errors.dni = 'El campo es requerido';
    }else if(!/^\d+$/.test(values.dni))

    if(!values.phone){
        errors.phone = 'El campo es requerido';
    }else if(!/^\d+$/.test(values.phone)){
        errors.phone = 'El campo solo admite numeros'
    }

    if(!values.mail){
        errors.mail = 'El campo es requerido';
    }else if(!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(values.mail)){
        errors.mail = 'Formato de correo incorrecto'
    }
}

const NewProfessionalForm = () => {
    const newProfessional = useSelector((state)=>state.newProfessional)
    const errorMessage = useSelector((state)=>state.newProfessional.errorMessage)
    const allServices = useSelector((state)=> state.services.services)
    const [services , setServices] = useState([]);
    const [openSnackbar , setOpenSnackBar] = useState(false);
    const [alertMessage , setAlertMessage] = useState('');
    const [severity , setSeverity] = useState('success');
    console.log((allServices));
    console.log((services));
    console.log(typeof services)
    console.log(errorMessage)

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getServices());

        
        if (newProfessional && newProfessional.newProfessional.successMessage) {
            
            setAlertMessage(newProfessional.newProfessional.successMessage);
            setSeverity('success')
            setOpenSnackBar(true);
        }else if(errorMessage){
            setAlertMessage(errorMessage);
            setSeverity('error');
            setOpenSnackBar(true);
        }
        return () => {
            setOpenSnackBar(false);
            setAlertMessage('');
           
            
        };
    }, [newProfessional, errorMessage]);


    
    const handleSnackbarClose = () => {
        setOpenSnackBar(false);
        setAlertMessage('');
        dispatch(emptyFormMessages())
        
    }

    

    const handleSubmit = (values, {resetForm}) => {

        dispatch(postNewProfessional(values.dni,values.name,values.phone,values.mail,services))

    };
    
    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validate
    });

    return(
        <Container>
            <Typography variant='h4' sx={{mb:5}}>Nuevo Profesional</Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <TextField
                label='Nombre'
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="outlined"
                sx={{ mb: 2 }} 
                />
                <TextField
                label='DNI'
                name='dni'
                onChange={formik.handleChange}
                value={formik.values.dni}
                variant='outlined'
                sx={{ mb: 2 }} 
                />
                <TextField
                label='Telefono'
                name='phone'
                onChange={formik.handleChange}
                value={formik.values.phone}
                variant='outlined'
                sx={{ mb: 2 }} 
                />
                <TextField
                label='Mail'
                name='mail'
                onChange={formik.handleChange}
                value={formik.values.mail}
                variant='outlined'
                sx={{ mb: 2 }} />
                <FormControl>
                <InputLabel id="select-label"></InputLabel>
                <Select
                labelId='select-label'
                multiple
                value={services}
                onChange={(event) => {
                    const { value } = event.target;
                    setServices(value);
                  }}
                sx={{ mb: 2 }} 
                >
                    {allServices.map((service)=>(
                        <MenuItem key={service.id} value={service.id}>
                            {service.service_name}
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
               
                <Button type="submit" variant="contained">SUBMIT</Button>
            </FormControl>
          </form>
          <Snackbar 
                open={openSnackbar} 
                autoHideDuration={2000} 
                onClose={handleSnackbarClose}>
                <Alert variant="filled" severity={severity}>
                        {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    )



};

export default NewProfessionalForm;