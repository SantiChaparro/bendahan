const {Router} = require('express');
const {clientRouter, serviceRouter, appointmentRouter,paymentRouter,professionalRouter}= require ('../routes')
const router = Router();

router.use('/client',clientRouter);
router.use('/service',serviceRouter);
router.use('/appointment',appointmentRouter);
router.use('/professional',professionalRouter);
router.use('/payment',paymentRouter);

module.exports = router;