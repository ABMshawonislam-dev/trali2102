const mongoose = require('mongoose')
const {Schema} = mongoose

const cuponSchema = new Schema({
    cuponname: {
        type: String,
        required: true,
        unique: true
    },
    discountamount:{
        type: Number,
        required: true
    }
})

const Cupon = mongoose.model('cupon',cuponSchema)

module.exports = Cupon