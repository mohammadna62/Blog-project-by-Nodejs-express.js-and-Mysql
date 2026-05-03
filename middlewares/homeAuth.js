const jwt = require("jsonwebtoken");
const configs = require("../configs");

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.cookies["access-token"];

    if (accessToken) {
      const decoded = jwt.verify(
        accessToken,
        configs.auth.accessTokenSecretKey,
      );

      if (decoded) {
        req.user = decoded;

        next();
      } else {
        next()
      }
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
};
