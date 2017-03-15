---
layout: post
title:  "JS笔记：蝴蝶书小结"
date:   2016-09-08
author: "Jokin"
catalog: true
header-img: "img/post-bg-digital-native.jpg"
tags:
    - Javascript
    - 笔记
---

这几天对蝴蝶书进行了学习，对比于javascript权威指南的厚厚1000页，这本书真是单薄地令人惊讶。发现看一遍下来印象不是很深刻，遂做了个笔记，篇幅较长，但方便回顾。

![](https://img3.doubanio.com/lpic/s3651235.jpg)

## 语法部分

---

### 注释

分为 `//`和`/* */。后者在注释正则表达式时要小心：

```js
/*
    var isNumber = num.match('/[0-9]*/');
*/
```

### 标识符

字母或下划线开头，后面跟字母、数字、下划线。注意保留字。

### 数字

使用 `isNaN`来检测`NaN`。

### 字符串

当年 JavaScript 被创建的时候，Unicode 是16位字符集，因此 JavaScript 字符是16位的。

使用单引号或者双引号。

`'`和`"`注意配对使用。

### 表达式

运算符优先级

运算符 | 说明
----- | -----
`.` `[]` `()` | 提取属性与调用函数
`delete` `new` `typeof` `+` `-` `!` | 一元运算符
`*` `/` `%` |
`+` `-` |
`>=` `<=` `>` `<` |
`===` `!==` |
`&&` | 逻辑与
`||` | 逻辑或
`?:` | 三目

### 字面量

推荐写法：

```js
var o = {};
var arr = [];
```
---

## 关于对象

JavaScript 包含一种原型链的特性，允许对象继承另一个对象的属性。正确地使用它能减少对象初始化时消耗的时间和内存。

---

### 对象字面量

包围在一对花括号中的零或多个“名/值”对。

### 检索

`.` `[]` 

### 更新

直接使用赋值语句更新，若不存在这个属性，则作为扩充操作。

### 引用

对象通过引用来传递他们永远不会被复制。

### 原型

每一个对象都连接到一个原型对象，并且它可以从中继承属性。所有通过字面量创建的对象都连接到`Object.prototype`，它是JavaScript中的标配对象。

可以使用ES5中的方法`Object.create()`

原型关系是一种动态关系。如果我们添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见。

### 反射

> 在计算机科学中，反射是指计算机程序在运行时（Run time）可以访问、检测和修改它本身状态或行为的一种能力。

检查对象并确定对象有什么属性是很容易的事情，只要试着去检索该属性并验证取得的值。

`typeof`用来确定对象属性的类型。

`hasOwnProperty`，若对象拥有独有的属性，它将返回`true`。不会检查原型链。

### 枚举

使用`for in`可以遍历一个对象中的所有属性名，包括原型链上的属性名。
属性名是无序的，若想保持顺序应使用数组和`for`循环。

### 删除

`delete`可以用来删除对象的属性。若对象包含该属性，则会被移除。它不会触及原型链中的任何对象。

---

## 关于函数

---

### 函数对象

JavaScript 中的函数就是对象。函数对象连接到`Function.prototype`（该原型对象本身连接到`Object.prototype`）。

注意函数的声明提升。

因为函数是对象，所以可以像任何其他的值一样被使用。函数可以保存在变量、对象和数组中。函数可以被当做参数传递给其他函数，函数也可以再返回函数。函数也可以拥有方法。

### 函数字面量

函数对象通过函数字面量来创建。

```js
var add = function(a, b) {
    return a + b
}
```

### 调用

调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形式参数，还有两个附加参数：`this`和`arguments`。参数`this`在面向对象编程中非常重要，它的值取决于调用的模式。JavaScript中一共有4中调用模式：方法调用模式、函数调用模式、构造器调用模式、apply调用模式。

### 参数

当函数被调用时，会得到一个`arguments`数组。通过此参数可以访问所有它被调用时传递给它的参数列表，包括那些没有被分配给函数声明时定义的形参的多余参数。这使得编写一个无须指定参数个数的函数成为可能。

```js
var sum = function() {
    var i, sum = 0
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }
    return sum
}
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9)) //45
```

因语言的设计错误，`arguments`并不是一个真正的数组。是一个“类似数组”的对象。有`length`属性，但没有任何数组的方法。


### 返回

`return`可以使函数提前返回，不在执行余下的语句。

函数总是会返回一个值，若没有指定，则返回`undefined`。

若函数调用时在前面加上了`new`前缀，且返回值不是一个对象的时候，则返回`this`（该新对象）。

### 异常

异常是干扰程序的正常流畅的不寻常的事故。

```js
var add2 = function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        }
    }
    return a + b
}
console.log(add2(2, 3)) //5
console.log(add2('a', 6))
```

`throw`语句中断函数的执行。抛出一个`exception`对象，该对象包含一个用来识别异常类型的`name`属性和一个描述性的`message`属性。也可以自定义其他属性。

```js
var try_it = function() {
    try {
        add2('a')
    } catch (e) {
        console.log(e.name + ': ' + e.message)
    }
}
try_it() //TypeError: add needs numbers
```

如果在`try`代码块内抛出一个异常，控制权就会跳转到它的`catch`语句中。

### 扩充类型的功能

JavaScript 允许给语言的基本类型扩充功能。通过`Object.prototype`添加方法，可以让该方法对所有对象都适用。

```js
// 先添加方法使得该方法对所有函数可用
Function.prototype.method = function(name, func) {
    this.prototype[name] = func
    return this
}

//添加一个取整方法
Number.method('integer', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this)
})
console.log((-10 / 3).integer()) //-3

//添加 trim()
String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '')
})
console.log('  hello alibaba  '.trim()) //hello alibaba
```

### 递归

递归函数就是会直接或者间接地调用自身的一种函数。

```js
var walkTheDom = function walk(node, func) {
    func(node)
    node = node.firstChild
    while (node) {
        walk(node, func)
        node = node.nextSibling
    }
}
```

### 作用域

作用域控制着变量与参数的可见性及生命周期。它减少了名称冲突，并提供了自动内存管理。

无块级作用域。

有函数作用域。

建议在函数体的顶部声明函数中可能用到的所有变量。

### 闭包

作用域的好处是内部函数可以访问定义他们的外部函数的参数和变量（除了`this`和`arguments`）。

```js
var quo = function(status) {
    return {
        get_status: function() {
            return status
        }
    }
}

var myQuo = quo('amazed')
console.log(myQuo.get_status()) //amazed
```
狭义的说，返回的那个对象即闭包，它里面的方法可以访问它被创建时所处的上下文环境。

避免在循环中创建函数，容易引起混淆。可以现在循环之外创建一个辅助函数，让辅助函数在返回一个绑定了当前`i`值的函数，这样就不会导致混淆了。

### 回调

将一个函数作为参数，一旦接收到响应，再调用这个函数。

### 模块

可以用函数和闭包构造模块。

模块模式的一般形式是：一个定义了私有变量和函数的函数；利用闭包创建可以访问私有变量和函数的特权函数；最后返回这个特权函数，或者把他们保存到一个可访问到的地方。

```js
var numberCal = (function() {
    var half = function(n) {
        return n / 2
    }
    var double = function(n) {
        return n * 2
    }
    var tribble = function(n) {
        return n * 3
    }
    return {
        half: half,
        double: double,
        tribble: tribble
    }
}())

console.log(numberCal.half(5)) //2.5
console.log(numberCal.half(6)) //3
console.log(numberCal.double(7)) //14
console.log(numberCal.tribble(7)) //21
```

### 级联

如果让方法返回`this`而不是默认的`undefined`，就可以启用级联，即连续调用。

### 柯里化

柯里化允许我们把函数与传递给它的参数相结合，产生出一个新的函数。

### 记忆

函数可以将先前操作的结果记录在某个对象里，从而避免无谓的重复运算。这种优化被称为记忆（memoization）。




