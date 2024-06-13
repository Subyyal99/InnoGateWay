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
 * @returns logs model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a logs object
     */
    class logs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            logs.belongsTo(models.ShortCode, {
                foreignKey: "shortCodeId",
            });
            logs.belongsTo(models.User, {
                foreignKey: "userId",
            });
        }
    }
    /**
     * logs model data
     */
    logs.init({
            /**
             * message of the log
             */
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * type of the log message
             */
            type: {
                type: DataTypes.ENUM,
                values: ["ip", "msisdn"],
            },
        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "logs",
        });
    return logs;
};