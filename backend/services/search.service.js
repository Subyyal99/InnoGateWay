const db = require("../models/index.js");
class searchService {
  constructor() { }
  async mainSearchUsers(whereClause) {
    return await db.User.findAll(whereClause);
  }
  async mainSearchAds(whereClause) {
    return await db.ads.findAll(whereClause);
  }
}
module.exports = searchService;