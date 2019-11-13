---
title: 双指针算法 && ArrayList实现方式
date: 2019-10-31T12:00:23+08:00
categories: ["算法"]
tags: ["数组"]
---


# 一、什么是数组？

- 数组由相同类型的元素（element）的集合所组成的结构
- 分配一块连续的内存来存储元素
- 利用元素的索引（index）可以计算出该元素对应的储存地址

# 二、数组Array的特性

- 在内存中为连续空间，定址公式： addr(curElem) = addr(intialElem) +sizeof(curElem) * index
- 存储在数组中的元素是相同类型的
- 通过index获取数组元素的时间复杂度为O(1)

# 三、ArrayList的实现

- Java中的声明: ArrayList<Integer> list = new ArrayList<Integer>();
- 基本操作

![ArrayList基本操作API](/algorithm/arraylist.jpeg)

- 利用数组作为存储
- 初始化时需要指定ArrayList的容量
- 记得边界检查
- 当达到数组容量时再添加新元素时,需要resize操作对底层数组进行扩容

**附上实现代码:**

```angular2
public class ArrayList {
    private int capacity;
    private int size;
    private int[] data;

    public ArrayList(int capacity){
        this.capacity = capacity;
        this.size = 0;
        this.data = new int[capacity];
    }

    public int get(int index){
        if(index<0 || index>size){
            //throw Exception
        }
        return data[index];
    }

    public void set(int index,int value){
        if(index<0 || index>size){
            //throw Exception
        }
        data[index] = value;
    }

    public void add(int index , int value){
        if(index < 0 || index > size){
            //throw Exception
        }
        if(size == capacity){ 
            resize();
        }
        size++;
        for(int i = size -1; i>= index+1;i--){
            data[i] = data[i-1];
        }
        data[index] = value;
    }

    public void remove(int index){
        if(index < 0 || index > size){
            //throw Exception
        }
        size--;
        for(int i = index;i<size;i++){
            data[i] = data[i+1];
        }
    }

    private void resize(){
        capacity*=2;
        int[] new_data = new int[capacity];
        for(int i = 0;i<size;i++){
            new_data[i] = data[i];
        }
        data = new_data;
    }

```
# 四、例题
 
### 1、两数之和

![两数之和](/algorithm/twoSum.jpeg)

**思路1** ： 暴力遍历，遍历取一个数，计算它与其它数字之和，遍历全部情况得到想要的结果对。时间复杂度为: O(n<sup>2</sup>) 

```angular2
 public int[] twoSum(int[] nums,int target) {
        int[] result = new int[2];
        if(nums.length < 2) return result;
        for(int i = 0;i<(nums.length-1);i++){
            for(int j = i+1 ; j<nums.length;j++){
                if(nums[i]+nums[j] == target){
                    result[0] = nums[i];
                    result[1] = nums[j];
                }
            }
        }
        return result;
  }
```


**思路2** ：排序 + 两根指针

```angular2
public int[] twoSum(int[] nums,int target) {
    int[] result = new int[2];
    Arrays.sort(nums);
    int start = 0, end = nums.length -1;
    while(start < end){
        if(nums[start] + nums[end] == target){
            result[0] = nums[start];
            result[1] = nums[end];
            return result;
        }       
        if(nums[start] + nums[end] > target){
            end--;
        }       
        if(nums[start] + nums[end] < target){
            start++;
        }
    }
    return result;
}
```

- 核心想法：如果现在两根指针所指元素之和大于目标值，则表明现在两数之和过大，应使end指针指向更小的数，即索引减小（end--）， 反之则表明现在两数之和过小，应使start指针指向更大的数，即索引增加（start++）

- 通过对数组排序与两根指针组合，减少无意义的遍历
- 时间复杂度分析：排序： O(nlogn), 两根指针算法：O(n)
- 时间复杂度： O(nlogn) + O(n) = O(nlogn)


### 2、三数之和


![三数之和](/algorithm/threeSum.jpeg)

**思路1** ： 当然可以用暴力遍历求解，时间复杂度为O(n<sup>3</sup>) 

**思路2** ： 排序 + 两根指针算法求解O(n<sup>2</sup>) 

