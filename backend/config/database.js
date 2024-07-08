const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/shop', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`MongoDb is connect to the localhost`)
    });
}

module.exports =  connectDatabase;