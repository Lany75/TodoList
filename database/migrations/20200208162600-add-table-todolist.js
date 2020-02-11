module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`CREATE TABLE todos (
            id UUID NOT NULL PRIMARY KEY,
            name VARCHAR(20),
            created_at DATE NOT NULL,
            updated_at DATE NOT NULL
        )`);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(`DROP TABLE todos`);
    }
}