/**
 * app.js file is run when we start the background
 */

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const link = require("./config/url.js");

var cors = require("cors");
app.use(cors());
// app.use(bodyParser.json());
app.use(express.static(__dirname + "/uploads/"));
app.use(
  express.json({
    limit: "50mb",
  })
);
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

var server = app.listen(13000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening on http://%s:%s", host, port);
});
const socket = require("socket.io")(server, {
  cors: {
    origin: link.angularUrl,
  },
});
/**
 * const variable of different routes
 */
const UserRoutes = require("./routes/user.routes");
const ContactRoutes = require("./routes/contact.routes");
const SmsRoutes = require("./routes/sms.routes");
const BlackListRoute = require("./routes/blackList.routes");
const SmsPlusRoute = require("./routes/smsPlus.routes");
const TelevotingRoute = require("./routes/televoting.routes");
const ReceivedMessageRoute = require("./routes/receivedMessage.routes");
const TemplatesRoute = require("./routes/templates.routes");
const ShortCodeRoute = require("./routes/shortCode.routes");
const ServiceRoute = require("./routes/service.routes");
const smscRoute = require("./routes/smsc.routes");
const logsRoute = require("./routes/logs.routes");

app.use("/users", UserRoutes);
app.use("/contacts", ContactRoutes);
app.use("/sms", SmsRoutes);
app.use("/blackList", BlackListRoute);
app.use("/smsPlus", SmsPlusRoute);
app.use("/televoting", TelevotingRoute);
app.use("/recMsgs", ReceivedMessageRoute);
app.use("/templates", TemplatesRoute);
app.use("/shortCode", ShortCodeRoute);
app.use("/service", ServiceRoute);
app.use("/smsc", smscRoute);
app.use("/logs", logsRoute);
module.exports.notification = function (type, data) {
  socket.emit(type, data);
};