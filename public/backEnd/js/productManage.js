$(function(){
	//首先获取数据
	var getProduct = function(pageNum){
		$.ajax({
			url: '/product/queryProductDetailList',
			type: 'get',
			data: {
				page: pageNum || 1,
				pageSize: 5
			},
			success: function(res) {
				// console.log(res)
				//对页面进行渲染
				var productInfo = template('product_template',res)
				$('tbody').html(productInfo)

				//分页
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
            			getProduct(page);
          }

				})
			}
		})
	}

	getProduct()

	//上传图片
	var picList = []
	var picUpload = function() {
		// 下面的id是type=file类型的input的id
		$('#pic').fileupload({
			//上传图片的接口
			url: "/product/addProductPic",
			done: function(e, data) {
				// console.log(data)//将文件上传到了upload文件夹了，可以获取文件名和地址了
				//将上传的图片显示在页面上

				$('.img_previe').append('<img src="'+data.result.picAddr+'" width="50" height="auto">')
				//将每次上传的图片的名称地址放入数组中
				picList.push(data.result)
			}
		})
	}
	picUpload()


	//表单校验
	 $('#productform').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品价格不能为空'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      }, 
      size: {
        validators: {
          notEmpty: {
            message: '商品尺码不能为空'
          }
        }
      }
    }
   }).on('success.form.bv', function (e) {
    // Prevent form submission
    e.preventDefault();
    // Get the form instance
    var $form = $(e.target);
    // console.log($form.serialize());
    // console.log($form); 
    // serialize(); 序列化 
    // send() 对象-- 这是自己传
    // http协议要的是什么 键值对  key=value&key1=value1
    // Get the BootstrapValidator instance
    // console.log(1);
    // 获取参数
    // proName  产品名称 
    // proDesc  产品描述
    // num      用户库存
    // price    价格
    // oldPrice 老价格   
    // size     产品尺寸   
    // brandId  品牌归属 虽然没有我们采取自己随便定一个数据库中有的brandId
    // pic     图片数组
    var data = $form.serialize();
    // console.log(data);
    // http协议要的是什么格式的东西key=value
    // 遍历数组
    $.each(picList,function(i,item){
      // console.log(i,item);
      data+='&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr
    })

    // console.log(data);
    // proName=adf&
    // proDesc=sdffsd&
    // num=fdsf&
    // price=dsfd&
    // oldPrice=dsf&
    // size=sdfd$
    // picName1=24ad9e80-c826-11e7-b8c5-957d279cb48e.png$
    // picAddr1=/upload/product/24ad9e80-c826-11e7-b8c5-957d279cb48e.png$
    // picName2=27113100-c826-11e7-b8c5-957d279cb48e.png$
    // picAddr2=/upload/product/27113100-c826-11e7-b8c5-957d279cb48e.png$
    // picName3=28faffa0-c826-11e7-b8c5-957d279cb48e.png$
    // picAddr3=/upload/product/28faffa0-c826-11e7-b8c5-957d279cb48e.png

    data = data + '&brandId=4'//全部参数获取完毕
    console.log(data)

    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data: data,
      success:function(data){
        console.log(data);

        // $('#product-modal').modal('hide');
        // getProductData();
      }
    })

  });
})