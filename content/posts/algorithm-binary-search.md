---
title: 二分搜索 Binary Search
date: 2019-11-09T23:00:23+08:00
categories: ["算法"]
tags: ["算法"]
---


# 一、一个简单的问题

- 问题：给定一个排序并不存在重复元素的数组: [1, 2, 5, 7, 8, 9, 13], 查找8的位置
- 直观想法：遍历整个数组，找到与给定值相同的元素，返回下标
- 时间复杂度为O(n)

# 二、使用二分搜索

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


# 三、举例

### 1、第一个错误版本

**题目**： 你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。
- 链接：https://leetcode-cn.com/problems/first-bad-version


**代码**：

```angular2
    public int firstBadVersion(int n){
        if(n == 0){
            return -1;
        }
        int start = 0;
        int end = n;
        while(start+1 < end ){
            int mid = start +(end - start)/2;
            if(isBadVersion(mid) == false){
                start = mid;
            } else{
                end = mid;
            }
        }
        if(isBadVersion(start) == true){
            return start;
        }
        if(isBadVersion(end) == true){
            return end;
        }
        return -1;
    }
```

### 2、搜索插入位置

**题目**：给定排序数组和目标值，如果找到目标，则返回索引。如果不是，则返回按顺序插入索引的位置的索引。可以假设阵列中没有重复项。

- case 1:输入: [1,3,5,6], 5 输出: 2
- case 2:输入: [1,3,5,6], 2 输出: 1
- case 3:输入: [1,3,5,6], 7 输出: 4
- 链接：https://leetcode.com/problems/search-insert-position/description/

**分析**：

- 可能的结果，存在,不存在（插入中间，插入开头，插入末尾）

**代码**：

```angular2
public int searchInsert(int[] nums,int target){
        if(nums.length == 0){
            return -1;
        }
        int start = 0;
        int end = nums.length-1;
        while(start+1 < end ){
            int mid = start +(end - start)/2;
            if(nums[mid] < target){
                start = mid;
            } else{
                end = mid;
            }
        }
        // 以下对结果分析：可能存在，可能不存在
     
        // 存在 于中间
        if(nums[start]== target){
            return start;
        }
        if(nums[end] == target){
            return end;
        }

        // 不存在，插入值应该在两端头部
        if(nums[start]>target){
            return 0;
        }

        if(nums[nums.length-1]<target){
            return nums.length;
        }

        // 不存在，返回值在数组中间
        return start + 1;
    }
```

### 3、矩阵搜索

**题目**:编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：每行中的整数从左到右按升序排列。每行的第一个整数大于前一行的最后一个整数。

- 输入:
```angular2
matrix = [
  [2,  4,  8,  9],
  [10, 11, 18, 21],
  [23, 32, 44, 66]
]
target = 4
```

- 输出：true

- 链接：https://leetcode-cn.com/problems/search-a-2d-matrix

**分析**：

- 二分法时间复杂度 O(logn) 

![图解](/algorithm/4.png)


**代码**:

```angular2
public boolean searchMatrix(int[][] nums,int target){
        if(nums.length == 0 || nums[0].length == 0){
            return false;
        }
        int start = 0;
        int row = nums[0].length;
        int col = nums.length;
        int end = row*col-1;
        while(start+1 < end ){
            int mid = start +(end - start)/2;
            int x = mid / row;
            int y = mid % row;
            if(nums[x][y] <= target){
                start = mid;
            } else{
                end = mid;
            }
        }
        if(nums[start/row][start%row]== target){
            return true;
        }
        if(nums[end/row][end%row] == target){
            return true;
        }
        return false;
    }
```

### 4、矩阵搜索II

**题目**：编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下性：每行的元素从左到右升序排列。每列的元素从上到下升序排列。

- 输入：
```angular2
matrix = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
target = 5
```

- 输出：true     
- 链接：https://leetcode-cn.com/problems/search-a-2d-matrix-ii

**分析**：

- 从右上到左下判断
- 当target 大于当前位置，向下+1
- 当target 小于当前位置，向左-1

**代码**：

```angular2
   public boolean searchMatrix(int[][] matrix,int target){
        if(matrix.length == 0 || matrix[0].length == 0){
            return false;
        }
        int rowBegin = 0;
        int rowEnd = matrix.length-1;
        int colBegin = 0;
        int colEnd = matrix[0].length -1;
        while(colBegin <= colEnd && rowBegin <= rowEnd ){
            int temp = matrix[rowBegin][colEnd];
            if(target == temp){
                return true;
            } else if(temp > target){
                colEnd--;
            } else if(temp < target){
                rowBegin++;
            }
        }
        return false;
    }
```

### 5、n 的平方根

**题目**：实现 int sqrt(int n) 函数。计算并返回 n 的平方根。n 保证是一个非负整数。

- 输入：8
- 输出：2  说明，8 的平方根是 2.82842...,由于返回类型是整数，小数部分将被舍去。     
- 链接：https://leetcode-cn.com/problems/sqrtx/description/

**代码**：

```angular2
public int mySqrt(int n){
        if(n < 0){
            return -1;
        }
        if(n == 0){
            return 0;
        }
        long start = 0;
        long end = n;
        while(start+1 < end ){
            long mid = start + (end - start)/2;
            long result = mid * mid;
            if(result == n){
                return (int)mid;
            }else if(result > n){
                end = mid;
            }else{
                start = mid;
            }
        }
        // 循环里没有找到，判断end*end start*start 这里的start 和 end都是整数
        if(end*end <= n ){
            return (int)end;
        }
        return (int)start;
    }
```

### 6、搜索旋转排序数组

**题目**：假设按照升序排序的数组在预先未知的某个关键点上旋转。（即 0 1 2 4 5 6 7 将变成 4 5 6 7 0 1 2）。给你一个目标值来搜索，如果数组中存在这个数则返回它的索引，否则返回 -1。你可以假设数组中不存在重复。

- 输入: nums = [4,5,6,7,0,1,2], target = 0
- 输出: 4

- 链接：https://leetcode-cn.com/problems/search-in-rotated-sortedarray/description/

**代码**：

```angular2
    public int search(int[] nums,int target){
        if(nums.length == 0){
            return -1;
        }

        int start = 0;
        int end = nums.length - 1;
        while(start+1 < end ){
            int mid = start + (end - start)/2;

            if(nums[mid] == target){
                end = mid;
            }else if(nums[mid] < nums[end]){
                if(nums[mid] <= target && target <= nums[end]){
                    start = mid;
                }else{
                    end = mid;
                }
            }else if(nums[mid] >= nums[end]){
                if(nums[mid] >= target && target >= nums[start]){
                    end = mid;
                }else{
                    start = mid;
                }
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


# 四、二分搜索总结

**注意**：一定要提前思考，满足结果有哪些情况

- 空数组、不存在的情况异常
- start起始值，0 还是1，还是其他值
- 确定判断是否是目标值的表达式,
- 两端的终止条件，返回结果类型及值

- 二分法模板的四点要素
```angular2
start + 1 < end
start + (end - start) / 2
nums[mid] ==, <, >
nums[start] nums[end] 与target关系
```

