// 调用全屏的方法
$(function () {
    $("#dowebok").fullpage({
        sectionsColor:['#0da5d6','#2ab561','#de8910','#16ba9d','#0da5d6'],
        // 滚到顶部 上滚切换到最后一屏
        loopTop:true,
        // 滚到某一屏之后调用 index为当前屏的索引号 从1开始
        afterLoad:function (link,index) {
            // current类加给谁 谁就做动画
            $('.section').removeClass('current');
            // 动画延迟100秒
            setTimeout(function () {
                $('.section').eq(index-1).addClass('current');
            },100)
        }
    })
});