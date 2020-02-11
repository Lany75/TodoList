// on importe le module sequelize
const dataType = require('sequelize');

// on importe la base de données
const db = require('../db');

// on définit le model de todo qui ira dans la table todolist
const Todo = db.define ('todo', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: dataType.UUID
    },
    name: {
        allowNull: false,
        type: dataType.STRING(20)
    },
    createdAt: {
        field: 'created_at',
        allowNull: false,
        type: dataType.DATE
    },
    updatedAt:  {
        field: 'updated_at',
        allowNull: false,
        type: dataType.DATE
    }
});

module.exports = Todo;