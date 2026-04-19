const db = require("./../db");
const create = async ({ name, username, email, password }) => {
  /* const insertQuery =
    "insert into users (name, username,email,password) values (?,?,?,?) returning *"; */ //! (returning *) this code on the insert query used for mariadb on mysql 10.5 version . this code help us to have not to use a repeated a select query after insert like below  "select * from users where id=? "
  const insertQuery =
    "insert into users (name, username,email,password) values (?,?,?,?)";

  const [insertedUser] = await db.execute(insertQuery, [
    name,
    username,
    email,
    password,
  ]);
  const selectMainUser = "select * from users where id=? ";
  const user = await db.execute(selectMainUser, [insertedUser.insertedId]);
  return user[0][0];
};
const findByUsername = async (username) => {
  const query = "select * from users where username =?";
  const [user] = await db.execute(query, [username]);
  return user[0];
};

const findById = async (id) => {
  const query = "select * from users where id = ?";
  const [user] = await db.query(query, [id]);
  return user[0];
};

module.exports = { create, findByUsername, findById };
