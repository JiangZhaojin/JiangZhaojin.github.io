---
layout: post
title:  "JS笔记：编写可维护的javascript"
date:   2017-04-27
author: "Jokin"
catalog: true
header-img: "img/post-bg-digital-native.jpg"
tags:
    - Javascript
    - 笔记
---

对《编写可维护的javascript》做了部分摘记(第四章-第十二章)。

---

## 变量、函数、运算符

### 变量声明

推荐单var语句，每个变量一行，未初始化变量置于最后

```js
var value = 10,
    length = 100,
    i,
    result;
```

### 函数声明

紧接着变量声明之后

### 严格模式

避免在全局作用域中使用严格模式，多个函数可以这样：

```js
(function() {
    "use strict"
    function setA() {
        // 代码
    }
    
    function setB() {
        // 代码
    }
})();
```

### 代码执行

严禁使用Fnctioon和eval()

```js
// 糟糕的实践
var myfun = new Function("alert('Hi')");
```

>eval只是一个普通的函数，只不过他有一个快速通道通向编译器，可以将string变成可执行的代码。有类似功能的还有Function, setInterval和setTimeout。

### 原始包装类型

不使用包装类型，思维跳跃易出bug

```js
// 不好的做法
var name = new String("jokin");
```

---

## 全局变量

所有变量必须`var`声明

### 单全局变量

jQuery定义了`$`和`jQuery`

Dojo定义了`dojo`

····

### 命名空间

`Y.DOM`、`Y.Event`、`Y.Email` 等等

### 零全局变量

```js
(function(win) {
    "use strict"
    var doc = win.document;
    
    // 其他代码
}(window))
```

---

## 事件处理

### 隔离应用逻辑&不要分发事件对象

好的API对期望和依赖都是透明的

```js
// 好的做法
var MyAplication = {
    
    handleClick: function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // 传入应用逻辑
        this.showPopup(event.clientX, event.clientY);
    }
    
    showPopup: function(x, y) {
        // 代码
    }
}
```

---

## 检测值

### 检测原始值

1. 判断原始值: `typeof`
2. 判断`null`: `===`
3. 判断引用值: `instanceof`

### 检测函数

虽然也可以用`instanceof`，但是存在跨帧(frame)问题，一般用`typeof`合适

```js
typeof myFun === "function";  // true
```

### 检测数组

`instanceof`同样存在跨帧问题，一般使用`Array.isArray`

```js
function isArray(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}
```

### 检测属性

使用`in`和`hasOwnProperty`

---

## 抽离配置数据

变动频繁的数据项可以抽离出来，单独放置在一个文件中。

---

## 抛出错误

自定义错误：

```js
function MyError(message) {
    this.message = message;
}
MyError.prototype = new Error();
```

---

## 不是你的对象不要动

将已经存在的javascript对象当作工具函数库一样对待

- 不覆盖方法
- 不添加方法
- 不删除方法

`delete`只能删除实例对象上的属性或者方法，原型链上的可以用赋值`null`来代替

### 两种继承

javascript有两种基本的继承形式：基于对象的继承和基于类型的继承

```js
// 基于对象
var man = {
    hair: "black",
    eye: "blue"
}

Object.create(man, {
    name: "jiangzhaojin",
    age: 23
})

// 基于类型  1.原型继承  2.构造器继承
function Person(name) {
    this.name = name;
    
    sayName: function() {
        alert(this.name);
    }
}

function Author(name) {
    Person.call(this, name);
}

Author.prototype = new Person();
```

### 门面模式

为已经存在的对象构建一个新的接口：`jQuery`的`$("")`就是一种。

### 阻止修改

```js
// 拓展
Object.preventExtension()
Object.isExtensible()

// 密封
Object.seal()
Object.isSealed()

//冻结
Object.freeze()
Object.isFrozen()
```

---

## 浏览器嗅探

采用特性检测，避免特性推断和浏览器推断