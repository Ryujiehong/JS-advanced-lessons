function foo(){}
console.log(foo); //function foo(){}
console.log(typeof foo); //function
console.log(foo instanceof Object); //true
console.log(foo instanceof Function); //true
console.log(foo === window.foo); //true


console.log(typeof Function);//function
console.log(typeof Array);	 //function
console.log(typeof Date);	 //function
console.log(typeof Error); 	 //function
console.log(typeof Math);	 //object
console.log(typeof JSON);	 //object


//思考：
console.log(typeof new Function());// function or object
console.log(typeof new Array());	 // function or object
console.log(typeof new Date());	 // function or object

//补充思考：
console.log(Function instanceof Function);//true
console.log(Array instanceof Function);//true
console.log(Date instanceof Function);//true
console.log(Date instanceof Object);//true
console.log(Array instanceof Object);//true
console.log(Function instanceof Object);//true
console.log(Math instanceof Object);//true
console.log(Math instanceof Function);//false
console.log(JSON instanceof Function);//false
console.log(JSON instanceof Object);//true

console.log(typeof new new Function);
VM983:1 object





//函数对象属性之arguments 实参集合（类似数组的一个对象）
var foo = function (a,b){
    console.log(arguments);//类似数组的一个对象
//4 [1,2,3,4]
    console.log(foo.arguments.length);
    // console.log(arguments.length);4
    var args = Array.prototype.splice.call(arguments,0);
    console.log(args);//(4)[1,2,3,4]
};
foo(1,2,3,4);


//函数对象属性之length 形参个数
function checkVarCount(a, b) {
    if (checkVarCount.length !== arguments.length) {
        alert("The count of the parameters you passed into the function doesn't match the function definition.");
    }else{
        alert("Successfully call the function");
    }

}
checkVarCount(1, 2);
//Successfully call the function
checkVarCount(1);




//函数对象属性之caller 获取调用当前函数的函数。例一
function test() {
    if (test.caller == null) {
        console.log("test is called from the toppest level");
    } else {
        console.log("test is called from the function:");
        console.log(test.caller.toString());
    }
}
//caller属性只有当函数正在执行时才被定义
console.log("没有调用的情况下test.caller为：",test.caller);

test();//output: test is called from ,call from the top level

function testOuter() {
    test();
}
testOuter();//call from the function testOuter




//如果函数是从 JavaScript 程序的顶层调用的，则caller包含null。
//如果在字符串上下文中使用 caller 属性，则其结果和 functionName.toString 相同，也就是说，将显示函数的反编译文本
//函数对象属性之caller 获取调用当前函数的函数。例二
var obj = {
    foo1:function(){
        console.log(this.foo1.caller);
    },
    foo2:function abc(){ //写函数名与不写函数名的区别
        this.foo1();
    }
};
obj.foo1();
obj.foo2();
/*
null
3 ƒ abc(){ //写函数名与不写函数名的区别
        this.foo1();
    }
*/


//函数对象属性之callee 返回正被执行的 Function 对象，即指定的 Function 对象的正文
//callee 属性是 arguments 对象的一个成员，该属性仅当相关函数正在执行时才可用。通常这个属性被用来递归调用匿名函数
var func = function(n){
    if (n <= 0)
        return 1;
    else
        return n * func(n - 1);
        //return n * arguments.callee(n - 1);
};
console.log(func(4));

//优点，可以是匿名函数
(function(n){
    if (n <= 0)
        return 1;
    else
        return n * arguments.callee(n - 1);
}(4));


//函数对象属性之 constructor 获取创建某个对象的构造函数。可以用来判断对象是哪一类
var x = new String("Hello");
if (x.constructor == String){
    console.log("Object is a String.");
}

function MyObj() {
    this.number = 1;
}
var y = new MyObj();
if (y.constructor == MyObj){
    console.log("Object constructor is MyObj.");
}



// Part 11111111111111 函数作为参数被传递（最常见的形式，回调函数）
// 实例一 高阶函数一般应用 01
function add(x, y, f) {
    return f(x) + f(y);
}
add(2,3,function(x){return x+1;});//
add(2,-3,Math.abs);//绝对值
add(2,3,Math.sqrt);//2的开平方加3的开平方

//实例一  高阶函数一般应用 02
var word_2 = "do another thing.";
var function_1=function(callback){
    this.word_1 = "do something.";
    console.log(this.word_1);
    (callback && typeof(callback) === "function") && callback();
};
var function_2=function(){console.log(this.word_2)};
function_1(function_2);


// 实例二 数组相关的高阶函数 map reduce filter sort详情参见数组章节
function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
//每一个都映像

//将数组所有元素改为数字类型
var result = ["1", "2", "3"].map(function(val) {
    return parseInt(val);
});
for (var i=0;i<result.length;i++){
    console.log(typeof result[i]);
}

//reduce 相当于 [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
var arr = [1, 3, 5, 7, 9];
arr.reduce(function f(x, y) {
    return x + y;
}); // 25

//filter 数组过滤 ，返回为false的将被过滤掉
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]

// sort 排序
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}); // [1, 2, 10, 20]


//实例三 常用回调函数 设置超时和时间间隔的方法、异步请求、事件监听和处理
//超时回调实例
var timeOutId = setTimeout( function () {
    console.log("你已超时！");
},1000);

//假如这里有耗时的代码
clearTimeout(timeOutId);

//间隔回调实例
var timeInterval = setInterval(function () {
    console.log("Hi");
},1000);
//clearInterval(timeInterval);

//事件监听回调实例
document.addEventListener("click", function(){
    //document.getElementById("demo").innerHTML = "Hello World";
    console.log("click callback");
});













// Part 22222222222222222 函数作为返回值输出
var obj = {
    name:"obj",
    x:23,
    test:function(){
        console.log(this.x,this);
    }
};
var fun1 = function () {
    return function fun2() {
        return this.x;//若改为 return this;
    }
};
obj.fun3 = fun1;
obj.fun4 = fun1();
