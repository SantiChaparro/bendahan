const {Router} = require('express');
const { getClients, postClient } = require('../handlers/clientHandler'); 
const clientRouter = Router();


clientRouter.get('/',getClients);
clientRouter.post('/',postClient); 


module.exports = clientRouter;
