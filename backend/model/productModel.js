const mongoose = require('mongoose')
const {Schema} = mongoose


const productSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
        required: true
    },
    brandname:{
        type: String,
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    categoryname:{
        type: String,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
   
})

const Product = mongoose.model('product',productSchema)

module.exports = Product