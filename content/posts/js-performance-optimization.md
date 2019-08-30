---
title: 前端性能优化
date: 2018-11-21T23:00:23+08:00
categories: ["JavaScript"]
tags: ['性能优化']
---

## 1、使用懒加载

- 组件懒加载


```angular2
const xxx =()=>import('./components/xxx.vue')
```

- 路由懒加载

## 2、减少或合并DOM操作或使用虚拟DOM

```angular2
// 不好的方式
//var elem = $('#elem');
//for (var i = 0; i < 100; i++) {
//  elem.append('<li>element '+i+'</li>');
//}

// 好的方式
var elem = $('#elem' ),
arr = [];
for (var i = 0;  i < 100; i++) {
  arr.push('<li>element ' +i+'</li>' );
}
elem.append(arr. join(''));
```

## 3、减少监听器，使用事件委托

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

## 4、对大量数据计算使用缓存

```angular2
// data.length === 100000
   for(var i = 0;i < data.length;i++){
     // do something...
   }
   //上面的代码没有下面的好
   for(var i = 0,len = data.length;i < len;i++){
     // do something...
   }
```

## 5、使用setTimeout降低调用接口频率

## 6、CSS、JS请求优化

- 使用CDN：用CDN请求静态资源同时可以增大同时下载数量，内容分发网络（CDN）可以使请求总时间降低
  
- CSS放在head里：因为chrome需要下载完所有的css后才渲染页面
  
- JS放在body里的最后：JS放后面保证用户能尽早看到完整的页面，再继续下载js文件。

## 7、优化TCP协议

- 使用keep-alive：连接回复加上请求头：keep-alive。第一次请求不断开，第二次请求复用。
- 使用http 2.0版本：复用率会更高

## 8、用户体验上

- 用户看到哪些内容就请求哪些内容
- 加一个loading动画用户会感觉时间变快

## 9、优化DNS查询

- 减少域名：尽量把所有的资源放在一个域名下
