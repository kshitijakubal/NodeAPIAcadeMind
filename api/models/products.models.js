const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})

// export schema to model
module.exports = mongoose.model("Product",productSchema);