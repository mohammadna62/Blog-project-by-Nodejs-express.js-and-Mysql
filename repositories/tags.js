const db = require("./../db");

const create = async (title) => {
  try {
    const query = "insert into tags (title) values (?)";
    const [insertedTag] = await db.execute(query, [title]);
    const selectMainTag = "select * from tags where id=?";
    const tag = await db.execute(selectMainTag, [insertedTag.insertId]);
    return tag[0][0];
  } catch (err) {
    throw err;
  }
};

const findByTitle = async (title) => {
  try {
    const query = "select * from tags where title =?";
    const [tag] = await db.execute(query, [title]);
    return tag[0][0];
  } catch (err) {
    throw err;
  }
};

const findAll = async () => {
  try {
    const query = "select * from tags";
    const [tags] = await db.execute(query);
    return tags;
  } catch (err) {
    throw err;
  }
};

const remove = async (id) => {
  try {
    const query = "delete from tags where id = ?";
    await db.execute(query, [id]);

    return true;
  } catch (error) {
    throw err;
  }
};

module.exports = {
  create,
  findByTitle,
  findAll,
  remove,
};
