const mongoose = require('mongoose');

const connectDB = (url) => {

    const uri = url.toString();

   return mongoose
    .connect(uri)
    .then(() => console.log("Datavase connected..."))
    .catch((err) => console.log('erroro rdshg lasdhg',err));
};

module.exports = connectDB;