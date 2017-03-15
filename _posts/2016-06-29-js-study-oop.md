---
layout: post
title:  "JS笔记：面向对象"
date:   2016-06-29 15:24:55
author: "Jokin"
catalog: true
header-img: "img/post-bg-digital-native.jpg"
tags:
    - 笔记
    - Javascript
---


本文是对javascript面向对象这块内容的学习总结，主要的学习资料是《javascript高级程序设计》和《javascript权威指南》

> ECMA-262把面向对象(Object-Oriented)定义为：无序属性的集合，其属性可以包含为基本值、对象或者函数。

---

## 原型链

---

ES将原型链作为实现继承的主要方法，基本思路是利用原型使一个引用类型继承另一个引用类型的属性和方法。<br>

---

### 代码

下面代码形成了一个典型的原型链：
![oo-1]({{"/static/picture/oo-14.png"}})

---

### 图解

![oo-1]({{"http://o9r9kpwmc.bkt.clouddn.com/blog/oo-25.png"}})

从上图可以清楚看出形成的这么一条原型链，当 person1 这个实例调用 getSex() 方法时，它首先在自身中寻找，然后去 Student Prototype 这个原型中寻找，无果，再去 Student Prototype 这个原型中的原型指针指向的那个原型，
即 Man Prototype 中寻找，sayName() 这个方法也是如此，它顺着原型链在 Student Prototype 中找到这个方法。值得注意的是 Student Prototype 是一个实例对象，并没有指向构造函数的 constructor
属性，这也验证了《javascript高级程序设计》所说的**构造函数与实例对象并无直接关系**。

---

## 继承

---

以下是实现继承的几个方法

---

### 借用构造函数

顾名思义，在一个构造函数中调用（借用嘛！）另一个构造函数，实际上就是改变 SuperType 中的this的指向，使其为调用环境初始化变量。由于这种方法没有产生
原型链，故 SuperType 原型中定义的方法是无从访问的，所以也很少单独使用这种方式。

![oo-1]({{"/static/picture/oo-16.png"}})

---

### 组合继承

组合继承的基本思路是：**通过原型链实现对超类原型属性方法的继承，通过借用构造函数实现对实例属性的继承**。<br>
下面代码中，在 SubType 构造函数中调用 SuperType 的构造函数，使 name、colors 两个变量在 SubType 中就完成了实例化，这意味着每个 SubType
的实例，即 insrance1 和 instance2 拥有了自己独立的私有变量 name、colors。然后将 SuperType 的实例赋值给 SubType 的原型，完成了 sayName 方法的继承。实际上，
SubType 的原型中是存有 name 和 colors 变量的，只不过被刚刚在 SubType 中的 **SubType.call(this, name)**设置的变量给覆盖了而已。

![oo-1]({{"/static/picture/oo-17.png"}})

输出是：

![oo-1]({{"/static/picture/oo-18.png"}})

验证 SubType 原型中是存有name、color变量的：

![oo-1]({{"/static/picture/oo-19.png"}})

---

### 原型继承

ES5通过 Object.create(o, {}) 实现原型继承,其实质是创建一个临时对象，并将传入的 o 作为它的原型，再用{}中的参数增强这个对象。

---

### 寄生式继承

寄生式继承的思路和工厂模式很像，用一个函数封装继承的过程，在该函数内部实现对传入对象的复制，然后增强复制的这个对象。由于函数不能复用的问题降低了效率。

![oo-1]({{"/static/picture/oo-20.png"}})

---

### 寄生组合继承

组合继承的最大缺点是 SuperType 的构造函数要执行两遍，而且原型链中还有不需要的实例变量。寄生式继承最大的缺陷是函数不能复用，若在组合继承构造原型链时
不用创建父类的实例的方式**（Subtype.prototype = new SuperType()）**,而改用寄生式中的“寄生”思想，构建一个原型是 SuperType.prototype 的临时对象，然后后赋值给 SubType.prototype
就可以解决组合继承中的弊端。

![oo-1]({{"/static/picture/oo-21.png"}})

输出结果是：

![oo-1]({{"/static/picture/oo-22.png"}})

