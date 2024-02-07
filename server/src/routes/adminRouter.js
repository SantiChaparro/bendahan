const {Router} = require('express');
const {getClients,postClient,getServices,postService} = require('../handlers/adminHandlers');
const adminRouter = Router();

adminRouter.get('/clients',getClients);
adminRouter.post('/newClient', postClient);
adminRouter.get('/services',getServices);
adminRouter.post('/newservice',postService);

module.exports = adminRouter;
