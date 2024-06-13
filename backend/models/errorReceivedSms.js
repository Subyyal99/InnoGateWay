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
 * @returns errorReceivedSms model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a errorReceivedSms object
     */
    class errorReceivedSms extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            errorReceivedSms.belongsTo(models.recievedSms, {
                foreignKey: "recievedSmsId",
                onDelete: "CASCADE",
            });
            models.recievedSms.hasMany(errorReceivedSms, {
                foreignKey: "recievedSmsId",
            });

        }
    };
    /**
     * errorReceivedSms model data
     */
    errorReceivedSms.init({
            /**
             * short code of the message
             */
            shortCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * msisdn of the message
             */
            msisdn: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * message body of error message
             */
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * name of the step at which the error occured
             */
            step: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * if of the recieved message
             */
            recievedSmsId: {
                type: DataTypes.INTEGER,
                onDelete: "CASCADE",
                allowNull: false,
                references: {
                    model: "recievedSms",
                    key: "id",
                },
            },


        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: 'errorReceivedSms',
        });
    return errorReceivedSms;
};