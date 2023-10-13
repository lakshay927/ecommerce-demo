const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/createuser', userController.addNewUser)
router.post('/getuser', userController.getUser)
router.post('/addtocart', userController.addtocart)
router.put('/updateuser', userController.UpdateUsers)
router.delete('/deleteuser', userController.deleteUser)
router.post('/addproduct', userController.addNewProduct)
router.get('/getproducts', userController.getProducts)


module.exports = router
