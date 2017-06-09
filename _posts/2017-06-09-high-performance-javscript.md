---
layout: post
title:  "JS笔记：高性能javascript"
date:   2017-06-09
author: "Jokin"
catalog: true
header-img: "img/post-bg-digital-native.jpg"
tags:
    - Javascript
    - 笔记
---

> 去年实习就开始看这本《高性能javascript》，薄薄的一小本，却到临近毕业才认真看个大概。

### 加载和执行

- **将`<script>`标签放置于`<body>`底部**：虽然大多数新版浏览器已经允许并行下载脚本，但是页面必须等待脚本下载执行完毕才能继续，这会阻碍其他如图片等资源的加载。

- **采用`defer`和`async`**: 都可以并行下载脚本，`async`加载完成后自动执行，`defer`等待页面完成后自动执行，且不阻塞其他资源的下载。

- **动态加载脚本（兼容性好且易用）**： 无论何时启动下载，文件的下载执行不会阻塞页面和其他进程。

### 数据存储

- 某个跨作用域的值在函数中被引用一次以上，那么就把它存储在局部变量里

### DOM查找

- 使用`querySelectorAll() querySelector()`提高DOM查找速度
- 重绘和重排是代价昂贵的操作，会导致UI反应迟钝
- 改变几何尺寸和查询几何尺寸触发重排（减少重排）
- 批量修改DOM：
  - 隐藏元素，应用修改，重新显示（`display`属性）
  - 使用文档片段（`createDocumentFragment()`）
  - 将原始元素拷贝到脱离文档的节点中，修改副本后替换（`cloneNode()`）
- 缓存布局信息（同缓存局部变量）
- 动画中使用绝对定位
- 使用事件委托

### 算法和流程控制

- Duff's Device 是一种循环体展开技术（增加每个循环的处理量）
- 优化if-else：确保最可能的出现在第一判断中
- 给函数添加缓存功能：
```js
function memoize(fun, cache) {
    cache = cache || {};
    
    var shell = function(arg) {
        if(!cache.hasOwnProperty(arg)) {
            cache[arg] = fun(arg);
        }
        return cache[arg];
    }
    return shell;
}
```
- 判断条件较多时选用查找表（数组或者对象）候选值数量增加时几乎不会产生额外的性能开销。

### 字符串和正则表达式

- 关注更快让正则匹配失败
- 以简单、必须的字元开始
- 使用非捕获组
- 将正则表达式赋值给变量并重用它们（避免重复编译）

### 快速响应的用户界面

- 定时器精度：建议最小值为25ms
- 利用定时器分解任务：
```js
function processArray(items, process, callback) {
    var todo = items.concat();
    
    setTimeout(function() {
        process(todo.shift());
        
        if(items.length > 0) {
            setTimeout(arguments.callee, 25);
        } else {
            callback(items);
        }
    }, 25)
}
```
- 分割任务：
```js
function multiSteps(taskArr, arg, callback) {
    var tasks = taskArr.concat();
    
    setTimeout(function() {
        var task = tasks.shift();
        task.apply(null, arg || []);
        
        if (tasks.length > 0) {
            setTimeout(argument.callee, 25);
        } else {
            callback();
        }
    }, 25);
}
```

### Ajax

- MXHR：打包服务端资源，使用一个http请求传送。
- Beacons(信标)：性能消耗极其小

```js
var url = "/status_tracker.php";
var params = [
    "step=2",
    "time=1" 
];

(new Image()).src = url + '?' + params.join('&');
```

- 当数据集较大而且对解析时间有要求时：
    1. JSON-P数据，使用动态脚本注入获取。解析速度快，能跨域使用，但涉及敏感数据时不应当使用。
    2. 字符分隔的自定义模式，使用XHR或者动态脚本注入获取，用split()获取。

### 编程实践

- 延迟加载函数：当函数在页面中不会被立即调用，延迟加载是最好的选择
```js
function addHandler(target, eventType, handler) {
    // 复写
    if(target.addEventListener) {
        addHandler = function(target, eventType, handler) {
            target.addEventListener(eventType, handler, false);
        }
    } else {
        addHandler = function(target, eventType, handler) {
            target.attachEvent('on' + eventType, handler);
        }
    }
}
```
- 条件预加载：确保所有函数消耗的时间相同。

### 构建高性能web应用

- 合并javascript文件减少HTTP请求
- 压缩javascript文件大小
- 通过设置正确的头来缓存javascript文件，通过给文件名增加时间戳来解决缓存问题
- 使用CDN加速