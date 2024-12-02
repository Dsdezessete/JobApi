const { Sequelize } = require("sequelize");
require("dotenv").config();

const dialect = process.env.DB_DIALECT || "sqlite";
const storage = process.env.DB_STORAGE || "./database.sqlite";
const host = process.env.DB_HOST || "localhost";
const username = process.env.DB_USERNAME || "postgres";
const password = process.env.DB_PASSWORD || "";
const database = process.env.DB_NAME || "my_database";

const sequelize =
  dialect === "sqlite"
    ? new Sequelize({
        dialect,
        storage,
        logging: false,
      })
    : new Sequelize(database, username, password, {
        host,
        dialect,
        logging: false,
      });

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

testConnection();

module.exports = sequelize;
