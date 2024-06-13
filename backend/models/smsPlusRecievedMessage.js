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
 * @returns SmsPlusRecievedMessage model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a SmsPlusRecievedMessage object
     */
    class SmsPlusRecievedMessage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            SmsPlusRecievedMessage.belongsTo(models.recievedSms, {
                foreignKey: "recievedSmsId",
                onDelete: "CASCADE",
            });
            models.recievedSms.hasMany(SmsPlusRecievedMessage, {
                foreignKey: "recievedSmsId",
            });
        }
    };
    /**
     * SmsPlusRecievedMessage model data
     */
    SmsPlusRecievedMessage.init({
            /**
             * shortCode of the recieve message
             */
            shortCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * msisdn of the recieve message
             */
            msisdn: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * message body of the recieve message
             */
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * status of the recieve message
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Accepted", "Rejected"],
                defaultValue: "Accepted",
            },
            /**
             * recievedSmsId of the recieve message
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
            modelName: 'smsPlusRecievedMessage',
        });
    return SmsPlusRecievedMessage;
};