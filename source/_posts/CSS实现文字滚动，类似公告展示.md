---
title: 'CSS实现文字滚动，类型京东商城公告栏'
tags:
    - CSS
categories:
    - 前端
---
实现文字滚动，第一时间想用swiper进行，但是需求功能较少，不需要引用外部swiper.js，直接用CSS的animate属性实现文字滚动，2秒滚动一次，实现如下:

```html
<div class="notice">
 <ul>
 <li>第1条公告第1条公告第1条公告第1条公告第1条公告第1条公告</li>
 <li>第2条公告第2条公告第2条公告第2条公告第2条公告第2条公告</li>
 <li>第3条公告第3条公告第3条公告第3条公告第3条公告第3条公告</li>
 <li>第4条公告第4条公告第4条公告第4条公告第4条公告第4条公告</li>
 </ul>
</div>

```

```css
div,ul,li{margin: 0;padding: 0}/*先初始化一下默认样式*/
.notice {
 width: 300px;/*单行显示，超出隐藏*/
 height: 35px;/*固定公告栏显示区域的高度*/
 padding: 0 30px;
 background-color: #b3effe;
 overflow: hidden;
}
.notice ul li {
 list-style: none;
 line-height: 35px;
 /*以下为了单行显示，超出隐藏*/
 display: block;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
}
```

```js
function noticeUp(obj,top,time) {
 $(obj).animate({
 marginTop: top
 }, time, function () {
 $(this).css({marginTop:"0"}).find(":first").appendTo(this);
 })
}

 setInterval("noticeUp('.notice ul','-35px',500)", 2000);
```