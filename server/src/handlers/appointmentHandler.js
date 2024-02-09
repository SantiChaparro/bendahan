const {postNewAppointment,getAllAppointments} = require('../controllers/appointmentControllers');

const postAppointment = async (req,res) => {

    const {date,time,dni,professionalDni,serviceId} = req.body;

    try {
        
        const newAppointment = await postNewAppointment(date,time,dni,professionalDni,serviceId);

        if(newAppointment){
            res.status(200).json(newAppointment);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

const getAppointments = async (req,res) => {

    try {
        
        const appointments = await getAllAppointments();
    
        if(appointments){
            res.status(200).json(appointments);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

module.exports= {postAppointment,getAppointments}