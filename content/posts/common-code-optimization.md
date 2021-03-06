---
title: 代码优化思路
date: 2019-02-09T23:00:23+08:00
categories: ["Code通用"]
tags: ["代码优化"]
---

## 一、代码优化的基本原则

- 易读性优先
- 如果不是性能瓶颈，就不要为了性能而改写代码
- 复杂性守恒原则：无论你怎么写代码，复杂性都是不会消失的

## 二、优化思路

- SCSS:将页面多次使用的颜色提取出来保存在变量，常用的代码块提取出来使用@include导入
- 基础组件、共用样式、共用JS全局引入
- 命名的词性
    - 普通变量/属性用「名词」
    - bool变量/属性用「形容词」或者「be动词」或者「情态动词」或者「hasX」
    - 普通函数/方法用「动词」开头
    - 回调、钩子函数用「介词」开头，或用「动词的现在完成时态」
    - 容易混淆的地方加前缀
- 使用函数来改代码
    - 两处以上的相同的代码或功能封装
    - 一般一个函数超过5行会有进一步优化的空间
- 表驱动编程
- 抽象函数处理复杂逻辑，返回Boolean值
- 用对象来组织代码，就比如vue里的js
