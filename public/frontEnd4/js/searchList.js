$(function(){
	//渲染页面
	queryProduct()


	//当在输入栏输入内容并点击搜索时，将输入栏内的值放入本地存储中，并跳转到对应页
	$('.search-box').on('tap', 'span', function(){
		var value = $(this).siblings('input').val()
		//判断输入框内容是否是空
		if ( value != '') {
			setLocalHistory(value)
			location.href = './searchList.html?proName=' + value
		}
	})




	//点击价格排序时，切换排列规则
	$('.search-result-order').on('singleTap', 'a', function(){
		//先让标签颜色变红
		$(this).siblings().removeClass('active')
		$(this).addClass('active')

	})

	//根据价格进行商品展示
	var flag = true
	$('.price-order').on('singleTap', function(){
		if (flag) {
			$(this).find('i').removeClass('fa-angle-down')
			$(this).find('i').addClass('fa-angle-up')
			queryProduct(1,2,1)
			flag = false
		}else{
			$(this).find('i').removeClass('fa-angle-up')
			$(this).find('i').addClass('fa-angle-down')
			queryProduct(2,2,1)
			flag = true
		}
	})

	//根据库存进行商品展示
	var judge = true
	$('.num-order').on('singleTap', function(){
		if (judge) {
			$(this).find('i').removeClass('fa-angle-down')
			$(this).find('i').addClass('fa-angle-up')
			queryProduct(null,1,1)
			judge = false
		}else{
			$(this).find('i').removeClass('fa-angle-up')
			$(this).find('i').addClass('fa-angle-down')
			queryProduct(null,2,1)
			judge = true
		}
	})



})



var queryProduct = function(price,num,page) {
	//首先拿到产品名称
	var url = new URLSearchParams(location.search)

	var proName = url.get('proName')
	// console.log(proName)


	//当页面加载完毕后发起ajax请求，拿到数据并进行渲染
	$.ajax({
		url: '/product/queryProduct',
		type: 'get',
		data: {
			proName: proName || '',
			price: price || null,
			num: num || 2,
			page: page || 1,
			pageSize: 6
		},
		success: function(res){
			console.log(res)
			//使用模板引擎渲染页面
			var tem = template('searchListTemplate',res)
			$(".search-result-list").html(tem)
		}
	})
}


//1-获取本地存储中的数据
var getLocalHistory = function(){
	return JSON.parse(localStorage.getItem('searchHistory') || '[]')
}

//2-设置本地存储中的数据
var setLocalHistory = function(val){
	//先获取本地存储的数据
	var list = getLocalHistory()
	//判断本地存储的数据中是否存在这个数据
	$.each(list, function(i, item){
		if (val == item) {
			list.splice(i,1)
		} 
	})
	list.push(val)
	//将添加数据后的数组存入本地存储中
	localStorage.setItem('searchHistory', JSON.stringify(list))
}

