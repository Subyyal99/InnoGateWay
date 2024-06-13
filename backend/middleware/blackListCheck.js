/**
 * models import
 */
const db = require("../models/index.js");
/**
 * middleware function to check ip of the logging in user
 */
checkIp = (req, res, next) => {
    db.blackListIp.findOne({
        where: {
            ip: req.body.ip,
        },
        include: [{
            model: db.User,
            allowNull: false,

        }]
    }).then((ip) => {
        if (ip) {
            db.User.findOne({
                where: {
                    creatorId: ip.User.dataValues.id,
                    email: req.body.email
                },
            }).then((data) => {
                if (data) {
                    db.logs.create({
                        message: `${data.dataValues.firstName} attempted to login from ip: ${ req.body.ip} blocked by admin ${ip.User.dataValues.firstName}`,
                        type: "ip",
                    });
                    res.status(400).send(`IP is blocked by admin ${ip.User.dataValues.firstName}`);
                    return;
                }
            });
        }
        next();
    });
};
/**
 * middleware function to check msisdn of the logging in user
 */
checkMsisdn = (req, res, next) => {
    db.blackListMsisdn.findOne({
        where: {
            msisdn: req.query.msisdn,
        },
        include: [{
            model: db.User,
            allowNull: false,
        }]
    }).then((msisdn) => {
        if (msisdn) {
            db.User.findOne({
                where: {
                    creatorId: msisdn.User.dataValues.id,
                },
            }).then((clientData) => {
                if (clientData) {
                    db.ShortCode.findOne({
                        where: {
                            shortCode: req.query.shortCode
                        }
                    }).then((shortCodeData) => {
                        if (shortCodeData) {
                            db.logs.create({
                                message: `${req.query.msisdn} is blocked by admin ${msisdn.User.dataValues.firstName}`,
                                type: "msisdn",
                                shortCodeId: shortCodeData.dataValues.id
                            });
                            res.status(400).send("Msisdn is blocked by admin");
                            return;
                        }
                    });

                }
            });
        }
        next();
    });
};
/**
 * blacklist check object exports functions in the router file
 */
const blackListCheck = {};
blackListCheck.checkIp = checkIp;
blackListCheck.checkMsisdn = checkMsisdn;
/**
 * Documentaion for an Object
 * BlackList check Object is exported to be used in other files
 * @blackListCheck
 */
module.exports = blackListCheck;