// on importe le module Express
const express = require('express');
// on import le module ejs pour afficher les fichier avec cette extension
const ejs = require('ejs');
// on importe le module body-parser pour récupérer les données envoyés
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

// on importe le module de base de données
const db = require('./db');
// on importe un model de Todo
const todo = require('./models/todo');

// on se connecte à la base de donnée meldb
db.sync();

// on instancie un server Express
const app = express();

app.engine('ejs', ejs.renderFile);
//écrire cette ligne pour utiliser le bodyparser et récupérer les données
app.use(bodyParser.urlencoded({extended: false}));


// on crée une fonction qui répond aux requetes GET pointant sur la racine du site (/)
app.get('/', async (request, response) => {
    const todos = await todo.findAll({ raw: true });
    response.render('index.ejs', { todos });
});

app.post('/ajouter', async (request, response) => {
    const newTask = request.body.item;

    await todo.create({
        id: uuid(),
        name: newTask
    });

    response.redirect('/'); 
});

app.get('/supprimer/:id', async (request, response) => {
    const id = request.params.id;
    
    await todo.destroy({
        where: {id:id}
    });
    
    response.redirect('/');
});

app.get('/modifier/:id', async (request, response) => {
    const id = request.params.id;
    response.render('modifier.ejs', {id});
})

app.post('/modifier/:id', async (request, response) => {
    const newName = request.body.newName;
    const id = request.params.id;

    await todo.update({name:newName}, {where: {id:id}})
    response.redirect('/');
})

// on crée une fonction qui gere les chemins non définis
app.use('*', (request, response) => {
    response
        .status(404)
        .render('error.ejs');
});

// on démarre le serveur et on attend les requetes arrivant sur le port 8080 
app.listen(8080);