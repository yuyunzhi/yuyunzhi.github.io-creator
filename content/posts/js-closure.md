---
title: 什么是闭包，闭包的用途是什么？
date: 2018-05-03T23:00:23+08:00
categories: ["JavaScript"]
tags: ["闭包"]
---

## 一、什么是闭包？

声明一个变量，声明一个函数，在函数内部访问外部的变量，那么这个函数加这个变量叫做闭包。

如下代码：

```angular2
var x = '变量'
function f(){
   console.log(x)
}
```

## 二、闭包有何作用？

1、闭包的用途是间接访问一个变量或隐藏一个变量，我们无法直接访问到函数内部的变量，必须通过一个函数间接的访问到；

2、可以把变量的值保存在内存中；即使暂时没有使用。

```angular2
function foo() {
    var a = 2

    function bar() {
        console.log(a)
    }
    return bar
}

var xxx = foo()
xxx()           // 2
```

上面的代码中，变量a和函数bar组成了一个闭包。return bar只是为了bar能够被使用，跟闭包无关。
