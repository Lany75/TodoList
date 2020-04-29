const uuid = require("uuid/v4");

const Todo = require("../models/todoModel");

module.exports = {
  afficherLesTaches: async () => {
    const todos = await Todo.findAll({ raw: true });
    return todos;
  },

  ajouterUneTache: async (newTask) => {
    await Todo.create({
      id: uuid(),
      name: newTask,
    });
  },

  supprimerUneTache: async (id) => {
    await Todo.destroy({
      where: { id: id },
    });
  },

  modifierUneTache: async (id, newName) => {
    await Todo.update({ name: newName }, { where: { id: id } });
  },
};
