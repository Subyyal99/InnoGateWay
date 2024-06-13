/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * jwt token lbrary
 */
const jwt = require("jsonwebtoken");
/**
 * encryption library
 */
const bcrypt = require("bcryptjs");
/**
 * config file required 
 */
const config = require("../config/key.js");
/**
 * 
 */
const {
  v1: uuidv1
} = require("uuid");
/**
 * Class to create a user service object
 */
class UserService {
  constructor() {}
  /**
   * function to insert or update user
   * @param data user data to update or insert
   * @returns data
   */
  async insertOrUpdate(data) {
    return await db.User.upsert(data, {
      returning: true,
    });
  }
  /**
   * function to get clients  
   * @param whereClause specification of data
   * @returns  clients data
   */
  async getClients(whereClause) {
    return await db.User.findAll(whereClause);
  }
  /**
   * function to update clients  
   * @param whereClause specification of data
   * @returns data
   */
  async updateClients(data) {
    return await db.User.upsert(data);
  }
  /**
   * function to get users  
   * @param whereClause specification of data
   * @returns object of user data
   */
  async getuser(whereClause) {
    return await db.User.findOne(whereClause);
  }
  /**
   * function to delete client by id  
   * @param id id of the client to delete
   * @returns data
   */
  async delete(id) {
    return await db.User.destroy({
      where: {
        id: id
      }
    });
  }
  /**
   * function to help user login
   * @param data data of the user to login
   * @returns login authenticaton
   */
  async loginUser(data) {
    /**
     * call to get user by email address
     */
    const user = await this.getUser({
      where: {
        email: data.email,
      },
    });
    /**
     * user email check
     */
    if (!user) {
      /**
       * user is not found email is not present in database
       */
      throw new Error("Incorrect Email or Password");
    }
    /**
     * compare passwords
     */
    var passwordIsValid = bcrypt.compareSync(data.password, user.password);
    /**
     * password check
     */
    if (!passwordIsValid) {
      /**
       * password does not match return error
       */
      throw new Error("Incorrect Email or Password");
    }

    return await jwt.sign({
        id: user.id,
        role: user.role,
        email: user.email,
        fullName: user.fullName,
      },
      config.secret
    );
  }
  /**
   * function to change user password
   * @param data data required to change password
   * @returns changes password
   */
  async changePassword(data) {
    /**
     * call to get user by id
     */
    const user = await this.getUser({
      where: {
        id: data.id,
      },
    });
    /**
     * user check
     */
    if (!user) {
      /**
       * user is not present
       */
      throw new Error("Incorrect Email or Password");
    }
    /**
     * password matching
     */
    var passwordIsValid = bcrypt.compareSync(data.password, user.password);
    /**
     * password check
     */
    if (!passwordIsValid) {
      /**
       * password not found
       */
      throw new Error("Incorrect Email or Password");
    }
    /**
     * new password
     */
    data.password = bcrypt.hashSync(data.newPassword, 8);

    return await db.User.update({
      password: data.password,
    }, {
      where: {
        id: data.id,
      },
    });
  }
  async getUser(innerClause) {
    return await db.User.findOne(innerClause);
  }
}

module.exports = UserService;