const {Router} = require('express');
const { getProfecionals,postProfecionals,getProfessional } = require('../handlers/professionalHandler'); 
const professionalRouter = Router();


 professionalRouter.get('/', getProfecionals);
 professionalRouter.post('/', postProfecionals);
 professionalRouter.get('/:dni',getProfessional);



module.exports = professionalRouter;
