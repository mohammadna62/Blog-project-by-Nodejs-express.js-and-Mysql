const db = require("./db");
const app = require("./app");
const configs = require("./configs");

async function startServer() {
  try {
    await db.getConnection();

    app.listen(configs.port, () => {
      console.log(`Server Running On Port ${configs.port}`);
    });
  } catch (err) {
    console.log("Error ->", err);
    db.end();
  }
}
startServer();
