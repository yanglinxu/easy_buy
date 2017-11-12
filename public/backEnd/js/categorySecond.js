$(function(){
	var secondDatas = function(pageNum) {
		$.ajax({
			url: '/category/querySecondCategoryPaging',
			type: 'get',
			data: {
				page: pageNum || 1,
				pageSize: 5
			},
			dataType: 'json',
			success: function(res) {
				var secondResult = template('second_template', res)
				$('tbody').html(secondResult)
			}
		})
	}

	secondDatas()


	//点击模态框下拉按钮动态获取数据
	var dropdown = function(){
		$('#second_modal').on('click', '#dLabel' ,function(){
			//发送ajax请求
			$.ajax({
				url: '/category/queryTopCategoryPaging',
				type: 'get',
				data: {
					page: 1,
					pageSize: 20
				},
				success: function(res){
					console.log(res)
				}
			})
		})
	}

	dropdown()
})