---
title: JavaScript知识
date: 2020-01-02T17:00:23+08:00
categories: ["面试"]
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

## 6、异步过程的构成要素有哪些？和异步过程是怎样的 ？

总结一下，一个异步过程通常是这样的：

- 主线程发起一个异步请求，相应的工作线程接收请求并告知主线程已收到(异步函数返回)；
- 主线程可以继续执行后面的代码，同时工作线程执行异步任务；
- 工作线程完成工作后，通知主线程；
- 主线程收到通知后，执行一定的动作(调用回调函数)。

异步函数通常具有以下的形式：A(args..., callbackFn)。

- 它可以叫做异步过程的发起函数，或者叫做异步任务注册函数。
- args 和 callbackFn 是这个函数的参数。

所以，从主线程的角度看，一个异步过程包括下面两个要素：

- 发起函数(或叫注册函数) A。
- 回调函数 callbackFn。

它们都是在主线程上调用的，其中注册函数用来发起异步过程，回调函数用来处理结果。

```angular2
setTimeout(fn, 1000);
```

其中的 setTimeout 就是异步过程的发起函数，fn 是回调函数。

## 7、请描述一下 cookies，sessionStorage 和 localStorage 的区别

- cookie 数据始终在同源的 http 请求中携带（即使不需要），即 cookie 在浏览器和服务器间来回传递。而 sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。
- 存储大小限制也不同，cookie 数据不能超过 4k，同时因为每次 http 请求都会携带 cookie，所以 cookie 只适合保存很小的数据，如会话标识。
- sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。
- 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie 只在设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。
- 作用域不同，sessionStorage 在不同的浏览器窗口中不共享，即使是同一个页面；cookie 和 localStorage 在所有同源窗口中都是共享的。

## 8、从敲入 URL 到渲染完成的整个过程，包括 DOM 构建的过程，说的约详细越好？

