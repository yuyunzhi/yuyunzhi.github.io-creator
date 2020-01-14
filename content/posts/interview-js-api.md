---
title: JavaScript一些常用方法
date: 2020-01-03T23:00:23+08:00
categories: ["面试"]
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
typeof Object // function
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

# 三、发布订阅模式

挂在在window下的eventHub

```angular2
window.eventHub = {
    events: {},
    //发布 到eventhub 使用方式 window.eventHub.emit('xxx',data)
    emit(eventName, data){
        for(let key in this.events){
            if(key === eventName){
                let functionList = this.events[key]
                functionList.map((fn)=>{
                    fn.call(undefined, data)
                })
            }
        }
    },
    // 从eventhub上订阅，使用方式 window.eventHub.on('xxx',data=>{})
    on(eventName, fn){
        if(this.events[eventName] === undefined){
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    },
}

// events 存放的key 是事件名，value 是数组，数组里面是不同的函数，
// 意味着一个事件触发的时候会在不同的地方进行调用数组里对应的函数
window.eventHub.emit('xxx',123)
window.eventHub.on('xxx',data=>{
    console.log(data); // 123
})
```

ES6写法

```angular2
class EventBus {
    constructor(){
        this.events = {
            // eventName1:[fn1,fn2,fn3 ……]
            // eventName2:[fn40,fn21,fn33 ……]
        }
    }
    on(eventName,cb){
        if(this.events[eventName] === undefined){
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    }
    emit(eventName,data){
        for(let key in this.events){
            if(key === eventName){
                let functionList = this.events[key]
                functionList.map((fn)=>{
                    fn.call(undefined, data)
                })
            }
        }
    }
}
export default new EventBus()
```

# 四、手写一个AJAX

使用 XHR来发送请求

```angular2
let xhr = new XMLHttpRequest()
xhr.open('POST', '/xxxx')
xhr.onreadystatechange = function(){
     if(xhr.readyState === 4 && xhr.status === 200){
         console.log(xhr.responseText)
     }
}
xhr.send('a=1&b=2')
```


# 五、继承的ES5、ES6写法

什么是继承，一个类继承另一个类的属性和方法，在JS中至少要完成2次原型链的搜索

