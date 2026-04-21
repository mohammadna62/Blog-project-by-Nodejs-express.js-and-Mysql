const User = require("./../repositories/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configs = require("./../configs");

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    //*  Validation

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.accessTokenSecretKey,
      {
        expiresIn: configs.auth.accessTokenExpiresInSeconds + "s",
      },
    );
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.refreshTokenSecretKey,
      {
        expiresIn: configs.auth.refreshTokenExpiresInSeconds + "s",
      },
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    //! use below codes for api base project
    return res.status(201).json({
      accessToken,
      refreshToken: hashedRefreshToken,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  //*Validation
  const user = await User.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid Username or Password " });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Username or Password " });
  }
  const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.accessTokenSecretKey,
      {
        expiresIn: configs.auth.accessTokenExpiresInSeconds + "s",
      },
    );
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.refreshTokenSecretKey,
      {
        expiresIn: configs.auth.refreshTokenExpiresInSeconds + "s",
      },
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    //! use below codes for api base project
    return res.status(201).json({
      accessToken,
      refreshToken: hashedRefreshToken,
    });
};

exports.refresh = async (req, res, next) => {};

exports.getMe = async (req, res, next) => {};

exports.logout = async (req, res, next) => {};
