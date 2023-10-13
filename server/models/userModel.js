const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "you forgot to enter your name"],
        maxlength: [20, "name is too long"]
    },
    age: { type: Number, required: true, min: 18, max: 100 },

    cart: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }]
})

module.exports = mongoose.model('Users', userSchema)






