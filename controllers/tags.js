const Tag = require("./../repositories/tags");
const Article = require("./../repositories/articles");
const {calculateRelativeTimeDifference} =require("./../utils/funcs")

exports.getAll = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    return res.status(200).json(tags);
  } catch (err) {
    next(err);
  }
};
exports.create = async (req, res, next) => {
  try {
    const { title } = req.body;
    const tag = await Tag.create(title);
    return res.status(201).json(tag);
  } catch (err) {
    next(err);
  }
};
exports.findTagArticles = async (req, res, next) => {
  try {
    const tagTitle = req.params.slug;
     
    const tag = await Tag.findByTitle(tagTitle);
    
    const articles = await Article.findTagArticles(tag.id)
    
    articles.forEach(article =>{
      article.created_at = calculateRelativeTimeDifference(article.created_at);  
    }) 

    res.render("tagArticles.ejs",{
      tag:tag.title,
      articles,
    });
  } catch (err) {
    next(err);
  }
};
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Tag.remove(id);
    req.flash("success", "تگ مورد نظر با موفقیت حذف شد");
    return res.redirect("/p-admins/tags");
    //!API base
    // return res.json({message:"Tag Removed Successfully"});
  } catch (err) {
    next(err);
  }
};
exports.update = async (req, res, next) => {
  try {
    const { id, title } = req.body;
    const tags = await Tag.update(title, id);
    req.flash("success", "تگ مورد نظر با موفقیت ویرایش شد");
    return res.redirect("/p-admins/tags");
    //!API base
    // return res.json({message:"Tag Update Successfully"});
  } catch (err) {
    next(err);
  }
};
