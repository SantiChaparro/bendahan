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
                attributes:['name']
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
                attributes:['name']
            },
            {
                model:Professional,
                attributes:['name']
            },
            {
                model: Service,
                attributes:['service_name','cost']
            }
        ]
    })
     

    if(appointment){
        return appointment;
    }

};

const updatedAppointment = async (updateData,id) => {
    const foundAppointment = await Appointment.findByPk(id);
    console.log(updateData)
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

module.exports={postNewAppointment,getAllAppointments,getApointmentById,updatedAppointment,distroyAppointment}