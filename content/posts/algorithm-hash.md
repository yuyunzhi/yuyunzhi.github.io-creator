---
title: 哈希表 Hash 开散列 VS 闭散列
date: 2019-11-30T23:00:23+08:00
categories: ["算法"]
tags: ["算法"]
---


# 一、什么是哈希表

- 设计精妙、用途广泛的数据结构之一
- 拥有键值对元素的无序集合
- 键的值是唯一的，键对应的值可以通过键来获取、更新或移除
- 无论这个哈希表有多大，这些操作基本上通过常量时间的键比较就可完成

**基础操作时间复杂度**：

- Insert O(1)
- Delete O(1)
- Find O(1)

**java hash的基本操作**

![API](/algorithm/11.png)

**HashMap的遍历方式**：

```angular2
Iterator<Entry<String,String>> iterator = map.entrySet().iterator();
while(iterator.hasNext()){
    Map.Entry<String,String> entry = (Map.Entry<String,String>) iterator.next();
    System.out.println("Key:" + entry.getKey() + "Value:" + entry.getValue());
}

for(Map.Entry<String,String > entry : map.entrySet()){
    System.out.println("Key:" + entry.getKey() + "Value:" + entry.getValue());
}

for(Object entry : map.entrySet()){
    System.out.println("Key:" + entry.getKey() + "Value:" + entry.getValue());
}

map.entrySet().forEach(entry -> System.out.println("Key:" + entry.getKey() + "Value:" + entry.getValue()); );

```

# 二、哈希函数

- 哈希函数是用来将一个字符串（或任何其他类型）转化为小于哈希表大小且大于等于零的整数
- 一个好的哈希函数：可以尽可能少地产生冲突，算得快

**一种广泛使用的哈希函数算法**：

hashcode("abcd") = (ascii(a) * 33 ^ 3 + ascii(b) * 33 ^2 + ascii(c) *33 + ascii(d)) % HASH_SIZE= (97* 33 ^ 3 + 98 * 33 ^ 2 +99 * 33 +100) % HASH_SIZE= 3595978 % HASH_SIZE

- 其中HASH_SIZE表示哈希表的大小(可以假设一个哈希表就是一个索引0 ~ HASH_SIZE-1的数组)。
- 给出一个字符串作为key和一个哈希表的大小，返回这个字符串的哈希值。
  
**对于上述算法用函数来表示**：

```angular2
public int hashCode (char[] key, int hashSize){
    long result = 0;
    for(int i = 0; i<key.length;i++){
        result = (result * 33 + (int)key[i]) % hashSize
    }
    return (int) result;
}
```

**然而 冲突 不可避免:**
 
- 无论使用什么hash function，都需要考虑冲突问题  
- 为啥会有冲突:有一些key会map到相同的index上,无限空间往有限空间映射

![hash冲突示意图](/algorithm/12.jpeg)
   
**如何解决冲突？**

- 没有排满，得到相同的index会冲突
- 空间 size 小于放入的值的数量也一定会冲突

# 三、开散列 VS 闭散列

**解决方式**：

- 步骤1：改变index ：Open hashing / Closed hashing
- 步骤2：扩容装填因子Load factor: size/capacity，Java: LF > 0.75, resize()

**Open hashing**：

把底层的int[] 声明成 LinkList[],每一次存的时候都把key value存到ListNode,如果index重复了就遍历LinkList，找到正确的位置把key,value链接在该链表上。

当链表长度大于8的时候，就会把链表变成树BST(红黑树)，这样可以提高查找速度

![底层示意图](/algorithm/13.jpeg)


```angular2
class ListNode {
    private int key;
    private int value;
    private ListNode next;

    public ListNode(int key, int value){
        this.value = value;
        this.key = key;
    }
}
```

**扩容：重哈希rehashing**

哈希表容量的大小在一开始是不确定的。如果哈希表存储的元素太多，我们应该将哈希表容量扩大一倍，并将所有的哈希值重新安排。

![重哈希rehashing](/algorithm/14.jpeg)



```angular2
public ListNode[] rehashing(ListNode[] hashTable){
    if(hashTable == null || hashTable.length == 0){
        return null;
    }
    int capacity =hashTable.length;
    int newCapacity = capacity*2;
    ListNode[] newHashTable = new ListNode[newCapacity];
    for(ListNode head : hashTable){
        while(head != null){
            int value = head.value;
            int key = head.key;
            int hashcode = (key % newCapacity + newCapacity) % newCapacity;

            if(newHashTable[hashcode] != null){
                ListNode node = newHashTable[hashcode];
                ListNode keyNode = new ListNode(key,value);

                while(node != null && node.next != null){
                    node = node.next;
                }
                node.next = keyNode;
            }
            else{
                newHashTable[hashcode] = new ListNode(key,value)
            }
            head = head.next;
        }
    }
    return newHashTable;
}
```
