const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [ 'Please enter product price'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [ 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                
            },
            url: {
                type: String,
                
            },
        }
    ],
    category: {
        type: String,
        required: [ 'Please select category for this product'],
        enum: {
            values: [
                'Everything',
                'Women',
                'Men',
                'Accessories'
                
            ],
            message: 'Please select correct category for product'
        }
    },
    seller: {
        type: String,
        required: [ 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [ 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                
            },
            name: {
                type: String,
                
            },
            rating: {
                type: Number,
                
            },
            comment: {
                type: String,
                
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product',productSchema);