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
 * @returns RecievedSms model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a RecievedSms object
     */
    class RecievedSms extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            RecievedSms.belongsTo(models.ShortCode, {
                foreignKey: "shortCodeId",
            });
        }
    };
    /**
     * RecievedSms model data
     */
    RecievedSms.init({
            /**
             * msisdn of the message recieved
             */
            msisdn: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * type of the message to recieve
             */
            type: {
                type: DataTypes.ENUM,
                values: ["SmsPlus", "Televoting", "Other"],
                defaultValue: "Other",
            },

        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: 'recievedSms',
        });
    return RecievedSms;
};