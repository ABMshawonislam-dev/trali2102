const mongoose = require('mongoose')
const {Schema} = mongoose

const imageSchema = new Schema({
    image:{
        type: Buffer,
        contentType: String
    }
})

const Image = mongoose.model("image",imageSchema)
module.exports = Image