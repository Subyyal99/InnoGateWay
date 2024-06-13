/**
 * including middleware library to help uploading
 */
const multer = require("multer");
/**
 * multer disk storage to help upload file
 */
const fileStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "uploads/profilePics");
  // },
  /**
   * destination of where to upload the file according to conditions
   * @param {*} req the request
   * @param {*} file file to upload 
   * @param {*} cb function to upload
   */
  destination: (req, file, cb) => {
    if (file.fieldname === "profileImage") {
      cb(null, "uploads/profilePics/");
    } else if (file.fieldname === "verificationDoc") {
      cb(null, "uploads/ads/documents/");
    } else if (file.fieldname === "cover") {
      cb(null, "uploads/ads/cover/");
    } else if (file.fieldname === "verificationImage") {
      cb(null, "uploads/documentVerify/");
    } else if (file.fieldname === "chatFiles") {
      cb(null, "uploads/chatPics/");
    } else if (file.fieldname === "avd") {
      cb(null, "uploads/verify/avd");
    } else if (file.fieldname === "ivd") {
      cb(null, "uploads/verify/ivd");
    } else if (file.fieldname === "cv") {
      cb(null, "uploads/certificates/cv");
    } else if (file.fieldname === "transcript") {
      cb(null, "uploads/certificates/transcript");
    } else if (file.fieldname === "source") {
      cb(null, "uploads/certificates/source");
    } else if (file.fieldname === "certificate") {
      cb(null, "uploads/certificates/certificate");
    } else if (file.fieldname === "employment") {
      cb(null, "uploads/certificates/employment");
    } else if (file.fieldname === "contacts") {
      cb(null, "uploads/contacts");
    }
  },
  /**
   * setting the name of the uploaded file
   * @param {*} req req to upload
   * @param {*} file file to upload
   * @param {*} cb function to upload
   */
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const fileFilter = (req, file, cb) => {
  // if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPEG|JPG)$/)) {
  //   return cb(new Error("You can upload only image files!"), false);
  // }
  cb(null, true);
};
/**
 * Documentaion for an Controller Object
 * multer Object is exported to be used in other files
 * @file_upload
 */
module.exports = multer({
  fileFilter,
  storage: fileStorage,
});