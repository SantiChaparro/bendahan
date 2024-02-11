const {Router} = require('express');
const {postPayment } = require('../handlers/paymentHandler'); 
const paymentRouter = Router();


paymentRouter.post('/',postPayment);



module.exports = paymentRouter;
