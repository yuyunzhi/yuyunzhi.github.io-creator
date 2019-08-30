---
title: 移动端是怎么做适配的？
date: 2018-07-09T23:00:23+08:00
categories: ["JavaScript"]
tags: ["rem","响应式页面"]
---

> 这里介绍个方案包含5个点：1、meta viewport；2、媒体查询；3、动态rem方案；4、对rem微调；5、其他细节补充。

## 一、meta viewport

```angular2
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```
在head标签内部加上这段代码。

该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让viewport的宽度等于设备的宽度。

```angular2
width=device-width: 让当前viewport宽度等于设备的宽度
user-scalable=no: 禁止用户缩放
initial-scale=1.0: 设置页面的初始缩放值为不缩放
maximum-scale=1.0: 允许用户的最大缩放值为1.0
minimum-scale=1.0: 允许用户的最小缩放值为1.0
```

## 二、媒体查询（响应式）

### 1、格式一

```angular2
@media （）and（）{}
//满足（）里的条件，就执行大括号里css的样式
```

**举例：**

```angular2
<style>
@media (max-width:320px){
    body{
        background:red;
    }
}
@media (min-width:321px) and (max-width:320px){
    body{
        background:orange;
    }
}
@media (min-width:376px) and (max-width:425px){
    body{
        background:green;
    }
}
@media (min-width:426px) and (max-width:768px){
    body{
        background:blue;
    }
}
@media (min-width:769px){
    body{
        background:grey;
    }
}   
</style>
```

### 2、格式二

**并举例**
```angular2
<link rel="stylesheet" href="style.css"media="(max-width:320px)">
```
注意点：
1、link标签会下载好，但是是否生效取决于media的条件；
2、有PC端经验，就有移动端经验，只是多了一个media查询；
3、通过添加多个css样式来满足不同的屏幕宽度；

## 三、动态rem方案

1rem等于根元素html的font-size的值，那么可以调整根元素的font-size值来调整页面缩放后的各个元素的尺寸和定位。

在script标签加入这段代码：

```angular2
<script>
   var pageWidth=window.innerWidth  //获取屏幕宽度
   document.documentElement.style.fontSize= `${pageWidth/60}px`
</script>
```

此处，fontSizede的值为屏幕宽的十分之一，那么在写CSS的时候可以这样写：
```angular2
.xxx{
    width:0.4rem;
    height:0.2rem;
    margin:0.05rem 0.05rem;
    float:left;
 }
 ```

 用sass将px转化为rem：
 
```angular2
@function px( $px ){
  @return $px/$designWidth*10 + rem;
}
$designWidth: 320px; 

那么1rem=32px
```

## 四、对动态rem进行微调

1、rem都是小数很不方便。所以让 html 的 font-size 的尺寸等于 window.innerWidth/10；

2、浏览器默认可设置的最小字体大小为12px，浏览器默认可设置的最小字体大小为12px，浏览器默认可设置的最小字体大小为12px；

3、在精细的地方，就直接写像素，混用px rem em
- 比如border:1px solid red;
- 比如页面字体的大小就直接写font-size:16px

## 五、其他补充

**1、px em rem vh vw的区别**

```angular2
px：表示像素
em：一个字的高度 //1em == 自己font-size的值
rem：root em // 根元素html的font-size
vh：viewport height   视口高度=100vh
vw：viewport width    视口宽度=100vw
```
2、body默认字体为16px，其中chrome默认可设置的最小字体大小为12px，更改body的font-size是rem是不会变的，更改的必须是html的font-size。

**3、百分比布局和整体缩放布局的区别**
- 百分比布局：无法让高度跟着屏幕宽度改变而进行有比例的改变，高度和宽度无法做任何的配合；
- 整体缩放布局：一切单位以宽度为基准。



