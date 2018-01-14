// 快速 修改 sublime 当前文本的 语言  ctrl+shift +p 输入 ss j(如果是js)  



//  命名空间

var $_fox_tool = {
	/*
	参数1:模板字符串
	参数2:想要替换的对象
 	*/
	fox_template: function(templateStr, obj) {
		var reg = /<%=\s*([^%>]+\S)\s*%>/;
		// 使用while循环
		var result;
		// 每次 循环 都查找 模板中 满足条件的 文本 进行替换 直到 查找不到为止
		while (result = reg.exec(templateStr)) {

			var replaceStr = result[0];
			var key = result[1];
			templateStr = templateStr.replace(replaceStr, obj[key]);
		}
		return templateStr;
	}
}

