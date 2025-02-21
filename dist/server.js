"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _routes = _interopRequireDefault(require("./src/routes"));
var _connectDB = _interopRequireDefault(require("./src/config/connectDB"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "DELETE", "PUT"]
}));
app.use(_express["default"].json({
  limit: "10mb"
}));
app.use(_express["default"].urlencoded({
  extended: true,
  limit: "10mb"
}));
(0, _routes["default"])(app);
(0, _connectDB["default"])();
var port = process.env.PORT || 8888;
var listener = app.listen(port, function () {
  console.log("Server listening on port: ".concat(listener.address().port));
});