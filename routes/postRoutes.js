const express = require('express')
const router = express.Router()
const postController = require('../controllers/postControllers')
const authController = require('../controllers/authController')
const authMW =require('../middlewares/authMW')
const redirectIfAuthedMW = require('../middlewares/redirectIfAuthedMW')
const validateMW = require('../middlewares/validationMW')

router.post('/posts/store', authMW, validateMW,postController.postBlog)
router.post('/users/login', redirectIfAuthedMW,authController.loginUser)
router.post('/users/register',redirectIfAuthedMW,authController.registerUser)

module.exports = router