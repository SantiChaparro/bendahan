const {Router} = require('express');
const { getProfecionals } = require('../handlers/professionalHandler'); 
const professionalRouter = Router();


 professionalRouter.get('/', getProfecionals);



module.exports = professionalRouter;
