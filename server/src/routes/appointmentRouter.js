const {Router} = require('express');
const {postAppointment,getAppointments} = require('../handlers/appointmentHandler');
const appointmentRouter = Router();


 appointmentRouter.post('/',postAppointment); 
 appointmentRouter.get('/',getAppointments)


module.exports = appointmentRouter;
