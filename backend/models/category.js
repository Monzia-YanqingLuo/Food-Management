'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.FoodItem, { foreignKey: 'category_id', as: 'FoodItems' });
    }
  }

  Category.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'Category', // Make sure this matches the class name
      }
  );

  return Category;
};
