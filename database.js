const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];
const { Sequelize } = require("sequelize");
//const sequelize = new Sequelize("MyDB", "postgres", "t00r", {dialect: 'postgres', host:'localhost'});
console.log(config.database + " - "+ config.username + " - "+ config.password);
const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;