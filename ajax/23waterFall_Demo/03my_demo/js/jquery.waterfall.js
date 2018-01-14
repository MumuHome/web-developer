// 添加插件
$.fn.extend({
	waterfall:function () {
		// 1、为了计算获取一些必须知道的值
		// 容器宽度
		// 子元素的宽度 child().width();
		// 每行放置的元素个数
		// 计算间距
		// 定义$_this方便观察
		var $_this = this;

		// 父元素宽度 innerWidth() 为width+padding
		var totalWidth = $_this.innerWidth();

		// 子元素宽度
		var childWidth = $_this.children(".item").eq(0).innerWidth();

		// 每一行的个数
		var colNum = parseInt(totalWidth/childWidth);

		// 间距 （总宽度 - 子元素宽度*每一行个数）/（每一行子元素个数-1）
		var gap = (totalWidth - childWidth*colNum)/(colNum-1);
		console.log(gap);

		// 2、计算每一个元素的top和left的值
		/*
		* 准备一个数组 数组元素的个数跟每一行的个数保持一致
		* 循环所有的item子元素
		* 获取子元素的高度
		* 通过上面定义的数组，获取最小的值
		* 根据获取的最小索引值 获取top和left值
		* 修改1中定义的数组对应的索引值
		*/
		// 2.1准备高度数组
		var heightArr = [];
		// 高度数组赋值初始值
		for ( var i=0 ; i<colNum ; i++ )
		{
            heightArr[i] = gap;
			// heightArr[i] = $_this.children(".item").eq(i).height();
		}
		// 2.2循环子元素 获取数组中最小的索引
		// 修改当前循环元素的top及left值
		// js中循环数组的方法
        $_this.children(".item").each(function (index,element) {
			// 获取当前子元素的高度
			var currentHeight = $(element).innerHeight();

			// 计算该元素放置在哪个位置 for循环找最小值
			// 先假设 索引为0的为最小
			var minIndex = 0;
			var minHeight = heightArr[minIndex];
			for ( var i=0 ; i<heightArr.length ; i++ )
			{
				if ( heightArr[i]<minHeight)
				{
					minHeight = heightArr[i];
					minIndex = i;
				}
			}
			// 循环完毕 获得最小的高度和最小的索引值 设置给当前item
			$(element).css({
				top:minHeight,
				left:minIndex * (childWidth + gap)
			});
			// 2.3修改2.1中创建的高度数组
			// 修改minIndex对应的值即可
			minHeight = minHeight + currentHeight;
            minHeight = minHeight + gap;

            heightArr[minIndex] = minHeight;
		})

		// 修改父盒子的高度
        var maxHeight = heightArr[0];
        for ( var i=0 ; i<heightArr.length ; i++ )
        {
            if ( heightArr[i]>maxHeight)
            {
                maxHeight = heightArr[i];
            }
        }
        $_this.css("height",maxHeight);
    }
})