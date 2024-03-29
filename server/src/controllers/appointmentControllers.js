const {Appointment}= require ('../db')
const {Client} = require('../db');
const {Professional} = require('../db');
const {Service} = require('../db');

const postNewAppointment = async (date,time,dni,professionalDni,serviceId) => {

    const existingClient = await Client.findByPk(dni);

    if(existingClient){
        const newAppointment = await Appointment.create({date,time});

        if(newAppointment){

            await newAppointment.setClient(dni);

            const professional = await Professional.findByPk(professionalDni)

            await newAppointment.setProfessional(professional);

            const service = await Service.findByPk(serviceId);

            await newAppointment.setService(service);

            const successMessage = `Turno asignado con éxito`;
            return {successMessage,newAppointment};

        };

    }else{
        throw new Error('Cliente no figura en base de datos');
    }

};

const getAllAppointments = async () => {

    const appointments = await Appointment.findAll({
        include:[
            {
                model: Client,
                attributes:['name']
            },
            {
                model:Professional,
                attributes:['name','dni']
            },
            {
                model: Service,
                attributes:['service_name','cost']
            }
        ]
    });

    if(appointments){
        return appointments;
    }

};

const getApointmentById = async (id) => {

    const appointment = await Appointment.findByPk(id,{
        include:[
            {
                model: Client,
                attributes:['name','dni']
            },
            {
                model:Professional,
                attributes:['name']
            },
            {
                model: Service,
                attributes:['service_name','cost',"commission_percentage"]
            }
        ]
    })
     

    if(appointment){
        return appointment;
    }

};

const clientAppointments = async (dni,date) => {
    
    console.log('fecha y deni desde controler son ...',dni,date)

    const client = await Client.findByPk(dni);
    console.log(client)

        if (client) {

            const appointments = await Appointment.findAll({
                where: {
                    ClientDni: dni,
                    paid: false,
                    date: date
                },
                include: [{ model: Service },{ model: Professional }]
            });

            console.log(appointments)

            if (appointments.length === 0) {
                const message = 'No hay pagos pendientes';
                console.log(message); 
                return message;
            } else {
                let totalAmont = 0;
                const appointmentData =await appointments.map(appointment => {
                    totalAmont += appointment.Service.cost;
                    return {
                        id: appointment.id,
                        date: appointment.date,
                        service_name: appointment.Service.service_name,
                        cost: appointment.Service.cost,
                        commision_percentage:appointment.Service.commission_percentage,
                        professional: appointment.Professional.dni
                    };

                });

                console.log(appointmentData);
                return {appointmentData,totalAmont};
            }

      
    }

};

const allClientAppointments =  async (dni) => {
        
    const client = await Client.findByPk(dni);
    
        if (client) {

            const appointments = await Appointment.findAll({
                where: {
                    ClientDni: dni,
                    paid: false,
                },
                include: [{ model: Service },{ model: Professional }]
            });

           // console.log(appointments)

            if (appointments.length === 0) {

                const message = 'No hay pagos pendientes';
                return message;

            } else {
               // let totalAmont = 0;
                const appointmentData =await appointments.map(appointment => {
                   // totalAmont += appointment.Service.cost;
                    return {
                        id: appointment.id,
                        date: appointment.date,
                        service_name: appointment.Service.service_name,
                        cost: appointment.Service.cost,
                        commision_percentage:appointment.Service.commission_percentage,
                        professional: appointment.Professional.dni
                    };

                });

                return appointmentData;
            }

      
    }

};


const updatedAppointment = async (updateData,id) => {
    const foundAppointment = await Appointment.findByPk(id);
    //console.log(updateData)
    if(foundAppointment){

         await foundAppointment.update(updateData);

         const successMessage = 'Turno modificado con éxito';

         return {successMessage,foundAppointment}

    }
};

const distroyAppointment = async (id) => {

    const appointment = await Appointment.findByPk(id);

    if(appointment){
        const distroyedAppointment = await appointment.destroy()

        if(distroyedAppointment){
            const successMessage = 'Turno eliminado con éxito'

            return successMessage;
        }
    }

};

const pdAppointment = async (appointmentIds) => {

    

    const updatedAppointments = await Promise.all(appointmentIds.map(async (appointmentId) => {
        const appointment = await Appointment.findByPk(appointmentId);

        if (appointment && appointment.PaymentId !== null) {
           
            await appointment.update({paid:true});
            return appointment; 
        }
    }));

    return updatedAppointments
};


module.exports={
    postNewAppointment,
    getAllAppointments,
    getApointmentById,
    updatedAppointment,
    distroyAppointment,
    clientAppointments,
    pdAppointment,
    allClientAppointments
}