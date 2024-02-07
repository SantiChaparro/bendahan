const {Router} = require('express');
const {getServices, postService } = require('../handlers/serviceHandler'); 
const serviceRouter = Router();


serviceRouter.get('/',getServices);
serviceRouter.post('/',postService); 


module.exports = serviceRouter;
