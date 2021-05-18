const mongoose = require('mongoose');
const User = require('./user');

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: String,
        trim: true
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
})


module.exports = mongoose.model("Products", productsSchema);