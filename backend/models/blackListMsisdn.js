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
 * @returns blacklist msisdn model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a blackListMsisdn object
     */
    class blackListMsisdn extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            blackListMsisdn.belongsTo(models.User, {
                foreignKey: "userId",
                onDelete: "CASCADE",
            });
            models.User.hasMany(blackListMsisdn, {
                foreignKey: "userId",
            });
        }
    }
    /**
     * blacklist msisdn model data
     */
    blackListMsisdn.init({
            /**
             * msisdn of the user
             */
            msisdn: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * reason to block msisdn
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
            modelName: "blackListMsisdn",
        });
    return blackListMsisdn;
};