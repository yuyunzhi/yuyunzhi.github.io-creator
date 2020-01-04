---
title: JavaScript输出结果题
date: 2020-02-03T23:00:23+08:00
categories: ["面试"]
tags: ["JavaScript"]
---

## 1、下面程序输出的结果是 ？

```angular2
if (!("a" in window)) {
  var a = 1;
}
alert(a); // undefined
```

代码解析：如果 window 不包含属性 a，就声明一个变量 a，然后赋值为 1。

首先，在 es6 之前，所有的全局变量都是 window 的属性，语句 var a = 1; 等价于 window.a = 1; 你可以用如下方式来检测全局变量是否声明："变量名称" in window

所以：

```angular2
var a;
alert("a" in window); // true
```

## 2、下面的输出结果是 ？

```angular2
var out = 25,
  inner = {
    out: 20,
    func: function() {
      var out = 30;
      return this.out;
    }
  };
console.log((inner.func, inner.func)()); //25
console.log(inner.func());//20
console.log((inner.func = inner.func)());//25
```

先看第一个输出：25，因为 ( inner.func, inner.func ) 是进行逗号运算符，逗号运算符就是运算前面的 ”,“ 返回最后一个，举个栗子

```angular2
var i = 0,
  j = 1,
  k = 2;
console.log((i++, j++, k)); // 返回的是 k 的值 2 ，如果写成 k++ 的话  这里返回的就是 3
console.log(i); // 1
console.log(j); // 2
console.log(k); // 2
```

回到原题 ( inner.func, inner.func ) 就是返回 inner.func ，而 inner.func 只是一个匿名函数

```angular2
(function() {
  var out = 30;
  return this.out;
})();
```

第三个console.log 考查的是一个等号运算 inner.func = inner.func ，其实返回的是运算的结果， 举个栗子

```angular2
var a = 2,
  b = 3;
console.log((a = b)); // 输出的是 3
```

所以 inner.func = inner.func 返回的也是一个匿名函数。此刻，道理就和第一个 console.log 一样了，输出的结果是 25。


## 3、下面程序输出的结果是 ？

```angular2
var a = 1;
var b = function a(x) {
  x && a(--x);
};
alert(a);
```

这个题目看起来比实际复杂，alert 的结果是 1。因为函数声明会覆盖变量声明，但不会覆盖变量赋值。

为了解释这个，我们来看一个例子：

```angular2
function value() {
  return 1;
}
var value;
alert(typeof value); //"function"
```

## 4、下面程序输出的结果是 ?

```angular2
function b(x, y, a) {
  arguments[2] = 10;
  alert(a);
}
b(1, 2, 3);
```

结果为 10。

活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。

## 5、三道判断输出的题都是经典的题

```angular2
var baz = 3;
var bazz = {
  baz: 2,
  getbaz: function() {
    return this.baz;
  }
};
console.log(bazz.getbaz());
var g = bazz.getbaz;
console.log(g());
```

明显输出是 3，因为里面修改了 a 这个全局变量，那个 function a(){} 是用来干扰的，虽然函数声明会提升，就被 a 给覆盖掉了，这是我的理解。

```angular2
var baz = 3;
var bazz = {
  baz: 2,
  getbaz: function() {
    return this.baz;
  }
};
console.log(bazz.getbaz());
var g = bazz.getbaz;
console.log(g());
```

第一个输出是 2，第二个输出是 3

```angular2
var arr = [1, 2, 3, 4, 5];
for (var i = 0; i < arr.length; i++) {
  arr[i] = function() {
    alert(i);
  };
}
arr[3]();
```

典型的闭包，弹出 5 。







