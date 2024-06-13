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
 * @returns Service model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a Service object
     */
    class Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // AccountVerify.belongsTo(models.User, {
            //     foreignKey: "userId",
            //     onDelete: "CASCADE",
            // });
            Service.hasMany(models.ServiceAllow, {
                foreignKey: "serviceId",
            });
            Service.hasMany(models.ScuRelation, {
                foreignKey: "shortCodeId",
                onDelete: "CASCADE",
            });
            Service.hasMany(models.sms, {
                foreignKey: "serviceId",
            });
        }
    }
    /**
     * Service model data
     */
    Service.init({
            /**
             * name of the service
             */
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },


        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "Service",
        });
    return Service;
};