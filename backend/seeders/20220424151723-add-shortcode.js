'use strict';
/**
 * addShortCode_seed module
 * @module addShortCode_seed
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    /**
     * short code data to return when seeding is run
     */
    return queryInterface.bulkInsert('ShortCodes', [{
      shortCode: '2728',
      country: 'Nigeria',
      smscId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shortCode: '7000',
      country: 'Nigeria',
      smscId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shortCode: '7377',
      country: 'Nigeria',
      smscId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      shortCode: '7555',
      country: 'Nigeria',
      smscId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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