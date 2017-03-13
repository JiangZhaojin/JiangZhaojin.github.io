---
layout: post
title:  "JS学习笔记：闭包"
date:   2016-06-27
author:     "Jokin"
header-img: "img/post-bg-digital-native.jpg"
catalog: true
tags:
    - 学习笔记
    - Javascript
---

## 闭包的定义

---

javascript权威指南中对闭包的解释：

> 函数对象可以通过作用域链关联起来，函数体内部的变量都可以保存在函数作用域内，这种特性称之为“闭包”

文献的定义比较抽象，我的理解是：

> 在js中，从函数内部返回一个函数可以形成闭包。而这个返回函数由于作用域链的关系可以访问其外部函数的私有变量。

---

## 形成闭包的方式

---

### 全局变量引用：

```js
var globalVar;
function outerFn(){
    document.write("Outer function<br/>");          
    function innerFn() {
        document.write("Inner function<br/>");
    }
    globalVar = innerFn;
}
globalVar();		//正确
```

### 从外部函数内返回：

```js
function outerFn(){
    document.write("Outer function<br/>");
    function innerFn(){
        document.write("Inner function<br/>");
    }
    return innerFn;
}
var fnRef = outerFn();
fnRef();			//正确
```

---

## 陷阱的地方

---

#### 第一段代码：

```js
function constfunc(v) {
	return function () { return v ; }
}
var funcs = [] ;
for ( var i=0; i<10; i++ ){
	funcs[i] = constfunc(i);
}
funcs[5]();			//==>5
```

#### 第二段代码：

```js
function constfunc() {
	var funcs = [];
	for ( var i=0; i<10; i++ ){
		funcs[i] = function() { return i };
	}
	return funcs;
}
var funcs = constfunc();
funcs[5]();			//==>10
```

之所以出现这样的差异是因为，第一段代码每次返回的函数都是“新的”，不共享i变量。
而第二段代码中funcs[]中的函数都是在同一个函数调用中定义的，所以共同享有一个i变量。

---

## 注意事项

---

只要存在有外部属性调用这个内部函数，JavaScript就需要保留被引用的函数。而且JavaScript运行时需要跟踪引用这个内部函数的所有变量，直到最后一个变量废弃，JavaScript的垃圾收集器才能释放相应的内存空间。<br/>
这也意味着闭包如果使用不慎，容易造成循环引用。
