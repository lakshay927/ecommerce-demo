const mongoose = require('mongoose');
const Schema = mongoose.Schema


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "you forgot to enter your name"],
        maxlength: [200, "name is too long"]
    },

}
)

module.exports = mongoose.model('Product', productSchema)

