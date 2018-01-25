var mongoose = require("mongoose")

var User = require("../schema/user_schema")

var user = mongoose.model("users",User)
module.exports = user

