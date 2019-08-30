---
title: Charles抓包(Mac)
date: 2019-06-19T23:00:23+08:00
categories: ["Code通用"]
tags: ["Charles"]
---

## 一、安装

去官网下载，[点这里](https://www.charlesproxy.com/download/)

## 二、激活

网上的激活账号:Help->Registered

```angular2
Registered Name: https://zhile.io
License Key: 48891cf209c6d32bf4
```

## 三、配置

### 1、配置PC端：

- Help->SSL Proxying->Install Charles Root Certificate

- 打开后发现证书并不是信任的。双击证书把信任改为始终信任
- Proxy -> SSL Proxy Settings，勾选 Enable SSL Proxying，，这里可以用 *.443
### 2、配置手机端：

- 让手机连的wifi和电脑的 wifi 一致
- 查看本机IP地址：Help->Local IP Address
- Proxy -> Proxy Settings默认端口是8888，根据实际情况可修改。

- 打开手机中的设置，所选wifi高级设置->代理（手动），配置代理服务器主机名（本机IP地址）-> 配置代理服务器端口（charles默认为8888）
- 手机安装证（为了查看 https请求）：手机端连上电脑的代理后 ，浏览器访问SSL证书下载地址后直接安装：http://chls.pro/ssl。**证书下载地址也可在电脑端 Help->SSL Proxying—>Install Charles Root Certificate on a Mobile Device or Remote Brower 下查询确认，以此为准。** 手机端证书仅对一台PC有效，如要再其他PC端抓取https，需要连接对应的代理后再次安装证书。
- 

## 四、抓包

- 完成以上步骤，打开手机某个APP，就能看到抓取的数据了
- 如果要抓取PC端包，打开Proxy -> MacOS Proxy
- 如果抓包出现unknown 或出现抓取不了 https ，按照配置重做一遍。
