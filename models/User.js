'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {
            User.belongsTo(models.Country);
        }
    };
    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        countryID: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'User'
    });
    return User;
}