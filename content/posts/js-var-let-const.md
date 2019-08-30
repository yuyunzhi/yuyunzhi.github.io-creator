---
title: var、let、const的区别是什么？
date: 2018-07-25T23:00:23+08:00
categories: ["JavaScript"]
tags: ["JavaScript"]
---

## var
- var 命令会发生“变量提升”现象，即变量可以在声明之前使用，值为 undefined 。
- 内层变量可能覆盖外层变量
- 用来计数的循环变量泄露为全局变量

```angular2
var a = 100;
console.log(a,window.a);    // 100 100
 
let b = 10;
console.log(b,window.b);    // 10 undefined
 
const c = 1;
console.log(c,window.c);    // 1 undefined
```

## let
- 声明的全局变量不会挂在顶层对象下面
- 所声明的变量一定要在声明后使用，否则报错，报错 ReferenceError
- 暂时性死区，只要块级作用域内存在 let 命令，它所声明的变量就“绑定”（ binding ）这个区域，不再受外部的影响，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。
- 不允许重复声明

## const
- 声明的全局变量不会挂在顶层对象下面
- const 声明之后必须马上赋值，否则会报错
- const 简单类型一旦声明就不能再更改，复杂类型(数组、对象等)指针指向的地址不能更改，内部数据可以更改。
- const 一旦声明变量，就必须立即初始化，不能留到以后赋值。
- const 命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

```angular2
const a = 100; 
 
const list = [];
list[0] = 10;
console.log(list);　　// [10]
 
const obj = {a:100};
obj.name = 'apple';
obj.a = 10000;
console.log(obj);　　// {a:10000,name:'
```
