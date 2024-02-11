const {postNewPayment} = require('../controllers/paymentControllers');

const postPayment = async(req,res) => {

    
    const paymentData = req.body;

    try {

        const payment = await postNewPayment(paymentData);

        if(payment){
            res.status(200).json(payment);
        }

    } catch (error) {
        res.status(500).send({error:error.message});
    }

    

};


module.exports= {postPayment}