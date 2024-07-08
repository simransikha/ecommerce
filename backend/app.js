const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middleware/errors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload')



dotenv.config({path : 'backend/config/config.env'})




app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true}))
app.use(cookieParser())
app.use(fileUpload());
app.use(cors());


const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');
const form = require('./routes/form')

app.use('/api/v1',products);
app.use('/api/v1',auth);
app.use('/api/v1',order);
app.use('/api/v1',payment);
app.use('/api/v1',form);

//middleware to handle => after the routes
app.use(errorHandler);

module.exports = app