[戳戳戳，5种继承方案](https://www.yuyunzhi.com/js-inherit/)

ES6 写法

```angular2
class Human{
     constructor(name){
         this.name = name
     }
     run(){
         console.log("我叫"+this.name+"，我在跑")
     }
}
class Man extends Human{
     constructor(name){
         super(name)
         this.gender = '男'
     }
     fight(){
         console.log('糊你熊脸')
     }
}
```

# 六、Promise如何使用

then

```angular2
$.ajax(...).then(成功函数, 失败函数)
```

链式 then  

```angular2
$.ajax(...).then(成功函数, 失败函数).then(成功函数2, 失败函数2)
```

如何自己生成 Promise 对象 

```angular2
function xxx(){
      return new Promise(function(resolve, reject){
          setTimeout(()=>{
              resolve() 或者 reject()
          },3000)
      })
}
xxx().then(...)
```

# 七、get和put请求与响应

get和put请求

```angular2
动词 / HTTP/1.1
Host: www.baidu.com
User-Agent: curl/7.54.0
Accept: */*
Content-Length: 10
Content-Type: application/x-www-form-urlencoded
空
1234567890
```

get和put响应

```angular2
HTTP/1.1 403 Forbidden
Conetent-Type:application/json
Conetent-Length:300
空
{“error”:“密码错误”}
```

# 八、实现一个事件委托

假设父元素有4个儿子，我不监听4个儿子，而是监听父元素，看触发事件的元素是哪个儿子，这就是事件委托。可以监听还没有出生的儿子（动态生成的元素）。省监听器。

```angular2
function listen(element, eventType, selector, fn) {
element.addEventListener(eventType, e => {
   let el = e.target
   while (!el.matches(selector)) {
       if (element === el) {
           el = null
           break
       }
       el = el.parentNode
   }
   el && fn.call(el, e, el)
})
return element
} 
listen(ul, 'click', 'li', ()=>{})
```

# 九、如何实现深拷贝

* 基本类型的赋值是深拷贝：字符串、数字，布尔，undefined，null
* 使用JSON来拷贝

递归拷贝

```angular2
function clone(object){
   var object2
   if(! (object instanceof Object) ){ // 基本类型深拷贝
       return object
   }else if(object instanceof Array){
       object2 = []
   }else if(object instanceof Function){
       object2 = eval(object.toString())
   }else if(object instanceof Object){
       object2 = {}
   }
   for(let key in object){
       object2[key] = clone(object[key])
   }
   return object2
}
```

# 十、去重

ES6

```angular2
var arr = [1,2,2,3,4] // 需要去重的数组
var set = new Set(arr) // {1,2,3,4}
var newArr = Array.from(set) // 再把set转变成array
console.log(newArr) // [1,2,3,4]
```

计数排序

```angular2
var a = [4,2,5,6,3,4,5]
var hashTab = {}
for(let i=0; i<a.length;i++){
     if(a[i] in hashTab){
         // 什么也不做
     }else{
         hashTab[ a[i] ] = true
     }
}
//hashTab: {4: true, 2: true, 5: true, 6:true, 3: true}
console.log(Object.keys(hashTab)) // ['4','2','5','6','3']
```

# 十一、斐波那契数列及优化

基础的递归版本，性能极差，fib(500)就爆栈了

```angular2
function fib(n){   
    if(n < 1) throw new Error("参数有误")          
    if(n <= 2){ return 1}       
    return fib(n - 1) + fib(n - 2)
}
```


缓存优化版本，性能略好，仍然可能

```angular2
let cache = [];
function fib(n){        
    if(cache[n] !== undefined){               
           return cache[n]
    }          
    if(n <= 2){               
          cache[n] = 1
          return 1
    }    
    cache[n] = fib(n - 1) + fib(n - 2)
    return cache[n];
}
console.log(fib(5)) // 5
```

动态规划版本

```angular2
function fib (n) {
    let res = 1;
    if(n === 1 && n ===2) return res
    n = n-2
    let cur = 1
    let pre = 1
    while (n) {
        res = cur + pre
        pre = cur
        cur = res
        n--
    }
    return res
}
```

# 十二、函数防抖


用在input中，一段时间内只触发一次，在一段时间内又触发那么时间就重新计算。函数防抖就是法师发技能的时候要读条，技能读条没完再按技能就会重新读条。

```angular2
   debounce(fn,time=300,options={
      leading:true,
      context:null,
    }){
      let timer;
      const _debounce = (...args)=>{
          if(timer){
            clearTimeout(timer)
          }

          if(options.leading && !timer){
            timer = setTimeout(null,time)
            fn.apply(options.context,args)
          }else{
            timer = setTimeout(()=>{
              fn.apply(options.context,args)
              timer = null
            },time)

          }
      }

      _debounce.cancel = ()=>{
        clearTimeout(timer)
        timer = null
      }

      return _debounce
    }
```

leading 为是否在进入时立即执行一次，同时通过闭包向外暴露了一个 cancel 函数，使得外部能直接清除内部的计数器

应用场景：

- search搜索，用户在不断输入值时，用防抖来节约请求资源
- window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次


使用方式：

```angular2
function handler() {
     console.log(1)
}
let debouncedFn = debounce(handler, 2000)
let button = document.querySelector("button")
button.onclick =  debouncedFunc.cancel
window.addEventListener('scroll', debouncedFn)
```

# 十四、节流函数

可以用在click中，持续的点击，只根据设定的时间稳定的间隔触发事件。


```angular2
   throttle(fn,time=1000,options={
      leading:true,
      context:null
    }){
      let time
      let previous = new Date(0).getTime()
      const _throttle = (...args)=>{
        let now = new Date().getTime()
        if(!options.leading){
          if(timer) return
          timer = setTimeout(()=>{
              fn.apply(options.context,args)
              timer = null
          },time)
        }else if(now - previous > time){
          fn.apply(options.context,args)
          previous = now
        }
      }
      _throttle.cancel = ()=>{
        previous = 0
        clearTimeout(timer)
        timer = null
      }

      return _throttle
    },
```

应用场景：

- 鼠标不断点击触发，mousedown(单位时间内只触发一次)
- 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断

使用方法：

```angular2
    let throttleAjax = throttle(ajax, 1000)

    let inputc = document.getElementById('throttle')
    inputc.addEventListener('keyup', function(e) {
        throttleAjax(e.target.value)
    })
```

# 十五、实现call


原理实现

```angular2
function myCall(context,...args) {
  // 1
  if (typeof this !== 'function'){
    throw new TypeError('error')
  }
  // 2
  context = context || window
  // 3
  const fn = Symbol()
  context.fn = this
  // 4
  const result = context.fn(...args)
  // 5
  delete context.fn

  return result
}

Function.prototype.myCall = myCall

getName.myCall(obj， 'str1', 'str2')

```

用法

```angular2
const obj={
    a:1,
    b:2
}
function getName(a,b){
 // console.log('arguments',arguments)
  console.log(this)
}
getName.myCall(obj, 'str1', 'str2')
```

# 十六、柯里化

**思路**：1、使用闭包来储存上一次调用结果的变量，fn,args；2、对函数停止时做边界处理

```angular2
function curry(fn){
    if(fn.length <= 1) return fn
    const generator = (...args) =>{
        if(fn.length === args.length){
            return fn(...args)
        }else{
            return (...args2)=>{
                return generator(...args,...args2)
            }
        }
    }
    return generator
}

// 使用方式
let add = (a,b,c,d ) => a+b+c+d
const curriedAdd = curry(add)
curriedAdd(5)(6)(7)(8)
curriedAdd(5，6)(7)(8)
curriedAdd(5，6，7，8)
```

# 十七、实现Object.assign

- 先判断是否是oject，不是的话就返回
- 获取所有参数并且转化为数组
- 遍历该数组[{},{}],再遍历每个对象的key，把key和value赋值给target
- 最后返回target

实现代码

```angular2
    // 函数版本
    function assign (target) {
        // 验证第一个参数是否为object
        if (typeof target !== 'object' || target == null) {
            return Object(target);
        }
        // arguments转为数组
        let copyList = Array.prototype.slice.call(arguments, 1);
        let len = copyList.length;
        // 循环复制多个对象的属性
        for (let i = 0; i < len; i++) {
            let item = copyList[i];
            // 获取当前对象的属性
            for (let key in item) {
                // 判断属性是否在对象本身上
                if (item.hasOwnProperty(key)) {
                    // 复制给目标对象
                    target[key] = item[key]
                }
            }
        }
        // 返回目标对象
        return target;
    }
```

使用方式

```angular2
    // 验证assign代码
    var target = { firstname: 'target', age: 20 };
    var source = { lastname: 'source', age: 21 };
    const newtarget = assign(target, source);
    // target与newtarget指向同一个内存地址
    console.log(target); // {firstname: "target", age: 21, lastname: "source"}
    console.log(newtarget); // {firstname: "target", age: 21, lastname: "source"}
    console.log(newtarget === target); // true
```

# 十八、实现REM

```angular2
// 原始配置
function setRem () {
  let doc = document.documentElement
  let width = doc.getBoundingClientRect().width
  let rem = width / 75
  doc.style.fontSize = rem + 'px'
}
// 监听窗口变化
addEventListener("resize", setRem)
```

# 十九、实现一个数据双向绑定

```
let obj = {}
let input = document.getElementById('input')
let span = document.getElementById('span')
// 数据劫持
Object.defineProperty(obj, 'text', {
  configurable: true,
  enumerable: true,
  get() {
    console.log('获取数据了')
  },
  set(newVal) {
    console.log('数据更新了')
    input.value = newVal
    span.innerHTML = newVal
  }
})
// 输入监听
input.addEventListener('input', function(e) {
  obj.text = e.target.value
})

```




