const User = require("./../repositories/users");
const Article = require("./../repositories/articles");

exports.home = async (req, res) => {
  const userId = req.user?.id;
  let user = null;
  if (userId) {
    user = await User.findById(userId);
  }

  res.render("index.ejs", {
    user,
  });
};

exports.search = async (req, res) => {
  const searchValue = req.query.q;
  const articles = await Article.searchInArticles(searchValue);

  return res.render("search.ejs", {
    articles,
    searchValue,
  });
};
