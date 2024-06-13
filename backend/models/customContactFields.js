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
 * @returns customContactFields model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a contact object
     */
    class customContactFields extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            customContactFields.belongsTo(models.contactGroups, {
                foreignKey: "contactGroupId",
            });
            customContactFields.hasMany(models.contacts, {
                foreignKey: "customContactFieldId",
            });
        }
    }
    /**
     * contact model data
     */
    customContactFields.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            columnName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            required: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            displayInContactList: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },

        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "customContactFields",
        });
    return customContactFields;
};