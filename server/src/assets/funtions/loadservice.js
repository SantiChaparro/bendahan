const mockService = require('../mocks/mockservices.json');

const { Service } = require('../../db');

const serviceLoader = async () => {

    const service = mockService.services.map((service)=>{

        return {

            service_name: service.service_name,
            cost: service.cost 
            
        }

    })
    
    const loadService = await Service.bulkCreate(service);
    return loadService;


};

module.exports = serviceLoader;