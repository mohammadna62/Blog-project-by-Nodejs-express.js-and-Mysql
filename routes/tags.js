const express = require("express");
const controller = require("./../controllers/tags");
const router = express.Router();

router.route("/").get(controller.getAll).post(controller.create);
//! Note: We user Ejs template engine so used post method in below line. in restfull api have to use DELETE method
router.route('/remove/:id').post(controller.remove)


module.exports = router;
