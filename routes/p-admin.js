const express = require("express");
const controller = require("./../controllers/p-admin/tags");

const router = express.Router();

router.route("/tags").get(controller.showTagsManagment);

module.exports = router;
