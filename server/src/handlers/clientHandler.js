const {getAllClients,newClient, foundClient, updatedClient} = require('../controllers/clientControllers');

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

const getClientById = async (req,res) => {

    const {dni} = req.params;

    console.log(dni)

    try {
        
        const client = await foundClient(dni);

        if(client){
            res.status(200).json(client);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

const updateClient = async (req,res) => {

    const {dni} = req.params;
    const clientData = req.body;

    console.log(clientData)

    try {
        
        const client = await updatedClient(clientData,dni) 

        if (client){
            res.status(200).json(client);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

module.exports= {getClients, postClient, updateClient, getClientById}