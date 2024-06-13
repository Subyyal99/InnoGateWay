/**
 * constant database (db) variable to access models 
 */
const db = require("../models/index.js");
/**
 * constant xlsx variable to access node xlxs library
 */
const xlsx = require("node-xlsx");
/**
 * Class to create a blacklist service object
 */
class ContactService {
  constructor() {}
  /**
   * function to create an entry in database table contactGroups
   * @param {number} data - the data to enter 
   * @returns {promise} 
   */
  async addNewGroup(data) {
    return await db.contactGroups.create(data);
  }
  async deleteContactList(whereClause) {
    return await db.contactGroups.destroy(whereClause);
  }
  async deleteContactListAssociatedContacts(whereClause) {
    return await db.contacts.destroy(whereClause);
  }
  /**
   * function to get all entries in database table contactGroups
   * @param whereClause - addition call parametres 
   * @returns {promise} 
   */
  async getAllGroups(whereClause = {}) {
    return await db.contactGroups.findAll(whereClause);
  }
  async getContactListCount(whereClause) {
    return await db.contactGroups.count(whereClause);
  }
  /**
   * function to get number of contacts in database table contacts
   * @param whereClause - addition call parametres 
   * @returns {promise} 
   */
  async getCount(whereClause) {
    return await db.contacts.count(whereClause);
  }
  /**
   * function to get all entries in database table contacts by id
   * @param whereClause - addition call parametres 
   * @returns {promise} 
   */
  async getContactListById(whereClause) {
    return await db.contacts.findAll(whereClause);
  }
  /**
   * function to get all entries in database table contacts
   * @param whereClause - addition call parametres 
   * @returns {promise} 
   */
  async getAllContacts(whereClause) {
    return await db.contacts.findAll(whereClause);
  }
  /**
   * function to delete contacts by id
   * @param whereClause - addition call parametres 
   * @returns {promise} 
   */
  async deleteContact(id) {
    return await db.contacts.destroy({
      where: {
        id: id,
      },
    });
  }
  /**
   * function to read uploaded file 
   * @param whereClause - addition call parametres 
   * @returns {promise} 
   */
  async readFile(gotData, columnName) {
    /**
     * xlxs reads excel file and converts file data
     */
    var data = xlsx.parse(gotData.file);
    var dataToAdd = [];
    var headersRow = data[0].data[0]; // Get the headers from the first row of the data
    // Define the desired order of fields
    var desiredOrder = columnName;
    for (let i = 1; i < data[0].data.length; i++) {
      let row = data[0].data[i];
      /**
       * required data is pushed 
       */
      let rowData = {};
      for (let j = 0; j < row.length; j++) {
        let header = headersRow[j];
        if (desiredOrder.includes(header)) {
          rowData[header] = row[j]; // Store the data using the header as the key
        }
      }
      rowData['contactGroupId'] = gotData.id;
      dataToAdd.push(rowData);
    }
    return await dataToAdd;
  }
  /**
   * function to get all entries in database table contacts by id
   * @param whereClause - addition call parametres 
   * @returns {promise} 
   */
  async importContacts(gotData, columnName) {
    /**
     * xlxs reads excel file and converts file data
     */
    var data = xlsx.parse(gotData.file);

    // Iterate over the header names array
    const columnValues = [];
    // for (let headerObj of columnName) {
    //   const headerName = headerObj.columnName;
    //   const headerId = headerObj.id;

    //   // Find the header index
    //   const headerRow = data[0].data[0];
    //   const headerIndex = headerRow.indexOf(headerName);
    //   if (headerIndex !== -1) {
    //     for (let i = 1; i < data[0].data.length; i++) {
    //       const row = data[0].data[i];
    //       const cellValue = row[headerIndex];
    //       columnValues.push({
    //         value: cellValue,
    //         customContactFieldId: headerId,
    //         contactGroupId: gotData.contactGroupId
    //       });
    //     }
    //   }
    // }
    for (let i = 1; i < data[0].data.length; i++) {
      const row = data[0].data[i];
      const rows = await db.rows.create({
        contactGroupId: gotData.contactGroupId
      })
      for (let headerObj of columnName) {
        const headerName = headerObj.columnName;
        const headerId = headerObj.id;

        // Find the header index
        const headerRow = data[0].data[0];
        const headerIndex = headerRow.indexOf(headerName);

        if (headerIndex !== -1) {
          const cellValue = row[headerIndex];
          columnValues.push({
            value: cellValue,
            customContactFieldId: headerId,
            contactGroupId: gotData.contactGroupId,
            rowId: rows.id
          });
        }
      }
    }
    return await db.contacts.bulkCreate(columnValues);
  }
  /**
   * function to search contacts by name
   * @param whereClause - addition call parametres 
   * @returns {promise} 
   */
  async searchContacts(whereClause) {
    return await db.contacts.findAll(whereClause);
  }
}
/**
 * Documentaion for an service Object
 * Contact Service Object is exported to be used in other files
 * @ContactService
 */

module.exports = ContactService;