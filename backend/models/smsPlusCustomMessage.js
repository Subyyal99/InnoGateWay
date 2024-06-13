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
 * @returns smsPlusCustomMessage model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a smsPlusCustomMessage object
     */
    class smsPlusCustomMessage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
        }
    }
    /**
     * smsPlusCustomMessage model data
     */
    smsPlusCustomMessage.init({
            /**
             * shortCode of the custom message
             */
            shortCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * reply of the custom message
             */
            reply: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * message body of custom message
             */
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "smsPlusCustomMessage",
        });
    return smsPlusCustomMessage;
};