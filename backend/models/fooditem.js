'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FoodItem extends Model {
        static associate(models) {
            FoodItem.belongsTo(models.Category, { foreignKey: 'category_id', as: 'Category' });
        }
    }

    FoodItem.init(
        {
            name: DataTypes.STRING,
            quantity: DataTypes.DECIMAL,
            expiration_date: DataTypes.DATEONLY,
            category_id: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'FoodItem', // Make sure this matches the class name
        }
    );

    return FoodItem;
};
