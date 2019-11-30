#!/bin/sh

cd /Users/yuyunzhi/Desktop/yuyunzhi.github.io

# 生成静态文件
hugo

echo "对整个项目文件进行推送github---------------------------------"
# 对整个项目文件进行推送github
git status
git add .
echo "输入您的commit文字"
read a
git commit -m "$a"
git push

echo "对public文件进行推送github---------------------------------"

# 对public文件进行推送github
cd /Users/yuyunzhi/Desktop/yuyunzhi.github.io/public
git status
git add .
git commit -m "$a"
git push

