const express = require("express");

const router = express.Router();
const todolistController = require("../controllers/todolist");

// on crée une fonction qui répond aux requetes GET pointant sur la racine du site (/)
router.get("/", async (request, response) => {
  const todos = await todolistController.afficherLesTaches();

  // on ordonne le tableau par ordre alphabethique
  todos.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  response.render("index.ejs", { todos });
});

router.post("/ajouter", async (request, response) => {
  await todolistController.ajouterUneTache(request.body.item);
  response.redirect("/");
});

router.get("/supprimer/:id", async (request, response) => {
  await todolistController.supprimerUneTache(request.params.id);
  response.redirect("/");
});

router.get("/modifier/:id", async (request, response) => {
  const id = request.params.id;
  response.render("modifier.ejs", { id });
});

router.post("/modifier/:id", async (request, response) => {
  await todolistController.modifierUneTache(
    request.params.id,
    request.body.newName
  );
  response.redirect("/");
});

// on crée une fonction qui gere les chemins non définis
router.use("*", (request, response) => {
  response.status(404).render("error.ejs");
});

module.exports = router;
