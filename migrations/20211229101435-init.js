'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Country', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      name: {
          type: Sequelize.STRING,        
          allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }      
    });

    await queryInterface.createTable('User', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      name: {
          type: Sequelize.STRING,        
          allowNull: false,
      },
      email: {
          type: Sequelize.STRING,        
          allowNull: false,
          unique: true,
      },
      password: {
          type: Sequelize.STRING,        
          allowNull: false,
      },
      countryID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Country',
          key: 'id',
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }      
    });

    
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropAllTables();
  }
};
 