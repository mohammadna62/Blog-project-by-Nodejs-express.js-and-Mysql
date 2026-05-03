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
const searchInArticles = async (searchValue) => {
  try {
    const query = `
        SELECT
       articles.id,
       articles.title,
       articles.content,
       articles.slug,
       articles.cover,
       users.name AS author,
       tags.title AS tag
       FROM articles
       JOIN articles_tags ON
       articles_tags.article_id = articles.id
       JOIN tags ON
       articles_tags.tag_id = tags.id
       JOIN users ON
       users.id = articles.author_id
        WHERE 
            articles.title LIKE CONCAT('%', ?, '%')
            OR slug LIKE CONCAT('%', ?, '%')
            OR content LIKE CONCAT('%', ?, '%')
        GROUP BY articles.id    
    `;
    const [articles] = await db.execute(query, [
      searchValue,
      searchValue,
      searchValue,
    ]);
    return articles;
  } catch (err) {
    next(err);
  }
};
const findAll = async () => {
  const query = `SELECT 
    a.id,
    a.title,
    CONCAT(SUBSTRING(a.content, 1, 200), '...') AS content,
    a.slug,
    a.created_at,
    a.updated_at,
    a.cover,
    u.id AS user_id,
    u.name AS user_name,
    u.avatar AS profile
    FROM articles a
    JOIN users u ON
    u.id = a.author_id
    ORDER BY a.id DESC;`;

  const [articles] = await db.execute(query);

  const formattedArticles = [];

  for (const article of articles) {
    const [tags] = await db.execute(
      `SELECT t.* FROM articles_tags ta
    JOIN tags t ON
    t.id = ta.tag_id
    WHERE ta.article_id = ?`,
      [article.id]
    );

    console.log(article);
    console.log(tags);
    console.log(`---------------------------------------`);
  }

  return formattedArticles;
};
module.exports = {
  create,
  addTag,
  deleteOne,
  findTagArticles,
  searchInArticles,
  findAll,
};
