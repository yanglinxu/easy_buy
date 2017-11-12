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
})