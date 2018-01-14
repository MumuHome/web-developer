//封装单个属性运动框架
function animate(obj,json,fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true; //用来判断是否应该停止定时器，写在遍历外面
        //计算步长 （目标位置 - 当前位置）/10
        //运动公式 ： 初始位置 + 步长
        //开始遍历接收
        for ( var k in json )   //k 为 attr
        {
            //初始位置
            var current = 0;
            if ( k =="opacity" )
            {
                current = parseInt(getStyle(obj,k)*100) || 0 ;
            }else
            {
                current = parseInt(getStyle(obj,k));
            }
            console.log(current);
            //目标位置就是属性值
            var step = (json[k] - current)/10;  //步长
            step = step>0?Math.ceil(step):Math.floor(step);
            //判断透明度
            if ( k == "opacity" )   //判断用户有没有输入opacity
            {
                if ("opacity" in obj.style) //判断浏览器是否支持opacity
                {
                    obj.style.opacity = (current + step)/100;
                }else
                {
                    //ie678
                    //obj.style.filter = "alpha(opacity = 100)"
                    obj.style.filter = "alpha(opacity = "+ (current + step) +")"
                }

            }else if( k == "zIndex" )
            {
                obj.style.zIndex = json[k]
            }
            else {
                obj.style[k] = current + step + "px";
            }

            //只要其中有一个不满足条件 flag则为false
            if ( current != json[k] )
            {
                flag = false;
            }
            console.log(flag);
        }
        if ( flag )
        {
            clearInterval(obj.timer);
            //执行回调函数
            if (fn)
            {
                fn();//执行函数
            }
        }

    },20)
}



function getStyle(obj,attr) {   //谁的  哪个属性
    if ( obj.currentStyle )
    {
        return obj.currentStyle[attr];  //ie
    }else
    {
        return window.getComputedStyle(obj,null)[attr]; //w3c
    }
}