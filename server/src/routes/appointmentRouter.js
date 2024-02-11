const {Router} = require('express');
const {postAppointment,getAppointments,getAppointment,updateAppointment,deleteAppointment,getAppointmentByDni} = require('../handlers/appointmentHandler');
const appointmentRouter = Router();

 appointmentRouter.get('/client',getAppointmentByDni);
 appointmentRouter.post('/',postAppointment); 
 appointmentRouter.get('/',getAppointments);
 appointmentRouter.get('/:id',getAppointment);
 appointmentRouter.patch('/:id',updateAppointment);
 appointmentRouter.delete('/:id',deleteAppointment);
 


module.exports = appointmentRouter;
