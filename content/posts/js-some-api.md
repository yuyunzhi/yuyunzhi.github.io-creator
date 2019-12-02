---
title: JavaScript一些常用API实现原理
date: 2019-12-01T23:00:23+08:00
categories: ["JavaScript"]
tags: ["JavaScript"]
---

# 一、instanceof 和 typeof 

### 1、typeof使用:

typeof一般被用于判断一个变量的类型是否为以下7种 ：number, string, object, boolean, function, undefined, symbol。但是typeof 在判断一个 object的数据的时候只能告诉我们这个数据是 object, 而不能细致的具体到是哪一种 object
 
```angular2
typeof 1 // number
typeof "1" // string
typeof [] //object
typeof function(){} // function
typeof {} // object
typeof null // object
typeof undefined // undefined
typeof true // boolean
```

### 2、typeof null 

为什么结果是 object ?因为底层储存变量的时候000表示对象，而 null 的所有机器码也均为0, undefined 用 −2^30 整数来表示。所以 typeof null 结果为object。


### 3、Object.prototype.toString.call

使用这个方法来对一个变量类型进行比较准确的判断。

```angular2
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call('hello') // "[object String]"
Object.prototype.toString.call({a:'a'}) // "[object Object]"
Object.prototype.toString.call([1,'a']) // "[object Array]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(() => {}) // "[object Function]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(Symbol(2)) // "[object Symbol]"
```

因此，实现一个函数来具体判断一个变量的类型：

```angular2
const myTypeOf =(target,type)=>{
	return Object.prototype.toString.call(target) === `[object ${type}]`
}
myTypeOf([],'Array') // true
myTypeOf(1,'Number') // true
```

### 4、instanceof 操作及原理

instanceof 主要的作用就是判断一个实例是否属于某种类型。

```angular2
const animal = function () {}
const dog = new animal()
dog instanceof animal  // true
```

instanceof 也可以判断一个实例是否是其父类型或者祖先类型的实例。

```angular2
const animal = function () {}
const person = function () {}
person.prototype = new animal()
const xiaoming = new person()

xiaoming instanceof person // true
xiaoming instanceof animal // true
```


### 5、关于instanceof的一些思考

实现一个myInstanceof：

```angular2
function myInstanceof(leftVaule, rightVaule) { 
    let rightPrototype = rightVaule.prototype; // 构造函数的prototype
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
    	if (leftVaule === null) {
            return false;	
        }
        if (leftVaule === rightPrototype) {
            return true;	
        } 
        leftVaule = leftVaule.__proto__ 
    }
}
myInstanceof(1,Number) // true
myInstanceof([],Array) // true
```

知道原理后，思考以下代码为什么打出的是这样的结果？

```angular2
function Foo() {}

Object instanceof Object // true
Function instanceof Function // true
Function instanceof Object // true
Foo instanceof Foo // false
Foo instanceof Object // true
Foo instanceof Function // true
```

**Object instanceof Object**:

```angular2
leftValue = Object.__proto__
rightValue = Object.prototype

可知当 Object.__proto__.__proto__ === Object.prototype
所以：Object instanceof Object 为true
```

**Function instanceof Function**:

```angular2
leftValue = Function.__proto__
rightValue = Function.prototype

可知 Fuction.__proto__ === Function.prototype
所以：Function instanceof Function 为true
```

**Function instanceof Object**:

```angular2
leftValue = Function.__proto__
rightValue = Object.prototype

可知 Fuction.__proto__.__proto__ === Object.prototype
所以：Function instanceof Object 为true
```

**Foo instanceof Foo **:

```angular2
leftValue = Foo.__proto__  //  === Function.prototype
rightValue = Foo.prototype

可知 Fuction.__proto__.__proto__ === Object.prototype // 不等于Foo.prototype
所以：Foo instanceof Foo  为false
```

**Foo instanceof Function **:

```angular2
leftValue = Foo.__proto__  //  === Function.prototype
rightValue = Function.prototype

可知 Foo.__proto__ === Function.prototype // 不等于Foo.prototype
所以：Foo instanceof Function  为true
```
