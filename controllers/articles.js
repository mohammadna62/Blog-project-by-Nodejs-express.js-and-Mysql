const Article = require("./../repositories/articles");
const slugify = require("slugify");
exports.getAll = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    let { title, content, slug , tags} = req.body;
    slug = slugify(slug, {
      lower: true,
    });
    const author_id = req.user.id;
      
   const article = await Article.create({title, content, slug, author_id, cover:req.file?.filename});
    tags.forEach(async(tag)=>{
       await Article.addTag(article.id,Number(tag))
    })
    req.flash("success", "مقاله مورد نظر ایجاد شد");
    return res.redirect("/p-admins/create-article");
  } catch (err) {
    next(err);
  }
};
exports.getBySlug = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
