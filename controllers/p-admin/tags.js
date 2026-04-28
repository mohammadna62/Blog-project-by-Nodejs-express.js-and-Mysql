const Tag = require("./../../repositories/tags");
exports.showTagsManagement = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();

    return res.render("p-admin/tags.ejs", { tags });
  } catch (err) {
    next(err);
  }
};

exports.showCreateArticle = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();

    return res.render("p-admin/createArticle.ejs", { tags });
  } catch (err) {
    next(err);
  }
};
