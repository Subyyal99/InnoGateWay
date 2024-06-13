/**
 * Contact_Controller_Functions module
 * @module Contact_Controller_Functions
 */
/**
 * All functions for contact data are in this file
 */

/**
 * contact controller object exports functions in the controller file
 */
const contactController = {};
/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * constant service variable to access contact services 
 */
const ContactService = require("../services/contact.service.js");
const CustomContactFieldsService = require("../services/customContactFields.service.js");
const Rows = require("../services/rows.service.js");
/**
 * constant service object to store data and call functions
 */
const contactServiceObj = new ContactService();
/**
 * sequelize operator variable 
 */
const {
  Op
} = require("sequelize");
var sequelize = require("sequelize");
/**
 * function to add new contact group in our data base
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
contactController.addNewGroup = async (req, res) => {
  try {
    /**
     * varable to store data from call
     */
    req.body.userId = req.userId
    let contactListName = {
      name: req.body.name,
      userId: req.userId
    }
    const contactGroup = await contactServiceObj.addNewGroup(contactListName);
    let contactListFields = [{
      name: "Given Name",
      columnName: "name",
      type: "text",
      required: true,
      displayInContactList: true,
      contactGroupId: contactGroup.id
    }, {
      name: "Mobile Number",
      columnName: "mobile_number",
      type: "number",
      required: true,
      displayInContactList: true,
      contactGroupId: contactGroup.id
    }, {
      name: "Email",
      columnName: "email",
      type: "text",
      required: true,
      displayInContactList: true,
      contactGroupId: contactGroup.id
    }]
    for (let data of req.body.customFields) {
      let customData = {
        name: data.name,
        columnName: data.columnName ? data.columnName : "testing",
        type: data.type,
        required: data.required === 'true',
        displayInContactList: data.displayInContactList === 'true',
        contactGroupId: contactGroup.id
      }
      contactListFields.push(customData)
    }
    const customContactGroupFields = await CustomContactFieldsService.bulkCreate(contactListFields);

    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Contact group addded successfully!",
    });
  } catch (error) {
    console.log(error)
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to get all contact group in our data base
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
contactController.getAllGroups = async (req, res) => {
  try {
    let whereClause = {
      userId: req.userId
    }
    let limit = null
    let offset = null
    if (req.body.limit) {
      limit = req.body.limit
      offset = req.body.offset
    }
    const contactGroupsCount = await contactServiceObj.getContactListCount({
      where: whereClause
    })
    /**
     * function call and parametres to get groups
     */
    const contactGroups = await contactServiceObj.getAllGroups({
      where: whereClause,
      limit: limit,
      offset: offset,

    });

    const contactGroupIds = contactGroups.map(contactGroup => contactGroup.id);

    const contactCounts = await contactServiceObj.getContactListById({
      attributes: [
        'contactGroupId',
        [sequelize.fn('COUNT', sequelize.col('id')), 'contactCount']
      ],

      where: {
        contactGroupId: contactGroupIds
      },
      group: ['contactGroupId'],
    });
    const customContactFieldsCount = await CustomContactFieldsService.findAll({
      attributes: [
        'contactGroupId',
        [sequelize.fn('COUNT', sequelize.col('id')), 'customFieldCount']
      ],

      where: {
        contactGroupId: contactGroupIds
      },
      group: ['contactGroupId'],
    });
    const contactGroupsWithCounts = contactGroups.map(contactGroup => {
      const countObj = contactCounts.find(count => count.contactGroupId === contactGroup.id);
      const contactCount = countObj ? countObj.get('contactCount') : 0;
      const customCountObj = customContactFieldsCount.find(count => count.contactGroupId === contactGroup.id);
      const customFieldsCount = customCountObj ? customCountObj.get('customFieldCount') : 0;
      return {
        ...contactGroup.toJSON(),
        contactCount,
        customFieldsCount
      };
    });
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Contact Groups Data!",
      contactGroups: contactGroupsWithCounts,
      contactGroupsCount: contactGroupsCount,
    });
  } catch (error) {
    console.log(error)
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to get number of contacts in a specific contact group by id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
contactController.getGroupContactCount = async (req, res) => {
  try {
    /**
     * function call and parametres to get contact count
     */
    const groupContactCount = await contactServiceObj.getCount({
      /**
       * to further narrow or specify the data to get or operate
       */
      where: {
        contactGroupId: req.body.id,
      },
    });
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Contact Groups Data!",
      counts: groupContactCount,
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to get contact list by id
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
contactController.getCustomContactGroupFields = async (req, res) => {
  try {
    /**
     * function call and parametres to get contact count
     */
    let limit = null
    let offset = null
    if (req.body.limit) {
      limit = req.body.limit;
      offset = req.body.offset
    }
    const customContactGroupFields = await CustomContactFieldsService.findAll({
      where: {
        contactGroupId: req.body.id,
      },
    })
    // let customFieldIds = []
    // for (let fields of customContactGroupFields) {
    //   customFieldIds.push(fields.id)
    // }
    //  const groupContactListContactCount = await contactServiceObj.getCount({
    //     /**
    //      * to further narrow or specify the data to get or operate
    //      */
    //     where: {
    //       contactGroupId: req.body.id,
    //       customContactFields: customFieldIds
    //     },
    //   });
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Contact Groups Data!",
      groupContactList: customContactGroupFields,
      // totalNoOfContacts: groupContactListContactCount / customContactGroupFields.length
    });
  } catch (error) {
    console.log(error)
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
contactController.getFieldsContacts = async (req, res) => {
  try {
    /**
     * function call and parametres to get contact count
     */
    let limit = null
    let offset = null
    if (req.body.limit) {
      limit = req.body.limit;
      offset = req.body.offset
    }
    const rows = await Rows.findAll({
      where: {
        contactGroupId: req.body.id,
      },
      include: [{
        model: db.contacts,
        required: true,

        attributes: [
          "id", "value", "customContactFieldId",
        ]
      }, {
        model: db.contactGroups,
        required: true,
        include: [{
          model: db.customContactFields,
          required: true,
          attributes: [
            "id", "columnName",
          ]
        }]
      }],
      limit: limit,
      offset: offset
    });
    const totalRows = await Rows.count({
      where: {
        contactGroupId: req.body.id,
      },

    })
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Contact Data!",
      rows: rows,
      totalRows: totalRows
    });
  } catch (error) {
    console.log(error)
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to get get file data
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
contactController.getFile = async (req, res) => {
  try {
    req.body = JSON.parse(req.body.contactGroupInfo);
    let contactGroupId = req.body.id;
    if (req.files && req.files.contacts && req.files.contacts.length > 0) {
      req.body.file =
        req.files && req.files.contacts && req.files.contacts.length > 0 ?
        "uploads/contacts/" + req.files.contacts[0].filename :
        "";
      fileName = req.body.file
    }
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "File read successfully!",
      file: fileName,
      contactGroupId: contactGroupId,
    });

  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
// contactController.addContactsLoop = async (req, res) => {
//   try {
//     var dataToAdd = [];
//     let number = 03415000000;
//     for (let i = 0; i <= 2000; i++) {
//       dataToAdd.push({
//         phoneNumber: number,
//         name: "Shadow Army" + i,
//         contactGroupId: 1,
//       })
//       number++
//     }
//     await db.contacts.bulkCreate(dataToAdd);
//     res.status(200).send({
//       code: 200,
//       message: "Contacts Imported Successfully!",
//     });

//   } catch (error) {
//     /**
//      * if operation is unsuccessful the res variable carries error status 
//      */
//     return res.status(500).send(error);
//   }
// };
/**
 * function to read uploaded file 
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
contactController.readFileData = async (req, res) => {
  try {
    /**
     * to access file data according to data
     */
    const contactGroupFields = await CustomContactFieldsService.findAll({
      where: {
        contactGroupId: req.body.contactGroupId
      },
      attributes: ["columnName"]
    })
    let columnName = []
    for (let info of contactGroupFields) {
      columnName.push(info.columnName)
    }
    const contacts = await contactServiceObj.readFile(req.body, columnName);
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Contacts Imported Successfully!",
      contacts: contacts
    });

  } catch (error) {
    console.log(error)
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to import contacts
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
contactController.importContacts = async (req, res) => {
  try {
    // req.body = JSON.parse(req.body.contactGroupInfo);
    // let contactGroupId;
    // if (req.files && req.files.contacts && req.files.contacts.length > 0) {
    //   req.body.file =
    //     req.files && req.files.contacts && req.files.contacts.length > 0 ?
    //     "uploads/contacts/" + req.files.contacts[0].filename :
    //     "";
    //   const contacts = await contactServiceObj.importContacts(req.body);
    //   contactGroupId = contacts[0].contactGroupId

    // }
    /**
     * function to import data
     */
    const contactGroupFields = await CustomContactFieldsService.findAll({
      where: {
        contactGroupId: req.body.contactGroupId
      },
      attributes: ["id", "columnName"]
    })
    let columnName = []
    for (let info of contactGroupFields) {
      columnName.push({
        id: info.id,
        columnName: info.columnName
      })
    }
    const contacts = await contactServiceObj.importContacts(req.body, columnName);
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Contacts Imported Successfully!",
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to remove contact from data base
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
contactController.removeContact = async (req, res) => {
  try {
    /**
     * id of the contact to remove
     */
    let id = req.body.id;
    /**
     * function call to remove
     */
    const contact = await contactServiceObj.deleteContact(id);
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Contact Successfully Removed",
      data: contact,
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
contactController.removeContactList = async (req, res) => {
  try {

    const contactList = await contactServiceObj.deleteContactList({
      where: {
        id: req.body.contactListId
      }
    });
    const contacts = await contactServiceObj.deleteContactListAssociatedContacts({
      where: {
        contactGroupId: req.body.contactListId
      }
    });
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Contact List Successfully Removed",
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
contactController.getContactGroupFields = async (req, res) => {
  try {

    const contactGroupFields = await CustomContactFieldsService.findAll({
      where: {
        contactGroupId: req.body.contactGroupId
      }
    })
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Contact Group Fields retrieved Successfully",
      data: contactGroupFields
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * function to search contacts
 * @param req - contains all data required for request
 * @param res - response returned by the funtion
 */
contactController.search = async (req, res) => {
  try {
    /**
     * contact group id
     */
    let contactGroupId = req.body.id
    /**
     * word to search
     */
    let searchWord = "%" + req.body.searchWord + "%"
    /**
     * search result variable
     */
    let searchResult
    /**
     * search also depends on whether contact group id is provided or not
     */
    /**
     * if provided
     */
    if (contactGroupId) {
      /**
       * function call to search
       */
      const data = await contactServiceObj.searchContacts({
        /**
         * additional parametres to focus down search
         */
        where: {
          contactGroupId: contactGroupId,
          name: {
            [Op.like]: searchWord
          }
        },
        /**
         * model to include with the search data
         */
        include: [{
          model: db.contactGroups,
          required: true,
        }]
      });

      searchResult = data

    }
    /**
     * if not provided
     */
    else if (!contactGroupId) {
      /**
       * function call to search
       */
      const data = await contactServiceObj.searchContacts({
        /**
         * additional parametres to focus down search
         */
        where: {
          name: {
            [Op.like]: searchWord
          }
        },
        /**
         * model to include with the search data
         */
        include: [{
          model: db.contactGroups,
          required: true,
        }]
      });

      searchResult = data
    }
    /**
     * if operation is successful the res variable carries response with successfull status,daat and message 
     */
    res.status(200).send({
      code: 200,
      message: "Searched Contacts",
      searchResult: searchResult
    });
  } catch (error) {
    /**
     * if operation is unsuccessful the res variable carries error status 
     */
    return res.status(500).send(error);
  }
};
/**
 * Documentaion for an Controller Object
 * Contact Controller Object is exported to be used in other files
 * @contactController
 */

module.exports = contactController;