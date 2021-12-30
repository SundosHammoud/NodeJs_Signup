'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Country', 
      [
        {
          id: 1,
          name: 'Syria',
          createdAt: new Date()
        },
        {
          id: 2,
          name: 'Palestine',
          createdAt: new Date()
        },
        {
          id: 3,
          name: 'Lebanon',
          createdAt: new Date()
        },
        {
          id: 4,
          name: 'Jordan',
          createdAt: new Date()
        },
        {
          id: 5,
          name: 'Iraq',
          createdAt: new Date()
        },
        {
          id: 6,
          name: 'United Arab Emirates',
          createdAt: new Date()
        },
        {
          id: 7,
          name: 'Saudi Arebia',
          createdAt: new Date()
        },
        {
          id: 8,
          name: 'Qatar',
          createdAt: new Date()
        },
      ], 
      {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
