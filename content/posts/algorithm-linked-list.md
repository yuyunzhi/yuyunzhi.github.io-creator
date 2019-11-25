---
title: 链表 Linked List
date: 2019-11-17T23:00:23+08:00
categories: ["算法"]
tags: ["算法"]
---

# 一、什么是链表？

- 链表（Linked list）是一种常见的基础数据结构，是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)

![单向、双向链表示意图](/algorithm/5.jpeg)


**链表特性**:

- 每个节点都知道它下一个节点的地址
- 链表的第一个节点可以代表整个链表
- 查找一个节点或者访问特定编号的节点则需要O(n)的时间，因为遍历第N个节点，才能知道N+1个节点

**链表节点定义**：

泛型

```angular2
public class ListNode<T> {
    T data;
    ListNode next;
    public void ListNode(T data){
        this.data = data;
    }
}
```

整数类型

```angular2
public class ListNode {
    int data;
    ListNode next;
    public void ListNode(int data){
        this.data = data;
    }
}
```

**何时用链表？**

- 不确定数据结构的容量时
- 常用于组织删除、检索较少，而添加、遍历较多的数据

# 二、链表实现及其基本API操作

整数型链表

```angular2
public class LinkedList {
    private ListNode head;

    public void LinkedList(ListNode head){
        this.head = head;
    }

    public int get(int index){
        preChecked(index);
        return getNode(index).value;
    }
    private void preChecked(int index){
        int length = getLength();
        if(index < 0 || index > length-1) {
            throw new IllegalArgumentException("index is invalid");
        }
    }
    private ListNode getNode (int index){
        ListNode cur = head;
        for(int i = 0;i<index;i++){
            cur = cur.next;
        }
        return cur;
    }

    public void set(int index,int value){
        preChecked(index);
        ListNode currentNode = getNode(index);
        currentNode.value = value;
    }

    public void add(int index,int value){
        preChecked(index);
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode preNode = dummy;
        while(index != 0){
            preNode = preNode.next;
            index--;
        }
        ListNode newNode = new ListNode(value);
        newNode.next = preNode.next;
        preNode.next = newNode;
        head = dummy.next;
    }

    public void remove(int index){
        preChecked(index);

        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode preNode = dummy;
        while(index != 0){
            preNode = preNode.next;
            index--;
        }
        preNode.next = preNode.next.next;
        head = dummy.next;
    }
    public int getLength(){
        ListNode copyNode = head;
        int nodeLength = 0;
        while(copyNode.next != null){
            nodeLength++;
            copyNode = copyNode.next;
        }
        return nodeLength;
    }
}
```

**上述代码画图理解~**：其中对链表长度修改add、remove的操作使用 Dummy Node 技巧，简化边界情况。链表总是存在至少一个节点，但链表的真正元素是从哨兵节点的下一个节点开始。

- 使得链表原头节点不在特殊
- 使代码更短，更少的出错
- 链表节点只能通过前一个节点的指针访问在将当前节点分配给新节点之前，不要更改上一个节点的next 指针，这样会丢失当前节点，所以要<code>ListNode copNode = head</code>

# 三、举例

### 1、得到链表中点的元素

**题目**：得到链表中点元素。给定一个链表，编写一个函数返回链表的中间节点例：

- Input: 1 -> 3 -> 5 -> 7 return 3
- Input: 1 -> 3 -> 5 -> 7 -> 9 return 5

**代码**：

遍历方式

```angular2
 public ListNode getMiddleNode(ListNode head){
        int length = getLength(head);
        int index = (length-1)/2;
        ListNode curNode = getNode(index);
        return curNode;

    }

    public int getLength(ListNode head){
        ListNode currentNode = head;
        int length = 0;
        while(currentNode.next != null){
            length++;
            currentNode = currentNode.next;
        }
        return length;
    }
```

双指针方式

```angular2
   public ListNode getMiddleNode(ListNode head){
       ListNode fast = head;
       ListNode slow = head;
       while(fast.next != null && fast.next.next != null){
           fast = fast.next.next;
           slow = slow.next;
       }
       return slow;
    }
```

### 2、得到链表的倒数第N个节点

**题目**：给定一个链表，得到链表的倒数第 n 个节点并返回。给定一个链表: 1->2->3->4->5, 并且 n = 2，倒数第两个节点为4

- Input: 1->2->3->4->5, n=2，Output: 4
- Input: 3->5->9->6->8, n=3,Output: 9

**代码**:

暴力解法：

```angular2
public ListNode getKthToLast(ListNode head,int n){
        int nodeLength=getLength(head);
        int index = nodelength - n;
        ListNode cur = head;
        while(index != 0){
            cur=cur.next;
        }
        return cur;
    }
```

双指针：

```angular2
  public ListNode getKthToLast(ListNode head,int k){
        ListNode first = head;
        while(k-- !=0){
            first = first.next;
        }
        
        ListNode second = head;
        while(first != null){
            first = first.next;
            second = second.next;
        }
        
        return second;
    }
```

### 3、判断环形链表

**题目**：给定一个链表，判断链表中否有环

**代码**：

```angular2
 public boolean hasCycle(ListNode head){
        ListNode fast = head;
        ListNode slow = head;
        while(fast.next != null && fast.next.next != null){
            fast = fast.next.next;
            slow = slow.next;
            if(fast==slow){
                return true;
            }
        }
        return false;
    }
```

### 4、环形链表II

**题目**：给一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null

- 链接：https://leetcode-cn.com/problems/linked-list-cycle-ii/

**思路**：

![环形链表示意图](/algorithm/6.png)

