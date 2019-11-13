---
title: 算法复杂度
date: 2019-10-29T23:00:23+08:00
categories: ["算法"]
tags: ["算法"]
---

### 1、热身：从一个数组查找一个数，需要花多少时间？假如数组长度10个？假如数组长度1万个？假如数组长度100万个？

- 最好的情况：第一个 T(n)=O(1)
                      - 最坏的情况：最后一个 T(n)=O(n)
                      - 期望情况(平均情况)：T(n)=O(n)

- 时间复杂度： 执行算法所需要的计算工作量
- 空间复杂度： 执行算法所需要的内存空间

### 2、什么是时间复杂度

- 在计算机科学中，时间复杂性，又称时间复杂度，算法的时间复杂度是一个函数，它定性描述该算法的运行时间。这是一个代表算法输入值的字符串的长度的函数。时间复杂度常用大O符号表述，不包括这个函数的低阶项和首项系数。

![时间复杂度对比](/algorithm/compare.jpg)

### 3、时间复杂度计算-一般问题

- 基本操作的时间复杂度：丢弃常数项、丢弃次要项
- 复合操作：加还是乘

![加还是乘](/algorithm/co.jpg)

### 4、时间复杂度计算-递归问题

- **什么是递归**：在数学与计算机科学中，是指在函数的定义中使用函数自身的方法。递归一词还较常用于描述以自相似方法重复事物的过程。

- **经验性结论**：递归问题的时间复杂度通常(并不总是)看起来形如**O(branches<sup>depth</sup>)**，其中branches指递归分支的总数，depth指递归调用深度

### 5、时间复杂度计算-主定理

![公式](/algorithm/1.jpeg)


### 6、计算例题

- 该题的空间复杂度为 O(2n) --> O (n)

```angular2
void foo(int[] array){
    int sum = 0;
    int product = 1;
    for(int i =0; i < array.length; i++){
        sum += array[i]
    }
    for(int i =0; i < array.length; i++){
        product *= product[i]
    }
    System.out.println(sum + "," + product)
}
```

- 该题的空间复杂度为 O(n<sup>2</sup>) 

```angular2
void printPairs(int[] array){
    for(int i = 0; i < array.length; i++){
         for(int j = 0;j < array.length; j++){
            System.out.println(array[i]+ "," + array[j])
         }
    }
}
```

- 该题的空间复杂度为 O(n<sup>2</sup>*100000+n) --> O(n<sup>2</sup> ) 
```angular2
void foo(int[] arrayA, int[] arrayB) {
    for (int i = 0; i < arrayA.length; i++) {
        for (int j = 0; j < arrayB.length; j++) {
            for (int k = 0; k < 100000; k++) {
                System.out.println(arrayA[i] + "," + arrayB[j]);
            }
        }
    }
}
```

- 递归时间复杂度 O(2<sup>log2<sup>n</sup></sup>) -> O(n),分支为2，深度为log2<sup>n</sup>。注意这题和下题的区别

```angular2
int sum(Node node){
    if(node === null){
        return 0;
    }
    return sum(node.left)+node.value+sum(node.right)
}
```

- 递归时间复杂度为O(2<sup>n</sup>),分支为2，深度为n

```angular2
int calculate(int n){
    if(n<=0){
        return 1;
    }
    return calculate(n-1) + calculate(n-1)
}
```

```angular2
假如n=4   
第0个节点 调用1次函数 calculate(4)
第1个节点 调用2次函数 calculate(3)
第2个节点 调用4次函数 calculate(2)
第3个节点 调用8次函数 calculate(1)
第4个节点 调用16次函数 calculate(0)
所以规律是：
第n个节点 调用2^n次函数 calculate(0)

2^0 + 2^1 + …… + 2^n = O(n^2)
```

- 斐波那契数列递归时间复杂度 O(2<sup>n</sup>),分支为2，深度计算为n。注意这种没有优化的递归，性能不怎么好

```angular2
void fib(int n) {
    if(n <= 0) return 1;
    else if(n==1) return 1;
    return fib(n-1) + fib(n-2)
}
```


