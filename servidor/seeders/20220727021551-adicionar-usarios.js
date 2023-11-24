'use strict';
const crypto = require('../crypto');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      { name: 'John Doe', password: crypto.encrypt('123') },
      { name: 'Picolo', password: crypto.encrypt('123') }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};