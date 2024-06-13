const receivedMessageController = {};
const ReceivedMessageService = require("../services/receivedMessage.service.js");
const receivedMessageServiceObj = new ReceivedMessageService();
const db = require("../models/index.js");
const {
    Op
} = require("sequelize");

receivedMessageController.getMessages = async (req, res) => {
    try {
        // const users = await  receivedMessageServiceObj.mainSearchUsers({
        //     where: {

        //     },
        // });

        res.status(200).send({
            code: 200,
            message: "Search Data",
            users: users,
            ads: ads,
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = receivedMessageController;