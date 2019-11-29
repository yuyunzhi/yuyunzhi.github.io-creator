#!/bin/sh

cd /Users/yuyunzhi/Desktop/yuyunzhi.github.io
git status
git branch
git add .
read $a
git commit -m "shell提交：$a"
git push

