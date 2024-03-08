import React from "react";
import { useSelector , useDispatch } from "react-redux";
import { useEffect , useState } from "react";
import { useFormik } from 'formik';
import { FormControl, TextField, Button ,Snackbar} from "@mui/material";
import styles from './NewCustomerForm.module.css'
import { Container } from "@mui/system";
import { postNewClient ,  cleanMessages} from "../../redux/slices/appointments/thunks";


const initialValues = {
    name: '',
    dni: '',
    DateOfBirth: '',
    phone: '',
    mail: ''
}


const validate = (values) => {
    let errors = {};

    if(!values.name){
        errors.name = 'Este campo es requerido';
    }else if(!/^[a-zA-Z\s]+$/.test(values.name)){
        errors.name = 'Este campo solo admite letras';
    }

    if (!values.dni) {
        errors.dni = 'Este campo es requerido';
    } else if (!/^\d{8}$/.test(values.dni)) {
        errors.dni = 'Este campo admite 8 dígitos numéricos';
    }

    if (!values.DateOfBirth) {
        errors.DateOfBirth = 'Este campo es requerido';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.DateOfBirth)) {
        errors.DateOfBirth = 'El formato de la fecha debe ser "AAAA-MM-DD"';
    }

    if (!values.phone) {
        errors.phone = 'Este campo es requerido';
    } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = 'Característica sin 0, celular sin 15';
    }

   if (!values.mail) {
    errors.email = 'Este campo es requerido';
} else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.mail)) {
    errors.mail = 'Formato de correo incorrecto';
}

    return errors
}

const NewCustomerForm = () => {

    const newClient = useSelector((state)=>state.newClient);
    const errorMessage = useSelector((state)=>state.newClient.errorMessage);
    const dispatch = useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success'); 
    

    useEffect(() => {
        if ((newClient && newClient.newClient.successMessage) || errorMessage) {
            setSnackbarType(errorMessage ? 'error' : 'success');
            setSnackbarMessage(errorMessage || newClient.newClient.successMessage);
            setOpenSnackbar(true);
        }
        return () => {
            setOpenSnackbar(false);
            setSnackbarMessage('');
            setSnackbarType('success');
            
        };
    }, [newClient, errorMessage]);

      

      const handleSnackbarClose = () => {
        setOpenSnackbar(false);
        setSnackbarMessage('');
        setSnackbarType('success');
        dispatch(cleanMessages())
        
    }
    
    const handleSubmit = (values, {resetForm}) => {
       
        dispatch(postNewClient(values.dni,values.name,values.DateOfBirth,values.phone,values.mail));
        resetForm();
       
        
    }

   

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validate
    });

    return(
        <Container maxWidth='xl' >
             <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
                <FormControl>
                    <TextField 
                    label='Nombre'
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    variant="outlined"
                    sx={{ mb: 2 }} 
                    />
                    {formik.errors.name ? (
                        <span className={styles.error}>{formik.errors.name}</span>
                    ):null}
                    <TextField 
                    label='DNI'
                    name="dni"
                    onChange={formik.handleChange}
                    value={formik.values.dni}
                    variant="outlined"
                    sx={{ mb: 2 }} 
                    />
                     {formik.errors.dni ? (
                        <span className={styles.error}>{formik.errors.dni}</span>
                    ):null}
                    <TextField 
                    label='Fecha Nacimiento'
                    name="DateOfBirth"
                    onChange={formik.handleChange}
                    value={formik.values.DateOfBirth}
                    variant="outlined"
                    sx={{ mb: 2 }} 
                    />
                     {formik.errors.DateOfBirth ? (
                        <span className={styles.error}>{formik.errors.DateOfBirth}</span>
                    ):null}
                    <TextField 
                    label='Telefono'
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    variant="outlined"
                    sx={{ mb: 2 }} 
                    />
                     {formik.errors.phone ? (
                        <span className={styles.error}>{formik.errors.phone}</span>
                    ):null}
                    <TextField 
                    label='mail'
                    name="mail"
                    onChange={formik.handleChange}
                    value={formik.values.mail}
                    variant="outlined"
                    sx={{ mb: 2 }} 
                    />
                     {formik.errors.mail ? (
                        <span className={styles.error}>{formik.errors.mail}</span>
                    ):null}
                    <Button type="submit" variant="contained">SUBMIT</Button>
                 </FormControl>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                // Agregar el color del Snackbar dependiendo del tipo
                sx={{ backgroundColor: snackbarType === 'success' ? 'green' : 'red' }}
            />
        </Container>
       
    ) 

};

export default NewCustomerForm;