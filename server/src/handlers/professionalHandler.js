const {getAllProfessionals,postNewProfessional} = require('../controllers/professionalControllers');

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

    const {dni,name,phone,mail} = req.body;

    try {
        
        const professional = await postNewProfessional(dni,name,phone,mail);

        if(professional){
            res.status(200).json(professional);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

module.exports= {getProfecionals,postProfecionals}