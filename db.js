// on importe le module Sequelize
const {Sequelize} = require ('sequelize');

//on crée une constante avec les infos de config de la bd
const dbConfig = {
    namedb: 'meldb',
    user: 'mel',
    password: 'mel',
};

// on crée une instance sequelize qui sert à se connecter à la bd
const db = new Sequelize(
    dbConfig.namedb,
    dbConfig.user,
    dbConfig.password,
    {dialect: 'postgres'}
);

// on test la connection à la base de données
async function test() {
    try {
       await db.authenticate();
       console.log("YES, on est connecté :)");
    } catch (error) {
       console.log('DOMMAGE, pas connecté :() ', error);
    }
}
test();

module.exports = db;