---
title: 微信公众号本地调试小技巧
---
本地调试是公众号开发过程中不可缺少的步骤，我们不可能每次开发都上传到服务器再用微信去查看本地效果，这样一方面效率低，另一方面存在一定的风险性。那么有没有什么办法能够让开发者本地调试代码呢，答案是有的，网上搜出了很多方法，比如ngrok、花生壳、natapp.cn等工具，下面介绍的是[ngrok](https://ngrok.com/)，其他的嫌麻烦。

## ngrok使用

### 1. 为什么要用ngrok
&nbsp;&nbsp;&nbsp;&nbsp;在微信开发的时候需要填写与微信服务器相连接的url才能授权，这个url必须是外网域名，也就是说我们需要在这个外网域名对应的ip服务器上做开发，而没办法本地开发调试所以用ngrok获得一个外网域名 这个外网域名实际访问的是本地主机这样把此外网域名填入到微信需要的外网url里就可以在本地开发调试了。

### 2.使用ngrok
&nbsp;&nbsp;&nbsp;&nbsp;首先到官网下载[ngrok](https://ngrok.com/)，然后注册一个ngrok帐号拿到token，这个token自定义域名的时候使用，[具体看这里](https://dashboard.ngrok.com/get-started)。我本人使用的MAC，需到ngrok目录下执行命令
![](/images/ngrok1.png)
这时候ngrok已经生成了一个外网域名`http://4f75fc79.ngrok.io`访问本机`localhost:80`
![](/images/ngrok2.png)
浏览器里直接访问`http://4f75fc79.ngrok.io`就可以访问本地。
现在外网有了，就可以开始授权了。为了避免和线上冲突，我注册了一个微信公众号开发者测试号，已经能够调用微信开放的大多数JS接口了。创建公众号测试帐号方法可以自行百度.
![](/images/ngrok3.jpg)
此处有一个坑，网上很多都说这里的token是随便写的，的确，但是作为一个前端开发者，在没有后端资源情况下随便填写的token总是报token无效错误，这是因为保存修改时微信会向填写的URL发送一个验证请求，验证token是否有效，但是我们不知道token是多少，现在如何做呢？我有node.js爸爸，还怕什么呢，我们可以本地起一个服务来监听微信请求的URL，上面说到微信此时会发起一个get请求到
`http://4f75fc79.ngrok.io`那我就本地写一个服务来监听，只要服务里的token和修改的一致不就可以匹配了吗？说干就干，直接上代码
```js
var PORT=80;                 //监听80端口号
var http=require('http');  
var qs=require('qs');
var TOKEN='token';           //必须与测试号所填写的Token相同

function checkSignature(params,token){
    var key=[token,params.timestamp,params.nonce].sort().join(''); 
     //将token （自己设置的） 、timestamp（时间戳）、nonce（随机数）三个参数进行字典排序
    var sha1=require('crypto').createHash('sha1');
     //将上面三个字符串拼接成一个字符串再进行sha1加密
    sha1.update(key);
    return sha1.digest('hex') ==params.signature;
     //将加密后的字符串与signature进行对比，若成功，返回echostr
}

var server=http.createServer(function (request,response) {
   var query=require('url').parse(request.url).query;
    var params=qs.parse(query);

    console.log(params);
    console.log("token :",TOKEN);


    if(!checkSignature(params,TOKEN)){
        //如果签名不对，结束请求并返回
        response.end('signature fail');
    }

    if (request.method == "GET") {
        //如果请求是GET，返回echostr用于通过服务器有效校验
        response.end(params.echostr);
    }else{
        //否则是微信给开发者服务器的POST请求
        var postdata='';
        request.addListener("data",function(postchunk){
            postdata+=postchunk;
        });
        //获取到了POST数据
        request.addListener("end",function(){
            console.log(postdata);
            response.end('success ');
        });
    }
});

server.listen(PORT, function () {
    console.log('Server running at port:'+PORT);
});
```
微信发起的请求直接到我们本地，那还不是我想怎么玩就怎么玩，嘿嘿嘿！具体操作看[这里](https://blog.csdn.net/yezhenxu1992/article/details/51691649)
修改接口配置成功后就可以调用测试号里面的所有js接口了，实现本地调试微信公众号不再是奢望！！！
