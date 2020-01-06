---
title: JavaScript 6种继承方式
date: 2020-01-06T13:00:23+08:00
tags: ["JavaScript"]
categories: [JavaScript]
---


## 1、原型链继承

```angular2
//父类型
function Person(name, age) {
   this.name = name,
   this.age = age,
   this.play = [1, 2, 3]
   this.setName = function () { }
}
Person.prototype.setAge = function () { }
//子类型
function Student(price) {
   this.price = price
   this.setScore = function () { }
}
Student.prototype = new Person() // 子类型的原型为父类型的一个实例对象
var s1 = new Student(15000)
var s2 = new Student(14000)
console.log(s1,s2)
```

特点：

- 父类新增原型方法/原型属性，子类都能访问到
- 简单，易于实现


缺点：

- 子类继承的时候会作为公有属性，这样子类1操作这个属性的时候，就会影响到子类2
- 创建子类实例时，无法向父类构造函数传参
- 要想为子类新增属性和方法，必须要在Student.prototype = new Person() 之后执行，不能放到构造器中
- 无法实现多继承


## 2、借用构造函数继承

```angular2
function Person(name,age){
  this.name = name
  this.age = age
}

Person.prototype.setAge = function(){
  console.log('设置AGE')
}

function Student(price,name,age){
  Person.call(this,name,age)
  this.price = price
  this.setScore = function(){}
}

let s1 = new Student(15000)
console.log(s1)
```

特点：

- 解决了原型链继承中子类实例共享父类引用属性的问题
- 创建子类实例时，可以向父类传递参数
- 可以实现多继承(call多个父类对象)

缺点：

- 实例并不是父类的实例，只是子类的实例
- 只能继承父类的实例属性和方法，不能继承原型属性和方法
- 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能


