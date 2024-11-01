'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fooditems = [];
    const counts = 20;

    for (let i = 1; i <= counts; i++) {
      const expirationDate = new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
      expirationDate.setHours(0, 0, 0, 0);
      const fooditem = {  // Renamed to `fooditem` to avoid naming conflict
        name: `Food ${i}`,
        quantity: (Math.random() * 5).toFixed(2),
        expiration_date: expirationDate,
        category_id: Math.floor(Math.random() * 5) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      fooditems.push(fooditem);  // Add each `fooditem` to `fooditems` array
    }

    await queryInterface.bulkInsert('Fooditems', fooditems, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Fooditems', null, {});
  }
};
