		$(function(){

			$(".register").on("click",function(){
				
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


			$(".logout").on("click",function(){
				$(this).hide()
				$(".register").show()
				$(".mypage").hide()
				$(".login").show()
				$(".welcome").html("")
				localStorage.removeItem("name");
				localStorage.removeItem("pagecount");
				$(".times").html(`<pre>                <pre> 0 timies`)
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

							localStorage.name = `${$(".welcome").html()}`;




					})

			})

			$(".tage").on("click",function(){
				if(!localStorage.name){
					alert("login")
					return
				}
				location = `/work.html`
			})

			if(localStorage.name){
					$(".login").hide()
					$(".mypage").show()
					$(".register").hide()
					$(".logout").show()
					$(".tage").show()
					$(".welcome").html(localStorage.name)
					$(".my_page").html(localStorage.name)				
			}
		if (localStorage.pagecount)
			{
			localStorage.pagecount=Number(localStorage.pagecount) +1;
			}
		else
			{
			localStorage.pagecount=1;
			}
			$(".times").html(`<pre>                <pre> ${localStorage.pagecount} timies`)
			console.log(localStorage.pagecount)
			
		})

			$(".mypage").on("click",function(){

				location = `/user.html?username=${localStorage.name}`
			})
		


