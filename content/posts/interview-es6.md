---
title: HTML、CSS
date: 2020-01-07T13:00:23+08:00
categories: ["面试"]
tags: ["ES6"]
---


## 1、let 和 const

let 所声明的变量，可以改变

```angular2
let a = 123
a = 456 // 正确，可以改变

let b = [123]
b = [456] // 正确，可以改变
```

const 声明一个只读的常量。一旦声明，常量的值就不能改变。简单类型的数据（数值、字符串、布尔值），不可以变动。复合类型的数据（主要是对象和数组），可以这样子变动。

```angular2
const a = 123
a = 456 // 报错，不可改变

const b = [123]
b = [456] // 报错，不可以重新赋值，不可改变

const a = [123]
a.push(456) // 成功

const b = {}
b.name = 'demo'  // 成功
```

对于 数值、字符串、布尔值 经常会变的，用 let 声明。

对象、数组和函数用 const 来声明。


## 2、解构赋值

**数组**

一次性声明多个变量，结合扩展运算符：

```
let [a, b, c] = [1, 2, 3];
let [head, ...tail] = [1, 2, 3, 4];

console.log(head) // 1
console.log(tail) // [2, 3, 4]
```

解构赋值允许指定默认值：

```angular2
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a'];
// x='a', y='b'
```

**对象**

```angular2
let { a, b } = { a: "aaa", b: "bbb" };
a // "aaa"
b // "bbb"
```

数组中，变量的取值由它 排列的位置 决定；而对象中，变量必须与 属性 同名，才能取到正确的值。

对象的解构也可以指定默认值。

```angular2
let {x = 3} = {};
x // 3

let {x, y = 5} = {x: 1};
x // 1
y // 5
```

**字符串**

```angular2
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

**用途**

交换变量的值

```angular2
let x = 1;
let y = 2;

[x, y] = [y, x];
```

从函数返回多个值

```angular2
// 返回一个数组
function example() {
  let [a, b, c] = [1, 2, 3]
  return  [a, b, c] 
}
let [a, b, c] = example();

// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

函数参数的默认值

```angular2
function funA (a = 1, b = 2){
      return a + b;
}

funA(3) // 5 因为 a 是 3, b 是 2
funA(3，3) // 6 因为 a 是 3, b 是 3
```

输入模块的指定方法

```angular2
const { SourceMapConsumer, SourceNode } = require("source-map");
```

## 3、模板字符串

所有模板字符串的空格和换行，都是被保留的

```angular2
console.log(`输出值为 N, 

换行`)
// "输出值为 N

换行"
```

模板字符串中嵌入变量，需要将变量名写在 ${ } 之中

```angular2
let x = 1;
let y = 2;

console.log(`输出值为：${x}`) // "输出值为：1"
console.log(`输出值为：${x + y}`) // "输出值为：3"
```

模板字符串之中还能调用函数
```angular2
function fn() {
  return "Hello World";
}

console.log(`输出值为：${fn()}`) // "输出值为：Hello World"
```

## 4、 字符串函数扩展

includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

```angular2
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
```

这三个方法都支持第二个参数，表示开始搜索的位置。

```angular2
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
```

## 5、数值扩展

```angular2
2 ** 2 // 4
2 ** 3 // 8

let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
```
