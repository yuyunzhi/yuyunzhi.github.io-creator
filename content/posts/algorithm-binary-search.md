---
title: 二分搜索 Binary Search
date: 2019-11-16T23:00:23+08:00
categories: ["算法"]
tags: ["算法"]
---


### 1、一个简单的问题

- 问题：给定一个排序并不存在重复元素的数组: [1, 2, 5, 7, 8, 9, 13], 查找8的位置
- 直观想法：遍历整个数组，找到与给定值相同的元素，返回下标
- 时间复杂度为O(n)

#### 2、使用二分搜索

- 二分搜索将目标值与数组的中间元素进行比较
- 如果某一特定元素大于或者小于中间元素，则在数组大于或小于
- 中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。
- 如果在某一步骤数组为空，则代表找不到。
- 这种搜索算法每一次比较都使搜索范围缩小一半。
- 在排序数组中搜索的最快方法


**二分搜索模板**：

```angular2
public int binarySearch(int[] nums,int target){
        if(nums.length == 0){
            return -1;
        }
        int start = 0;
        int end = nums.length-1;
        while(start+1 < end ){
            int mid = start +(end - start)/2;

            if(nums[mid] > target){
                end = mid;
            }else if(nums[mid] < target){
                start = mid;
            }else{
                end = mid;
            }
        }
        if(nums[start] == target){
            return start;
        }
        if(nums[end] == target){
            return end;
        }
        return -1;
    }
```

**关于上述代码的要点**：

- 对输入做异常处理：数组为空或者数组长度为0
- int mid = start + (end - start) / 2 这种表示方法可以防止两个整型值相加时溢出
- 使用迭代而不是递归进行二分查找，因为工程中递归写法存在潜在溢出的可能
- while循环终止条件：while终止条件应为start + 1 < end而不是start <= end，start == end时可能出现死循环，即循环终止条件是相邻或相交元素时退出。配合while终止条件start + 1 < end（相邻即退出）的赋值语句mid永远没有+1或者-1，这样不会死循环。
- 迭代终止时target应为start或者end中的一个。循环终止条件有两个，具体应看是找第一个还是最后一个而定。

**二分搜索时间复杂度计算**：

T(n) = O(logn)
