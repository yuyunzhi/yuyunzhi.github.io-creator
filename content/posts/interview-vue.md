---
title: Vue
date: 2020-01-18T23:00:23+08:00
categories: ["面试"]
tags: ["Vue"]
---

# 一、写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

key是给每一个vnode的唯一id,可以依靠key,更准确, 更快的拿到oldVnode中对应的vnode节点。

如果不加key，某些节点有绑定数据（表单）状态，会出现状态错位。
