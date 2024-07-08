const express = require('express');
const router = express.Router();

const {getProducts,getNewProduct,getSingleProduct,updateProduct,deleteProduct,getAdminProducts} = require('../controller/productController');
const {isAuthenticatedUser,authorizeRoles}  = require('../middleware/auth')

router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),getNewProduct);
router.route('/admin/product/:id')
                    .put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
                    .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

module.exports = router;