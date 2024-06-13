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
 * @returns teleVotingCheckKeyword model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a teleVotingCheckKeyword object
     */
    class teleVotingCheckKeyword extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            teleVotingCheckKeyword.belongsTo(models.recievedSms, {
                foreignKey: "recievedSmsId",
                onDelete: "CASCADE",
            });
            models.recievedSms.hasMany(teleVotingCheckKeyword, {
                foreignKey: "recievedSmsId",
            });
            teleVotingCheckKeyword.belongsTo(models.smsPlusBalanceDeduction, {
                foreignKey: "recievedSmsId",
                primaryKey: "recievedSmsId",
                onDelete: "CASCADE",
            });
            // teleVotingRecievedMessage.belongsTo(models.User, {
            //     foreignKey: "userTo",
            //     as: "notificationReceiver",
            // });
        }
    };
    /**
     * teleVotingCheckKeyword model data
     */
    teleVotingCheckKeyword.init({
            /**
             * serviceName of the televoting check keyword message
             */
            serviceName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * keyword of the televoting check keyword message
             */
            keyword: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * shortCode of the televoting check keyword message
             */
            shortCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * price of the televoting check keyword message
             */
            price: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * currency of the televoting check keyword message
             */
            currency: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * countryoperator of the televoting check keyword message
             */
            countryoperator: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * msisdn of the televoting check keyword message
             */
            msisdn: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * channel of the televoting check keyword message
             */
            channel: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * status of the televoting check keyword message
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Accepted", "Rejected"],
                defaultValue: "Accepted",
            },
            /**
             * recievedSmsId of the televoting check keyword message
             */
            recievedSmsId: {
                type: DataTypes.INTEGER,
                onDelete: "CASCADE",
                allowNull: false,
                references: {
                    model: "recievedSms",
                    key: "id",
                },
            },

        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: 'teleVotingCheckKeyword',
        });
    return teleVotingCheckKeyword;
};