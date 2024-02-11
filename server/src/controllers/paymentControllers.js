const {Payment}= require ('../db');
const {Appointment} = require('../db');

const postNewPayment = async (payment_day,amount,payment_mode,appointmentsId) => {

    const payment = await Payment.create({payment_day,amount,payment_mode});

    if(payment){
        await Promise.all(appointmentsId.map(async (appointmentId) => {
            const appointment = await Appointment.findByPk(appointmentId);
            if (appointment) {
                await appointment.setPayment(payment);
            } else {
                throw new Error(`No se encontró la cita con el ID ${appointmentId}`);
            }
        }));

        const succesMessage = 'Pago registrado con éxito';

        return {succesMessage,payment};

    }
    
   

};

module.exports={postNewPayment}