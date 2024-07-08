const Product = require('../model/product');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeature = require('../middleware/apiFeature')
const cloudinary = require('cloudinary')

//Get new Products => /ap1/v1/admin/product/new
exports.getNewProduct = catchAsyncError (async(req,res,next) => {


    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks


    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: 'New Product is created.'
    })
})

//Get all Products => /api/v1/products
exports.getProducts = catchAsyncError (async(req,res,next) => {


    const resPerPage = 30;
    let productsCount;
    let products;

    // Extract query parameters
    const { currentPage = 1, keyword, minPrice, maxPrice, category } = req.query;

    // Build the base query object
    const query = {
        ...(keyword && {
            name: {
                $regex: keyword,
                $options: 'i' // Case-insensitive search
            }
        }),
        ...(minPrice && maxPrice && {
            price: {
                $gte: parseFloat(minPrice),
                $lte: parseFloat(maxPrice)
            }
        }),
        ...(category && { category })
    };

    // Calculate the total number of products matching the query
    productsCount = await Product.countDocuments(query);

    // Fetch the products with pagination and the constructed query
    products = await Product.find(query)
        .limit(resPerPage)
        .skip(resPerPage * (currentPage - 1));

    // Return the response
    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        products
    })
})

//Get all Products(admin) => /api/v1/admin/products
exports.getAdminProducts = catchAsyncError (async(req,res,next) => {
             
   
       const products = await Product.find();
   
       res.status(200).json({
           success: true,
           products
       })
   })

//Get Single Product => /api/v1/product/:id
exports.getSingleProduct = catchAsyncError (async(req,res,next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not Found',400))

    }
    res.status(200).json({
        success:true,
        product
    })

})

//Upate the Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncError (async(req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not Found',400))

    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }


   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators:true,
      useFindAndModify:false
   })

    res.status(200).json({
        success:true,
        product
    })
})

//Delete the Products => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError (async(req,res,next) => {

    const product = await Product.findById(req.params.id);
    

    if(!product){
        return next(new ErrorHandler('Product not Found',400))

    }

 // Deleting images associated with the product
 for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
}

await Product.deleteOne({
    _id: product._id
}).catch((err)=>{
    console.log(err)
})
    res.status(200).json({
        success:true,
        message:'Product is deleted.'
    })

})

//create new review   => /api/v1/review

exports.createProductReview = catchAsyncError(async (req,res,next) => {

    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name : req.user.name,
        rating: Number(rating),
        comment
    }

    const product  = await Product.findById(productId);

    
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed){
        product.reviews.forEach(review => {
            if(review.user.toString === review.user._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        })
    }else{
        product.reviews.push(review);
        product.numofReviews = product.reviews.length;
    }
    product.ratings = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.reviews.length;

    await product.save ({ validateBeforeSave: false});

    res.status(200).json({
        success:true

    })

})