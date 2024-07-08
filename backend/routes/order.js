const express = require('express');
const router = express.Router();

const {newOrder ,getSingleOrder , myOrders,allOrders,updateOrders, DeleteOrder} = require('../controller/orderController');

const { isAuthenticatedUser,authorizeRoles} = require('../middleware/auth')

router.route('/order/new').post(isAuthenticatedUser,newOrder)
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder)
router.route('/orders/me').get(isAuthenticatedUser,myOrders)
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles('admin'),allOrders)
router.route('/admin/order/:id')
                   .get(isAuthenticatedUser,authorizeRoles('admin'),updateOrders)
                   .delete(isAuthenticatedUser,authorizeRoles('admin'),DeleteOrder)
module.exports = router;