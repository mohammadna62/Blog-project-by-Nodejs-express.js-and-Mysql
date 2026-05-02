module.exports = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) {
      //* Api Base
      // return res.status(403).json({message : "Forbiden"})
      //* Ejs
      return res.redirect("/auth/login");
    }
    next();
  };
};
