const mysql = require("mysql2")
const configs = require("./configs")

const connection = mysql.createConnection({
    host:configs.db.host,
    port:configs.db.port,
    user:configs.db.user,
    password:configs.db.password,
    database:configs.db.dbName 
})


connection.connect((err)=>{
    if(err) throw err
    console.log("Connect To Database Successfully");
    
})


module.exports = connection