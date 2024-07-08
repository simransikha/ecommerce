const catchAsyncError = require('../middleware/catchAsyncError')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//STRIPE payment process => /api/v1/payment/process

exports.processPayment = catchAsyncError(async (req,res,next) => {

    const paymentIntent = await stripe.paymentIntents.create({

        amount: req.body.amount,
        currency: 'inr',
   
        metadata : { integration_check : 'accept_a_payment'}
       
    })
    res.status(200).json({
         success: true,
        client_secret : paymentIntent.client_secret
    })
})


//send stripe api => /api/v1/stripeapi
exports.sendStripApi = catchAsyncError(async (req,res,next) => {

    
    res.status(200).json({
         stripeApiKey : process.env.STRIPE_API_KEY
    })
})