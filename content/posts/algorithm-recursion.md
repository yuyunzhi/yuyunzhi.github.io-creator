---
title: 递归 Recursion、回溯法 Backtracking
date: 2019-11-03T23:00:23+08:00
categories: ["算法"]
tags: ["算法"]
---

# 一、什么是递归

- 在数学和计算机科学中，递归指由一种（或多种）简单的基本情况定义的一类对象或方法，并规定其他所有情况都能被还原为其基本情况。
- 递归指在函数的定义中使用函数自身的方法

# 二、递归三要素

- 拆解寻找子问题（得到递归规则）
- 解决最小子问题是指可以直接得到答案问题并不需递归计算
- 递归终止退出条件

# 三、递归举例

### 1、菲波那切数列

- 基本情况 ： F(0) = 0, F(1) = 1 ,F(2) = F(0) + F(1) = 1
- 递归规则 ： F(n) = F(n-1) + F(n-2)

1，1，2，3，5，8，13……

```angular2
   int Fibonacci (int n ){
        if(n==0) return 0;
        if(n==1) return 1;
        
        return Fibonacci(n-1) + Fibonacci(n-2);
    }
```

后面用动态规划的方法或记忆搜索的方式来优化重复计算的代码。

### 2、汉诺塔

![汉诺塔](/algorithm/hnt.jpeg)

- 有三根杆子A，B，C。A杆上有N个(N>1)穿孔圆盘，盘的尺寸由下到上依次变小。要求按下列规则将所有圆盘移至C杆。规则1：每次只能移动一个圆盘；规则2：大盘不能叠在小盘上面。

- 递归规则:1. 将A上的前n-1个盘子从A移到B；2. 将第n个盘子，也就是最底下的盘子从A移到C；3. 将B上剩下的n-1个盘子从B移到C。

- 递归函数：MoveHanoi(int n, char origin, char destination, char buffer)  n表示n个盘子,origin表示出发的地方，destination表示目的地,buffer表示缓存的地方。这三个char分别代表着三根杆子

**代码**：

```angular2
public void MoveHanoi(int n,char origin,char destination,char buffer){
        if(n==1){
            System.out.println("Move Step:" + origin + "to" + destination);
            return;
        }
        MoveHanoi(n-1,origin,buffer,destination);
        System.out.println("Move Step:" + origin + "to" + destination);
        MoveHanoi(n-1,buffer,destination,origin);
}
```

# 四、回溯法

- **什么是回溯法**：回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退。回一步重新选择，这种走不通就退回再走的技术为回溯法。满足回溯条件的某个状态的点称为“回溯点”。

- **回溯法的思想**：在包含问题的所有解的解空间树中，按照深度优先搜索的策略，从根结点出发深度探索解空间树。当探索到某一结点时，要先判断该结点是否包含问题的解，如果包含，就从该结点出发继续探索下去，如果该结点不包含问题的解，则逐层向其祖先结点回溯。（其实回溯法就是对隐式图的深度优先搜索算法）。若用回溯法求问题的所有解时，要回溯到根，且根结点的所有可行的子树都要已被搜索遍才结束。而若使用回溯法求任一个解时，只要搜索到问题的一个解就可以结束。

- **回溯法步骤**：针对所给问题，确定问题的解空间：首先应明确定义问题的解空间，问题的解空间应至少包含问题的一个（最优）解。确定结点的扩展搜索规则以深度优先方式搜索解空间，并在搜索过程中用剪枝函数避免无效搜索。

### 1、回溯法模板

**题目**：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。说明：解集不能包含重复的子集
- 输入： nums = [1,2,3]
- 输出：[ [3], [1], [2], [1,2,3], [1,3], [2,3],[1,2], [] ]

**代码**：

