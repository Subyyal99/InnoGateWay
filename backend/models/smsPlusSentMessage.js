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
 * @returns smsPlusSentMessage model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a smsPlusSentMessage object
     */
    class smsPlusSentMessage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            smsPlusSentMessage.belongsTo(models.recievedSms, {
                foreignKey: "recievedSmsId",
                onDelete: "CASCADE",
            });
            models.recievedSms.hasMany(smsPlusSentMessage, {
                foreignKey: "recievedSmsId",
            });
        }
    };
    /**
     * smsPlusSentMessage model data
     */
    smsPlusSentMessage.init({
            /**
             * shortCode of the sent message
             */
            shortCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * msisdn of the sent message
             */
            msisdn: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * message body of the sent message
             */
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * status of the sent message
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Accepted", "Rejected"],
                defaultValue: "Accepted",
            },
            /**
             * recievedSmsId of the sent message
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
            modelName: 'smsPlusSentMessage',
        });
    return smsPlusSentMessage;
};