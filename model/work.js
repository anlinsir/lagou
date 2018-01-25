var mongoose = require("mongoose")
var Work = require("../schema/work")
var work = mongoose.model("works",Work)
module.exports = work