---
title: HTML、CSS
date: 2020-01-02T13:00:23+08:00
categories: ["html"]
tags: ["HTML"]
---

## 1、简述一下 src 与 href 的区别

- href 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。
- src 是指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；
- 在请求 src 资源时会将其指向的资源下载并应用到文档内，例如 js 脚本，img 图片和 frame 等元素。 当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将 js 脚本放在底部而不是头部。

## 2、html 中 title 属性和 alt 属性的区别 ？

有title,那么无论图片能不能正常显示，鼠标放上去都会出现title。有alt，当图片不能正常加载的时候，会显示alt内容。

```angular2
<img src="#" alt="alt 信息" />
```

当图片不输出信息的时候，会显示 alt 信息， 鼠标放上去没有信息。 当图片正常读取，不会出现 alt 信息。

```angular2
<img src="#" alt="alt 信息" title="title 信息" />
```

当图片不输出信息的时候，会显示 alt 信息，鼠标放上去会出现 title 信息。 当图片正常输出的时候，不会出现 alt 信息，鼠标放上去会出现 title 信息。

## 3、讲述你对 reflow回流 和 repaint重绘 的理解


**原因**：浏览器渲染机制  [戳戳戳，你真的了解回流和重绘吗?](https://segmentfault.com/a/1190000017329980)

**严重性**： 在性能优先的前提下，性能消耗 回流 大于 重绘

**体现**：repaint 是某个 DOM 元素进行重绘；reflow 是整个页面进行重排，也就是页面所有 DOM 元素渲染。

**如何触发**： style 变动造成 重绘 和 回流

1、重绘 ：

- color 的修改，如 color=#ddd
- text-align 的修改，如 text-align=center
- a:hover 也会造成重绘
- :hover 引起的颜色等不导致页面回流的 style 变动

2、回流：

- width/height/border/margin/padding 的修改，如 width=778px；
- 动画，:hover 等伪类引起的元素表现改动，display=none 等造成页面回流；
- 对可见的DOM元素操作；
- 插入、删除元素，appendChild 等 DOM 元素操作；
- font 类 style 的修改；
- background 的修改，注意着字面上可能以为是重绘，但是浏览器确实回流了，经过浏览器厂家的优化，部分 background 的修改只触发 repaint，当然 IE 不用考虑；
- scroll 页面，这个不可避免；
- resize 页面，桌面版本的进行浏览器大小的缩放，移动端的话，还没玩过能拖动程序，resize 程序窗口大小的多窗口操作系统。
- 读取元素的属性：读取元素的某些属性（offsetLeft、offsetTop、offsetHeight……），**当你获取布局信息的操作的时候，会强制队列刷新**


3、如何避免：

- 尽可能不要用js来控制DOM来修改style、合并多次对DOM操作（减少for循环）
- 如果要实现动画，用position：absoulte/fixed 脱离文档流，这样受影响的只有当前元素
- 避免使用 table 进行布局：table 的每个元素的大小以及内容的改动，都会导致整个 table 进行重新计算，造成大幅度的 repaint 或者 reflow。改用 div 则可以进行针对性的 repaint 和避免不必要的 reflow。
- 对布局样式属性获取最好将其值缓存起来，避免重复计算
- 避免在 CSS 中使用运算式：这个应该避免，不应该加深到这一层再去了解，因为这个的后果确实非常严重，一旦存在动画性的 repaint/reflow，那么每一帧动画都会进行计算，性能消耗不容小觑。
- 牺牲平滑度满足性能：动画精度太强，会造成更多次的 repaint/reflow，牺牲精度，能满足性能的损耗，获取性能和平滑度的平衡。

**注意：回流一定会触发重绘，而重绘不一定会回流**

## 4、HTML5 为什么只需要写 < !DOCTYPE HTML> ？

HTML5 不基于 SGML(标准通用标记语言（以下简称“通用标言”)，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）。

## 5、行内元素有哪些 ？块级元素有哪些 ？ 空(void)元素有那些 ？

CSS 规范规定，每个元素都有 display 属性，确定该元素的类型，每个元素都有默认的 display 值。 如 div 的 display 默认值为 “block”，则为“块级”元素； span 默认 display 属性值为 “inline”，是“行内”元素。

- 行内元素有：a b span img input select strong（强调的语气）
- 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4 p
- 常见的空元素： img input link meta br hr ，鲜为人知的是：area base col command embed keygen param source track wbr


## 6、HTML5 有哪些新特性？如何处理 HTML5 新标签的浏览器兼容问题 ？

**新特性**：

- 1、绘画 canvas;
- 2、用于媒介回放的 video 和 audio 元素;
- 3、本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;
- 4、sessionStorage 的数据在浏览器关闭后自动删除;
- 5、语意化更好的内容元素，比如 article、footer、header、nav、section;
- 6、表单控件：calendar、date、time、email、url、search;
- 7、新的技术：webworker, websocket, Geolocation;

**支持 HTML5 新标签**：

- 1、IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签，可以利用这一特性让这些浏览器支持 HTML5 新标签，浏览器支持新标签后，还需要添加标签默认的样式。
- 2、然也可以直接使用成熟的框架、比如 script 引入 html5shim;

## 7、简述一下你对 HTML 语义化的理解 ？

- 1、用正确的标签做正确的事情。
- 2、html 语义化让页面的内容结构化，结构更清晰，
- 3、搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO;


## 8、请描述一下 cookies，sessionStorage 和 localStorage 的区别 ？

**作用区别**：

- cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。在同源的 http 请求中携带（即使不需要），也会在浏览器和服务器间来回传递。
- sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。

**存储大小**：

- cookie 数据大小不能超过 4k。
- sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。

**有期时间**：

- localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
- sessionStorage 数据在当前浏览器窗口关闭后自动删除。
- cookie 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。

## 9、iframe 内嵌框架有那些缺点 ？

内联框架 iframe 一般用来包含别的页面，例如 我们可以在我们自己的网站页面加载别人网站的内容，为了更好的效果，可能需要使 iframe 透明效果；

- iframe 会阻塞主页面的 onload 事件；
- 搜索引擎的检索程序无法解读这种页面，不利于 SEO 搜索引擎优化（Search Engine Optimization）
- iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

如果需要使用 iframe，最好是通过 javascript 动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。

## 10、Label 的作用是什么？是怎么用的 ？

label 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。label 和 for 功能使用

```angular2
<label for="Name">Number:</label>
<input type="“text“" name="Name" id="Name" />

<label>Date:<input type="text" name="B"/></label>
```

## 11、如何实现浏览器内多个标签页之间的通信 ?

- WebSocket、SharedWorker；
- 也可以调用 localstorge、cookies 等本地存储方式；
- localstorge 在另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信；

## 12、网页验证码是干嘛的，是为了解决什么安全问题？

- 区分用户是计算机还是人的公共全自动程序；
- 可以防止恶意、暴力破解密码、刷票、论坛灌水；

## 13、前端页面有哪三层构成，分别是什么？作用是什么？

网页分成三个层次，即：结构层、表示层、行为层。

- 网页的结构层（structurallayer）由 HTML 或 XHTML 之类的标记语言负责创建。
- 网页的表示层（presentationlayer）由 CSS 负责创建。CSS 对“如何显示有关内容”的问题做出了回答。
- 网页的行为层（behaviorlayer）由Javascript负责回答 “内容应该如何对事件做出反应” 这一问题。 

## 14、盒子模型的理解 ?

CSS 盒子模型具有内容 (content)、填充 (padding)、边框 (border)、边界 (margin)这些属性。我们所说的 width，height 指的是内容 (content) 的宽高。

一个盒子模型的中：

- 宽度 = width+ padding(宽) + border(宽)。
- 高度 = height + padding(高) + border(高)。

## 15、box-sizing 常用的属性有哪些 ？分别有什么作用 ？

常用的属性：box-sizing: content-box border-box inherit;

**作用**：

**content-box(默认)：** 宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框(元素默认效果)。即宽度和高度会变化，内容使用在宽高内部。

**border-box：** 元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。即宽度高度不会变，内容可能超出宽高。

## 16、页面导入样式时，使用 link 和 @import 有什么区别 ？

- link 属于 XHTML 标签，除了加载 CSS 外，还能用于定义 RSS
- @import 是 CSS 提供的，只能用于加载 CSS
- import 是 CSS2.1 提出的，只在 IE5 以上才能被识别，而 link 是 XHTML 标签，无兼容问题

## 17、常见兼容性问题？

- 浏览器默认的 margin 和 padding 不同。解决方案是加一个全局的 *{margin: 0; padding: 0;} 来统一。
- IE 下 event 对象有 event.x，event.y 属性，而 Firefox 下没有。Firefox 下有 event.pageX，event.PageY 属性，而 IE 下没有。 解决办法：var mx = event.x?event.x:event.pageX;
- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示, 可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决.

## 18、position 、float 和 display 的取值

- position 属性取值：static(默认)、relative、absolute、fixed、inherit、sticky
- float：left (或 right)，向左（或右）浮动
- display 属性取值：none、inline、inline-block、block、table 相关属性值、inherit

## 19、以 CSS3 标准定义一个 webkit 内核浏览器识别的圆角（尺寸随意）

```angular2
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
 border-radius: 10px;
```

## 20、优先级算法如何计算？

- !important > 写在内联优先级高 >id > class >tag
- 载入样式以最后载入的定位为准

## 21、CSS3 新增伪类举例

- :after 选择器在被选元素的内容后面插入内容
- :before 选择器在被选元素的内容前面插入内容
- :nth-child(n) 匹配父元素下指定子元素，在所有子元素中排序第 n
- :nth-child(odd) 奇数
- :nth-child(even) 偶数
- :nth-child(3n+1)


