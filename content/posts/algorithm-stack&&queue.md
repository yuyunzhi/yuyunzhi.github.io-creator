---
title: 栈Stack和队列Quene
date: 2019-11-01T13:00:23+08:00
categories: ["算法"]
tags: ["算法"]
---

# 一、定义

- 栈： 后进先出
- 队列： 先进先出

# 二、栈的初始化与基本操作

- Java 类库 : Stack<Stiing> stack = new Stack<>();
- 栈区(stack),栈区的读取速度更快;堆区(heap),堆区存放引用类型变量,堆区可以动态地分配内存空间。
- 基本操作

![基本操作](/algorithm/stack.jpeg)

- 使用场景：调用函数、递归、深度优先搜索DFS(Depth-fist Search)
- 栈的实现

```angular2
class Stack<T> {
    private T[] elementData;
    private int size;
    private int capacity;

    public Stack(int capacity){
        this.size=0;
        this.capacity=capacity;
        this.elementData = new T[capacity];
    }

    public void push(T element){
        if(size == capacity){
            resize();
        }
        size++;
        elementData[size] = element;
    }

    public T pop(){
        if(size == 0){
            throw new EmptyStackException();
        }
        size--;  
        return elementData[size];
    }

    public T peek(){
        if(this.size == 0){
            throw new IllegalStateException();
        }
        return elementData[size-1];
    }

    public boolean isEmpty(){
        return this.size == 0;
    }

    private void resize(){
        capacity *= 2;
        T[] new_data = new T[capacity];
        for(int i=0;i<size;i++){
            new_data[i] = elementData[i];
        }
        elementData = new_data;
    }
}
```

# 三、队列的初始化与基本操作

- Java 类库 : Queue<Stiing> queue = new LinkedList<>();
- 基本操作

![基本操作](/algorithm/queue.jpeg)

- 使用场景：广度优先搜索BFS，优先队列，多任务调度

- **使用栈实现队列**：push(x) -- 将一个元素放入队列的尾部；pop() -- 从队列首部移除元素；peek() -- 返回队列首部的元素；empty() -- 返回队列是否为空


```angular2
class MyQueue {
    private Stack<Integer> newStack;
    private Stack<Integer> oldStack;
    public MyQueue(int capacity){
        this.newStack = new Stack<Integer>();
        this.oldStack = new Stack<Integer>();
    }

    public void push(int element){
        newStack.push(element);
    }

    public int pop(){
        if(oldStack.isEmpty()){
            while(!newStack.isEmpty()){
                oldStack.push(newStack.pop());
            }
        }
        return oldStack.pop();
    }

    public int peek(){
        if(oldStack.isEmpty()){
            while(!newStack.isEmpty()){
                oldStack.push(newStack.pop());
            }
        }
        return oldStack.peek();
    }

    public boolean isEmpty(){
        return oldStack.isEmpty() && newStack.isEmpty();
    }

    private void shiftStacks(){
        if(oldStack.isEmpty()){
            while(!newStack.isEmpty()){
                oldStack.push(newStack.pop());
            }
        }
    }
}
```

# 四、最小栈

- 设计一个支持 push ， pop ， top 操作，并能在**常量时间**O(1)内检索最小元素的栈。push(x) -- 将元素 x 推入栈中。pop() -- 删除栈顶的元素；top() -- 获取栈顶元素；getMin() -- 检索栈中的最小元素。
- 思路：两个栈，另一个栈栈顶储存最小值
```angular2
class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();
    
    public void push(int x){
        stack.push(x);
        if(minStack.isEmpty() || x <= minStack.peek()){
            minStack.push(x);
        }
    }

    public void pop(){
        if(stack.pop().equals(minStack.peek())){
            minStack.pop();
        }
    }

    public int top(){
        return stack.peek();
    }

    public int getMin(){
        return minStack.peek();
    }
}
```

# 五、有效的括号

![题目](/algorithm/2.jpeg)

```angular2
public boolean isValid(String s){
    if(s == null || s.length() == 0) return true;

    int length =s.length();

    Stack<Character> stack = new Stack<>();
    for (int i = 0; i< length; i++){
        char ch = s.charAt(i);
        if(isLeft(ch)){
            stack.push(ch);
        }else{
            if(!stack.isEmpty()){
                char c = stack.pop();
                if(!isMatch(c,ch)){
                    return false;
                }
            }else{
                return false;
            }
        }
    }

    return stack.isEmpty();
}

private boolean isLeft(char c){
    return ( c == '{') || ( c == '[') || ( c == '(');
}

private boolean isMatch(char left, char right){
    if(left == '(' && right == ')'){
        return true;
    }else if(left == '[' && right == ']'){
        return true;
    }else if(left == '{' && right == '}'){
        return true;
    }else{
        return false;
    }
}
```
