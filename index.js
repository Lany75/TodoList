// on importe le module Express
const express = require("express");
// on import le module ejs pour afficher les fichier avec cette extension
const ejs = require("ejs");
// on importe le module body-parser pour récupérer les données envoyés
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");

// on importe le routeur index.js du dossier routes à utiliser
const routes = require("./routes");

// on importe le module de base de données
const db = require("./database/config/db");

// on se connecte à la base de donnée
db.sync();

// on instancie un server Express
const app = express();

app.engine("ejs", ejs.renderFile);

//écrire cette ligne pour utiliser le bodyparser et récupérer les données
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

// on démarre le serveur et on attend les requetes arrivant sur le port 8080
app.listen(8080);
