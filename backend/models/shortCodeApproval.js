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
 * @returns ShortCodeApproval model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a ShortCodeApproval object
     */
    class ShortCodeApproval extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ShortCodeApproval.belongsTo(models.User, {
                foreignKey: "userId",
            });
            ShortCodeApproval.belongsTo(models.Smsc, {
                foreignKey: "smscId",
            });
        }
    }
    /**
     * ShortCodeApproval model data
     */
    ShortCodeApproval.init({
            /**
             * msg id type
             */
            msgIdType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            /**
             * host of the short code
             */
            host: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * port of the short code
             */
            port: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            /**
             * name of the billing operator
             */
            billingOperator: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * channel of the short code
             */
            channel: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * type of the short code
             */
            type: {
                type: DataTypes.ENUM,
                values: ["receiver", "transmitter", "both"],
                defaultValue: "receiver",
                allowNull: false,
            },
            /**
             * recieve port of the short code
             */
            receivePort: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * log file of the short code
             */
            logFile: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * username of the smsc 
             */
            smscUsername: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * password of the smsc 
             */
            smscPassword: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * system type
             */
            systemType: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * delay between reconnection
             */
            reconnectDelay: {
                type: DataTypes.INTEGER,
                defaultValue: 10,
                allowNull: false,
            },
            /**
             * interval between enquire link
             */
            enquireLinkInterval: {
                type: DataTypes.INTEGER,
                defaultValue: 10,
                allowNull: false,
            },
            /**
             * address range of the short code 
             */
            addressRange: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * sourceAddrTon of the short code
             */
            sourceAddrTon: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            /**
             * sourceAddrNpi of the short code
             */
            sourceAddrNpi: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            /**
             * destAddrTon of the short code
             */
            destAddrTon: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            /**
             * destAddrNpi of the short code
             */
            destAddrNpi: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            /**
             * service type of the short code
             */
            serviceType: {
                type: DataTypes.INTEGER,
                defaultValue: 3138,
                allowNull: false,
            },
            /**
             * altCharset of the short code
             */
            altCharset: {
                type: DataTypes.STRING,
                defaultValue: "LATIN1",
                allowNull: false,
            },
            /**
             * allowedSmscId of the short code
             */
            allowedSmscId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            /**
             * deniedSmscId of the short code
             */
            deniedSmscId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            /**
             * throughput of the short code
             */
            throughput: {
                type: DataTypes.INTEGER,
                defaultValue: 10,
                allowNull: false,
            },
            /**
             * flowControl of the short code
             */
            flowControl: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            /**
             * maxPendingSubmits of the short code
             */
            maxPendingSubmits: {
                type: DataTypes.INTEGER,
                defaultValue: 10,
                allowNull: false,
            },
            /**
             * smscPassword of the short code
             */
            smscPassword: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * systemType of the short code
             */
            systemType: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            /**
             * waitAck of the short code
             */
            waitAck: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                allowNull: false,
            },
            /**
             * waitAckExpire of the short code
             */
            waitAckExpire: {
                type: DataTypes.STRING,
                defaultValue: 0x02,
                allowNull: false,
            },
            /**
             *id of the user
             */
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            /**
             * status of the short code approval request
             */
            status: {
                type: DataTypes.ENUM,
                values: ["Pending Super Admin", "Pending Configuration", "Accepted", "Rejected"],
                defaultValue: "Pending Super Admin",
                allowNull: false,
            },
        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: "ShortCodeApproval",
        });
    return ShortCodeApproval;
};