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
 * @returns Sms model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a Sms object
     */
    class Sms extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Sms.belongsTo(models.User, {
                foreignKey: "userId",
                required: true
            });
            Sms.belongsTo(models.ShortCode, {
                foreignKey: "shortCodeId",
            });
            Sms.belongsTo(models.Service, {
                foreignKey: "serviceId",
            });
            Sms.belongsTo(models.ScuRelation, {
                foreignKey: "scuRelationId",
            });
            Sms.belongsTo(models.campaigns, {
                foreignKey: "campaignId",
            });
        }
    }
    /**
     * Sms model data
     */
    Sms.init({
            /**
             * number to send the sms from
             */
            from: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            /**
             * number to send the sms to
             */
            to: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * message body of the sms
             */
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * status of the sms
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Sent", "Rejected"],
                defaultValue: "Sent",
            },

        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "sms",
        });
    return Sms;
};