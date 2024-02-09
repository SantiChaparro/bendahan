const {Router} = require('express');
const {getServices, postService, updateService, getServiceById } = require('../handlers/serviceHandler'); 
const serviceRouter = Router();


serviceRouter.get('/',getServices);
serviceRouter.post('/',postService); 
serviceRouter.get('/:id',getServiceById)
serviceRouter.patch('/:id',updateService)


module.exports = serviceRouter;
