"use strict";
/**
 * include model from sequelize
 */
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a logs object
     */
    class rows extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            rows.belongsTo(models.contactGroups, {
                foreignKey: "contactGroupId",
            });
            rows.hasMany(models.contacts, {
                foreignKey: "rowId",
            });
        }
    }
    /**
     * rows model data
     */
    rows.init({},
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "rows",
        });
    return rows;
};