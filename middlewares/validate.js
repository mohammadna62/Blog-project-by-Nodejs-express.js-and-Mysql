module.exports = (validator, path) => {
  return async (req, res, next) => {
    try {
      await validator.validate(req.body);
      next();
    } catch (err) {
       req.flash("error", err.errors);
      return res.redirect(path)
      //! use below codes for api base project
      // return res.status(400).json({error : err.errors[0] })
    }
  };
};
