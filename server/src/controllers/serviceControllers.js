const {Service} = require('../db');


const getAllServices = async () => {

    const services = await Service.findAll();

    if(services){
        return services;
    }else{
        throw new Error('Problema al cargar los servicios');
    }

};

const postNewService = async (service_name,cost,commission_percentage) => {

    const service = await Service.create({service_name,cost,commission_percentage});

    if(service){
        const successMessage = `El servicio ${service_name} fue creado con éxito`;

        return {successMessage,service};
    }
};

module.exports = {getAllServices,postNewService};