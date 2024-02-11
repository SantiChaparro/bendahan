const {postNewPayment} = require('../controllers/paymentControllers');

const postPayment = async(req,res) => {

    
    const {payment_day,amount,payment_mode,appointmentsId} = req.body;

    try {

        const payment = await postNewPayment(payment_day,amount,payment_mode,appointmentsId);

        if(payment){
            res.status(200).json(payment);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

    

};


module.exports= {postPayment}