[戳戳戳，看这里](https://juejin.im/post/5b9ba9c15188255c8320fe27)

## 9、js 的两种回收机制

标记清除（mark and sweep）

从语义上理解就比较好理解了，大概就是当变量进入到某个环境中的时候就把这个变量标记一下，比如标记为“进入环境”，当离开的时候就把这个变量的标记给清除掉，比如是“离开环境”。而在这后面还有标记的变量将被视为准备删除的变量。

- 垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记（可以使用任何标记方式）。
- 然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。
- 而在此之后再被加上的标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。
- 最后，垃圾收集器完成内存清除工作。销毁那些带标记的值并回收它们所占用的内存空间。

这是 javascript 最常见的垃圾回收方式。至于上面有说道的标记，到底该如何标记 ？ 好像是有很多方法，比如特殊位翻转，维护一个列表什么的。

引用计数（reference counting）

- 引用计数的含义是跟踪记录每个值被引用的次数，当声明一个变量并将一个引用类型的值赋给该变量时，这个时候的引用类型的值就会是引用次数 +1 了。如果同一个值又被赋给另外一个变量，则该值的引用次数又 +1。
- 相反如果包含这个值的引用的变量又取得另外一个值，即被重新赋了值，那么这个值的引用就 -1 。当这个值的引用次数编程 0 时，表示没有用到这个值，这个值也无法访问，因此环境就会收回这个值所占用的内存空间回收。
- 这样，当垃圾收集器下次再运行时，它就会释放引用次数为 0 的值所占用的内存。

## 10、闭包的理解 ？

首先必须理解 Javascript 特殊的变量作用域。 变量的作用域无非就是两种：全局变量和局部变量。

于函数内部可以直接读取全局变量。

```angular2
var n = 999;
function f1() {
  alert(n);
}
f1(); // 999
```

另一方面，在函数外部自然无法读取函数内的局部变量。

```angular2
function f1() {
  var n = 999;
}
alert(n); // error
```

这里有一个地方需要注意，函数内部声明变量的时候，一定要使用 var 命令。 如果不用的话，你实际上声明了一个全局变量！

```angular2
function f1() {
  n = 999;
}
f1();
alert(n); // 999
```

如何从外部读取局部变量 ？

```angular2
function f1() {
  var n = 999;
  function f2() {
    alert(n);
  }
  return f2;
}
var result = f1();
result(); // 999
```

## 11、JavaScript 判断一个变量是对象还是数组 ？

第一，使用 typeof 加 length 属性

```angular2
var getDataType = function(o) {
  if (typeof o == "object") {
    if (typeof o.length == "number") {
      return "Array";
    } else {
      return "Object";
    }
  } else {
    return "param is no object type";
  }
};
```

第二，使用 instanceof

```angular2
var getDataType = function(o) {
  if (o instanceof Array) {
    return "Array";
  } else if (o instanceof Object) {
    return "Object";
  } else {
    return "param is no object type";
  }
};
```

## 12、ES5 的继承和 ES6 的继承有什么区别 ？

ES5 的继承时通过 prototype 或构造函数机制来实现。

- ES5 的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到 this 上（Parent.apply(this)）。
- ES6 的继承机制完全不同，实质上是先创建父类的实例对象 this（所以必须先调用父类的 super()方法），然后再用子类的构造函数修改 this

具体的：ES6 通过 class 关键字定义类，里面有构造方法，类之间通过 extends 关键字实现继承。子类必须在 constructor 方法中调用 super 方法，否则新建实例报错。因为子类没有自己的 this 对象，而是继承了父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类得不到 this 对象。

ps：super 关键字指代父类的实例，即父类的 this 对象。在子类构造函数中，调用 super 后，才可使用 this 关键字，否则报错。


## 13、JS类型判断---typeof, constructor, instanceof, toString

[戳戳戳](https://juejin.im/post/5d99b56f518825222b5b6737)

## 14、翻转一个字符串

先将字符串转成一个数组，然后用数组的 reverse() + join() 方法。

```angular2
let a = "hello word";
let b = [...str].reverse().join(""); // drow olleh
```

## 15、null 和 undefined 的区别

在原始类型中，有两个类型Null和Undefined，他们都有且仅有一个值，null和undefined，并且他们都代表无和空，我一般这样区分它们：

**null**

表示被赋值过的对象，刻意把一个对象赋值为null，故意表示其为空，不应有值。所以对象的某个属性值为null是正常的，null转换为数值时值为0。

**undefined**

表示“缺少值”，即此处应有一个值，但还没有定义，

如果一个对象的某个属性值为undefined，这是不正常的，如obj.name=undefined，我们不应该这样写，应该直接delete obj.name。

undefined转为数值时为NaN(非数字值的特殊值)

## 16、值传递和引用传递

值传递

```angular2
let name = 'xxxx';
function changeValue(name){
  name = 'code秘密花园';
}
changeValue(name);
console.log(name); // xxxx
```

引用传递

```angular2
let obj = {name:'xxx'};
function changeValue(obj){
  obj.name = 'code秘密花园';
}
changeValue(obj);
console.log(obj.name); // code秘密花园
```

当函数参数是引用类型时，我们同样将参数复制了一个副本到局部变量，只不过复制的这个副本是指向堆内存中的地址而已，我们在函数内部对对象的属性进行操作，实际上和外部变量指向堆内存中的值相同，但是这并不代表着引用传递。

```angular2
let obj = {};
function changeValue(obj){
  obj.name = 'ConardLi';
  obj = {name:'code秘密花园'};
}
changeValue(obj);
console.log(obj.name); // ConardLi
```

## 17、Symbol特性

**独一无二**

```angular2
var sym1 = Symbol();  // Symbol() 
var sym2 = Symbol('ConardLi');  // Symbol(ConardLi)
var sym3 = Symbol('ConardLi');  // Symbol(ConardLi)
var sym4 = Symbol({name:'ConardLi'}); // Symbol([object Object])
console.log(sym2 === sym3);  // false
```

如果我们想创造两个相等的Symbol变量，可以使用Symbol.for(key)。使用给定的key搜索现有的symbol，如果找到则返回该symbol。否则将使用给定的key在全局symbol注册表中创建一个新的symbol。

```angular2
var sym1 = Symbol.for('ConardLi');
var sym2 = Symbol.for('ConardLi');
console.log(sym1 === sym2); // true
```

**原始类型**

```angular2
typeof Symbol() === 'symbol'
typeof Symbol('ConardLi') === 'symbol'
```

## 18、0.1+0.2 为什么 不等于0.3

因为0.1和0.2会先转化成二进制无限小数，而JS存储无限小数使用64位固定长度来表示导致精度丢失。


## 19、隐式转换

![隐式转换规则(图片来自ConardLi)](/images/js/2.jpeg)


**各种运数学算符**：我们在对各种非Number类型运用数学运算符(- * /)时，会先将非Number类型转换为Number类型;

```angular2
1 - true // 0
1 - null //  1
1 * undefined //  NaN
2 * ['5'] //  10
```

注意+是个例外，执行+操作符时：

1.当一侧为String类型，被识别为字符串拼接，并会优先将另一侧转换为字符串类型

2.当一侧为Number类型，另一侧为原始类型，则将原始类型转换为Number类型

3.当一侧为Number类型，另一侧为引用类型，将引用类型和Number类型转换成字符串后拼接

```angular2
123 + '123' // 123123   （规则1）
123 + null  // 123    （规则2）
123 + true // 124    （规则2）
123 + {}  // 123[object Object]    （规则3）
```

**一道有意思的题**

如何让：a == 1 && a == 2 && a == 3。

根据上面的拆箱转换，以及==的隐式转换，会先调用valueOf或者toString,我们可以轻松写出答案：

```angular2
const a = {
   value:[3,2,1],
   valueOf: function () {return this.value.pop(); },
}
```

## 20、setTimeout、Promise、Async/Await 的区别

- setTimeout宏任务，会在微任务执行完根据队列先进先出的方式依次执行
- Promise本身是同步的立即执行函数，到执行了reslove或者 reject才是异步属于微任务。
- async 函数返回一个promise，当执行到await就会返回跳出async函数体。await 后面的代码属于微任务。

## 21、ES5/ES6 的继承除了写法以外还有什么区别？

问题是继承的差异。

```angular2
class Super {}
class Sub extends Super {}

const sub = new Sub();

Sub.__proto__ === Super;
```

子类可以直接通过 __proto__ 寻址到父类。

```angular2
function Super() {}
function Sub() {}

Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var sub = new Sub();

Sub.__proto__ === Function.prototype;
```

而通过 ES5 的方式，Sub.__proto__ === Function.prototype

## 22、说一下XSRF？

XSRF 又名 CSRF，跨站请求伪造，它是前端常见的一种攻击方式。

![XSRF](/images/js/xsrf.png)
原理：A登录了信任的网站B，B给A返回了cookie。在A没有退出B网站时去访问了C网站(攻击者网站)，C带着A的cookie去访问了B网站的服务器。

解决方案：

- referer:验证请求的 referer，但是 referer 也是可以伪造的
- 使用token，前后端协调好cookieName和tokenName。从返回的cookie中拿到token，再在header上加token，服务端根据token来验证token
