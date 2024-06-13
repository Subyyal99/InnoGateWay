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
 * @returns selectedContactCampaigns model
 */
module.exports = (sequelize, DataTypes) => {
    /**
     * Class to create a selectedContactCampaigns object
     */
    class selectedContactCampaigns extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            selectedContactCampaigns.belongsTo(models.contactGroups, {
                foreignKey: "contactGroupId",
                onDelete: "CASCADE",
            });
            models.contactGroups.hasMany(selectedContactCampaigns, {
                foreignKey: "contactGroupId",
            });
            selectedContactCampaigns.belongsTo(models.campaigns, {
                foreignKey: "smsCampaignId",
                onDelete: "CASCADE",
            });
            models.campaigns.hasMany(selectedContactCampaigns, {
                foreignKey: "smsCampaignId",
            });
        }
    };
    /**
     * selectedContactCampaigns model data
     */
    selectedContactCampaigns.init({


        },
        /**
         * name of the model
         */
        {
            sequelize,
            modelName: 'selectedContactCampaigns',
        });
    return selectedContactCampaigns;
};