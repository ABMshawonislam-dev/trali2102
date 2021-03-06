const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
    },
    isVendor: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("user",userSchema)
module.exports = User