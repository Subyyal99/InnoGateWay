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
 * @returns ShortCode model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a ShortCode object
     */
    class ShortCode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ShortCode.belongsTo(models.Smsc, {
                foreignKey: "smscId",
            });
            ShortCode.hasMany(models.ScuRelation, {
                foreignKey: "shortCodeId",
            });
            ShortCode.hasMany(models.recievedSms, {
                foreignKey: "shortCodeId",
            });
            ShortCode.hasMany(models.sms, {
                foreignKey: "shortCodeId",
            });
            ShortCode.belongsTo(models.campaigns, {
                foreignKey: "shortCodeId",
            });
            ShortCode.hasMany(models.logs, {
                foreignKey: "shortCodeId",
            });
        }
    }
    /**
     * ShortCode model data
     */
    ShortCode.init({
            /**
             * short code 
             */
            shortCode: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            /**
             * name of the country the short code belongs to
             */
            country: {
                type: DataTypes.STRING,
                allowNull: false,
            },

        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "ShortCode",
        });
    return ShortCode;
};