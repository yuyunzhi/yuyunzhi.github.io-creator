#!/bin/sh

cd /Users/yuyunzhi/Desktop/yuyunzhi.github.io
git status
git branch
git add .
echo "输入您的commit文字"
read a
git commit -m "$a"
git push

