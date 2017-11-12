// 该文件的功能是用来写首页的js交互的

//1-不让进度条显示圆圈圈
NProgress.configure({ showSpinner: false })


//2-全局监听，当页面中某一个ajax事件触发，进度条开始
$(window).ajaxStart(function(){
  	NProgress.start();
})

$(window).ajaxComplete(function(){
	NProgress.done();
})

//3-点击左侧toggle切换侧边栏显示
$('.nav_l').on('click', function(){
	$('.lt_aside').toggle()
	$('.content').toggleClass('none')
})

//4-点击退出按钮 弹出遮罩层 发起请求 退出用户登陆
$('#logout_Modal').on('click','.btn-primary', function(){
	$.ajax({
		url:'/employee/employeeLogout',
		type:'get',
		data:{},
		dataType:'json',
		success:function(res){
			if(res.success == true) {
				$('#logout_Modal').hide()
				setTimeout(function(){
					location.href = './login.html'
				}, 200)
			}
		}
	})
})