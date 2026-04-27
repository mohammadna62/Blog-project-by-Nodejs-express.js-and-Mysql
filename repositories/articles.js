const db = require("./../db");
const create = async ( title, content, slug, author_id ) => {
  const insertQuery = "insert into articles (title, content, slug, author_id) values (?,?,?,?)";
  const [insertedArticle] = await db.execute(insertQuery, [
    title,
    content,
    slug,
    author_id,
  ]);

  const selectMainArticle = "select * from articles where id=?";
  const articles = await db.execute(selectMainArticle, [
    insertedArticle.insertId,
  ]);
  return articles;
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
