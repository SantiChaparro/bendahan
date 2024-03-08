import react , {useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { FormControl, TextField, Button ,Snackbar, Typography} from "@mui/material";
import styles from './NewServiceForm.module.css'
import { Container } from "@mui/system";
import { postNewService ,  cleanNewService} from "../../redux/slices/appointments/thunks";

const initialValues = {
    service_name: '',
    cost:''
}

const validate = (values) => {

    const errors = {};

    if(!values.service_name){
        errors.service_name = 'El campo es requerido';
    }else if(!/^[a-zA-Z\s\u00C0-\u017F]+$/.test(values.service_name)){
        errors.service_name = 'Este campo solo admite letras';
    }

    if(!values.cost){
        errors.cost = 'El campo es requerido';
    }else if(!/^\d+$/.test(values.cost)){
        errors.cost = 'Este campo solo admite números';
    }

    return errors;

}

const NewServiceForm = () => {

    const {NewService} = useSelector((state) => state.newService);
    const errorMessage = '';

    console.log((NewService));

    

    const dispatch = useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success'); 
   
    useEffect(() => {
        if ((NewService && NewService.successMessage) || errorMessage) {
            setSnackbarType(errorMessage ? 'error' : 'success');
            setSnackbarMessage(errorMessage || NewService.successMessage);
            setOpenSnackbar(true);
            
        }
        return () => {
            setOpenSnackbar(false);
            setSnackbarMessage('');
            setSnackbarType('success');
            
        };
    }, [NewService, errorMessage]);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
        setSnackbarMessage('');
        setSnackbarType('success');
        dispatch(cleanNewService())
        
    };

    const handleSubmit = (values, {resetForm}) => {
       
        dispatch(postNewService(values.service_name,values.cost));
        resetForm();
       
        
    }

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validate
    });


    return(
        <Container maxWidth='xl'>
            
            <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
            <Typography variant="h4" sx={{ mb: 2 }}>Nuevo Servicio</Typography>
                <FormControl>
                    <TextField 
                        label='Servicio'
                        name="service_name"
                        onChange={formik.handleChange}
                        value={formik.values.service_name}
                        variant="outlined"
                        sx={{ mb: 2 }} 
                    />
                    {formik.errors.service_name && (
                        <span className={styles.error}>{formik.errors.service_name}</span>
                    )}

                    <TextField 
                        label='Costo'
                        name="cost"
                        onChange={formik.handleChange}
                        value={formik.values.cost}
                        variant="outlined"
                        sx={{ mb: 2 }} 
                    />
                    {formik.errors.cost && (
                        <span className={styles.error}>{formik.errors.cost}</span>
                    )}

                    <Button type="submit" variant="contained">Guardar</Button>
                </FormControl>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                sx={{ backgroundColor: snackbarType === 'success' ? 'green' : 'red' }}
            />
        </Container>
    )

};

export default NewServiceForm;