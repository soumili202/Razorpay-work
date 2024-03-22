const Razorpay = require('razorpay'); 
//const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_I30eAnC6HsSMiO',
    key_secret: 'eR9KogazRcnYoln7bQZBI9JI'
});

const renderProductPage = async(req,res)=>{

    try {
        
        res.render('product');

    } catch (error) {
        console.log(error.message);
    }

}

const createOrder = async(req,res)=>{
    try {
        const amount = req.body.amount*100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id: 'rzp_test_I30eAnC6HsSMiO',
                        product_name:req.body.name,
                        description:req.body.description,
                        contact:"contact",
                        name: "username",
                        email: "soumilirupsa2020@gmail.com"
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}

const verifyPayment = async(req,res)=>{
    const secret = '12345678'
    const crypto = require('crypto');
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');
    console.log(digest, req.headers['x-razorpay-signature']);
    const fs = require('fs');
    if(digest === req.headers['x-razorpay-signature']){
        console.log('Request is legit');
        

        // process it
        fs.writeFileSync('payment1.json', JSON.stringify(req.body, null, 4));

    }
    else{
        console.log('Request is not legit');
    }
    res.json({status:'ok'});









}


module.exports = {
    renderProductPage,
    createOrder,
    verifyPayment
}