$(function(){
	//当进入页面首先展示历史搜索记录，从本地存储中获取
	showHistory()


	//页面的事件1--当在输入栏输入内容并点击搜索时，将输入栏内的值放入本地存储中，并跳转到对应页
	$('.search-box').on('tap', 'span', function(){
		var value = $(this).siblings('input').val()
		//判断输入框内容是否是空
		if ( value != '') {
			setLocalHistory(value)
			location.href = './searchList.html?proName=' + value
		}
	})

	//事件2--当点击清空记录时，将本地存储删除，并重新加载页面
	document.getElementById("confirmBtn").addEventListener('singleTap', function() {
			var btnArray = ['是', '否'];
			mui.confirm('MUI是个好框架，确认？', 'Hello MUI', btnArray, function(e) {
					if (e.index == 0) {
						//为点击确认，删除本地存储,重载页面
						localStorage.removeItem('searchHistory')
						// location.href = './search.html'  使用重载页面会有卡顿
						showHistory()
					}
				})
			})



	//事件3--当点击单个删除按钮时，清除对应搜索记录
	$('.search-history-list').on('singleTap', 'i', function(){
		var value = $(this).siblings().html()//使用val()无法获取
		removeLocalHistory(value)
		showHistory()
	})


	//事件4--当点击单个历史记录，进行跳转
	$('.search-history-list').on('singleTap', 'span', function(){
		var value = $(this).html()
		location.href = './searchList.html?proName=' + value
	})

})



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

//3-移除搜索记录
var removeLocalHistory = function(val){
	//先获取本地数据
	var list = getLocalHistory()

	//找到和历史记录中的相同的项并移除
	$.each(list, function(i, item){
		if (item == val) {
			list.splice(i,1)
		}
	})
	//将修改后的数组存入本地存储中
	localStorage.setItem('searchHistory', JSON.stringify(list))
}

//4-显示搜索记录
var showHistory = function(){
	//先获取本地存储
	var list = getLocalHistory()
	//判断数组是否为空
	if (list.length == 0) {
		$('.search-history').hide()
	}else {
		//使用模板引擎进行渲染
		var tem = template('Local-history',{list:list})
		$('.search-history').show()
		$('.search-history-list').html(tem)
	}
}










//1--当进入页面后，先获取本地存储的数据（数据为数组形式）。对数据进行判断，如果是空数组则隐藏页面历史记录结构，如果有数据，则模板引擎对页面进行渲染。并显示对应结构。


//2--当在搜索框中输入内容并点击搜索后，获取输入框内容，然后判断数组中是否存在，如果存在则不添加，否则添加进数组中，json化保存在本地。(每次添加或者删除都是重新设置本地存储)。之后将此内容拼接到url地址中作为参数，进行跳转。


//3--点击清空记录按钮时，使用localStorage.removeItem清除此次本地存储，然后重新显示页面(使用页面重载也可实现，但会出现卡顿现象)

//4--点击单个历史记录删除按钮，获取到此项的内容，然后遍历本地存储，找到对应数据并删除，然后数组json序列化并重新保存在本地存储中。















