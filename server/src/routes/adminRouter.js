const {Router} = require('express');
const {getClients,postClient,getServices} = require('../handlers/adminHandlers');
const adminRouter = Router();

adminRouter.get('/clients',getClients);
adminRouter.post('/newClient', postClient);
adminRouter.get('/services',getServices);

module.exports = adminRouter;
