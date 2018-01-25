$(function(){

var nums = 1;

var page = 10;


	var name = location.search.split("=")[1]
	var user = localStorage.name
	if(typeof user == "undefined" || user == "undefined"){
		$(".logout").hide()
		$(".register").show()
		$(".login").show()	
		$(".mypage").hide()		
	}


	function paa(page_num){
				for(let i = 1;i<$("tr").length;i++){
				$($("tr")[i]).find('.index').text(i+(page_num-1)*10);
				}
			}

	$(".my_page").html(user)
	console.log(user)

	function load() {
			$.get("/work",function(data){
			console.log(data)
			var html = template("listTemp",data)
			$(".tbody").html(html)
		})
	}
	load()
	
	function white() {
		_img.attr("src","https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png")
		position_name.val("")
		company_name.val("")
		worked_time.val("")
		position_type.val("")
		working_location.val("")
		salary.val("")
	}



	$("#InputFile").on("change",function(){
		var file = this.files[0]
		var form  = new FormData()
		form.append("upload",file)
		$.ajax({
			url:"/upload",
			datatype:"json",
			type:"POST",
			data:form,
			contentType: false,
			processData: false
		}).done(function(data){
			$(".img").attr("src",data.img)		
		})


	})
	var _img = $(".img"),
		position_name = $(".position_name"),
		company_name = $(".company_name"),
		worked_time = $(".worked_time"),
		position_type = $(".position_type"),
		working_location = $(".working_location"),
		salary = $(".salary");

	$(".lg_add").on("click",function(){
		if(!localStorage.name || localStorage.name == "undefined"){
			alert("login")
			$(this).attr({
				"data-toggle":"",
				"data-target":""
			})
			return
		}

		white()
		$(".addtrue").show()
		$(".uptrue").hide()

	})

	$(".addtrue").on("click",function(){

		var pro = {}
		pro.logo = _img.attr("src")
		pro.workname = company_name.val().trim()
		pro.companyname = company_name.val().trim()
		pro.worktime = worked_time.val().trim()
		pro.worktype = position_type.val().trim()
		pro.worklocation = working_location.val().trim()
		pro.worksalaty = salary.val().trim()
		console.log(pro)
		$.post("/add/work",pro,function(data){
			if(data.code ==0){
				_img.attr("src","https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png")
				position_name.val("")
				company_name.val("")
				worked_time.val("")
				position_type.val("")
				working_location.val("")
				salary.val("")
				$(".fade").hide()
				var li = template("listTemp2",{list:[data.list]})
				$(".tbody").append(li)
				console.log($(".tbody").find(".index"))
				$(".tbody").find(".index").html(1)
				load()
				reflesh()				
			
			}
		}).then(function(){
			paa(nums)
		})

	})


	$(".tbody").on("click",".del",function(){
		console.log(this.dataset.id)
		var _id = /*"ObjectId"+*/(this.dataset.id)
		$.post("/del/work",{_id:_id},(data)=>{
			console.log(data)
			if(data.code == 0){
				$(this).parents("tr").remove()
				
				reflesh()
				

							}
		}).then(function(){
			paa(nums)
		})
	})


	$(".tbody").on("click",".upd",function(){
		$('#add').modal($(this))
			/*$(this).attr({
				"data-toggle":"modal",
				"data-target":"#add" 
			})	*/	

		var _parents =  $(this).parents("tr")
		_img.attr('src',_parents.find("img").attr("src")) 	
		position_name.val(_parents.find(".workname").html())
		company_name.val(_parents.find(".companyname").html())
		worked_time.val(_parents.find(".worktime").html())
		position_type.val(_parents.find(".worktype").html())
		working_location.val(_parents.find(".worklocation").html())
		salary.val(_parents.find(".worksalaty").html())
		$(".addtrue").hide()
		$(".uptrue").show()


		$(".uptrue").on("click",()=>{
			var pro = {}
			pro.logo = _img.attr("src")
			pro.workname = position_name.val()
			pro.companyname = company_name.val()
			pro.worktime = worked_time.val()
			pro.worktype = position_type.val()
			pro.worklocation =working_location.val()
			pro.worksalaty = salary.val()
			pro._id = this.dataset.id
			console.log(pro)
			$.post("/up/work",pro,(data)=>{
				console.log(data)
				if(data.code == 0){
					/*var lli = template("listTemp2",{list:[data.msg]})
					$(".tbody").append(lli)*/
					_parents.find("img").attr("src",data.msg.logo)	
					_parents.find(".workname").html(data.msg.workname)
					_parents.find(".companyname").html(data.msg.companyname)
					_parents.find(".worktime").html(data.msg.worktime)
					_parents.find(".worktype").html(data.msg.worktype)
					_parents.find(".worklocation").html(data.msg.worklocation)
					_parents.find(".worksalaty").html(data.msg.worksalaty)
					white()
					load()
					reflesh()

					$(".info").show()
					var n = 3;
					var timers = setInterval(function(){
						n--
						$('.info_span').html(n+"秒后关闭")					
						
					},1000)
					var timer = setTimeout(function(){				
						$(".fade").hide()
						$(".info").hide()
					},3000)
					if(n<=0){
						clearInterval(timers)
					}

				}
			})

		})


	
	})
		$(".pagination").on("click","li",function(){

			var num = $(this).find("a").html()
				nums = num
			//总条数*page 向上取整
			$.post("/pages/work",{num:num,page:page},function(data){
				console.log(data)
				var html = template("listTemp",data)
				$(".tbody").html(html)
				for(var i = 1 ; i<=page;i++){
				/*$(".tbody").find(".index").html(num+""+i)
*/				}
	}).then(()=>{
		paa(nums) 
	})


		})
		reflesh()

		function reflesh(){
			

			
			
			$.get("/much/work",function(data){
				var length = data.length.length							
				var pages = Math.ceil(length/page)
				var ht =""
				for(var i = 1;i<=pages;i++){
					ht+=`<li><a href="javascript:void(0)">${i}</a></li>`
				}
				$(".pagination").html(ht)
			})


		}	
					

		$(".logout").on("click",function(){
				$(this).hide()
				$(".register").show()
				$(".login").show()	
				$(".mypage").hide()		
			localStorage.removeItem("name");
			// location =`/index.html`

		})
					 
			
		


		$(".logintrue").on("click",function(){
				var $l_user = $(".login_username"),
					$l_pass = $(".login_password");

					var pro = {}
					pro.username = $l_user.val().trim()
					pro.password = $l_pass.val().trim() 
					$.post("/login",pro,function(data){
						console.log(data)
						if(data.code == -1){
							$(".up").show()
							$(".up").html(data.message)
							return
						}else{
							$(".up").html("")							
							$(".up").hide()
						}
						if(data.code == 1){
							$(".ppp").show()
							$(".ppp").html(data.message)
							return
						}else{
							$(".ppp").html("")
							$(".ppp").hide()
						}
						$(".username").val("")
						$(".password").val("")
						
							$(".fade").hide()
							$(".welcome").html(pro.username)
							$(".login").hide()
							$(".mypage").show()
							$(".my_page").html(pro.username)
							$(".register").hide()
							$(".logout").show()
							$(".tage").show()

							localStorage.name = `${$(".my_page").html()}`;



					})

			})

		var btn = $(".registertrue");
				

				btn.on("click",function(){
					var $user = $(".username"),
						$pass = $(".password"),
						$pass1 = $(".password1"),
						$email = $(".Email"),
						$up = $(".up"),
						$ppp = $(".ppp"),
						$p1p = $("p1p"),
						$ep = $(".ep");
						if(!$user.val().trim()){
							$up.show()
							$up.html("未输入用户名")
							return
						}else{
							$up.html("")
							$up.hide()							
						}
						if(!$pass.val().trim()){
							$ppp.show()
							$ppp.html("未输入密码")
							return
						}else{							
							$pass.html("")
							$ppp.hide()
						}
						if($pass.val().trim() != $pass1.val().trim()){
							$p1p.show()
							$p1p.html("两次密码不一致")
							return
						}else{
							$p1p.html("")
							$p1p.hide()

						}
						
					var pro = {}
					pro.username = $user.val().trim()
					pro.password = $pass.val().trim()
					pro.email = $email.val().trim()
					$.post("/register",pro,function(data){
						console.log(data)
						if(data.code == 0){
							$user.val("")
							$pass.val("")
							$pass1.val("")
							$email.val("")
							$(".fade").hide()
							$(".welcome").html(pro.username)
							$(".login").hide()
							$(".mypage").show()
							$(".my_page").html(pro.username)
							$(".register").hide()
							$(".logout").show()

						}

					})
				}) 


		
		



})					


