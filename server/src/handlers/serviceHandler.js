const {getAllServices, postNewService} = require('../controllers/serviceControllers');

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

    const {service_name,cost,commission_percentage} = req.body;
    console.log(req.body)
   
    try {
        const service = await postNewService(service_name,cost,commission_percentage);
        console.log(service)
        if(service){
            res.status(200).json(service);
        }
    } catch (error) {
        res.status(500).send({error:error.message});
    }


};

module.exports= {getServices, postService}