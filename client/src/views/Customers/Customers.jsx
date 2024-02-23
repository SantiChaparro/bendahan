import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from "@mui/material";
import React, { useState } from "react";
//import {useSatate} from 'react';


const Customers = ({clientesOpen, setClientesOpen})=>{

   
    

    const closeClientModal = () =>{
        setClientesOpen(false)
    }

    return (
        <div>
            <Dialog open={clientesOpen} fullWidth maxWidth="lg">
                <DialogTitle>Clientes</DialogTitle>
                <DialogContent>
                    <DialogContentText>blavscxascl</DialogContentText>

                </DialogContent>
                <DialogActions>
                   <Button color="error" variant="contained" onClick={closeClientModal}>close</Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}

export default Customers; 