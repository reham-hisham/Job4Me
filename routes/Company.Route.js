const router = require('express').Router()
const post = require('../models/jopPost.model')
const CompanyPostController = require('../controllers/company/post.controller')
const companyProfileController = require('../controllers/company/profile.controller')
const companyAuth = require('../middleware/company')
router.post("/registration",companyProfileController.register)
router.post('/confirmation',companyProfileController.confiremOtp )
router.post('/login',companyProfileController.login)
router.post("/post",companyAuth, CompanyPostController.create);
 module.exports = router