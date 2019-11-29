#!/bin/sh

cd /Users/yuyunzhi/Desktop/yuyunzhi.github.io
git branch
git add .
echo "输入您的commit文字"
read $a
git commit -m "shell提交：$a"

echo "需要push到：b-someone-edit分支则输入y"

read choose

if [ $choose = "y" ];then
echo "正在执行命令：git push origin b-someone-edit "
git push origin b-someone-edit
else
echo "您没有push到服务器"
fi
