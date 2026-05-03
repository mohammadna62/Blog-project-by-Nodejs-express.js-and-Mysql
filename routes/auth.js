const express = require("express");
const controller = require("./../controllers/auth");
const registerSchema = require("./../validators/register");
const loginSchema = require("./../validators/login");
const validate = require("../middlewares/validate");

const router = express.Router();

router
  .route("/register")
  .get(controller.showRegisterShowView)
  .post(validate(registerSchema, "/auth/register"), controller.register);
router
  .route("/login")
  .get(controller.showLoginView)
  .post(validate(loginSchema, "/auth/login"), controller.login);
router.route("/refresh").post(controller.refresh);
router.route("/me").get(controller.getMe);
router.route("/logout").post(controller.logout);
router.route("/captcha").get(controller.getCaptcha);

module.exports = router;
