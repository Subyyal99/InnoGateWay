'use strict';
/**
 * include library to encryot password
 */
var bcrypt = require('bcryptjs');
/**
 * admin_seed module
 * @module admin_seed
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    /**
     * admin data to return when seeding is run
     */
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Mubashir',
      lastName: 'Asaad',
      email: 'admin@gmail.com',
      role: 'Admin',
      creatorId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: bcrypt.hashSync('asdasd', 8)
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};