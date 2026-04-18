const db = require("./../db");
const create = async ({ name, username, email, password }) => {
  const insertQuery =
    "insert into users (name, username,email,password) values (?,?,?,?)";

  const [user] = await db.execute(insertQuery, [
    name,
    username,
    email,
    password,
  ]);
  return user[0];
};
const findByUsername = async (username)=>{
  const query = "select * from users where username =?"
  const [user] = await db.execute(query,[username])
  return user[0]
}

const findById = async (id)=>{
    const query ="select * from users where id = ?"
    const [user] = await db.query(query , [id])
    return user[0]
}


module.exports = { create , findByUsername , findById};
