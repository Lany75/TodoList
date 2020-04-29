// on importe le module Sequelize
const { Sequelize } = require("sequelize");

// on importe le .env
require("dotenv").config();

// on crée une instance sequelize qui sert à se connecter à la bd
const db = new Sequelize(
  process.env.NAME_DB,
  process.env.USER_DB,
  process.env.PASSWORD_DB,
  { dialect: "postgres" }
);

// on test la connection à la base de données
async function test() {
  try {
    await db.authenticate();
    console.log("YES, on est connecté :)");
  } catch (error) {
    console.log("DOMMAGE, pas connecté :() ", error);
  }
}
test();

module.exports = db;
