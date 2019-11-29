#!/bin/sh

name1=1
name2=1
if test $[name1] -eq $[name2]
then
    echo '相等！'
else
    echo '不相等！'
fi
