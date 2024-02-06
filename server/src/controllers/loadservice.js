const mockService = require('../mocks/mockservices.json');

const { Service } = require('../db');

const serviceLoader = async () => {

    const service = mockService.services.map((service)=>{

        return {

            id: service.id ,
            service_name: service.service_name,
            cost: service.cost ,
            commission_percentage: service.commission_percentage
        }

    })
    
    const loadService = await Service.bulkCreate(service);
    return loadService;


};

module.exports = serviceLoader;