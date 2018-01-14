// ajax get五部曲
function ajax_get(url,data) {
    // 创建
    var ajax = new XMLHttpRequest();
    // url和方法
    // 如果是get发送数据 发送的格式为xxx.php?name=18&age=18
    // 这里需要拼接url
    if (data)
    {
        url+="?";
        url+=data;
    }
    ajax.open('get',url);
    // 发送
    ajax.send();
    // 注册事件
    ajax.onreadystatechange = function () {
        // 在事件中获取数据 并修改界面显示
        if (ajax.readyState==4&&ajax.status==200)
        {
            console.log(ajax.responseText);
        }
    }
}

function ajax_post(url,data) {
    var ajax = new XMLHttpRequest();
    ajax.open('post',url);
    ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    if (data)
    {
        // 如果有值，直接在send中发送给服务器
        ajax.send(data)
    }else {
        ajax.send()
    }
    ajax.onreadystatechange= function () {
        if ( ajax.readyState==4&&ajax.status==200 )
        {
            console.log(ajax.responseText);
        }
    }
}

// 将get和post封装到一个方法
// 参数1：url 参数2：数据 参数3：请求的页面 参数4：数据成功获取以后调用的函数
function ajax_too(url,data,method,success) {
    var ajax = new XMLHttpRequest();
    // get跟post需要分别写不同的代码
    if ( method=='get' )
    {
        // get请求
        if (data)
        {
            url+='?';
            url+=data;
        }
        ajax.open(method,url);
        ajax.send();
    }else {
        // post请求，url是不需要改
        ajax.open(method,url);
        ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        if (data)
        {
            ajax.send(data)
        }else {
            ajax.send();
        }
    }
    // 注册事件
    // 这个事件不会立刻执行
    ajax.onreadystatechange= function () {
        if ( ajax.readyState==4&&ajax.status==200 )
        {
            // 此时return执行不会有数据，要等ajax返回数据
            // 当onreadystatechange调用时，说明数据回来了
            // 外面传入一个function作为参数success
            // return ajax.responseText;
            success(ajax.responseText);
        }
    }
}

// 将工具函数优化，只接收一个参数对象 好处：参数的顺序可以任意改变
// url：请求的url
// data：发送的数据
// method请求的方法
// success请求成功以后调用的函数
function ajax_too_pro(option) {
    var ajax = new XMLHttpRequest();
    // get跟post需要分别写不同的代码
    if ( option.method =='get' )
    {
        // get请求
        if (option.data)
        {
            option.url+='?';
            option.url+=option.data;
        }
        ajax.open(option.method,option.url);
        ajax.send();
    }else {
        // post请求，url是不需要改
        ajax.open(option.method,option.url);
        ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        if (option.data)
        {
            ajax.send(option.data)
        }else {
            ajax.send();
        }
    }
    // 注册事件
    // 这个事件不会立刻执行
    ajax.onreadystatechange= function () {
        if ( ajax.readyState==4&&ajax.status==200 )
        {
            // 此时return执行不会有数据，要等ajax返回数据
            // 当onreadystatechange调用时，说明数据回来了
            // 外面传入一个function作为参数success
            // return ajax.responseText;
            option.success(ajax.responseText);
        }
    }
}
