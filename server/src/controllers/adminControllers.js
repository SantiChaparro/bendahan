const {Client,Professional,Service} = require('../db');

const getAllClients = async () => {

    const clients = await Client.findAll();

    if(clients){
        console.log(clients);
        return clients
    }else{
        throw new Error('No se encontraron clientes');
    }

};

const newClient = async (dni,name,DateOfBirth,phone,mail) => {

        const existingClient = await Client.findByPk(dni);

        if(existingClient){

            throw new Error('Cliente ya registrado');

        }else{

            const client = await Client.create({dni,name,DateOfBirth,phone,mail});

            if(client){
                const successMessage = `Cliente ${name} registrado con éxito`;
                return {successMessage,client};
            }

        }
};

const getAllServices = async () => {

    const services = await Service.findAll();

    if(services){
        return services;
    }else{
        throw new Error('Problema al cargar los servicios');
    }

};

module.exports = {getAllClients,newClient,getAllServices};