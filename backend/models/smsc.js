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
 * @returns Smsc model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a Smsc object
     */
    class Smsc extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Smsc.hasMany(models.ShortCode, {
                foreignKey: "smscId",
            });
            Smsc.hasMany(models.smscUserRelation, {
                foreignKey: "smscId",
            });
            Smsc.hasMany(models.ShortCodeApproval, {
                foreignKey: "smscId",
            });
        }
    }
    /**
     * Smsc model data
     */
    Smsc.init({
            /**
             * name of the smsc
             */
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * country name of the smsc
             */
            country: {
                type: DataTypes.STRING,
            },
            /**
             * id of the smsc
             */
            smscId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "Smsc",
        });
    return Smsc;
};