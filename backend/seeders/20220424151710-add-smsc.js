'use strict';
/**
 * addSmsc_seed module
 * @module addSmsc_seed
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
     * smsc data to return when seeding is run
     */
    return queryInterface.bulkInsert('Smscs', [{
      name: 'test',
      country: 'Pakistan',
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