---
title: 排序算法 Sort
date: 2019-11-26T10:00:23+08:00
categories: ["算法"]
tags: ["算法"]
---

# 一、插入排序

**核心想法**：像排序一手扑克牌，把一张牌开始时，我们的左手为空并且桌子上的牌面向下。然后我们每次从桌子上拿走一张牌并将它插入左手中正确的位置。为了找到一张牌的正确位置，我们从右到左将它已在手中的每张牌进行比较。
          
- 最坏情况 ：**O(n<sup>2</sup>)** 数组反向排序
- 最好情况 ：**O(n)** 数组已经排好序
- 平均情况 ：**O(n<sup>2</sup>)** 确定在什么位置插入元素num，平均地数组中有一半元素大于num，一半小于num

**代码**：

```angular2
public void insertionSort(int[] nums) {
	for (int j = 1; j < length; j++) {
		int key = nums[j];
		int i = j - 1;
		while (i >= 0 && nums[i] > key) {
			nums[i + 1] = nums[i];
			i--;
		}
        nums[i + 1] = key;
	}
}
```

# 一、插入排序

**核心想法**：像排序一手扑克牌，把一张牌开始时，我们的左手为空并且桌子上的牌面向下。然后我们每次从桌子上拿走一张牌并将它插入左手中正确的位置。为了找到一张牌的正确位置，我们从右到左将它已在手中的每张牌进行比较。
          
- 最坏情况 ：**O(n<sup>2</sup>)** 数组反向排序
- 最好情况 ：**O(n)** 数组已经排好序
- 平均情况 ：**O(n<sup>2</sup>)** 确定在什么位置插入元素num，平均地数组中有一半元素大于num，一半小于num

**代码**：

```angular2
public void insertionSort(int[] nums) {
	for (int j = 1; j < length; j++) {
		int key = nums[j];
		int i = j - 1;
		while (i >= 0 && nums[i] > key) {
			nums[i + 1] = nums[i];
			i--;
		}
        nums[i + 1] = key;
	}
}
```

# 二、冒泡排序

**核心想法**：反复交换相邻的未按次序排列的元素。
          
- 最坏情况 ：**O(n<sup>2</sup>)** 
- 最好情况 ：**O(n)** 
- 平均情况 ：**O(n<sup>2</sup>)** 

**代码**：

```angular2
public void bubbleSort(int[] nums) {
    int len = nums.length;
    for (int i = 0; i < len; i++) {
        for (int j = 1; j < (len - i); j++) {
            if (nums[j - 1] > nums[j]) {
                int temp = nums[j - 1];
                nums[j - 1] = nums[j];
                nums[j] = temp;
            }
        }
    }
}
```


