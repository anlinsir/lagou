var mongoose = require("mongoose")

var Workschema  = mongoose.Schema({
	
	logo:String,
	workname:String,
	companyname:String,
	worktime:String,
	worktype:String,
	worklocation:String,
	worksalaty:String

})

module.exports = Workschema


