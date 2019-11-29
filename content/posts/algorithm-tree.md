---
title: 二叉树及二叉搜索树 Tree
date: 2019-11-16T19:00:23+08:00
categories: ["算法"]
tags: ["算法"]
---

# 一、什么是树？

- 树 （英语：Tree）是⼀种⽆向图（undirected graph), 其中任意两个顶点间存在唯⼀⼀条路径。或者说，只要没有回路的连通图就是树
- ⼀个（可能是⾮线性的）数据结构，由节点，顶点和边组成，美有任何环

![树分类](/algorithm/tree.jpeg)


# 二、二叉树

- 二叉树的遍历是指从二叉树的根结点出发，按照某种次序依次访问二叉树中的所有结点，使得每个结点被访问一次，且仅被访问一次。二叉树的访问次序可以分为四种：前序遍历、中序遍历、后序遍历、层序遍历

- 满二叉树：在一棵二叉树中。如果所有分支节点都存在左子树和右子树，并且所有叶子都在同一层上，这样的二叉树称为满二叉树。

![满二叉树](/algorithm/8.png)

- 完全二叉树：对一颗具有n个节点的二叉树按层编号，如果编号为i(1<=i<=n)的节点与同样深度的满二叉树中编号为i的节点在二叉树中位置完全相同，则这棵二叉树称为完全二叉树。

![完全二叉树](/algorithm/7.png)

**二叉树的属性：**

![属性](/algorithm/9.jpeg)


# 三、二叉树代码表示

```angular2
public class BinaryTree<T> {
    private TreeNode<T> root;

    public Tree (T rootData){
        root = new TreeNode<T>();
        root.data = rootData;
    }

    public static class TreeNode<T>{
        private T data;
        private TreeNode<T> leftNode;
        private TreeNode<T> rightNode;
    }
}
```

# 四、二叉树遍历

- 前序遍历：父节点、左孩子、右孩子
- 中序遍历：左孩子、父节点、右孩子
- 后序遍历：左孩子、右孩子、父节点

**递归实现遍历**：

```angular2
    public void preOrderTraversalWithRecursion(TreeNode root) {
        if(root != null){
            System.out.println(root.data);
            preOrderTraversalWithRecursion(root.left);
            preOrderTraversalWithRecursion(root.right);
        }
    }

    public void inOrderTraversalWithRecursion(TreeNode root) {
        if(root != null){
            inOrderTraversalWithRecursion(root.left);
            System.out.println(root.data);
            inOrderTraversalWithRecursion(root.right);
        }
    }

    public void postOrderTraversalWithRecursion(TreeNode root) {
        if(root != null){
            postOrderTraversalWithRecursion(root.left);
            postOrderTraversalWithRecursion(root.right);
            System.out.println(root.data);
        }
    }
```

**非递归实现前序遍历**：访问当前节点，右节点入栈，左节点入栈。pop左孩子（先遍历左孩子），然后对右孩子依次判断

```angular2
    public void preOrderTraversal(TreeNode root){
        Stack<TreeNode> nodeStack = new Stack<TreeNode>();
        nodeStack.push(root);
        while(!nodeStack.empty()){
            TreeNode node = nodeStack.pop();
            System.out.println(node.data);
            if(node.rightNode != null){
                nodeStack.push(node.rightNode);
            }
            
            if(node.leftNode != null){
                nodeStack.push(node.leftNode);
            }
        }
    }
```

**非递归实现中序遍历**:

```angular2
    public void inOrderTraversal(TreeNode root){
        Stack<TreeNode> nodeStack = new Stack<TreeNode>();
        TreeNode node = root;
        while(!nodeStack.empty() || node != null){
            if(node != null){
                nodeStack.push(node);
                node = node.leftNode;
            }
            else{
                node = nodeStack.pop();
                System.out.println(node.data);
                node = node.rightNode;
            }
        }
    }
```

**非递归实现后序遍历**: 思路是 逆后序遍历=前序遍历的左右子树入栈顺序交换

```angular2
    public void postOrderTraversalWithTwoStack(TreeNode root){
        Stack<TreeNode> s1 = new Stack<TreeNode>();
        Stack<TreeNode> s2 = new Stack<TreeNode>();
        if(root == null){
            return result;
        }
        s1.push(root);
        while(!s1.isEmpty()){
            TreeNode node = s1.pop();
            if(node.leftNode != null){
                s1.push(node.leftNode);
            }

            if(node.rightNode != null){
                s1.push(node.rightNode);
            }
        }
        while(!s2.isEmpty()){
            TreeNode cur = s2.pop();
            System.out.println(cur.data);
        }
        return result;
    }
```

# 五、构建二叉树

- 结论：需要两种不同的遍历来构造一棵树，并且其中一个必须是中序遍历。

- 代码实现，，，待定

# 六、二叉搜索树 BST

**二叉搜索树特性**：

- 所有的子树均为二叉搜索树
- 任一左子树的全部节点的值均小于其根节点
- 任一右子树的全部节点的值均小于其根节点的值
- 二叉搜索树的中序遍历为一个排序数组

![二叉搜索树](/algorithm/10.jpeg)


**二叉搜索树API实现方法**：

- 查找节点：find
- 添加节点：add
- 删除节点：remove

**find**: 时间复杂度为O(h)，h为该棵树的高度，一层一层往下遍历

```angular2
   public boolean find(int value,TreeNode root){
       TreeNode node = root;
       while( node != null){
           if(node.data == value){
               return true;
           }
           else if(node.data > value){
               node = node.leftNode;
           }
           else {
               node = node.rightNode;
           }
       }
       
       return false;
   }
```

**add**: 时间复杂度为O(h)，h为该棵树的高度，一层一层往下遍历。注意：校验root为null的情况，直接添加。

```angular2
   public boolean find(int value,TreeNode root){
       if(root == null){
           root = new TreeNode(value);
           return true;
       }
       TreeNode node = root;
       while( node != null){
           if(node.data == value){
               return false;
           }
           else if(node.data > value){
               if(node.leftNode == null){
                   node.leftNode = new TreeNode(value);
                   return true;
               }else{
                   node = node.leftNode;
               }
           }
           else {
               if(node.rightNode == null){
                   node.rightNode = new TreeNode(value);
                   return true;
               }else{
                   node = node.rightNode;
               }
           }
       }
       return false;
   }
```

**remove**:主要是两个步骤：1、查找要删除的节点；2、若查找到要删除的节点n，删除它

从一颗二叉搜索树删除一个节点分为三种情况：

- 节点n没有任何子树

- 节点n只有一个子树

- 节点n有两个子树
