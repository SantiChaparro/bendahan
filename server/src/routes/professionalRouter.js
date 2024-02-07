const {Router} = require('express');
const { getProfecionals,postProfecionals } = require('../handlers/professionalHandler'); 
const professionalRouter = Router();


 professionalRouter.get('/', getProfecionals);
 professionalRouter.post('/', postProfecionals);



module.exports = professionalRouter;
