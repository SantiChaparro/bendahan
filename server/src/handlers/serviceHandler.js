const {getAllServices, postNewService, updatedService, getService} = require('../controllers/serviceControllers');

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

const postService = async (req,res) => {

    const {service_name,cost} = req.body;
    console.log(req.body)
   
    try {
        const service = await postNewService(service_name,cost);
        console.log(service)
        if(service){
            res.status(200).json(service);
        }
    } catch (error) {
        res.status(500).send({error:error.message});
    }


};

const getServiceById = async (req,res) => {

    const {id} = req.params;

    try {
        
        const service = await getService(id);

        if(service){
            res.status(200).json(service);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

const updateService = async (req,res) => {

    const serviceData = req.body;
    const {id} = req.params;
    console.log(serviceData)
    console.log(id);

    try {
        
        const service = await updatedService(id,serviceData)

        if(service){
            res.status(200).json(service);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

module.exports= {getServices, postService, updateService, getServiceById}