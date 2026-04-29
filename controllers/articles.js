const sharp = require("sharp");
const Article = require("./../repositories/articles");
const slugify = require("slugify");
const path = require("path");
exports.getAll = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    let { title, content, slug, tags } = req.body;
    slug = slugify(slug, {
      lower: true,
    });
    const author_id = req.user.id;
    const fileBuffer = req.file.buffer;
    const coverPath = `./public/images/covers/${Date.now()}-${req.file.originalname}`;
    const extType = path.extname(req.file.originalname);

    if (extType === ".png") {
      sharp(fileBuffer)
        .png({
          quality: 60,
        })
        .toFile(coverPath);
    } else if (extType === ".jpeg" || extType === ".jpg") {
      sharp(fileBuffer)
        .jpeg({
          quality: 60,
        })
        .toFile(coverPath);
    } else {
      next(new Error("File Type Is Not Valid !"));
    }

    // const article = await Article.create({
    //   title,
    //   content,
    //   slug,
    //   author_id,
    //   cover: req.file?.filename,
    // });
    // tags.forEach(async (tag) => {
    //   await Article.addTag(article.id, Number(tag));
    // });
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
