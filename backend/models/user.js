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
 * @returns User model
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * Class to create a User object
   */
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.blackListIp, {
        foreignKey: "userId",
      });
      User.hasMany(models.ServiceAllow, {
        foreignKey: "userId",
      });
      User.hasMany(models.ScuRelation, {
        foreignKey: "userId",
      });
      User.hasMany(models.smscUserRelation, {
        foreignKey: "userId",
      });
      User.hasMany(models.sms, {
        foreignKey: "userId",
      });
      User.hasMany(models.ShortCodeApproval, {
        foreignKey: "userId",
      });
      User.hasMany(models.campaigns, {
        foreignKey: "userId",
      });
      User.hasMany(models.logs, {
        foreignKey: "userId",
      });
      User.hasMany(models.contactGroups, {
        foreignKey: "userId",
      });
    }
  }
  /**
   * User model data
   */
  User.init({
      /**
       * firstName of the user
       */
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * lastName of the user
       */
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * email of the user
       */
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      /**
       * login password of the user
       */
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * role of the user
       */
      role: {
        type: DataTypes.ENUM,
        values: ["Client", "Admin", "Super Admin"],
        defaultValue: "Client",
      },
      /**
       * id of the admin or superadmin who creates clients or admins
       */
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    /**
     * name of the model
     */
    {
      sequelize,
      modelName: "User",
    });
  return User;
};