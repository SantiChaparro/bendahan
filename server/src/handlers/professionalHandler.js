const {getAllProfessionals} = require('../controllers/professionalControllers');

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

module.exports= {getProfecionals}