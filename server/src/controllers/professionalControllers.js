const {Professional}= require ('../db')
const {Service} = require('../db');

const getAllProfessionals = async () => {

    const allProfessionals = await Professional.findAll({
        include:[{
            model: Service,
            attributes: ['service_name'],
            through: { attributes: [] }  
        }]
    });

    if(allProfessionals){

        return allProfessionals;
    }

};

const postNewProfessional = async (dni,name,phone,mail,services) => {

    const existingProfessional = await Professional.findByPk(dni);
    console.log(services)
    
    
    if(existingProfessional){
        throw new Error('Profesional ya registrado')
    }else{

        const newProfessional = await Professional.create({dni,name,phone,mail});
        console.log(newProfessional)

        if(services && services.length > 0){

            const mapedService = services.map(async(item)=>{

                const service = await Service.findByPk(item)
                
                if(service){
                    return service
                }
            });

            const resolvedServices = await Promise.all(mapedService);

            await newProfessional.addService(resolvedServices);
        }
        
        const successMessage = `Profesional creado con éxito`;
        return {successMessage,newProfessional};
    }

   


};

const getProfessionalById = async (dni) => {

    const professional = await Professional.findByPk(dni,{
        include:{
            model: Service,
            attributes:['service_name'],
            through: { attributes: [] } 
        }
    });

    if(professional){
        return professional;
    }else{
        throw new Error('Error al buscar el profesional');
    }

};

const updatedProfessional = async (dni,updateData) => {

    const existingProfessional = await Professional.findByPk(dni);

    if(existingProfessional){
        const updateProfessional = await existingProfessional.update(updateData);

       if(updateData.services && Array.isArray(updateData.services)){
        const services = await Service.findAll({
            where:{
                id: updateData.services
            }
        });

        await existingProfessional.setServices(services);

       }
       const successMessage = `Profesional modificado con éxito`;
       return { successMessage, updatedProfessional: existingProfessional };
    }

};

module.exports={getAllProfessionals,postNewProfessional,getProfessionalById,updatedProfessional}