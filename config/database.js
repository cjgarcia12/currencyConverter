const { Sequelize } = require('sequelize');

// Setup a Sequelize instance for SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory'
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
