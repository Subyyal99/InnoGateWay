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
 * @returns smsPlusBalanceDeduction model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a SmscUserRelation object
     */
    class smsPlusBalanceDeduction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            smsPlusBalanceDeduction.belongsTo(models.recievedSms, {
                foreignKey: "recievedSmsId",
                onDelete: "CASCADE",
            });
            models.recievedSms.hasMany(smsPlusBalanceDeduction, {
                foreignKey: "recievedSmsId",
            });
            smsPlusBalanceDeduction.hasOne(models.smsPlusCheckKeyword, {
                foreignKey: "recievedSmsId",
                primaryKey: "recievedSmsId",
                onDelete: "CASCADE",
            });
            smsPlusBalanceDeduction.hasOne(models.teleVotingCheckKeyword, {
                foreignKey: "recievedSmsId",
                primaryKey: "recievedSmsId",
                onDelete: "CASCADE",
            });
            // SmsPlusRecievedMessage.belongsTo(models.User, {
            //     foreignKey: "userTo",
            //     as: "notificationReceiver",
            // });
        }
    };
    /**
     * smsPlusBalanceDeduction model data
     */
    smsPlusBalanceDeduction.init({
            /**
             * shortcode of the balance deduction message
             */
            shortCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * msisdn of the balance deduction message
             */
            msisdn: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * message body of the balance deduction message
             */
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * stuts of the balance deduction
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Accepted", "Rejected"],
                defaultValue: "Accepted",
            },
            /**
             * recieve sms id
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
            modelName: 'smsPlusBalanceDeduction',
        });
    return smsPlusBalanceDeduction;
};