const router = require('express').Router()
const post = require('../models/jopPost.model')
const multer = require("multer");
const upload = multer({ dest: "images/" });
const jopPostController = require('../controllers/company/jobpost.controller')
const CompanyPostController = require('../controllers/company/post.controller')
const companyProfileController = require('../controllers/company/profile.controller')
const companyAuth = require('../middleware/company')
router.post("/registration",companyProfileController.register)
router.post('/confirmation',companyProfileController.confiremOtp )
router.post('/login',companyProfileController.login)
router.post("/post",companyAuth, CompanyPostController.create);
router.post("/logout",companyAuth, companyProfileController.logout);
router.get("/profile", companyAuth , companyProfileController.getCompanyData)
router.post(
    "/companyImage",
    companyAuth,
    upload.single("companyImage"),
  
    companyProfileController.uploadProfileImage
  );
  router.post('/edit' , companyAuth , companyProfileController.edit)
 module.exports = router