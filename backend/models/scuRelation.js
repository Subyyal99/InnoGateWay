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
 * @returns ScuRelation model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a ScuRelation object
     */
    class ScuRelation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ScuRelation.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: "CASCADE",
            });
            ScuRelation.belongsTo(models.ShortCode, {
                foreignKey: "shortCodeId",
                onDelete: "CASCADE",
            });
            ScuRelation.belongsTo(models.Service, {
                foreignKey: "serviceId",
                onDelete: "CASCADE",
            });
            ScuRelation.hasMany(models.sms, {
                foreignKey: "scuRelationId",
                onDelete: "CASCADE",
            });
        }
    }
    /**
     * RecievedSms model data
     */
    ScuRelation.init({
            /**
             * number of message allowed accross a shortcode to a user
             */
            numberOfMessageAllowed: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            /**
             * number of message sent accross a shortcode by a user
             */
            numberOfMessageSent: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            /**
             * amount of time after which the package will expire
             */
            expireAfter: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * name of the country for the package
             */
            country: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * status of the package
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Not Allowed", "Allowed"],
                defaultValue: "Allowed",
            },
        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "ScuRelation",
        });
    return ScuRelation;
};