const flash = require("express-flash");
const db = require("./../db");

const create = async ({ title, content, slug, author_id, cover }) => {
  const insertQuery =
    "insert into articles (title, content, slug, author_id, cover) values (?,?,?,?,?)";
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
const findTagArticles = async (tagId) => {
  try {
    const query = `SELECT
  articles.title,
  CONCAT(SUBSTRING(articles.content,4,100),'...') AS content,
  articles.slug,
  articles.cover,
  articles.created_at,
  users.name AS author,
  tags.title AS tag
  FROM articles_tags
  JOIN articles ON
  articles_tags.article_id = articles.id
  JOIN users ON
  users.id = articles.author_id
  JOIN tags ON
  articles_tags.tag_id = tags.id
  WHERE tag_id = ? ORDER BY created_at DESC;`;

  const [articles] = await db.execute(query, [tagId]);
    return articles;
  } catch (err) {
    return false;
  }
};
const findArticlesById = async (id) => {};
module.exports = { create, addTag, deleteOne, findTagArticles };
