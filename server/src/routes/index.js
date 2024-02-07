const {Router} = require('express');
//const {clientRouter, serviceRouter, appointmentRouter,paymentRouter,professionalRouter}= require ('../routes')
const clientRouter = require ('../routes/clientRouter');
const serviceRouter = require ('../routes/serviceRouter');
const appointmentRouter = require ('../routes/appointmentRouter');
const paymentRouter = require ('../routes/paymentRouter');
const professionalRouter = require ('../routes/professionalRouter');
const router = Router();

router.use('/client',clientRouter);
router.use('/service',serviceRouter);
router.use('/appointment',appointmentRouter);
router.use('/professional',professionalRouter);
router.use('/payment',paymentRouter);

module.exports = router;