- 使用双指针算法，fast slow
- 当两指针相遇时，说明花费的时间是相等的，此时可以计算出在1的地方相遇那么，-3->-2->-1->0的距离和2->3->4->0的距离相等。所以第二次temp和slow以相同的速度相遇时便是入口。
- 代码先校验是否是环形链表
- 当为环形链表，确定fast,slow相遇点
- 之后确定slow、temp相遇点


**代码**：

```angular2
    public ListNode detectCycle(ListNode head){    
        ListNode fast = head;
        ListNode slow = head;
        while(fast != null && slow !=null){
            // 先判断环形链表是不是空
            if(fast.next != null){
                fast = fast.next.next;
            }else{
                return null;
            }
            slow = slow.next;
            // 当环形链表两指针相遇时
            if(fast == slow){
                //再继续相遇就是入口
                ListNode temp = head;
                while(temp != slow){
                    temp = temp.next;
                    slow = slow.next;
                }
                return temp;
            }
        }
        return null;
    }
```

### 5、反转一个链表I


**题目**：反转一个单链表

- 链接：https://leetcode-cn.com/problems/reverse-linked-list/solution/

**代码**：

```angular2
   public ListNode reverselist(ListNode head){
        if(head == null || head.next == null){
            return head;
        }
        ListNode prev = null;
        while(head != null ){
            ListNode temp = head.next;  //把断开后面的链表临时储存起来
            head.next = prev;
            prev = head;
            head = temp;
        }
        return prev;
    }
```

### 6、反转一个链表II

**题目**：反转从位置 m 到 n 的链表，用一次遍历在原地完成反转给定。 m，n 满足以下条件：1 ≤ m ≤ n ≤ 列表长度。

- 给定 1->2->3->4->5->NULL, m = 2 和 n = 4。返回 1->4->3->2->5->NULL 
- 链接：https://leetcode-cn.com/problems/reverse-linked-list/solution/

**代码**：

```angular2
public ListNode reverseBetween(ListNode head,int m,int n){

        if(head == null || m>n){
            return head;
        }

        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        head = dummy;

        for(int i = 1 ;i < m;i++){
            if(head == null){
                return null;
            }
            head = head.next;
        }

        ListNode premNode = head;
        ListNode mNode = head.next;
        ListNode nNode = mNode;
        ListNode postnNode = mNode.next;

        for(int i=m; i<n; i++){
            if(postnNode==null){
                return null;
            }
            ListNode temp = postnNode.next;
            postnNode.next = nNode;
            nNode = postnNode;
            postnNode = temp;
        }
        mNode.next = postnNode;
        premNode.next = nNode;
        
        return dummy.next;
    }
```

### 7、交换相邻结点

**题目**：给定一个链表，对每两个相邻的结点作交换并返回头节点。你的算法应该只使用额外的常数空间。不要修改列表中的值，只有节点本身可以更改。

- 给定 1->2->3->4，你应该返回 2->1->4->3 
- 链接：https://leetcode-cn.com/problems/swap-nodes-in-pairs/description/

**思路**：

- 画图，使用 dummy :-1->1->2->3->4
- 让1的 next 指向2的next
- 让-1的 next 指向2
- 让2的 next 指向1
- 依次循环

**代码**：

```angular2
 public ListNode swapPairs(ListNode head){
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode pre = dummy;
        while(pre.next != null && pre.next.next != null){
            ListNode first = pre.next , second = pre.next.next;
            first.next = second.next;
            second.next = first;
            pre.next = second;
            pre = first;
        }
        return dummy.next;
    }
```

### 8、两数相加

**题目**：给定两个非空链表来代表两个非负数，位数按照逆序方式存储，它们的每个节点只存储单个数字。将这两数相加会返回一个新的链表。可以假设除了数字 0 之外，这两个数字都不会以零开头

- 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4) 输出：7 -> 0 -> 8 原因：342 + 465 = 807
- 输入：(7 -> 1 -> 6) + (5 -> 9 -> 2) 输出：2 -> 1 -> 9 原因：617 + 295 = 912
- 链接：https://leetcode-cn.com/problems/add-twonumbers/description/

**代码**：

```angular2
 public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        int carry = 0;
        ListNode dummy = new ListNode(-1);
        ListNode p = dummy;

        while(l1 != null && l2 != null){
            int val = (l1.value + l2.value + carry) % 10;
            carry = (l1.value + l2.value + carry) / 10;
            p = appendToTail(p,val);
            l1 = l1.next;
            l2 = l2.next;
        }

        while(l1 != null ){
            int val = (l1.value + carry) % 10;
            carry = (l1.value + carry) / 10;
            p = appendToTail(p,val);
            l1 = l1.next;
        }

        while(l2 != null ){
            int val = (l2.value + carry) % 10;
            carry = (l2.value + carry) / 10;
            p = appendToTail(p,val);
            l2 = l2.next;
        }

        if(carry != 0){
            p.next = new ListNode(carry);
        }

        return dummy.next;
    }

    public ListNode appendToTail(ListNode head,int value){
        head.next = new ListNode(value);
        head = head.next;
        return head;
    }
```

### 9、删除排序链表中的重复元素 I

**题目**：给定一个排序链表，删除所有重复的元素使得每个元素只留下一个

- 给定 1->1->2，返回 1->2
- 给定 1->1->2->3->3，返回 1->2->3
- 链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/description/

**代码**：

```angular2
    public ListNode deleteDuplicates(ListNode head) {
  
        if(head==null){
            return null;
        }
        
        ListNode dummy = new ListNode(Integer.MAX_VALUE);
        dummy.next = head;
        head = dummy;
        
        while(head != null){
            while(head.next != null && head.next.value == head.value){
                head.next = head.next.next;
            }
            head = head.next;
        }
        return dummy.next;
    }
```





