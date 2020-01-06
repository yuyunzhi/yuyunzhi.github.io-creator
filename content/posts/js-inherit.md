---
title: JavaScript 5种继承方式
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

## 3、原型链+借用构造函数的组合继承

```angular2
function Person(name, age) {
            this.name = name,
            this.age = age,
            this.setAge = function () { }
        }
        Person.prototype.setAge = function () {
            console.log("111")
        }
        function Student(name, age, price) {
            Person.call(this,name,age)
            this.price = price
            this.setScore = function () { }
        }
        Student.prototype = new Person()
        Student.prototype.constructor = Student//组合继承也是需要修复构造函数指向的
        Student.prototype.sayHello = function () { }
        var s1 = new Student('Tom', 20, 15000)
        var s2 = new Student('Jack', 22, 14000)
        console.log(s1)
        console.log(s1.constructor) //Student
```

优点：

- 可以继承实例属性/方法，也可以继承原型属性/方法
- 不存在引用属性共享问题
- 可传参
- 函数可复用

缺点：

- 调用了两次父类构造函数，生成了两份实例


## 4、组合继承优化

借助原型可以基于已有的对象来创建对象，var B = Object.create(A)以A对象为原型，生成了B对象。B继承了A的所有属性和方法。

```angular2
function Person(name, age) {
        this.name = name,
        this.age = age
}

Person.prototype.setAge = function () {
    console.log("111")
}

function Student(name, age, price) {
    Person.call(this, name, age)
    this.price = price
    this.setScore = function () {}
}

Student.prototype = Object.create(Person.prototype)//核心代码
Student.prototype.constructor = Student//核心代码
var s1 = new Student('Tom', 20, 15000)
console.log(s1 instanceof Student, s1 instanceof Person) // true true
console.log(s1.constructor) //Student
console.log(s1)

```

同样的，Student继承了所有的Person原型对象的属性和方法。目前来说，最完美的继承方法

## 5、ES6中class 的继承

需要注意的是，class关键字只是原型的语法糖，JavaScript继承仍然是基于原型实现的

```angular2
class Person {
    //调用类的构造方法
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    //定义一般的方法
    showName() {
        console.log("调用父类的方法")
        console.log(this.name, this.age);
    }
}

let p1 = new  Person('kobe', 39)
console.log(p1)

//定义一个子类
class Student extends Person {
    constructor(name, age, salary) {
        super(name, age)//通过super调用父类的构造方法
        this.salary = salary
    }
    showName() {//在子类自身定义方法
        console.log("调用子类的方法")
        console.log(this.name, this.age, this.salary);
    }
}

let s1 = new Student('wade', 38, 1000000000)
console.log(s1)
s1.showName()
```
