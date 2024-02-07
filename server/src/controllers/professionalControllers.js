const {Professional}= require ('../db')

const getAllProfessionals = async () => {

    const allProfessionals = await Professional.findAll();

    if(allProfessionals){

        return allProfessionals;
    }

};

const postNewProfessional = async (dni,name,phone,mail) => {

    const existingProfessional = await Professional.findByPk(dni);
    
    if(existingProfessional){
        throw new Error('Profesional ya registrado')
    }else{
        const newProfessional = await Professional.create({dni,name,phone,mail});
        return newProfessional;
    }

   


};

module.exports={getAllProfessionals,postNewProfessional}