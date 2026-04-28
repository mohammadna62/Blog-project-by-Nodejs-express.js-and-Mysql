const db = require("./../db");
const create = async ( {title, content, slug, author_id,cover} ) => {
  const insertQuery = "insert into articles (title, content, slug, author_id, cover) values (?,?,?,?,?)";
  const [insertedArticle] = await db.execute(insertQuery, [
    title,
    content,
    slug,
    author_id,
    cover,
  ]);

  const selectMainArticle = "select * from articles where id=?";
  const [article] = await db.execute(selectMainArticle, [
    insertedArticle.insertId,
  ]);
  return article[0];
};
const addTag = async (articleId, tagId) => {
  try {
    const query = "insert into articles_tags values (NULL,?,?)";
    const articles_tags = await db.execute(query, [articleId, tagId]);
    return true;
  } catch (err) {
    return false;
  }
};
const deleteOne = async (id) => {
  try {
    const query = "delete from articles where id = ?";
    await db.execute(query, [id]);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { create, addTag, deleteOne };
