const express = require("express")
const controller = require("./../controllers/auth")
const registerSchema = require("./../validators/register")
const loginSchema = require("./../validators/login")
const validate = require("../middlewares/validate")

const router = express.Router()

router.route('/register').post(validate(registerSchema),controller.register)
router.route('/login').get(controller.showLoginView).post(validate(loginSchema),controller.login)
router.route('/refresh').post(controller.refresh)
router.route('/me').get(controller.getMe)
router.route('/logout').post(controller.logout)

router.get('/',(req , res)=>{
    res.render("index.ejs")
})

module.exports = router;