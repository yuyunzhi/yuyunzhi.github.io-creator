---
title: Java的数据类型
date: 2019-06-11 20:28:43
categories: [Java]
tags: [Java]
---

> 真正了不起的程序员对自己的程序的每一个字节都了如指掌

# 一、数据在计算机中是如何储存的？

### 1、字节和字节码

byte是计算机最小的存储单位，一个byte里分了8个"小格子",每个小格子称作bit。比如 

```
int i = 0
```

一个int是4个bytes,一共32位 所能表示的上限（二进制）是31个1，开头的位数表示符号

### 2、ASCII码

short 是2个字节
char 是2个字节
 
short s = 65
char c =65

虽然二进制存储的内容都是一样的 0100 0001 ，由于类型不同他们会以不同的方式所解释，
 
```
short s = 65;
char c =65;
System.out.println("c = " + c); //c=A
System.out.println("s = " + s); //s=65
```

**原因就是 ASCII码**

计算机的内容只能存0和1的数据，将这样的数据解释成A，这样的表叫ASCII码表
 
# 二、基本数据类型

在Java中，有两种数据类型：原生数据、引用数据

### 1、原生数据类型

当你声明 int a = 1  a就是这个值

- byte 2个字节 => 装箱数据类型 Byte  最大值 Byte.MAX_VALUE为127 最小值 Byte.MIN_VALUE为-128

- short 2个字节 => 装箱数据类型 Short
 
- int 4个字节 => 装箱数据类型 Integer  最大数值大概是21亿，超出就会溢出，重最小值开始叠加

- long 8个字节 => 装箱数据类型 Long

- float 4个字节但存储的不是整数

浮点数是小数，在计算机中是近视表示，因为二进制没办法把全部的十进制以整数存起来
0.1+0.2=0.000000000000034
因此不能以浮点数进行相等的操作

```
float i = 0.1f;
if(i==0.1f){
}

```
解决方案可以这样，比较大小
```
if(Maths.abs(d-1)<0.0000001){
  //因此可以说明浮点数d和1相等
}
```
- double 8个字节
- char 2个字节
- boolean true/false
- void

### 2、引用数据类型

当你声明 String s = "a",那么s就是一个地址(如：@541)，指向了内存中真正的值，

### 3、如何区分这两种类型

引用数据类型在java.lang里都有一个特定的类，否则就是原生数据类型

# 三、类型转换与类型提升

### 1、低精度转化为高精度没有问题
```
byte b = 100;
int i = b;
```

### 2、高精度转化为低精度需要类型转化(会损失数据)
```
int i =130;
byte c = (byte)i;
System.out.println("c = " + c);//c=-126
```

### 3、除数

```
divide(5,3);
public static double divide(int a ,int b){
    int result = a / b ; 
    System.out.println("result = " + result);//result=1
    return result
}

```
如果类型不同进行操作，需要把类型提高最高的精度。

```
divide(5,3);
public static double divide(int a ,int b){
     double result = (double)a / b ;
     System.out.println("result = " + result);//result=1.66666667
     return result;
}
```

