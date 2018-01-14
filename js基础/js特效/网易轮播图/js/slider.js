window.onload = function () {
    //获取元素
    function $(id) {
        return document.getElementById(id)
    }
    var slider = $("slider");   //获取最大的盒子
    var slider_main = $("slider_main"); //获取图片的父亲
    var imgs = slider_main.children;    //获得里面的图片组
    var slider_ctrl = $("slider_ctrl"); //获得控制的父盒子
    //生成span
    for ( var i=0 ; i<imgs.length ; i++ )
    {
        var span = document.createElement("span");
        span.innerHTML = imgs.length - i;
        span.className = "slider-ctrl-con";
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
    }
    var spans = slider_ctrl.children;   //得到所有的控制按钮
    spans[1].className = "slider-ctrl-con current";

    //操作元素
    var scrollWidth = slider.offsetWidth;//得到大盒子的宽度，也就是动画走的距离
    //刚开始 第一张图留下  其余的人留在一边
    for ( var i = 1 ; i<imgs.length ; i++ ) //从1开始
    {
        imgs[i].style.left = scrollWidth + "px";
    }
    //遍历三个按钮
    //span存放8个按钮
    //控制播放张数
    var key = 0;
    for ( var k in spans )   //k是索引号
    {
        spans[k].onclick = function () {
            if ( this.className == "slider-ctrl-prev" )
            {
                // alert("点击了左侧按钮")
                animate(imgs[key],{left:scrollWidth});
                key = key - 1;
                key<0?key = imgs.length - 1:key;
                imgs[key].style.left = -scrollWidth + "px";
                animate(imgs[key],{left:0});
            } else if ( this.className == "slider-ctrl-next" )
            {
                // alert("点击了右侧按钮")
                // 当我们点击时，当前的图片先慢慢的走到左边，下一张快速的走到右边310的位置，然后慢慢的走到中央
                animate(imgs[key],{left: -scrollWidth});
                key = key + 1;
                key > imgs.length-1?key = 0:key;
                imgs[key].style.left = scrollWidth + "px";
                animate(imgs[key],{left: 0});
            } else
            {
                //点击的是下面的含有innerHTML的span
                //首先要知道点的是第几张图片，获得当前的索引号
                var that = this.innerHTML - 1;
                if (that > key)
                {
                    //做法等同于右侧按钮
                    animate(imgs[key],{left: -scrollWidth});    //当前这张慢慢走出去
                    key = that; //
                    imgs[key].style.left = scrollWidth + "px";//点击的那个索引号快速走到右侧
                    animate(imgs[key],{left: 0});
                }else if ( that < key )
                {
                    //做法等同左侧按钮
                    animate(imgs[key],{left:scrollWidth});
                    key = that;
                    imgs[key].style.left = -scrollWidth + "px";
                    animate(imgs[key],{left:0});
                }

            }
            //最下面的span样式控制
            setSquare();
        }

    }
    //最下面的span样式控制
    function setSquare() {
        for ( var i=1 ; i<spans.length -1 ; i++ )
        {
            spans[i].className = "slider-ctrl-con";
        }
        spans[key+1].className = "slider-ctrl-con current";
    }

    //定时器开始
    //定时器就是右侧按钮
    var timer = null;
    timer = setInterval(autoplay,2000);
    function autoplay() {
        animate(imgs[key],{left: -scrollWidth});
        key = key + 1;
        key > imgs.length-1?key = 0:key;
        imgs[key].style.left = scrollWidth + "px";
        animate(imgs[key],{left: 0});
        setSquare();
    }
    //鼠标经过清除定时器
    slider.onmouseover = function () {
        clearInterval(timer)
    }
    //鼠标离开清除定时器
    slider.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(autoplay,2000);
    }
}