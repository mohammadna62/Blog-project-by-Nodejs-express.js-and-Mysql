const express = require("express");
const controller = require("./../controllers/tags");
const authGuard = require("./../middlewares/authGuard")
const router = express.Router();

router.route("/").get(controller.getAll).post(controller.create);
//! Note: We user Ejs template engine so used post method in below line. in RESTful API have to use DELETE method
router.route('/remove/:id').post(authGuard,controller.remove)


module.exports = router;
