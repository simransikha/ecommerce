const app = require('./app');
const connectDatabase = require('./config/database');

const cloudinary = require('cloudinary')

const dotenv = require('dotenv');

dotenv.config({path : 'backend/config/config.env'})
connectDatabase();

//setting up cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

app.listen(process.env.port, () => {
    console.log(`Server started at the PORT ${process.env.PORT} in the the ${process.env.NODE_ENV}`);
})