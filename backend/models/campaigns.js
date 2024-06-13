'use strict';
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
 * @returns campaigns model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a campaigns object
     */
    class campaigns extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            campaigns.belongsTo(models.User, {
                foreignKey: "userId",
            });
            campaigns.hasMany(models.ShortCode, {
                foreignKey: "shortCodeId",
            });
        }
    };
    /**
     * campaigns model data
     */
    campaigns.init({
            /**
             * name of the campaign
             */
            campaignName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // to: {
            //     type: DataTypes.STRING,
            //     allowNull: false,
            // },
            /**
             * the code from which message are to be sent
             */
            from: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * message to send
             */
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * status of the campaign
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Draft", "Completed"],
                defaultValue: "Draft"
            },
            /**
             * send type of the campaign
             */
            sendType: {
                type: DataTypes.ENUM,
                values: ["Send It Now", "Schedule For Later", "Stagger My Campaign"],
            },
            /**
             * date to schedule start of the campaign
             */
            startScheduleDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            /**
             * date to schedule end of the campaign
             */
            endScheduleDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            /**
             * batch size of the messages to send
             */
            batchSize: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * number of hour between each batch of messages
             */
            betweenBatchHour: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * number of minutes between each batch of messages
             */
            betweenBatchMinutes: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * id of the short code from the message is sent
             */
            shortCodeId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // dontSendBefore: {
            //     type: DataTypes.DATE,
            //     allowNull: true,
            // },
            // dontSendAfter: {
            //     type: DataTypes.DATE,
            //     allowNull: true,
            // },

        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: 'campaigns',
        });
    return campaigns;
};