```angular2
public int[] threeSum(int[] nums, int target) {
    int[] result = new int[3];
    if(nums.length < 3) return nums;
    Arrays.sort(nums);
    for(int i =0; i < nums.length-2;i++){
        int start = i+1,end = nums.length-1,new_target = target-nums[i];
        while (start < end) {
            if (nums[start] + nums[end] == new_target) {
                result[0] = nums[start];
                result[1] = nums[end];
                result[2] = nums[i];
                return result;
            }
            if (nums[start] + nums[end] > new_target) {
                end--;
            }
            if (nums[start] + nums[end] < new_target) {
                start++;
            }
        }
    }
    return result;
}
```


- 遍历第一个数字num1，看看另外两数之和是否能满足target – num1，这就转化为两数之和的问题
- 时间复杂度：O(nlogn) + n * O(n) =O(n<sup>2</sup>) 

### 3、K-Sum解法总结

- 排序
- 尝试遍历第一个数，将问题转化为 k–1 Sum
- 2-Sum: O(nlogn) + O(n) = O(nlogn)
- 3-Sum: O(nlogn) + O(n<sup>2</sup>) = O(n<sup>2</sup>)
- 4-Sum: O(nlogn) + O(n<sup>3</sup>) = O(n<sup>3</sup>)
- k-Sum: O(nlogn) + O(n<sup>k-1</sup>) = O(n<sup>k-1</sup>)

**四数之和举例**：

```angular2
public int[] fourSum(int[] nums, int target) {
    int[] result = new int[4];
    if(nums.length < 4) return nums;
    Arrays.sort(nums);
    for(int i =0; i < nums.length-2;i++){
        for(int j = i+1 ; j<nums.length-3;j++){
            int start = j+1,end = nums.length-1,new_target = target-nums[i]-nums[j];
            while (start < end) {
                if (nums[start] + nums[end] == new_target) {
                    result[0] = nums[start];
                    result[1] = nums[end];
                    result[2] = nums[i];
                    result[3] = nums[j];
                    return result;
                }
                if (nums[start] + nums[end] > new_target) {
                    end--;
                }
                if (nums[start] + nums[end] < new_target) {
                    start++;
                }
            }
        }
    }
    return result;
}
```

### 4、反转数组

给定一个数组，反转数组中所有的数字，例如：Input:{1,2,3,4,5},Output:{5,4,3,2,1}

```angular2
public void reverseArray(int[] nums) {
        int start = 0 , end = nums.length - 1;
        while(start < end){
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
}
```

- 思路：双指针，首尾交换，时间复杂度O(n)

### 5、奇数偶数排序

给定一组整数，对它们进行排序，以便所有奇数整数在偶数整数之前出现。 元素的顺序可以改变。排序的奇数和偶数的顺序无关紧要。例如：Input:{4,3,5,2,1,11,0},Output:{9,3,5,11,0,2,4}

```angular2
public void oddEvenSort(int[] nums) {
        int first = 0 , second = nums.length - 1;
        while(first < second){
            // 奇数的话，第一根指针就往后面移动一位，直到为偶数停下来
            while(first < second && nums[first] % 2==1){
                first++;
            }
            // 偶数的话，第二根指针就往前移动一位，直到为奇数停下
            while(first < second && nums[first] % 2==0){
                second--;
            }
            if(first < second){
                int temp = nums[first];
                nums[first] = nums[second];
                nums[second] = temp;
                first++;
                second--;
            }
        }
}
```

- 思路：双指针，在一定条件下进行首尾交换，时间复杂度O(n)

### 6、合并两个有序数组

给定两个有序整数数组 nums1 和 nums2，请按递增顺序将它们合并到一个排序数组中。例如：Input: {1, 3, 5}, {2, 4, 6}，Output: {1, 2, 3, 4, 5, 6}

**思路1**：对两个数组合并O(n),合并后排序O(nlogn),时间复杂度：O(n)+O(nlogn)=0(nlogn)

**思路2**：双指针 O(n)

```angular2
public int[] merge(int[] arr1,int[] arr2){
    int[] result = new int[arr1.length + arr2.length];
    int index=0,index1=0,index2=0;
    while(index1 < arr1.length && index2 < arr2.length){
        if(arr1[index1]<arr2[index2]){
            result[index++] = arr1[index1++];
        }else{
            result[index++] = arr2[index2++];
        }
    }
    for(int i = index1;i<arr1.length;i++){
        result[index++] = arr1[i];
    }

    for(int i = index2;i<arr2.length;i++){
        result[index++] = arr2[i];
    }
    return result;
}
```
