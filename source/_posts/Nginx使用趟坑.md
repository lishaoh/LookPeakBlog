---
title: Nginx使用趟坑
tags:
	- 自动化
categories:
	- 前端
permalink: Nginx
shared: false
date: 2020-08-13
---

## 阿里云重启服务器后nginx无法启动
### 现象：
```sh
[root@xxxx]# service nginx status
nginx is stopped
```
重启nginx：
```sh
[root@xxxx]# service nginx start

Starting nginx... nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
nginx: [emerg] still could not bind()
```
说明80端口已被占用了，查看端口使用情况：
```sh
[root@xxxx]# netstat -lnp | grep 80

tcp        0      0 127.0.0.1:8006          0.0.0.0:*               LISTEN      1169/java           
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      13336/nginx: master 
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      1169/java           
tcp6       0      0 :::80                   :::*                    LISTEN      13336/nginx: master 
```
或者使用`netstat -ntpl`，80端口被PID=13336占用，那就kill掉
```sh
[root@xxxx]# kill 13336
[root@xxxx]# service nginx start

Starting nginx...  done
```
至此nginx重启成功