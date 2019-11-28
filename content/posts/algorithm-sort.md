---
title: 排序算法 Sort 冒泡、归并、快速、插入
date: 2019-11-17T10:00:23+08:00
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

# 二、冒泡排序

**核心想法**：反复交换相邻的未按次序排列的元素。每一次选出该次最大的数字往后冒泡
          
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

# 三、归并排序

**核心想法**：递归， 分治法（Divide and Conquer)

**分治法**：分解：将数组划分为两个规模为n/2的子数组；解决：递归地对两个子数组分别排序；合并：递归地合并两个子数组。
      
**时间复杂度分析**：T(n)=2T(n/2)+O(n)->O(nlogn)

**代码**：

```angular2
public void mergeSort(int[] nums){
    mergeSort(nums, 0, nums.length-1);
}

private void mergeSort(int[] nums, int begin, int end) {
    if (begin < end) {
        int mid = begin + (end - begin) / 2;
        mergeSort(nums, begin, mid);
        mergeSort(nums, mid + 1, end);
        merge(nums, begin, mid, end);
    }
}

private void merge(int[] nums, int start, int mid, int end) {
    int leftLen = mid - start + 1;
    int rightLen = end - mid;

    int[] left = new int[leftLen];
    int[] right = new int[rightLen];

    for (int i = 0; i < leftLen; i++) {
        left[i] = nums[start + i];
    }

    for (int j = 0; j < rightLen; j++) {
        right[i] = nums[mid + 1 + j];
    }

    int index = start;
    int i, j = 0;
    while (i < leftLen && j < rightLen) {
        if (left[i] <= right[j]) {
            nums[index++] = left[i++];
        } else {
            nums[index++] = rightLen[j++];
        }
    }

    while (i < leftLen) {
        nums[index++] = left[i++];
    }

    while (j < rightLen) {
        nums[index++] = right[j++];
    }
}
```

# 四、快速排序

**核心想法**：递归， 分治法（Divide and Conquer)

**分治法**：分解：将数组划分为两个（可能为空）子数组，使得前一个子数组中的每个元素都小于或等于nums[pivot]，后一个都大于nums[pivot];解决：递归地对两个子数组分别排序;合并：由于子数组都是原地排序不需要合并
      
**时间复杂度分析**:O(nlogn)

- 例如：[6,2,8,7,4,5,1]

**代码**：

```angular2
public void quicksort(int[] num) {
    quicksort(nums, 0, num.length-1);
}

public void quicksort(int[] nums, int begin, int end) {
    if (begin >= end) {
        return;
    }
    int pivotPostion = partition(nums, begin, end);
    quicksort(nums, begin, pivotPostion - 1);
    quicksort(nums, pivotPostion + 1, end);
}

public int partition(int[] nums, int begin, int end) {
    int pivot = nums[begin];
    while (begin < end) {
        while (begin < end && nums[end] >= pivot) {
            end--;
        }
        nums[begin] = nums[end];
        while (begin < end && nums[begin] <= pivot) {
            begin++;
        }
        nums[end] = nums[begin];
    }
    nums[begin] = pivot;
    return begin;
}
```






