// 建立一个数据列表
var list = [
	{
		title:'吃饭打豆豆'
	},
	{
		title:'学习，学习使我快乐'
	}
];
// 实例化vue
new Vue({
	// 把class为main的div作为挂载点
	el:'.main',
	// 代理数据
	data:{
		list:list,
		// 尽量不要去操作dom
		todo:''

	},
	// 事件处理函数
	methods:{
		addTodo(ev){ //添加任务
			// 向list中添加一项任务
			// 如果按键为13，即enter键，则触发
			// if (ev.keyCode === 13)
			// {
			// 	// 事件处理函数中this指向当前这个根实例
			// 	this.list.push({
			// 		title:ev.target.value
			// 	});
			// }
			this.list.push({
				title:this.todo
			});
			this.todo = '';
		}
	}
});