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
        type: String,
        required: true,
    },
    image:{
        type: Buffer,
        contentType: String
    },
    category:{
        type: String,
        required: true,
    },
    size:{
        type: [String],
        required: true
    },
    
    color:{
        type: [String],
        required: true
    },
    
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
   
})

const Product = mongoose.model('product',productSchema)

module.exports = Product