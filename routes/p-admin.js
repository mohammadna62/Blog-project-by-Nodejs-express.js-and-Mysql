const express = require("express");
const controller = require("./../controllers/p-admin/tags");
const authGuard = require("../middlewares/authGuard");
const roleGuard = require("../middlewares/roleGuard");

const router = express.Router();

router
  .route("/tags")
  .get(authGuard, roleGuard("admin"), controller.showTagsManagement);
router
  .route("/create-article")
  .get(authGuard, roleGuard("admin"), controller.showCreateArticle);

module.exports = router;
