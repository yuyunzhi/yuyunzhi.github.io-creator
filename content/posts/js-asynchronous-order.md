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

## 2、Event Loop

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）

![宏任务和微任务之间的关系](/images/js/1.png)
