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

```angular2
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
```angular2
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
 

## 5、哪些常见操作会造成内存泄漏 ？

内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

**1、创建了全局变量**

```angular2
function foo(){
  window.name = '前端曰'；
}

// 又或者
function foo(){
  this.name = '前端曰'；
}
foo() // 其实这里的this就是指向的window对象
```

解决方案：在你的Javascript文件最前面添加 'use strict;'

**2、循环引用**：引用计数的策略是将“对象是否不再需要”简化成“对象有没有其他对象引用到它”，如果没有对象引用这个对象，那么这个对象将会被回收 。

```angular2
function func() {  
    let obj1 = {};  
    let obj2 = {};  
  
    obj1.a = obj2; // obj1 引用 obj2  
    obj2.a = obj1; // obj2 引用 obj1  
}
```

当函数 func 执行结束后，返回值为 undefined，所以整个函数以及内部的变量都应该被回收，但根据引用计数方法，obj1 和 obj2 的引用次数都不为 0，所以他们不会被回收。要解决循环引用的问题，最好是在不使用它们的时候手工将它们设为空。

解决方案：obj1 和 obj2 都设为 null 

**3、老生常谈的闭包**:匿名函数可以访问父级作用域的变量。

```angular2
var names = (function(){  
    var name = 'js-say';
    return function(){
        console.log(name);
    }
})()
```

**4、被遗忘的定时器**：日常需求中，可能会经常试用到 setInterval/setTimeout ，但是使用完之后通常忘记清理

```angular2
 mounted() {
    this.refreshInterval = setInterval(function() {
      // 轮询获取数据
      this.refresh()
    }, 2000)
  }
```
组件销毁的时候，setInterval 还是在运行的，里面涉及到的内存都是没法回收的（浏览器会认为这是必须的内存，不是垃圾内存），需要在组件销毁的时候清除计时器

```angular2
  beforeDestroy() {
    clearInterval(this.refreshInterval)
  }
```

**5、被遗忘的事件监听器**：无用的事件监听器需要清理掉

```angular2
 mounted() {
    window.addEventListener('resize', () => {
      // 这里做一些操作
    })
  },
```

上面的组件销毁的时候，resize 事件还是在监听中，里面涉及到的内存都是没法回收的（浏览器会认为这是必须的内存，不是垃圾内存），需要在组件销毁的时候移除相关的事件

```angular2
 mounted() {
    this.resizeEventCallback = () => {
      // 这里做一些操作
    }
    window.addEventListener('resize', this.resizeEventCallback)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeEventCallback)
  },
```





