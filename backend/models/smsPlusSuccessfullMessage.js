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
 * @returns smsPlusSuccessfullMessage model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a smsPlusSuccessfullMessage object
     */
    class smsPlusSuccessfullMessage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            smsPlusSuccessfullMessage.belongsTo(models.recievedSms, {
                foreignKey: "recievedSmsId",
                onDelete: "CASCADE",
            });
            models.recievedSms.hasMany(smsPlusSuccessfullMessage, {
                foreignKey: "recievedSmsId",
            });
        }
    };
    /**
     * smsPlusSuccessfullMessage model data
     */
    smsPlusSuccessfullMessage.init({
            /**
             * shortCode of the successfull message
             */
            shortCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * msisdn of the successfull message
             */
            msisdn: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * message body of the successfull message
             */
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * status of the successfull message
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Accepted", "Rejected"],
                defaultValue: "Accepted",
            },
            /**
             * recievedSmsId of the successfull message
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
            modelName: 'smsPlusSuccessfullMessage',
        });
    return smsPlusSuccessfullMessage;
};