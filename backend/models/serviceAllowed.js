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
 * @returns ServiceAllow model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a Service object
     */
    class ServiceAllow extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ServiceAllow.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: "CASCADE",
            });
            ServiceAllow.belongsTo(models.Service, {
                foreignKey: "serviceId",
                onDelete: "CASCADE",
            });
        }
    }
    /**
     * ServiceAllow model data
     */
    ServiceAllow.init({
            /**
             * status of the service
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Not Allowed", "Allowed"],
                defaultValue: "Not Allowed",
            },
            /**
             * deleted flag to delete service
             */
            isDeleted: {
                type: DataTypes.ENUM,
                values: ["0", "1"],
                defaultValue: "0",
            },


        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "ServiceAllow",
        });
    return ServiceAllow;
};