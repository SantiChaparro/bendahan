const {getAllProfessionals,postNewProfessional,getProfessionalById,updatedProfessional} = require('../controllers/professionalControllers');

const getProfecionals = async (req,res) => {

    try {
        
        const professional = await getAllProfessionals();

        if(professional){
            res.status(200).json(professional);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

const postProfecionals = async (req,res) => {

    const {dni,name,phone,mail,services} = req.body;
    console.log(services)

    try {
        
        const professional = await postNewProfessional(dni,name,phone,mail,services);

        if(professional){
            res.status(200).json(professional);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

const getProfessional = async (req,res) => {

    const {dni} = req.params;

    try {
        
        const professional = await getProfessionalById(dni);

        if(professional){
            res.status(200).json(professional);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

const updateProfessional = async (req,res) => {
    const {dni} = req.params;
    const updateData = req.body;

    try {
        
        const professional = await updatedProfessional(dni,updateData);
        
        if(professional){
            res.status(200).json(professional);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }
};

module.exports= {getProfecionals,postProfecionals,getProfessional,updateProfessional}