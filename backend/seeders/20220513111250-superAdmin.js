'use strict';
/**
 * include library to encryot password
 */
var bcrypt = require('bcryptjs');
/**
 * superAdmin_seed module
 * @module superAdmin_seed
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
     * super admin data to return when seeding is run
     */
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Mubashir',
      lastName: 'Asaad',
      email: 'superAdmin@gmail.com',
      role: 'Super Admin',
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