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
 * @returns templates model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a templates object
     */
    class templates extends Model {
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
     * templates model data
     */
    templates.init({
            /**
             * name of the template
             */
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * message body of the template
             */
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * code to send the message from of the template
             */
            from: {
                type: DataTypes.STRING,
                allowNull: true,
            },

        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "templates",
        });
    return templates;
};