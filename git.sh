#!/bin/sh

cd /Users/yuyunzhi/Desktop/yuyunzhi.github.io
git branch
git add .
echo "输入您的commit文字"
read $a
git commit -m "shell提交：$a"

echo "需要push到：b-someone-edit分支则输入y"

git push

