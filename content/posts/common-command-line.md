---
title: 命令行
date: 2019-08-23T23:00:23+08:00
categories: ["Code通用"]
tags: ["命令行"]
---

## 一、什么是命令行
- 内核：负责操作系统最底层操作的东西
- shell:通过命令行负责与内核交互
- 命令行：cmd、power shell、git bash、zsh

**你不能直接操作内核，你需要通过命令行来操作**

## 二、我们为什么需要命令行
- 因为所有公司的服务器都运行在linux
- 将工作自动化、自动化是一切生产力的根源
- 相比GUI，命令行更容易开发维护
- 远程连接时，命令行占用的资源远低于GUI
- 命令行上的开发者工具更丰富

## 三、命令行的历史与流派
- UNIX家族
- 奇葩 windows

## 四、命令的全部要素
- 四个要素：可执行程序（Executable）、参数、环境变量（Environment variable）、工作目录（Working directory）。以上四个要素就可以重现一个命令
- 可执行程序：**ls -a**  ls 是可执行程序
    - 去哪里找程序？Windows：Path环境变量 + 当前⽬录，UNIX/Linux：PATH环境变量  
    - 脚本语言解释器：在脚本的第⼀⾏指定解释器（shebang）
- 参数：**java -version** java 后面的都是参数
- 环境变量：
    - 进程：进程是计算机程序运⾏的最⼩单位，独占⾃⼰的内存空间和⽂件资源
    - 每个进程都和⼀组变量相绑定，传递不同的环境变量可以让程序表现出不同的⾏为
    - 在进程的fork过程中，环境变量可以被完全继承
    - 所有的操作系统/编程语⾔都⽀持环境变量  
    - 有局部和全局的环境变量区分
- 工作目录：命令所在的目录是工作目录pwd。绝对路径，是从根目录开始的路径。相对路径，相对于当前工作目录的路径
