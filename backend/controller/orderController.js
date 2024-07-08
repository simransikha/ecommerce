const Order = require('../model/order');
const Product = require('../model/product');

const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

//create a new Order => /api/v1/order/new
exports.newOrder = catchAsyncError(async (req,res,next) => {

    const {
        orderItems,
        shippingInfo,
        TaxPrice,
        itemPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
 
        orderItems,
        shippingInfo,
        TaxPrice,
        itemPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(200).json({
        success:true,
        order
    })
})

//get Single Order => /api/vi/order/:id
exports.getSingleOrder = catchAsyncError(async (req,res,next) =>{

    const order = await Order.findById(req.params.id).populate('user', 'name email')
    

    if(!order){
        return next(new ErrorHandler('No order found this Id',404))
    }

    res.status(200).json({
        success:true,
        order
    })
})


//get looged in user Order => /api/vi/orders/me
exports.myOrders = catchAsyncError(async (req,res,next) =>{

    
    const orders = await Order.find({user: req.user._id})


    res.status(200).json({
        success:true,
        orders
    })
})

//get all admin Order => /api/vi/admin/orders
exports.allOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    console.log(orders);
    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount: totalAmount,
        orders: orders
    });
});

//Update / process  Order - admin => /api/vi/admin/order/:id
exports.updateOrders = catchAsyncError(async (req,res,next) =>{

    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already ordered this order',400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product,item.quantity)
    })

 order.orderStatus = req.body.status;
 order.deliveredAt = Date.now();

 await order.save();

    res.status(200).json({
        success:true
    })
})

async function updateStock(id,quantity){

    const product = await Product.findById(id);
    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false})
}

//Delete Order => /api/vi/admin/order/:id
exports.DeleteOrder = catchAsyncError(async (req,res,next) =>{

    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No order found this Id',404))
    }

    await Order.deleteOne({
        _id: order._id
    }).catch((err)=>{
        console.log(err)
    })

    res.status(200).json({
        success:true
    })
})