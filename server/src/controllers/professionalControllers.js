const {Professional}= require ('../db')
const {Service} = require('../db');

const getAllProfessionals = async () => {

    const allProfessionals = await Professional.findAll();

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
            const service = await Service.findAll({
                where:{
                    id:services
                }
            });
            newProfessional.addService(service);
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

module.exports={getAllProfessionals,postNewProfessional,getProfessionalById}