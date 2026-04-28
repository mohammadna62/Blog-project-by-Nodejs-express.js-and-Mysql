const express = require("express");
const controller = require("./../controllers/p-admin/tags");
const authGuard = require("./../middlewares/authGuard")

const router = express.Router();

router.route("/tags").get(authGuard,controller.showTagsManagement);
router.route('/create-article').get(authGuard,controller.showCreateArticle)

module.exports = router;
