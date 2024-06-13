"use strict";
/**
 * include model from sequelize
 */
const {
  Model
} = require('sequelize');
/**
 * exporting model to create
 * @param sequelize sequelize library 
 * @param DataTypes data type of the fields in table
 * @returns contact model
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * Class to create a contact object
   */
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contact.belongsTo(models.customContactFields, {
        foreignKey: "customContactFieldId",
      });
      contact.belongsTo(models.rows, {
        foreignKey: "rowId",
      });
    }
  }
  /**
   * contact model data
   */
  contact.init({
      /**
       * name of the contact
       */
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customContactFieldId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "customContactFields",
          key: "id",
        },
      },
    },
    /**
     * name of the model
     */
    {
      sequelize,
      modelName: "contacts",
    });
  return contact;
};