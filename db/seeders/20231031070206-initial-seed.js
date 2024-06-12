const { hashSync } = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        { name: 'Alex', email: '1@1', hashpass: hashSync('1', 10) },
        { name: 'Bob', email: '2@2', hashpass: hashSync('2', 10) },
        { name: 'Carl', email: '3@3', hashpass: hashSync('3', 10) },
        { name: 'Dave', email: '4@4', hashpass: hashSync('4', 10) },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
