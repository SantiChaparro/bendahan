const {postNewAppointment,getAllAppointments,getApointmentById,updatedAppointment} = require('../controllers/appointmentControllers');

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

const getAppointment = async (req,res) => {

    const {id} = req.params;
    console.log(id)

    try {
        
        const appointment = await getApointmentById(id);

        if(appointment){
            res.status(200).json(appointment);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

const updateAppointment = async(req,res) => {

    const {id} = req.params;
    const updateData = req.body;

   

    try {
        
       const newAppointment = await updatedAppointment(updateData,id);  

       if(newAppointment){
        res.status(200).json(newAppointment);
       }

    } catch (error) {
        res.status(500).send({error:error.message});
    }


};



module.exports= {postAppointment,getAppointments,getAppointment,updateAppointment}