const {Router} = require('express');
const {postAppointment,getAppointments,getAppointment,updateAppointment} = require('../handlers/appointmentHandler');
const appointmentRouter = Router();


 appointmentRouter.post('/',postAppointment); 
 appointmentRouter.get('/',getAppointments);
 appointmentRouter.get('/:id',getAppointment)
 appointmentRouter.patch('/:id',updateAppointment);
 


module.exports = appointmentRouter;
