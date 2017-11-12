$(function(){
	var getInfo = function(pageNum){
		$.ajax({
			url:'/user/queryUser',
			type:'get',
			data: {
				page: pageNum || 1,
				pageSize: 5
			},
			dataType: 'json',
			success: function(res){
			
				//使用引擎模板
				var userMessage = template('userManage_template',res)

				$('table tbody').html(userMessage)

				//分页功能
				$('.pagination').bootstrapPaginator({
					bootstrapMajorVersion: 3,
					size: 'small',
					// 当前页
					currentPage: res.page,
					// 一共多少页
					totalPages: Math.ceil(res.total/res.size),
					// 点击事件
					onPageClicked: function (event, originalEvent, type, page) {
            		/*改变当前页再渲染 page当前点击的按钮的页面*/
            			getInfo(page);
          }

				})
			}
		})
	}

	getInfo()


	$('tbody').on('click', '.btn', function(){
		var id = $(this).data('id')
		var name = $(this).data('name')
		var isDelete = $(this).hasClass('btn-danger') ? 1 : 0;

		if (isDelete == 1) {
			$('#manage_modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>你确定要禁用' + name + '吗？')
		} else {
			$('#manage_modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>你确定要启用' + name + '吗？')
		}

		$('#manage_modal').on('click', '.btn-primary', function(){
			//点击确定按钮发送ajax请求，并重新加载页面
			//先让模态框隐藏
			$.ajax({
				url:'/user/updateUser',
				type: 'post',
				data: {
					id: id,
					isDelete: isDelete
				},
				dataType: 'json',
				success: function(res){
					if (res.success == true) {
						//先让模态框隐藏
						$('#manage_modal').modal('hide')
						getInfo()//此处可以再通过获取页数让页面保留在此页面
					}
				}
			})
		})
	})

})