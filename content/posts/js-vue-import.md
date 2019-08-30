---
title: Vue全局引入文件
date: 2019-03-01T23:00:23+08:00
categories: ["JavaScript"]
tags: ["Vue"]
---

>写Vue项目的时候，需要对代码进行优化，重复使用的组件、样式、JS进行全局引入并统一管理，这样对代码的维护会很好。

## 1、全局引入scss文件

安装sass-resources-loader

```angular2
npm i sass-resources-loader --save-dev
```

然后修改vue-cli的build/utils.js，找到scss的加载设置替换

```angular2
scss: generateLoaders('sass')
```

替换成

```angular2
scss: generateLoaders('sass').concat({
  loader:'sass-resources-loader',
  options:{
    resources:path.resolve(__dirname,'./../src/assets/scss/base.scss')
  }
}),
```

## 2、全局引入JS文件

在main.js 引入，并挂在到原型链上，如api.js

```angular2
import API from './assets/js/api/api.js'
Vue.prototype.$api = API;
```

## 3、全局引入基础组件

在main.js 引入

```angular2
import Icon from './components/y-c/icon.vue'
Vue.component('y-icon',Icon)
```

## 4、全局引入函数

在main.js引入，并挂在到原型链上

```angular2
Vue.prototype.$xxx = function(){}
```
