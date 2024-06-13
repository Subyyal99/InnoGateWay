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
 * @returns contactGroup model
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * Class to create a contactGroup object
   */
  class contactGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      contactGroup.belongsTo(models.User, {
        foreignKey: "userId",
      });
      contactGroup.hasMany(models.contacts, {
        foreignKey: "contactGroupId",
      });
      contactGroup.hasMany(models.customContactFields, {
        foreignKey: "contactGroupId",
      });
      contactGroup.hasMany(models.rows, {
        foreignKey: "contactGroupId",
      });
      // define association here
    }
  }
  /**
   * contact model data
   */
  contactGroup.init({
      /**
       * name of the contact group
       */
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    /**
     * name of the model
     */
    {
      sequelize,
      modelName: "contactGroups",
    });
  return contactGroup;
};