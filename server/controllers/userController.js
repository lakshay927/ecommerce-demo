const User = require("../models/userModel")
const Product = require("../models/productModel")
const { createOrder } = require("../paypal-apis")

// add new user
async function addNewUser(req, res) {
    try {
        const user = await User.create({ name: "testerref", age: 20 })
        console.log(user)
        res.status(200).send({ user: user })

    }
    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }

}
// add a new Product
async function addNewProduct(req, res) {
    try {

        const product = await Product.create({ name: "Product 2" })
        res.status(200).send({ product: product })

    }
    catch (e) {
        console.log(e)
        res.status(500).send({ msg: "not created ", err: e })
    }

}


//get user
async function getUser(req, res) {
    try {
        const userId = req.body.id

        const user = await User.findById(userId)
        if (!user) {
            console.log('usernotfound')
        }
        res.status(200).send({ user: user })


    }
    catch (e) {
        res.status(500).send({ msg: e })
    }

}
async function getProducts(req, res) {
    try {

        const products = await Product.find({})

        res.status(200).send({ products: products })

    }
    catch (e) {
        res.status(500).send({ msg: e })
    }

}


//add to cart
async function addtocart(req, res) {
    try {
        const userId = req.body.id
        const productId = req.body.productId
        const user = await User.findById(userId).then(() => {
            if (!user) {
                console.log('usernotfound')
            }

            const cartItemIndex = user.cart.findIndex((item) => item.product.equals(productId))

            if (!cartItemIndex)
                user.cart.push({ product: productId, quantity: 1 })
            else
                user.cart[cartItemIndex].quantity += 1

            return user.save();
        }).then(() => {
            console.log("cart updated successfully")
            res.status(200).send({ user: "cart updated" })
        })

    }
    catch (e) {
        res.status(500).send({ msg: e })
    }

}







async function UpdateUsers(req, res) {
    try {
        const query = { name: "abc" }
        console.log(req.body)
        const result = await User.findOneAndUpdate(query, req.body, { new: true })
        console.log(result)
        res.status(200).send({ user: result })
    }
    catch (e) {
        res.status(500).send("error occured", e)
    }

}

async function deleteUser(req, res) {
    try {
        const query = { name: "abc" }

        const result = await User.findOneAnddeleDelete(query)
        console.log(result)
        res.status(200).send({ user: result })
    }
    catch (e) {
        res.status(500).send("error occured", e)
    }

}

function uploadImage(req, res) {
    const path = req.file.path

    const user = User.findByIdAndUpdate(req.params.id, { profilePhoto: path }, { new: true })
    console.log(req.file)
    res.status(200).send({ user: req.file })

}


async function newOrder(req, res) {
    try {
        const { cart } = req.body;
        const { jsonResponse, httpStatusCode } = await createOrder(cart);
        res.status(httpStatusCode).json(jsonResponse);
    }
    catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }

}

module.exports = { addNewUser, addtocart, UpdateUsers, deleteUser, addNewProduct, getUser, getProducts, uploadImage, newOrder }
