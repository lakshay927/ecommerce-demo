const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})
const upload = multer({ storage: storage })


router.post('/createuser', userController.addNewUser)
router.post('/getuser', userController.getUser)
router.post('/addtocart', userController.addtocart)
router.put('/updateuser', userController.UpdateUsers)
router.delete('/deleteuser', userController.deleteUser)
router.post('/addproduct', userController.addNewProduct)
router.get('/getproducts', userController.getProducts)
router.post('/uploadimage', upload.single('photo'), userController.uploadImage)
router.post("/neworder", userController.newOrder)
module.exports = router
