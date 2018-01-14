$.fn.extend({
	becomeYellow:function () {
		// 在这个函数中 this  就是 使用jq选择器 找到的 jq对象
		this.css('background-color','yellow');

		// jq 支持链式编程 通过return this 实现 链式编程
		return this;
	}
});