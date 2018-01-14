// 存取localStorage中的数据
var store = {
	// 保存数据
	save(key,value){
        // localStorage下有一个setItem方法
        // 因为value是一个数组 JSON.stringify(value)把json数组转换成字符串
		localStorage.setItem(key,JSON.stringify(value));
	},
	// 获取数据
	fetch(key){
		// key值取出来是一个json字符串 用JSON.parse(key)把他转化成数组
		// 如果传入的key值错误，那么返回空数组
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}
// 建立一个数据列表
// var list = [
// 	{
// 		title:'吃饭打豆豆',
// 		isChecked:false //状态为false 不添加completed类 任务未完成
// 	},
// 	{
// 		title:'学习，学习使我快乐',
//         isChecked:true //状态为true 添加completed类 任务完成
// 	}
// ];

// 取出所有的值
var list = store.fetch('new-task');
// 实例化vue
var vm = new Vue({
	// 把class为main的div作为挂载点
	el:'.main',
	// 代理数据
	data:{
		list:list,
		// 定义一个数据，双向绑定input的value
		enterData:'',
		// 记录正在编辑的数据 this.edtorData = todo 把当前正在编辑的对象赋值给 edtorData
		edtorData:'',
        // 记录正在编辑的数据的title
		beforeData:'',
		// 记录状态 通过这个值的属性变化对数据进行筛选
		visibility:'all'
	},
	// 监控属性发生变化（浅监控，只能监控到数组个数的变化，监控不到里面的深层属性发生变化）
	watch:{
		// 监控list属性，当list对应的值发生改变时，会执行这个函数
		// list(){
		// 	store.save('new-task',this.list);
		// }
		list:{
			handler:function(){
				store.save('new-task',this.list)
			},
			deep:true
		}
    },

	// 事件处理函数
	methods:{
		// 第一个为传过来的参数 第二个为事件对象
		addTodo(data,ev){ //添加任务
			// 事件处理函数this指向new的根实例
			// push和splice并不是原生的方法，另外还触发了视图更新
			this.list.push({
				title:this.enterData
			});
			// 定义一个todo来绑定title值
			this.enterData = '';
		},
		dele (todo){ //删除任务
			var index = this.list.indexOf(todo);
			this.list.splice(index, 1);
			// this.list.remove(item)
		},
        edtorTodo(todo){ //编辑任务
			// 编辑任务时，记录一下编辑这条任务的title 方便在取消编辑时复原
			this.beforeData = todo.title;
            // 用数据记录下当前正在编辑的这一条信息
			this.edtorData = todo;
		},
		edtore(todo){ //编辑任务成功
            this.edtorData = ''
		},
        cancel(todo){ //取消编辑任务
			todo.title = this.beforeData;
            this.beforeData = '';
			// div显示出来，同时input消失
            this.edtorData = ''
		},

	},
	// 计算属性
	computed:{
		noCheck(){
			return this.list.filter(function(item){
                return !item.isChecked
            }).length
		},
		// 状态过滤的时候有三种情况 all finish unfinish
		filteredList(){
			var filter = {
				all:function (list) {
					return list;
                },
                finish:function (list) {
					// 接收list中finish的数组
					return list.filter(function (item) {
						return item.isChecked
                    });
                },
                unfinish:function () {
                    return list.filter(function (item) {
                        return !item.isChecked
                    });
                }
			}
			// 判断这个hash值有没有（存在手动调试url），如果有，则调用这个函数，如果没有就返回所有的数据
			return filter[this.visibility] ? filter[this.visibility](list):list;
		}
	},
	// 自定义指令
	directives:{
		'foucs':{
			// 钩子函数 当edtorData改变时触发
			update(el,result){
				// 两个参数，el为当前dom result包含一系列对象 result.value表示传入的表达式的值
				if (result.value)
				{
					// 当前对象获得焦点
					el.focus();
				}
			}
		}
	}
});
function watchHashChange() {
	// 截取字符串，不要#
    var hash = window.location.hash.slice(1);
    vm.visibility = hash;
    console.log(hash);
}
// 页面加载时先执行一下
watchHashChange();
// hashchange事件 当hash改变时触发
window.addEventListener('hashchange',watchHashChange);