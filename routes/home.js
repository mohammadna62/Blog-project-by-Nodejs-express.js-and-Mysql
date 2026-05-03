const express = require("express")
const controller = require("./../controllers/home")
const homeAuth = require("../middlewares/homeAuth")

const router = express.Router()

router.route('/').get(homeAuth,controller.home)
router.route('/search').get(homeAuth,controller.search)




module.exports = router