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

const getService = async (id) => {

    const service = await Service.findByPk(id);

    if(service){
        return service;
    }

};

const updatedService = async (id,serviceData) => {

    const existingService = await Service.findByPk(id);

    if(existingService){
        
        const updatedServices = await existingService.update(serviceData,{
            where:{
                id:id
            }
        });

        const succesMessage = `Servicio modificado con éxito`;

        return {succesMessage,updatedServices};
    }

};

module.exports = {getAllServices,postNewService,updatedService,getService};