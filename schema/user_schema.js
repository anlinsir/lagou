var mongoose = require("mongoose")

var Userschema = mongoose.Schema({
	username:String,
	password:String
})
module.exports = Userschema