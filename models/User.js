const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favorites = sequelize.define('Favorite', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    baseCurrency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    targetCurrency: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    tableName: 'Favorites'
});

module.exports = Favorites;