'use strict';
/**
 * addService_seed module
 * @module addService_seed
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
     * services data to return when seeding is run
     */
    return queryInterface.bulkInsert('Services', [{
      name: 'Single Sms',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Bulk Sms',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Campaigns',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'SMS Plus',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Televoting',
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