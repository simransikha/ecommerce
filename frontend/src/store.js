import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import statement
import { composeWithDevTools } from 'redux-devtools-extension';
import { ProductsReducer, productDetailsReducer, newProductReducer, productReducer } from './reducers/productReducers';
import { authReducer, userReducer, forgotPasswordReducer, allUserReducer, userDetailsReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReduces';
import { newOrderReducers, myOrdersReducers, orderDetailsReducers, allOrdersReducers, orderReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    products: ProductsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    order: orderReducer,
    userDetails: userDetailsReducer,
    product: productReducer,
    auth: authReducer,
    allUsers: allUserReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducers,
    allOrders: allOrdersReducers,
    myOrders: myOrdersReducers,
    orderDetails: orderDetailsReducers
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
