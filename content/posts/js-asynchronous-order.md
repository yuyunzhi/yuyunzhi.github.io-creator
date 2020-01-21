---
title: js异步执行顺序及Event Loop
date: 2020-01-05T23:00:23+08:00
categories: ["JavaScript"]
tags: ["JavaScript"]
---

## 1、JS执行顺序
先看一段代码，得出执行顺序：1、9、5、0、6、2、7、4、8、3

```angular2
(function() {
    setTimeout(() => {
        console.log(0);
    });

    new Promise(resolve => {

        console.log(1);
        
        setTimeout(() => {
            resolve();
            Promise.resolve().then(() => {
                console.log(2);
                setTimeout(() => console.log(3));
                Promise.resolve().then(() => console.log(4));
            });
        });

        Promise.resolve().then(() => console.log(5));

    }).then(() => {

        console.log(6);
        Promise.resolve().then(() => console.log(7));
        setTimeout(() => console.log(8));

    });

    console.log(9);
})();
```


**思路**：主线程会先执行一遍，执行，异步（宏任务、微任务）压入栈。当主线程执行完毕后就会从队列里取出任务（微任务>宏任务）。每次执行微任务或宏任务都会把该任务分解同步、宏任务、微任务，重复上面的步骤。

- 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）

- 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

- 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

- 主线程不断重复上面的第三步。


宏任务一般是：包括整体代码script，setTimeout，setInterval、I/O、UI render

微任务主要是：Promise、Object.observe、MutationObserver


## 2、从一道题浅说 JavaScript 的事件循环

```angular2
//请写出输出内容
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');


/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

- 队列：先进先出
- 先执行完微任务，再执行宏任务
- await async2() ,async2 里面的console是同步，但是async2函数后面的就是微任务了


因此

```angular2
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}
```

等价于

```angular2
async function async1() {
	console.log('async1 start');
	Promise.resolve(async2()).then(() => {
                console.log('async1 end');
        })
}
```

很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码。

## 3、变式

```angular2
async function a1 () {
    console.log('a1 start')
    await a2()
    console.log('a1 end')
}
async function a2 () {
    console.log('a2')
}

console.log('script start')

setTimeout(() => {
    console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
    console.log('promise1')
})

a1()

let promise2 = new Promise((resolve) => {
    resolve('promise2.then')
    console.log('promise2')
})

promise2.then((res) => {
    console.log(res)
    Promise.resolve().then(() => {
        console.log('promise3')
    })
})
console.log('script end')
```

结果

```angular2
script start
a1 start
a2
promise2
script end
promise1
a1 end
promise2.then
promise3
setTimeout
```

## 3、Event Loop

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）

![宏任务和微任务之间的关系](/images/js/1.png)
