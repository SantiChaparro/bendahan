const {Payment}= require ('../db');
const {Appointment} = require('../db');
const {Commission} = require ('../db');
const {Professional} = require('../db');
const {Service} = require('../db');
const {calcCommission} = require('../assets/funtions/calcCommission');

const postNewPayment = async (payment_day,amount,payment_mode,appointmentsId) => {

    const payment = await Payment.create({payment_day,amount,payment_mode});

    if(payment){
        await Promise.all(appointmentsId.map(async (appointmentId) => {
            const appointment = await Appointment.findByPk(appointmentId,{
                include:[
                    {
                        model:Professional,
                        attribute:['dni']
                    },
                    {
                        model:Service,
                        attribute:['cost','commission_percentage']
                    }
                ]
            });
            if (appointment) {
                //console.log('turnos desde pagos',appointment);
                await appointment.setPayment(payment);
              //aca ejecuta la función para calcular comisión
              const commissions = calcCommission(payment_day,appointmentsId);
              return commissions;

            } else {
                throw new Error(`No se encontró la cita con el ID ${appointmentId}`);
            }
        }));

        const succesMessage = 'Pago registrado con éxito';

        return {succesMessage,payment};

    }
    
   

};

const getAllPayment = async () => {

    const payments = await Payment.findAll();

    if(payments){
        return payments;
    }

};

module.exports={postNewPayment,getAllPayment}