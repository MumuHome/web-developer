function $(id) {
    return document.getElementById(id)
}
function scroll() {
    if (window.pageYOffset != null) //判断是否为除了ie678的其他浏览器
    {
        return {
            left : window.pageXOffset,
            top : window.pageYOffset
        }
    }else if ( document.compatMode == "CSS1Compat" ) //检测是否为怪异模式的浏览器，即没有声明 <!DOCTYPE html> 的页面
    // document.compatMode == "BACKCompat"是怪异模式
    // document.compatMode == "CSS1Compat"是已声明
    {
        return {
            left : document.documentElement.scrollLeft,
            top : document.documentElement.scrollTop
        }
    }else {
        return {
            left : document.body.scrollLeft,
            top : document.body.scrollTop
        }
    }
}

function client() {
    if ( window.innerWidth != null )    //ie9+以及最新浏览器
    {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if ( document.compatMode === "CSS1Compat" )   //如果不是怪异模式，标准模式
    {
        return {
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
    return {    //怪异浏览器 没有声明
        width : document.body.clientWidth,
        height : document.body.clientHeight
    }
}
