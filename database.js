const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("MyDB", "postgres", "t00r", {dialect: 'postgres', host:'localhost'});

module.exports = sequelize;