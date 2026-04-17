const db = require("./../db");
const fs = require("fs");
const path = require("path");
const migrate = async () => {
  const createUsersTableSql = fs.readFileSync(
    path.resolve(__dirname, "./users-ddl.sql"),
    "utf8",
  );
  const createArticlesTableSql = fs.readFileSync(
    path.resolve(__dirname, "./articles-ddl.sql"),
    "utf8",
  );

  const createTagsTableSql = fs.readFileSync(
    path.resolve(__dirname, "./tags-ddl.sql"),
    "utf8",
  );
  const createArticleTagsTableSql = fs.readFileSync(
    path.resolve(__dirname, "./articles-tags-ddl.sql"),
    "utf8",
  );
  try {
    db.query(createUsersTableSql);
    db.query(createArticlesTableSql);
    db.query(createTagsTableSql);
    db.query(createArticleTagsTableSql);
  } catch (err) {
    throw err;
  }
};

migrate();
