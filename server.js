var express = require("express")
var app = express()
var mongoose = require("mongoose")
var bp = require("body-parser")
app.use(express.static("html"))
app.use(express.static("css"))
app.use(express.static("js"))
app.use(express.static("hjs"))
app.use(express.static("uploadcache"))
var upload = require("./util/upload")

app.use(bp.json())
app.use(bp.urlencoded({
	extended:true
}))

//连接到数据库
mongoose.Promise = global.Promise
mongoose.connect("mongodb://127.0.0.1:27017/lagou")
		.then(function(){
			console.log("mongoodb is connection")
		})

var user = require("./model/user")
var work = require("./model/work")


app.post("/register",function(req,res){
	let {username,password,email} = req.body
	var u = new user({
		username,
		password,
		email
	}) 		
	
	user.find({username},function(err,doc){
		if(doc.length){
			res.json({
				code:1,
				message:"username occupied"
			})
			return
		}
		u.save(function(err,doc){
			if(err){
				res.json({
					code:2,
					message:"server error"
				})
				return
			}
			res.json({
				code:0,
				message:"is OK!",
				msg:"register success"
			})
		})

	})


})

app.post("/login",function(req,res){
	let {username,password} = req.body
	user.find({username},function(err,doc){
		console.log(doc)
		if(!doc.length){
			res.json({
				code:-1,
				message:"username null"
			})
			return
		}
		if(doc[0].password != password){
			res.json({
				code:1,
				message:"password error"
			})
			return
		}
		res.json({
			code:0,
			message:"is OK!",
			msg:"login success"
		})

	})


})

/*app.get("/num/work",function(req,res){
	work.find({},function(err,doc){
		res.json({
			code:0,
			message:ddoc
		})
	})
})*/

app.get("/work",function(req,res){
	work.find({},function(err,doc){
		if(err){
			console.log(err)
			return
		}
		res.json({
			code:0,
			list:doc
		})
	}).limit(10).sort({_id:-1})
})


app.post("/upload",function(req,res){
	upload.upload(req,res)
})

app.post("/add/work",function(req,res){
	let {logo,workname,companyname,worktime,worktype,worklocation,worksalaty} = req.body
	var w = new work({
		logo,
		workname,
		companyname,
		worktime,
		worktype,
		worklocation,
		worksalaty
	})
	w.save(function(err,doc){
		if(err){
			console.log(err)
			return
		}
		res.json({
			code:0,
			message:"OK!",
			list:doc

		})
	})

})

app.post("/del/work",function(req,res){
	let {_id} = req.body
	console.log(req.body)
	work.findOneAndRemove({_id},function(err,doc){
		if(err){
			console.log(err)
			return
		}
		res.json({
			code:0,
			message:"del OK!",
			list:doc
		})
	})

})

app.post("/up/work",function(req,res){
	let {_id,logo,workname,companyname,worktime,worktype,worklocation,worksalaty} = req.body
	console.log(req.body)
	work.findOneAndUpdate({_id},req.body,{new:true},function(err,doc){
		if(err){
			console.log(err)
			return
		}
		res.json({
			code:0,
			message:"up OK!",
			msg:doc
		})
	})


})


app.post("/pages/work",function(req,res){
	console.log(req.body)
	let {num,page} = req.body
	work.find({},function(err,doc){
		res.json({
			code:0,
			list:doc
		})
	}).skip(Number(page)*(Number(num)-1)).sort({_id:-1}).limit(Number(page))

})


app.get("/much/work",function(req,res){
	work.find({},function(err,doc){
		res.json({
			code:0,
			length:doc
		})
	})


})

app.post("/vip/user",function(req,res){
	let {username:vip,isvip:vip_} = req.body
	console.log(req.body)
	user.find({username:vip},function(err,doc){
		if(err){
			res.json({
				code:404,
				message:"error",
				more:err
			})
			return
		}
		if(!doc.length){
			res.json({
				code:-1,
				message:"plase login",
				more:doc
			})
			return
		}
	user.findOneAndUpdate({username:vip},{username:vip_},{new:true},function(err,doc){
		res.json({
			code:5,
			message:"success vip",
			msg:doc
		})
	})

	})
}) 

app.listen(1111,function(){
	console.log("server success")
})