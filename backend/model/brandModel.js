const mongoose = require('mongoose')
const {Schema} = mongoose

const brandSchema = new Schema({
    brand: {
        type: String,
        required: true,
        unique: true
    }
})

const Brand = mongoose.model('brand',brandSchema)
module.exports= Brand