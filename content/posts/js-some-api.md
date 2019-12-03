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

# 二、JavaScript 数组API实现原理

### 1、循环遍历实现map

不改变原来数组，回调函数的参数及返回值

```angular2
Array.prototype.myMap = function(fn, context){
  var arr = Array.prototype.slice.call(this)
  var mapArr = []
  for (var i = 0; i < arr.length; i++ ){
    if(!arr.hasOwnProperty(i)) continue
    mapArr.push(fn.call(context, arr[i], i, this))
  }
  return mapArr
}

let a = [1,2,3]
let b = a.myMap((item,index)=>{return item*index})  // b = [0,2,6]
```

hasOwnProperty 的作用是 表示是否有自己的属性。要注意function换成箭头函数，内部this指向就不准确了。
使用push对fn返回的值进行添加到mapArr最后返回新的数组。

```angular2
let obj = {
    a: 1,
    fn: function(){},
    c:{d: 5}
};
console.log(obj.hasOwnProperty('a'));  // true
console.log(obj.hasOwnProperty('fn'));  // true
console.log(obj.hasOwnProperty('c'));  // true
console.log(obj.c.hasOwnProperty('d'));  // true
console.log(obj.hasOwnProperty('d'));  // false, obj对象没有d属性
```

### 2、reduce实现map

reduce的使用：pre是上一个return的值，所以使用[...pre , fn.call(context,cur,index,this)]

```angular2
Array.prototype.myMap = function(fn, context){
  let arr = Array.prototype.slice.call(this)
  let newArr = arr.reduce((pre,cur,index)=>{
      return [...pre,fn.call(context,cur,index,this)]
  },[])
  return newArr
}
```


### 3、循环遍历实现filter

需要注意的是，filter的fn是返回一个boolean，当boolean为true的时候才push到数组里

```angular2
Array.prototype.myFilter = function(fn, context){
  let arr = Array.prototype.slice.call(this)
  let filterArr = []
  for(let i = 0; i< arr.length; i++){
      if(!arr.hasOwnProperty(i)) continue
      fn.call(context,arr[i],i,this) && filterArr.push(arr[i])
  }
  return filterArr
}
```

### 4、reduce实现 filter

这里的reduce是根据fn.call返回的是否是true来决定是否要添加当前的item

```angular2
Array.prototype.myFilter = function(fn, context){
  let arr = Array.prototype.slice.call(this)
  let newArr = arr.reduce((pre,cur,index)=>{
      return fn.call(context,cur,index,this) ? [...pre,cur] : [...pre]
  },[])
  return newArr
}
```

### 5、循环实现some

some的作用是遍历数组，判断是否满足某个条件返回boolean值

```angular2
 function isBigEnough(element, index, array) {
   return (element >= 5); //数组中是否有一个元素大于 10
 }
 let result = [2, 3, 0, 1, 4].some(isBigEnough); // false
 let result = [6, 5, 8, 2, 3].some(isBigEnough); // true
```

mySome，如果是空数组则返回false，满足条件就退出循环返回true，没有一个满足条件则返回false

```angular2
Array.prototype.mySome = function(fn,context){
  let arr = Array.prototype.slice.call(this)
  if(arr.length===0) return false
  for(let i = 0; i<arr.length; i++){
    if(!arr.hasOwnProperty(i)) continue
    if(fn.call(context,arr[i],i,this)){
      return true
    }
  }
  return false
}
```

### 6、循环实现reduce

reduce 第一个参数是函数，第二参数是初始值，可有可无，如果初始值没有的话直接取arr[0]，数组循环从第一个开始

```angular2
Array.prototype.myReduce = function(fn,initData){
  let arr = Array.prototype.slice.call(this)
  let res = initData || arr[0]
  let startIndex = initData ? 0 : 1;
  for(let i = startIndex;i<arr.length; i++){
    res = fn.call(null,res,arr[i],i,this)
  }
  return res
}
```



