const { Professional, Service, Payment, Appointment } = require('../../db');

const calcCommission = async (payment_day, appointmentsId) => {
  
    const appointments = appointmentsId.map(async(item)=>{
        const appointment = await Appointment.findByPk(item)
        
        

        return appointment
    })
    return appointments
};

module.exports = { calcCommission };