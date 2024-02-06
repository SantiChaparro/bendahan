const {Router} = require('express');
const {getClients,postClient} = require('../handlers/adminHandlers');
const adminRouter = Router();

adminRouter.get('/clients',getClients);
adminRouter.post('/newClient', postClient);

module.exports = adminRouter;
