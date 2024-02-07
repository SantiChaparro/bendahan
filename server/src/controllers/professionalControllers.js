const {Professional}= require ('../db')

const getAllProfessionals = async () => {

    const allProfessionals = await Professional.findAll();

    if(allProfessionals){

        return allProfessionals;
    }

};

module.exports={getAllProfessionals}