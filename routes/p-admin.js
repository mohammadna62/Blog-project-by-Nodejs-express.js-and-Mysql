const express = require("express");
const controller = require("./../controllers/p-admin/tags");
const authGuard = require("./../middlewares/authGuard")

const router = express.Router();

router.route("/tags").get(authGuard,controller.showTagsManagement);

module.exports = router;
