---
title: JavaScript
date: 2020-01-02T17:00:23+08:00
categories: ["JavaScript"]
tags: ["JavaScript"]
---

## 1、常见的浏览器内核有哪些 ？介绍一下你对浏览器内核的理解 ?

- Trident 内核：IE, 360，搜狗浏览器 MaxThon、TT、The World,等
- Gecko 内核：火狐，FF，MozillaSuite / SeaMonkey 等
- Presto 内核：Opera7 及以上
- Webkit 内核：Safari，Chrome 等 

内核主要分成两部分：渲染引擎(layout engineer 或 Rendering Engine) 和 JS 引擎。

**渲染引擎**：

负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。 浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。 所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。

**JS 引擎**：

解析和执行 javascript 来实现网页的动态效果。
最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。

## 2、call、apply、bind

- call 跟 apply 的用法几乎一样，唯一的不同就是传递的参数不同，call 只能一个参数一个参数的传入。
- apply 则只支持传入一个数组，哪怕是一个参数也要是数组形式。最终调用函数时候这个数组会拆成一个个参数分别传入。
- 至于 bind 方法，他是直接改变这个函数的 this 指向并且返回一个新的函数，之后再次调用这个函数的时候 this 都是指向 bind 绑定的第一个参数。
- bind 传参方式跟 call 方法一致。

简易版本bind实现

```angular2
Function.prototype.bind = function(context) {
  var self = this;
  return function() {
    return self.apply(context, arguments);
  };
};

var obj = {
  name: "前端工程师"
};
var func = function() {
  console.log(this.name);
}.bind(obj);
func();
```

**求一个数组中最大或者最小值**

```angular2
const arr = [1, 2, 3, 4, 5, 6];
const max = Math.max.apply(null, arr);
console.log(max); // 6
```

**利用 call 和 apply 做继承**

```angular2
function Animal(name) {
  this.name = name;
  this.showName = function() {
    console.log(this.name); // this 为undefined
  };
}

function Cat(name) {
  Animal.call(this, name);  //这里的this是Cat
}

var cat = new Cat("TONY");
cat.showName(); //TONY
```

**判断变量类型**：

```
let arr1 = [1, 2, 3];
let str1 = "string";
let obj1 = { name: "thomas" };

function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

console.log(Object.prototype.toString.call(arr1)); // [object Array]
console.log(Object.prototype.toString.call(str1)); // [object String]
console.log(Object.prototype.toString.call(obj1)); // [object Object]
console.log(Object.prototype.toString.call(null)); // [object Null]
```


**总结**：

- 当我们使用一个函数需要改变 this 指向的时候才会用到 call apply bind
- 如果你要传递的参数不多，则可以使用 fn.call(thisObj, arg1, arg2 ...)
- 如果你要传递的参数很多，则可以用数组将参数整理好调用 fn.apply(thisObj, [arg1, arg2 ...])
- 如果你想生成一个新的函数长期绑定某个函数给某个对象使用，则可以使用 const newFn = fn.bind(thisObj); newFn(arg1, arg2...)


## 3、什么是伪数组？如何将伪数组转化为标准数组？

**同时符合以下条件为伪数组**：

- 具有length属性
- 按索引方式存储数据 {}
- 不具有数组的push,pop等方法

典型的是函数的argument参数，还有像调用getElementsByTagName,document.childNodes之类的,它们都返回NodeList对象都属于伪数组。


**伪数组转化真数组**：

伪数组
```angular2
const fakeArray = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    length:4
};
```

方法一：
```
let arr2 = Array.prototype.slice.call(fakeArray)
```

方法二：相比第一种效率高
```angular2
let arr2 = [].slice.call(fakeArray);
```

方法三：ES6
```angular2
let arr2 = Array.from(fakeArray);
```

方法四：初始化空数组，遍历伪数组并push到真数组里

## 4、mouseenter 和 mouseover 的区别

- 不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件，对应 mouseout。
- 只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件，对应 mouseleave。
 









