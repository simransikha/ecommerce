import { useEffect, useState } from 'react';

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Home from "./component/Home";
import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header";
import ProductDetails from './product/ProductDetails';
import Login from './component/user/Login';
import Register from './component/user/Register';
import Profile from './component/user/Profile';
import ProductsList from './admin/ProductsList'

import { loadUser } from './actions/userActions';
import  store  from './store';

import './index.css';
import ProtectedRoute from './component/routes/ProtectedRoute';
import UpdateProfile from './component/user/UpdateProfile';
import UpdatePassword from './component/user/UpdatePassword';
import ForgotPassword from './component/user/ForgotPassword';
import ResetPassword from './component/user/ResetPassword';
import CartItem from './component/cart/CartItem';
import Shipping from './component/cart/Shipping';
import ConfirmOrder from './component/cart/ConfirmOrder';
import axios from 'axios';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './component/cart/Payment';
import OrderSuccess from './component/cart/OrderSuccess';
import ListItem from './component/order/ListItem';
import LoginwithEmail from './component/user/LoginwithEmail';
import LoginwithPhone from './component/user/LoginwithPhone';
import OrderDetails from './component/order/OrderDetails';
import Dashboard from './admin/Dashboard';
import NewProduct from './admin/NewProduct';
import UpdateProduct from './admin/UpdateProduct';
import OrderList from './admin/OrderList';
import ProcessOrder from './admin/ProcessOrder';
import UserList from './admin/UserList';
import UpdateUser from './admin/UpdateUser';
import Everything from './component/layout/Everything';
import About from './component/layout/About';
import Contact from './component/layout/Contact';

function App() {


const [stripeApiKey,setStripeApiKey] = useState('');

const stripePromise = loadStripe('pk_test_51Nnp9eSJgKnBDb3tGbTAjTrUTJk6QAiazNGFVTUOkPAJy19dlQj107vnPxswCZJ1cbXKWViVaBjhXPZetad3Zqdl002HVchAEV');




  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();
  },[])

  return (
    <Router>
      
    <div className="App">
   
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>}  exact/>
      <Route path="/search/:keyword"  element={<Home/>} />
      <Route path="/product/:id" element={<ProductDetails/>}  exact/>
      <Route path="/signIn" element={<Login/>} />
      <Route path="/login" element={<LoginwithEmail/>} />
      <Route path="/loginwithPhone" element={<LoginwithPhone/>} />
      <Route path="/everything" element={<Everything/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/cart" element={<CartItem/>}  exact/>
      <Route path="/password/forgot" element={<ForgotPassword/>} />
      <Route path="/password/reset/:token" element={<ResetPassword/>} />
      <Route path="/me" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      <Route path="/me/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
      <Route path="/password/update" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
      <Route path="/login/shipping" element={<ProtectedRoute><Shipping/></ProtectedRoute>} />
      <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
      <Route path="/success" element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}  />
      <Route path="/orders/me" element={<ProtectedRoute><ListItem/></ProtectedRoute>}  exact/>
      <Route path="/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}  exact/>
      <Route path="/dashboard" isAdmin={true} element={<ProtectedRoute><Dashboard/></ProtectedRoute>}  exact/>
      <Route path="/admin/products" isAdmin={true} element={<ProtectedRoute><ProductsList/></ProtectedRoute>}  exact/>
      <Route path="/admin/product" isAdmin={true} element={<ProtectedRoute><NewProduct/></ProtectedRoute>}  exact/>
      <Route path="/admin/product/:id" isAdmin={true} element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>}  exact/>
      <Route path="/admin/orders" isAdmin={true} element={<ProtectedRoute><OrderList/></ProtectedRoute>}  exact/>
      <Route path="/admin/order/:id" isAdmin={true} element={<ProtectedRoute><ProcessOrder/></ProtectedRoute>}  exact/>
      <Route path="/admin/users" isAdmin={true} element={<ProtectedRoute><UserList/></ProtectedRoute>}  exact/>
      <Route path="/admin/user/:id" isAdmin={true} element={<ProtectedRoute><UpdateUser/></ProtectedRoute>}  exact/>
      <Route
  path="/payment"
  element={
    <ProtectedRoute>
      <Elements stripe={stripePromise} >
        <Payment />
      </Elements>
    </ProtectedRoute>
  }
/>
 </Routes>
      <Footer/>
    </div>
  
    </Router>
  );
}

export default App;