---

## 工厂模式

--- 

### 方法

在ES中是无法直接创建类的，人们将创建对象的过程用函数做了一个封装，这就是工厂方法。<br>
在一个函数内显式地用object构建一个对象，初始化后返回：
![oo-1]({{"/static/picture/oo-1.png"}})

### 缺陷

工厂模式的主要**缺陷**在于：无法确定这个对象的类型
![oo-2]({{"/static/picture/oo-2.png"}})
如图，输出结果为object，相当于没有类型

---

## 构造函数模式

---

### 方法

将前面的例子用构造函数的形式重写如下：
![oo-1]({{"/static/picture/oo-3.png"}})

### 过程

相比于工厂模式，构造函数模式并没有显式地创建对象，它的创建过程大概是：

* 创建一个新对象
* 将内部的this指向这个对象
* 初始化对象（添加方法属性）
* 返回对象

### 优点

我们可以使用比较可靠的 instanceOf 操作符检验它的类型
![oo-2]({{"/static/picture/oo-4.png"}})
**注意：**一切类型都继承自Object,故而这里person1也是Object的实例。<br>

### 缺陷

构造函数的主要问题是必须将内部函数在实例上都创建一次，即使完成的功能一样。下图表明这两个person1.sayName和person2.sayName不是同一个引用。
![oo-2]({{"/static/picture/oo-6.png"}})

---

## 原型模式

---

为了摆脱构造函数模式每次初始化实例都要创建一次函数的低效，我们可以选择原型模式。

### 理解原型

无论是否是构造函数，每个函数都有一个指向原型的属性：prototype，这个属性可以理解成一个指向某个类的指针，而在这个类中也有一个指向构造函数的属性：constructor，通过这两个属性 构造函数和原型对象形成联系。拿前面的例子来说，即有Person.prototype.constructor === Person 为true
![oo-2]({{"/static/picture/oo-5.png"}})
通过一张图可以很清楚地明白它们之间的关系
![oo-2]({{"/static/picture/oo-7.png"}})
实例对象在Firfox、Safari、Chrome中可以用 **_proto_**属性访问原型，我们可以通过两个函数来确定他们的关系

* **isPrototypeOf:** Person.prototype.isPrototypeOf(person1) =>true
* **getPrototypeOf(ES5):** Object.getPrototypeOf(person1) == Person.prototype =>true

那利用构造函数创建对象时它们分别扮演什么角色呢？我的理解是：<br>
**构造函数就像用来产生对象的一个门面，它的函数名与它所代表的类的名字相同;而这个类则继承自这个构造函数指向的原型对象，通过作用域链在实例中可以访问原型中的方法属性**

### 创建

利用原型模式创建对象的方法如下：
![oo-2]({{"/static/picture/oo-8.png"}})

### 优点

函数方法可以共享使用了
![oo-2]({{"/static/picture/oo-10.png"}})

### 缺点

由于作用域链的关系，定义在原型上的数据和方法被所有实例所共享，所以通过一个实例修改原型上的属性值影响所有实例
![oo-2]({{"/static/picture/oo-9.png"}})

---

## 构造+原型模式

---

前面的原型模式将所有属性和方法全部定义在一个原型上，导致了修改时发生同步，那假如把属性值定义在类上不就可以了啊吗？这就是构造函数和原型组合使用产生的效果,这也是使用最广泛的方法。

---

### 创建

我们在构造函数中用指向生成对象的this指针在类上添加属性，即可获得这个对象的“私有”属性
![oo-2]({{"/static/picture/oo-11.png"}})


### 优点

实现了数据和方法的分离，节省了内存。使用 instanceOf 检验它们：
![oo-2]({{"/static/picture/oo-12.png"}})

### 注意

这里我们重写了构造函数的原型，必须在原型指针指向的对象里加上constructor：Person ,否则原型中的constructor是指向Object构造函数的。
当然，不加的话用instanceOf也能返回正确结果。<br>
重写构造函数的原型后，之前的创建的对象prototype指向的依然是旧原型
![oo-2]({{"/static/picture/oo-13.png"}})