```angular2
public List<List<Integer>> subsets(int[] nums){
    // result 为解集空间
    List<List<Integer>> result = new ArrayList<List<Integer>>();
    if(nums == null || nums.length ==0){
        return result;
    }
    // list为单一解
    List<Integer> list = new ArrayList<Integer>();
    Arrays.sort(nums);
    // 递归函数subsetHelp
    subsetHelp(result,list,nums,0);
    return result;
}

private void subsetHelp(List<List<Integer>> result,List<Integer>list,int[] nums,int pos){
    result.add(new ArrayList<Integer>(list));
    for(int i = pos;i<nums.length;i++){
        list.add(nums[i]);
        subsetHelp(result,list,nums,i+1);
        list.remove(list.size()-1);
    }
}
```


**subsetHelp的for循环逻辑**：nums=[1,2,3],对nums循环每一次循环取出1个数，然后包含该数所有的子集。取完后取第N个数，然后包含该数（排除第前N个数）的所有子集。

![图解](/algorithm/3.jpeg)


### 2、求子集

**题目**：给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。说明：解集不能包含重复的子集

- 输入: [1,2,2]
- 输出: [ [2], [1], [1,2,2], [2,2], [1,2], [] ]

**代码**：

```angular2
public List<List<Integer>> subsets(int[] nums){
    List<List<Integer>> result = new ArrayList<List<Integer>>();
    if(nums == null || nums.length ==0){
        return result;
    }
    List<Integer> list = new ArrayList<Integer>();
    Arrays.sort(nums);
    subsetHelp(result,list,nums,0);
    return result;
}

private void subsetHelp(List<List<Integer>> result,List<Integer>list,int[] nums,int pos){
    result.add(new ArrayList<Integer>(list));
    for(int i = pos;i<nums.length;i++){
        if(i != pos && nums[i] == nums[i-1]){
            continue;
        }
        list.add(nums[i]);
        subsetHelp(result,list,nums,i+1);
        list.remove(list.size()-1);
    }
}
```

#### 3、全排列

**题目**：给定一个没有重复数字的序列，返回其所有可能的全排列。

- 输入：[1,2,3]
- 输出：[ [1,2,3], [1,3,2], [2,1,3], [2,3,1],[3,1,2], [3,2,1] ]

**代码**：

```angular2
public List<List<Integer>> subsets(int[] nums){
    List<List<Integer>> result = new ArrayList<List<Integer>>();
    if(nums == null || nums.length ==0){
        return result;
    }
    List<Integer> list = new ArrayList<Integer>();
    Arrays.sort(nums);
    permuteHelper(result,list,nums);
    return result;
}

private void permuteHelper(List<List<Integer>> result,List<Integer>list,int[] nums){
   if(list.size() == nums.length){
       result.add(new ArrayList<Integer>(list));
   }
    for(int i = 0;i<nums.length;i++){
        if(list.contains(nums[i])){
            continue;
        }
        list.add(nums[i]);
        permuteHelper(result,list,nums);
        list.remove(list.size()-1);
    }
}
```

#### 3、组合总和

**题目**：给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

**代码**：

```angular2
public List<List<Integer>> subsets(int[] candidates,int target){
    List<List<Integer>> result = new ArrayList<List<Integer>>();
    if(candidates == null || candidates.length ==0){
        return result;
    }
    List<Integer> list = new ArrayList<Integer>();
    Arrays.sort(candidates);
    helper(result,list,candidates,target,0);
    return result;
}

private void helper(List<List<Integer>> result,List<Integer>list,int[] candidates,int target,int pos){
   if(target==0){
       result.add(new ArrayList<Integer>(list));
       return;
   }else if(target < 0){
       return;
   }
    for(int i = pos;i<candidates.length;i++){
        list.add(candidates[i]);
        helper(result,list,candidates,target-candidates[i],i);
        list.remove(list.size()-1);
    }
}
```



# 五、递归+回溯法+剪枝总结

- 初始化解集空间变量及类型 result
- 初始化单一解变量及类型  list
- 画图
 	- 根据图确定循环起始值
 	- 根据图确定添加结果条件、过滤某个循环条件、终止条件
 	- 根据上两点，确定递归参数
- 套用回溯法模板
