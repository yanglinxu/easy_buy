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
				//使用引擎模板进行数据渲染
				var secondResult = template('second_template', res)
				$('tbody').html(secondResult)


				//分页
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
          			  secondDatas(page);
        		  }
        		})
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
					// console.log(res)
					//将从服务端请求到的数据动态添加到ul中
					$.each(res.rows, function(i,e){
						// console.log(i,e)
						$('#drop_ul').append('<li><a href="javascript:;" data-id="'+e.id+'">'+e.categoryName+'</a></li>')
					})

					//点击下拉菜单时，将对应数据填入显示框内
					$('#drop_ul').on('click', 'a', function(){
						$('#btn_content').html($(this).html())
						//将id值传给隐藏的input元素
						$('#categoryId').val($(this).data('id'))
					})
				}
			})
		})
	}

	dropdown()



	//上传操作
	var initUpload = function(){
		// 下面的id是type=file类型的input的id
		$('#secondupload').fileupload({
			//找到上传图片的接口
			url: "/category/addSecondCategoryPic",
			done: function(e,data) {
				// console.log(e,data)
				//将上传上来的图片设置为预览图片
				$('#previewimg').prop('src',data.result.picAddr)
				//将图片地址作为隐藏表单的值
				$('#brandLogo').val(data.result.picAddr)
			}
		})
	}

	initUpload()



	//表单的校验
	$('#secondform').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类不能为空'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    // Prevent form submission
    e.preventDefault();
    // Get the form instance
    var $form = $(e.target);
    // console.log($form)
    // console.log($form.serialize());
    // console.log($form); 
    // serialize(); 序列化 
    // send() 对象-- 这是自己传
    // http协议要的是什么 键值对  key=value&key1=value1
    // Get the BootstrapValidator instance
    var bv = $form.data('bootstrapValidator');
    // 使用ajax提交表单数据
    // 1.验证 这个表单校验插件是否运行
    // 2.提交ajax
    //  2.1 看接口
    // 接口需要的数据有:
    // brandName 品牌名称
    // categoryId 所属分类
    // brandLogo 品牌logo地址
    // 写成http协议要求的格式 
    var data = $form.serialize();
    // console.log(data); //
    // categoryId=5
    // &brandName=%E6%9D%8E%E5%AE%81
    // &brandLogo=%2Fupload%2Fbrand%2Fed9039d0-c776-11e7-8f9d-954ba41349c7.jpg

    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:data,
      success:function(data){
      	// console.log(data);
      	//隐藏模态框
      	$('#second_modal').modal('hide')
      	//重新加载页面
      	secondDatas()
        
      }
    })

  });
})