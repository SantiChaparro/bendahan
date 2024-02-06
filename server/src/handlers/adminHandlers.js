const {getAllClients,newClient,getAllServices} = require('../controllers/adminControllers');

const getClients =async (req,res) => {

    try {
        const clients = await getAllClients();

        if(clients){

        res.status(200).json(clients);

        }else{

        throw new Error('Problema al cargar los clientes');
        }
    } catch (error) {
        res.status(500).send({error:error.message})
    }

};

const postClient = async (req,res) => {

    const {dni,name,DateOfBirth,phone,mail} = req.body;

    try {
        
        const client = await newClient(dni,name,DateOfBirth,phone,mail);

        if(client){
            res.status(200).json(client);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

const getServices = async (req,res) => {

    try {
        const services = await getAllServices();

        if(services){
            res.status(200).json(services);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

module.exports = {getClients,postClient,getServices};