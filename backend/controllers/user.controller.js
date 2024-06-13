/**
 * User_Controller_Functions module
 * @module User_Controller_Functions
 */
/**
 * All functions for user data are in this file
 */

/**
 * user controller object exports functions in the controller file
 */
const userController = {};
/**
 * user service file import
 */
const UserService = require("../services/user.service.js");
/**
 * user service class object to access user services
 */
const userServiceObj = new UserService();
/**
 * including config file to access links
 */
const link = require("../config/url.js");
/**
 *including bcrypt library to encrypt password
 */
const bcrypt = require("bcryptjs");
/**
 * function to register user 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns user
 */
userController.registerUser = async (req, res) => {
  try {

    req.body.password = bcrypt.hashSync(req.body.password, 8);
    req.body.creatorId = req.userId
    const user = await userServiceObj.insertOrUpdate(req.body);
    res.status(200).send({
      code: 200,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to get all admin users
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns all admin users
 */
userController.getAllAdmins = async (req, res) => {
  try {
    const clientAccounts = await userServiceObj.getClients({
      where: {
        role: "Admin",
        creatorId: req.userId
      }
    });

    res.status(200).send({
      code: 200,
      message: "Client Accounts Retrieved Successfully",
      data: clientAccounts,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to get admin user by id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns admin user according to the id provided
 */
userController.getAdminById = async (req, res) => {
  try {
    const clientAccounts = await userServiceObj.getuser({
      where: {
        role: "Admin",
        id: req.body.userId
      }
    });

    res.status(200).send({
      code: 200,
      message: "Client Accounts Retrieved Successfully",
      data: clientAccounts,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to get all Client users
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns all client users
 */
userController.getAllClients = async (req, res) => {
  try {
    const clientAccounts = await userServiceObj.getClients({
      where: {
        role: "Client",
        creatorId: req.userId
      }
    });

    res.status(200).send({
      code: 200,
      message: "Client Accounts Retrieved Successfully",
      data: clientAccounts,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to get admin user by id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns client user according to the id provided
 */
userController.getClient = async (req, res) => {
  try {
    const clientAccounts = await userServiceObj.getClients({
      where: {
        id: req.body.id
      }
    });

    res.status(200).send({
      code: 200,
      message: "Client Accounts Retrieved Successfully",
      data: clientAccounts,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to get client info by id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns client info by id
 */
userController.getClientInfo = async (req, res) => {
  try {
    const clientAccounts = await userServiceObj.getClients({
      where: {
        id: req.body.userId
      }
    });

    res.status(200).send({
      code: 200,
      message: "Client Accounts Retrieved Successfully",
      data: clientAccounts,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to update client information
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns updated client user information
 */
userController.getUpdateClients = async (req, res) => {
  try {
    if (!req.body.password) {
      delete req.body["password"];

    } else {
      req.body.password = bcrypt.hashSync(req.body.password, 8);
    }
    delete req.body["confirmPassword"];
    const clientAccount = await userServiceObj.updateClients(req.body);
    res.status(200).send({
      code: 200,
      message: "Client Account Updated Successfully",
      data: clientAccount,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
/**
 * function to get client info by id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns client info by id
 */
userController.getClient = async (req, res) => {
  try {

    const clientAccount = await userServiceObj.getuser({
      where: {
        id: req.body.id
      }
    });

    res.status(200).send({
      code: 200,
      message: "Client Account Retrieved Successfully",
      data: clientAccount,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to delete client user by id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns client user is deleted according to id
 */
userController.deleteClient = async (req, res) => {
  try {
    const clientAccount = await userServiceObj.delete(req.body.id);

    res.status(200).send({
      code: 200,
      message: "Client Account Deleted Successfully",
      data: clientAccount,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to login users by email
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns token id and user is logged in 
 */
userController.loginUser = async (req, res) => {
  try {
    const user = await userServiceObj.loginUser(req.body);
    const userType = await userServiceObj.getuser({
      where: {
        email: req.body.email
      }
    });
    res.status(200).send({
      code: 200,
      message: "User Logged In Successfully",
      data: user,
      userRole: userType.role,
    });
  } catch (error) {
    console.log(error.toString());
    return res.status(500).send(error.toString());
  }
};
/**
 * function to change user password
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns changed user password
 */
userController.changePassword = async (req, res) => {
  try {
    req.body.id = req.userId;
    const user = await userServiceObj.changePassword(req.body);
    res.status(200).send({
      code: 200,
      message: "Password Changed Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send(error.toString());
  }
};
/**
 * function to get user by id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns user by id
 */
userController.getUserById = async (req, res) => {
  try {
    var user = JSON.parse(
      JSON.stringify(
        await userServiceObj.getUser({
          attributes: {
            exclude: ["password"]
          },
          where: {
            id: req.userId,
          },
        })
      )
    );
    // delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    res.status(200).send({
      code: 200,
      message: "User Data",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to get in touch
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns response
 */
userController.getInTouch = async (req, res) => {
  try {
    req.body.subject = req.body.subject.name;
    var user = await userServiceObj.getInTouch(req.body);

    res.status(200).send({
      code: 200,
      message: "Response Submitted Successfully",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to check user email
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns boolean value according to email existance
 */
userController.checkEmail = async (req, res) => {
  try {
    const user = await userServiceObj.getUser({
      where: {
        email: req.body.email
      },
      attributes: ["id", "email"],
    });
    res.status(200).send({
      code: 200,
      message: "user check email",
      user: user ? true : false,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to get verified user
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns verified user
 */
userController.getVerified = async (req, res) => {
  try {
    var user = await userServiceObj.getUser({
      // attributes: ["verified"],
      where: {
        id: req.userId
      },
    });

    res.status(200).send({
      code: 200,
      message: "User Verification",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
/**
 * function to get information to display in header
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 * @returns header information
 */
userController.getHeaderInfo = async (req, res) => {
  try {
    const user = await userServiceObj.getUser({
      attributes: [
        "id",
        "email",
        "firstName",
      ],
      where: {
        id: req.userId
      },
    });
    res.status(200).send({
      code: 200,
      message: "Header Info",
      data: user,
    });
  } catch (error) {
    console.log(error.toString());
    return res.status(500).send(error.toString());
  }
};


/**
 * Documentaion for an Controller Object
 * User Controller Object is exported to be used in other files
 * @userController
 */

module.exports = userController;