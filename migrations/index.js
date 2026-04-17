const db = require("./../db");
const fs = require("fs");
const path = require("path");
const migrate = async () => {
  const connection = await db.getConnection();
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
  await connection.beginTransaction();
  try {
    await connection.query(createUsersTableSql);
    await connection.query(createArticlesTableSql);
    await connection.query(createTagsTableSql);
    await connection.query(createArticleTagsTableSql);
    await connection.commit();
  } catch (err) {
    await connection.rollback()
  }
};

migrate().then(()=>{
    console.log(`Migration ran successfully`);
    
}).catch(()=>db.end);
