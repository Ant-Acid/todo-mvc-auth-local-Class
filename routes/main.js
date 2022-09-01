const express = require('express')  // import express
const router = express.Router() // create router
const authController = require('../controllers/auth')  // import auth controller
const homeController = require('../controllers/home') // import home controller
const { ensureAuth, ensureGuest } = require('../middleware/auth') // import auth middleware

router.get('/', homeController.getIndex) // get index
router.get('/login', authController.getLogin) // get login
router.post('/login', authController.postLogin) // post login
router.get('/logout', authController.logout) // get logout
router.get('/signup', authController.getSignup) // get signup
router.post('/signup', authController.postSignup) // post signup

module.exports = router // export router