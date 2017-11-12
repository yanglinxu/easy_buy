$(function(){
	var firstCategory = function(pageNum){
		$.ajax({
			url:'/category/queryTopCategoryPaging',
			type: 'get',
			data: {
				page:pageNum || 1,
				pageSize: 5
			},
			dataType: 'json',
			success: function(res){
				// console.log(res)
				var firstResult = template('fisrt_template', res)
				$('tbody').html(firstResult);

				 // 分页
        	$('.pagination').bootstrapPaginator({
          	/*当前使用的是3版本的bootstrap*/
          	bootstrapMajorVersion: 3,
          	/*配置的字体大小是小号*/
          	size: 'small',
          	/*当前页*/
          	currentPage: res.page,
          	/*一共多少页*/
          	// 总页数=数据的总数/每页显示多少条数据
          	totalPages: Math.ceil(res.total / res.size),
          	/*点击页面事件*/
          	onPageClicked: function (event, originalEvent, type, page) {
          	  /*改变当前页再渲染 page当前点击的按钮的页面*/
          	  firstCategory(page);
          	}
        });

			}
		})
	}

	firstCategory()

	$('#first_modal').on('click', '#save', function() {
		var form_data = $('#first_form').serialize()
		$.ajax({
			url: '/category/addTopCategory',
			type: 'post',
			data: form_data,
			dataType: 'json',
			success: function(res){
				// console.log(res)
				if (res.success == true) {
					$('#first_modal').modal('hide')
					firstCategory()//同理，可传入页数保持页数不变
				}
			}
		})
	})

})