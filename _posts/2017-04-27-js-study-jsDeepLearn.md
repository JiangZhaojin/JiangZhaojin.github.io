---
layout: post
title:  "JS笔记：深入javascript"
date:   2017-05-28
author:     "Jokin"
header-img: "img/post-bg-js-version.jpg"
catalog: true
tags:
    - 笔记
    - Javascript
---

对于《深入理解javascript》的摘记。

---

## javascript语法

希望eval()返回对象需要这样：
```js
eval("({foo: 3})");   // {foo: 3}
```

数字字面量的方法调用：
```js
1..toString()
1 .toString()
(1).toString()
1.0.toString()
```

严格模式的函数声明必须在顶级作用域：
```js
function A() {
    "use strict"
    {
        // 无效
        function B() {}
        
        // 有效
        var foo = function C() {}
    }
}
```

严格模式的`argument`变化:

`arguments.callee`和`arguments.caller`被取消，`arguments`不会跟踪参数的变化。

原始值属性不能被添加、改变和移除：
```js
var str = "jiang";
str.length = 1;  // 无效
str.foo = "abc"; // undefined
```

检测`null`和`undefined`:
```js
x === null
x === undefined
```

将包装对象转化为原始值时只能正确提取数字和字符串：
```js
Boolean(new Boolean(false)); // true
Number(new Number(123));     // 123
String(new String("jiang")); // "jiang"
```

`void`运算符返回`undefined`：
```js
void 4+8;  // 等同 (void 4)+7,结果为undefined
```

`void`用处：
```js
// 避免表达式返回结果
// 打开一个新窗口而不改变现实内容
javascript: void window.open("jiangzhojin.com");
```

判断对象：
```js
function isObject(value) {
    return value === null 
        && (typeof value === "object" 
            || typeof value ==="function")
}
```

转化成数字,推荐`Number()`,`parseFloat()`将参数转化为字符串，低效且有错误：
```js
parseFloat(true); // NaN
Number(true);     // 1

parseFloat(null); // NaN
Number(null);     // 0

// 注意
typeof NaN;       // 'number'
```

`isNaN()`对非数字不起作用:
```js
function myIsNaN(value) {
    return typeof value === "number" && isNaN(value);
}

function myIsNaN(value) {
    return value !== value;
}
```

由于javascript符号和数值是分开存储的，因此含有+0和-0，最佳实践是假装只有一个零。

---

## 字符串

字符串构造器方法：
```js
String.fromCharCode(97, 98, 99);    // 'abc'

String.fromCharCode.aplly(null, [97, 98, 99]);    // 'abc'
```

---

## 语句

需要防止原型方法被覆盖时：**借用原型方法**
```js
Object.prototype.hasOwnProperty.call(person, key);
```

`with`被废弃的原因：
1. 性能问题：变量查找变慢，因为对象是临时插入作用域链中的。
2. 代码产生不可预期的结果，通过上下文无法知道变量名指向何处。
3. 代码压缩工具不会压缩with中变量名。

`finally`执行顺序问题：
```js
var count = 0;
function countUp() {
    try {
        return count;
    } finally {
        count ++;
    }
}

// 在执行finally之前，返回值被放入队列中
>countUp();    // 0
>count;        // 1
```

---

## 函数

具名函数表达式：
```js
// 具名函数表达式的名字只能在函数表达式内部访问，常用于递归
// 可用于替代严格模式中禁止的arguments.callee
var repeat = function me(n, str) {
    return n > 0 ? str + me(n-1, str) : '';
}

>repeat.name;    // 'me'
```

检查是否是对象：
```js
function isObject(value) {
    return value === Object(value);
}
```

提取方法时丢失`this`:
```js
var count = {
    num: 0,
    inc: function() {
        return this.num ++;
    }
}
var ginc = count.inc;
>ginc();    // undefined

// 解决方法
var ginc = count.inc.bind(count);
>ginc();    // 0...
```

方法中的函数会掩盖`this`:
```js
var obj = {
    name: "jokin",
    firend: ["jaze", "rock"],
    loop: function () {
        "use strict";
        this.firend.forEach(function(friend) {
            console.log(this.name + "knows" + friend)
        });
    }
    
    //方法一
    var that = this;
    //方法二
    loop: function () {
        "use strict";
        this.firend.forEach(function(friend) {
            console.log(this.name + "knows" + friend)
        },this);
    }
    //方法三
    loop: function () {
        "use strict";
        this.firend.forEach(function(friend) {
            console.log(this.name + "knows" + friend)
        }.bind(this));
    }
}
```

遍历自有属性：
```js
for-in + hasOwnProperty()
Object.keys()/Object.getOwnPropertyNames() + forEach()
```

通过对象字面量定义访问器：
```js
var obj = {
    get foo() {
        return "hello";
    }
    
    set foo(value) {
        console.log("set value");
    }
}
```

通过属性描述符定义访问器：
```js
var obj = Object.create(Object.prototype, {
    foo: {
        get: function() {
            return "foo";
        }
        set: function() {
            console.log("foo1");
        }
    }
})
```

完全复制对象：
```js
function copyObject(orig) {
    var copy = Object.create(Object.getPrototypeOf(orig));
    
    copyOwnPropertiesFrom(copy, orig);
    return copy;
}

function copyOwnPropertiesFrom(orig, target) {
    Object.getOwnPropertyNames(orig)
    .forEach(function(key) {
        var desc = Object.getOwnPropertyDescriptor(orig, key);
        Object.defineProperty(target, key, desc);
    }
} 
```

特权方法及Crockford私有模式：
```js
// 公有属性
Person.prototype.sayHello = function() {
    alert("hello");
}
function Person(name) {
    this.name = name;
}

// 私有值（原型方法也不能访问）
function Person() {
    var privateValue = [];
}

// 特权方法（私有值和公有值的中介）
function Person() {
    // 通常这里不定义方法
    this.sayAge = function() {
        privateDate = ...
        privateFunction = ...
        
        this.publicDate = ...
        this.publicFunction = ...
    }
}
```
* 不优雅
* 完全安全
* 速度慢
* 消耗内存

---

通过字面量完成借用原型方法：
```js
{}.hasOwnProperty.call(obj, "propkey");
[].join.call(str, "-");
```

没有原型的对象更适合做映射：
```js
var dict = Object.create(null);
```

### JSON用法

`JSON.stringify()`用法：
```js
JSON.stringify(value, replacer?, space?)
```

`JSON.stringify()`只考虑自己的枚举属性

`JSON.stringify()`忽略的数据：
```js
JSON.stringify(function () {});    // undefined
JSON.stringify({ foo: function() {} });     // "{}"
JSON.stringify([function foo() {}]);    // "[null]"
```

在严格模式中使用eval()：
```js
function foo() {
    eval("var num = 1");
    console.log(num);   // 1
}
function foo() {
    "use strict"
    eval("var num = 1");
    console.log(num);   // Error
}
```

尽可能采用`new Function()`代替`eval()`：
```js
var x = "global";

function stricFun() {
    "use strict"
    var x = "local";
    
    // 类似于间接调用eval()
    var f = new Function("return x");
    cosole.log(f());    // 'global'
}
```

