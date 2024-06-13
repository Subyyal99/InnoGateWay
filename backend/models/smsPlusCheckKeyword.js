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
 * @returns smsPlusCheckKeyword model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a smsPlusCheckKeyword object
     */
    class smsPlusCheckKeyword extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            smsPlusCheckKeyword.belongsTo(models.recievedSms, {
                foreignKey: "recievedSmsId",
                onDelete: "CASCADE",
            });
            models.recievedSms.hasMany(smsPlusCheckKeyword, {
                foreignKey: "recievedSmsId",
            });
            smsPlusCheckKeyword.belongsTo(models.smsPlusBalanceDeduction, {
                foreignKey: "recievedSmsId",
                primaryKey: "recievedSmsId",
                onDelete: "CASCADE",
            });

        }
    };
    /**
     * smsPlusCheckKeyword model data
     */
    smsPlusCheckKeyword.init({
            /**
             * name of the service of message
             */
            serviceName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * keyword associated with messge
             */
            keyword: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * code of the message
             */
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * shortCode of the message
             */
            shortCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * promo code of the message
             */
            promoCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * price to send the message
             */
            price: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * currency of the price
             */
            currency: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * expiry date 
             */
            expiryDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            /**
             * name of the country or operator
             */
            countryoperator: {
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
             * status of the message
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Accepted", "Rejected"],
                defaultValue: "Accepted",
            },
            /**
             * id of the recieved sms
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
            modelName: 'smsPlusCheckKeyword',
        });
    return smsPlusCheckKeyword;
};