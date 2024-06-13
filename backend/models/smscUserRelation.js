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
 * @returns SmscUserRelation model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a SmscUserRelation object
     */
    class SmscUserRelation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            SmscUserRelation.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: "CASCADE",
            });
            SmscUserRelation.belongsTo(models.Smsc, {
                foreignKey: "smscId",
                onDelete: "CASCADE",
            });
        }
    }
    /**
     * SmscUserRelation model data
     */
    SmscUserRelation.init({
            /**
             * status of the user smsc
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
            modelName: "smscUserRelation",
        });
    return SmscUserRelation;
};