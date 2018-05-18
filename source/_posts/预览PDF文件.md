---
title: PDF.js预览文件
---
网上找到很多前端实现文件预览方法，但都无法解决我的问题，产品需求中将文件上传到腾讯云的对象存储，返回一个URL，这个URL无法在网页中预览，浏览器将这个URL直接本地下载文件（下载文件下面说）,最后只能用PDF.js，这是一个开源的js库，直接将PDF文件渲染成canvas，PDF.js框架的魅力所在，为其为HTML5实现的，无需任何本地支持，而且对浏览器的兼容性也是比较好，要求只有一个：浏览器支持HTML5就好了！（不过对于低版本的IE，就只能节哀了！）.不多说，直接贴代码(angular5.0开发):

在线演示地址：http://mozilla.github.com/pdf.js/web/viewer.html

Demo地址：http://mozilla.github.io/pdf.js/examples/

PDF.js可在官网下载  地址：http://mozilla.github.io/pdf.js/
```html
  <canvas id="the-canvas" class="the-canvas" style="position: absolute;
    left: 0;
    right: 0;
    margin: auto;"></canvas>
  <div class="m-t" style="position: fixed;
    right: 40px;">
    <button id="prev" nz-button class="m-r-md"><i class="anticon anticon-left"></i>Previous</button>
    <span class="m-r-md">Page: <span id="page_num"></span> / <span id="page_count"></span></span>
    <button id="next" nz-button>Next<i class="anticon anticon-right"></i></button>
  </div>

```
通过按钮控制页面加载
```js
 previewPDF(url) {
    // url 为PDF文件的链接地址;
    const vm = this;
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

    let pdfDoc = null,
      pageNum = 1,
      pageRendering = false,
      pageNumPending = null,
      scale = 1.6,
      canvas = vm.el.nativeElement.querySelector('.the-canvas'),
      ctx = canvas['getContext']('2d');

    function renderPage(num) {
      pageRendering = true;
      pdfDoc.getPage(num).then(function (page) {
        const viewport = page.getViewport(scale);
        canvas['height'] = viewport.height;
        canvas['width'] = viewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        const renderTask = page.render(renderContext);

        renderTask.promise.then(function () {
          pageRendering = false;
          if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
          }
        });
      });
      vm.el.nativeElement.querySelector('#page_num').textContent = num;
    }

    function queueRenderPage(num) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        renderPage(num);
      }
    }

    function onPrevPage() {
      if (pageNum <= 1) {
        return;
      }
      pageNum--;
      queueRenderPage(pageNum);
    }

    vm.el.nativeElement.querySelector('#prev').addEventListener('click', onPrevPage);

    function onNextPage() {
      if (pageNum >= pdfDoc.numPages) {
        return;
      }
      pageNum++;
      queueRenderPage(pageNum);
    }

    vm.el.nativeElement.querySelector('#next').addEventListener('click', onNextPage);

    pdfjsLib.getDocument(url).then(function (pdfDoc_) {
      pdfDoc = pdfDoc_;
      vm.el.nativeElement.querySelector('#page_count').textContent = pdfDoc.numPages;
      renderPage(pageNum);
    });
  }
```

结果如下图:
![](/images/pdf.jpg)