// 主线:
// 1.当页面打开 到search.html，要获取搜索历史
// 如果有历史搜索 显示历史记录
// 如果没有历史搜索 告诉用户没有记录

// 2.当用户在输入框中输入搜索词 
// 应该把用户输入的搜索词加入历史记录

// 3.当用户点击删除按钮 我们要删除一条记录

// 4.显示所有的记录


// 以上功能要用什么技术去完成

// localstorage 叫本地存储 实际上归属于客户端存储
// 设置值: localStorage.setItem(key,value);
// 获取值: localStorage.getItem(key);
// 移除值: localStorage.removeItem(key);
// 清除所有记录： localStorage.clear();

// 在js中 ,json和对象或数组有一个转换的方法
// 如果对象或数组转换为json 用的是 JSON.stringify()
// 如果json转换为对象或数组 用的时 JSON.parse()
$(function(){
  // 1. 当页面载入的时候显示历史记录
  // setHistoryData('addids');
  showHistoryData();

  // 2.点击搜索按钮 把关键词加入历史记录
  var searchInput = $('.search-box input');
  $('#search-btn').on('tap',function(){
    var keyWord  = searchInput.val();
    setHistoryData(keyWord);
    location.href = './searchList.html?proName='+keyWord;
    showHistoryData();
  })

  // 3.点击清空历史按钮 清空历史记录 
  $('#clear-history').on('tap',function(){
    // 为什么不用localStorage.clear(); 怕影响其他网站或本网站的功能
    localStorage.removeItem('ltHistory');
  })

  // 4.点击删除按钮  删除一条数据
  $(".search-history-list").on('tap','i',function(){
    var deleteData = $(this).siblings('span').html();
      // console.log(deleteData);
    removeHistoryData(deleteData);
    showHistoryData();
  })

  // 5.点击历史列表中的字 把这个字放到地址栏中跳转进行搜索
  $('.search-history-list').on('tap','span',function(){
    var keyWord = $(this).html();
    // console.log(keyWord);
    // 如何把当前页面的关键字传入searchList.html
    location.href = './searchList.html?proName='+keyWord;
  })
})

// 获取搜索记录
var getHistoryData = function(){
  return JSON.parse( window.localStorage.getItem('ltHistory')||'[]');
}

// console.log(getHistoryData());
// 设置搜索记录
// key =value
// ltHistory = '["nike","add"]'
var setHistoryData = function(value){
  // 获取历史记录
  var list = getHistoryData();

  // 遍历数据(去除重复数据)
  $.each(list,function(i,item){
    if(value == item) {
      list.splice(i,1);
    }
  });

  list.push(value);

  localStorage.setItem('ltHistory',JSON.stringify(list));
}

// 移除数据
    //  key         value
    // ltHistory   '["nike","gucci"]'

// localStorage.remove('ltHistory'); 这样是不对的
// 思路: 首先我要获取到历史记录,
var removeHistoryData = function(value){
  var list = getHistoryData();//获取历史记录

  // 找到和历史记录列表中的某一项一样的数组元素 切掉
  $.each(list,function(i,item){
    if(value == item) {
      list.splice(i,1);
    }
  })

  // 把切掉的后的数组 放回历史记录中
  window.localStorage.setItem('ltHistory',JSON.stringify(list));
}

// 显示历史记录
var showHistoryData = function(){
  var list = getHistoryData();//空数组或有长度的数组
  if(list.length == 0) {
    // 告诉用户没有历史记录
    $('.empty-history').show();
    $('.search-history').hide()

  }else {
    // 展示历史记录
    var historyList = template('historyTemplate',
    {
      // list: ['nike','gucci']
      list:list
    });

    $('.search-history-list').html(historyList);
    $('.search-history').show();
    $('.empty-history').hide();
  }
}



// 思路： 

// 刚进入的时候 要显示历史记录
// 怎么显示历史记录呢? 通过localStorage.getItem('ltHistory'),数据来了是什么类型的数据呢?
// 是字符串  既然是字符串 我们能操作吗? 不能 怎么样去操作  使用json.parse把获取到的数据
// 转换称数组 为什么要转换成数组呢 因为我们要吧数据展示到页面上
// 怎么展示数据呢？
// 使用模板引擎 
// 其中要考虑有数据和没有数据的时候 页面显示情况不同

// 当用户搜索关键词的时候
// 把搜索关键词添加到历史记录中 
// 怎么添加到历史记录中呢？
// 有的时候历史记录中没有数据 要在获取数据的时候返回一个空数组
// 有的时候历史记录中有数据，要查看历史记录中的数据是不是和我们的搜索关键词重复，如果重复就删除掉,如果不重复
// 把新的数据添加到数组中
// 把新的数组转换成json然后添加到历史记录中


// 当点击删除按钮的时候
// 首先获取到历史记录中的数组
// 判断一下删除的关键词 是否和数组中的某一项一样 如果一样切掉 splice(切掉的元素的索引,切几个)
// 重新添加到历史记录中

// http://localhost:3000/frontEnd/searchList.html?key=nike
// 要的是 {
//   key : 'value'
// }