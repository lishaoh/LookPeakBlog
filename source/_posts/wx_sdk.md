---
title: 微信JSSDK遇到的那些坑
tags:
    - 微信公众号
categories:
    - 前端
permalink: wx-sdk
shared: false
date: 2018-06-20
---
作为一个前端开发者，相信很多同道中人在微信公众号的开发中被坑的很惨，我也分享开发过程中的一点点经验给大家，可以减少很多弯路。由于项目需要，前端开发使用的是angular4.0技术，微信开发工具v1.02。前端开发公众号最坑的就是微信JSSDK的使用，前面坑路漫漫，我还得一步一步趟过去。

## JSSDK使用报错

### 1. config:invalid signature一直报这个错误
&nbsp;&nbsp;&nbsp;&nbsp;`建议：首先查看微信官方网站给出的解决方案.`[链接](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html) [获取access_token](https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf17b04f12b73b60c&secret=345d810799934a7736f60f95ddbbf84b)
&nbsp;&nbsp;&nbsp;&nbsp;建议按如下顺序查找错误：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.确认签名算法正确，可用 http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 页面工具进行校验。也就是你自己后台生成签名要和微信校验算法生成的签名一致才可以（可能大小写不同）。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.确认config中nonceStr（js中驼峰标准大写S）, timestamp与用以签名中的对应noncestr, timestamp一致。
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.确认url是页面完整的url(请在当前页面alert(location.href.split('#')[0])确认)，包括'http(s)://'部分，以及'？'后面的GET参数部分,但不包括'#'hash后面的部分。
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.确认 config 中的 appid 与用来获取 jsapi_ticket 的 appid 一致。
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.确保一定缓存access_token和jsapi_ticket。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.出现问题的原因是参与签名的URL地址不正确，需要动态获取当前页面完整的URL地址（包括?后面的参数，但不能包含#号），如若URL地址为：`http://www.xxx.xxx/payment/wxpay/jspay?oid=xxxx&attr=xxxx#wechat`，那么完整的URL地址应该是截取#号之前的部份。为什么会出现#号呢？因为你的URL在被分享到朋友圈等微信系统自动会添加一些参数。
&nbsp;&nbsp;&nbsp;&nbsp;PS：这里有一个大坑，就是Android和iOS对于当前页面的URL有不同的理解，iOS微信JSSDK授权易出错，但是筛选页面后又OK了，Android每次授权是OK的，具体介绍[看这里](https://gitissue.com/issues/5ab609afefbdd46ca4725b98)。原因就是因为iOS和Android对URL的识别机制不同：Android每次进行新页面时当前URL也是最新的，而iOS每次进去新页面时实际URL是第一次进入应用的URL，刷新之后当前页面URL就是最新URL。
``` bash
     解决办法： 在home页判断当前平台是否为iOS，若为iOS，此时通过wx.config()授权，获取直接通过window.location.href链接跳转来改变当前页面URL
```

### 2. permission denied权限错误
&nbsp;&nbsp;&nbsp;&nbsp;首先查看微信给出的错误说明：该公众号没有权限使用这个JSAPI（部分接口需要认证之后才能使)。
&nbsp;&nbsp;&nbsp;&nbsp;说明：只要通过了公众号认证，都不会有问题。
&nbsp;&nbsp;&nbsp;&nbsp;检查对象：如果出现这个说明程序上基本上不会有问题 微信后台已经返回了数据。
&nbsp;&nbsp;&nbsp;&nbsp;第一、要检查 你的config 文件中相应的 jsApiList数组中是否包含了该接口。
```js
wx.config({
    debug: false,
    appId: '',
	timestamp:'',
	nonceStr:'',
	signature:'',
	jsApiList: [
	    'checkJsApi',
	    'onMenuShareTimeline',
	    'hideOptionMenu'
	    ...
	]
});
```
