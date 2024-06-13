"use strict";
/**
 * include model from sequelize
 */
const {
    Model
} = require("sequelize");
/**
 * exporting model to create
 * @param sequelize sequelize library 
 * @param DataTypes data type of the fields in table
 * @returns blacklist ip model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a blackListIp object
     */
    class blackListIp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            blackListIp.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: "CASCADE",
            });

        }
    }
    /**
     * blacklist ip model data
     */
    blackListIp.init({
            /**
             * ip of the user
             */
            ip: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * reason to block ip
             */
            reason: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * id of the user 
             */
            userId: {
                type: DataTypes.INTEGER,
                onDelete: "CASCADE",
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },

        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "blackListIp",
        });
    return blackListIp;
};