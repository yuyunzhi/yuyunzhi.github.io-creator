---
title: 声明一个函数立即执行
date: 2018-05-03T23:00:23+08:00
categories: ["JavaScript"]
tags: ["JavaScript"]
---

> 不要用全局变量做id 或变量，容易覆盖。如果偏要用，那么……声明一个函数立即执行。

## 一、声明一个函数立即执行的三种方式

### 1、在函数末尾加上.()

```angular2
function (){
   var parent = document.querySelector('#self')
}.()
```

### 2、在函数末尾加上.call()

```angular2
function(){
   var parent = document.querySelector('#self')
}.call()
```

### 3、声明完函数，立即调用

```angular2
function xxx(){
   var parent = document.querySelector('#self')
}
xxx()
```

但是浏览器会报错，怎么解决？

## 二、解决浏览器报错

### 1、技巧1：整体加括号

```angular2
（function(){
   var parent = document.querySelector('#self')
}.call()）
```

### 2、技巧2：对匿名函数加括号

```angular2
（function(){
   var parent = document.querySelector('#self')
}）.call()
```

### 3、技巧3：在函数前加-或+或！或~号，告诉浏览器后面是一个值

```angular2
-function(){
   var parent = document.querySelector('#self')
}.call()
```

注意：在一个{}里用let声明一个变量，这个变量的作用局就是在这个花括号里
