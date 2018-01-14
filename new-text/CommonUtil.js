/**
 * Created by mumujun on 2017/7/30.
 */
/*
XJ命名空间 namespace
 */
var XJ ={};
//鸭式辨型法
//interface class
// 接口类需要2个参数吗？
// 参数1：接口的名字(string)
// 参数2：接收方法名称的集合（数组array）
XJ.Interface = function (name,methods) {
    // 判断接口的参数个数
    if ( arguments.length != 2 ){
        throw new Error('this instance interface constructor must be two length')
    }
    this.name = name;
    this.methods = []; //定义一个内置的空数组对象，等待接受methods里的元素（方法）
    for ( var i = 0, len = methods.length; i<len ; i++ ){
        if ( typeof methods[i] !== 'string' ){
            throw new Error ('the Interface method name is error!')
        }
        this.methods.push(methods[i]);
    }
};

//interface static method
// 3、检验接口里的方法
// 如果检验通过，不作任何操作    不通过，浏览器抛出error
// 这个方法的目的就是检测方法的
XJ.Interface.ensureImplements = function (object) {
    // 如果检测方法接受的参数小于2 参数传递失败
    if ( arguments.length < 2){
        throw new Error ('Interface.ensureImplements method constructor arguments must be >=2')
    }
    // 获得接口实例对象
    for ( var i=1; i<arguments.length ; i++ ){
        var instanceInterface = arguments[i];
        // 判断参数是否是接口类的类型
        if ( instanceInterface.constructor !== XJ.Interface){
            throw new Error ('the arguments constructor not be Interface Class')
        }
        // 循环接口实例对象里面的每一个方法
        for ( var j=0; j< instanceInterface.methods.length; j++){
            // 用一个临时变量接收每一个方法的名字（注意是字符串）
            var methodName = instanceInterface.methods[j];
            // object[key]表示拿到其中一个属性
            if ( !object[methodName] || typeof object[methodName] !== 'function' ){
                throw new Error ("the method '" + methodName + "' is not found!")
            }
        }
    }
};

// 继承
XJ.extend = function (sub,sup) {
    // 目的：实现只继承父类的原型对象
    // 1、用一个空函数进行中转
    var F = function () {};
    F.prototype = sup.prototype; // 2、实现空函数的原型对象和超类的原型对象转换
    sub.prototype = new F(); // 3、原型继承
    sub.prototype.constructor = sub; //4、还原子类的构造器
    //保存一下父类的原型对象  1、方便解耦 2、方便获得父类的原型对象
    sub.superClass = sup.prototype; //自定义一个子类的静态属性 接收父类的原型对象
    //判断父类的原型对象的构造器（加保险）
    if (sup.prototype.constructor == Object.prototype.constructor){
        sup.prototype.constructor = sup; //手动还原父类原型对象的构造器
    }
};
//单体模式 实现一个跨浏览器的事件处理程序
XJ.EventUtil = {
    addHandler:function (element,type,handler) {
        if (element.addEventListener){ //FF
            element.addEventListener(type,handler,false)  // false代表冒泡事件
        } else if (element.attachEvent){  //IE
            element.attachEvent('on'+type,handler);
        }
    },
    removeHandler:function (element,type,handler) {
        if (element.removeEventListener){ //FF
            element.removeEventListener(type,handler,false)  // false代表冒泡事件
        } else if (element.detachEvent){  //IE
            element.detachEvent('on'+type,handler);
        }
    }
}

//扩展array的原型对象 添加变量数组的每一个元素，并让每一个元素都执行fn函数 （可遍历多维数组）
//自己实现一个Array each 方法 能遍历多维数组
Array.prototype.each = function (fn) {
    try{
        //抛出一个异常
        //目的:遍历数组的每一项
        this.i || (this.i = 0);  //计数器  记录数组当前遍历的元素位置，这样定义i更加严谨
        //严谨的判断：什么时候去定each核心方法
        //当数组的长度大于0的时候 &&(并且)传递的参数必须为函数
        if (this.length > 0 && fn.constructor == Function ){
            //循环遍历数组的每一项，写底层代码时能不用for in就不用
            while(this.i < this.length){ //while循环的范围
                //获取数组的每一项
                var e = this[this.i];
                if ( e && e.constructor == Array){ //如果当前元素获取到了 并且当前元素是一个数组
                    //直接做递归操作
                    e.each(fn);
                }else {
                    //如果不是数组，那就是一个单个元素
                    //这里的目的就是为了把数组的当前元素传递给fn函数，并让函数执行
                    //fn.apply(e,[e]);
                    fn.call(e,e);
                }

                this.i++;
            }
            this.i = null; //释放内存 垃圾回收机制回收变量
        }

    }catch (ex){
        //dosomething
    }
    return this;
}

