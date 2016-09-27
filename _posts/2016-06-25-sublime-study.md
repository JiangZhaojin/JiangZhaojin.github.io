---
layout: post
title:  "sublime常用技巧"
date:   2016-06-26 22:14:54
categories: 前端工具
---

* content
{:toc}

sublime是一款强大的轻量级编辑器，插件丰富啥的不必多说啦，主要还有丰富的自定义主题供选择，嗯···进击的个性化程序猿不二之选。<br>
这是我在[慕课网教程-sublime篇](http://www.imooc.com/view/40)和一些博文里学到的技巧总结。

---

### 文件查找

---

*Ctrl+p* 打开输入框，或者Goto下进入Goto Anything <br>
输入要查找的文件名or目录名，支持模糊匹配，可以利用关键字快速定位文件：
![01]({{"/static/picture/sublime-01.png"}})

当css文件过大的时候，可以通过它查找元素选择器，只要在开头键入*@*符号
![01]({{"/static/picture/sublime-03.png"}})

在js文件中查找函数：
![01]({{"/static/picture/sublime-05.png"}})

---

### token替换

---

使用*Ctrl+H*替换文件的token
![01]({{"/static/picture/sublime-06.png"}})

---

### 多行游标

---

这是sublime异常强大的一个功能，大大提高了生产力.

##### 方法一

如图，将游标放置在某个token上，按*Ctrl+D*，按住Ctrl重复D键就可以在以下相同token中产生多个游标，跳过某个token可以用Ctrl+k
![01]({{"/static/picture/sublime-07.png"}})

##### 方法二

*shift*加上鼠标右键拖拽，可以选择多行
![01]({{"/static/picture/sublime-09.png"}})

##### 方法三

这是我比较常用的。<br>
按住*Ctrl+shift*键，并用鼠标右键点击你要产生游标的位置，就可以随意在任何位置产生多个游标
![01]({{"/static/picture/sublime-08.png"}})

---

### 自适应粘贴

---

我们经常要拷贝被人的代码，如果采用*Ctrl-Shift-v*而不是*Ctrl-v*的话不但能自适应缩进，还能自动将空格或Tab缩进转换成适应你代码的格式。
![01]({{"/static/picture/sublime-10.png"}})

---

### 设置语法模式

---

*Ctrl+N* 打开新文件，*Ctrl+shift+p* 打开命令行，键入 *HTML/css/js* 等关键字即可选择语法模式
![01]({{"/static/picture/sublime-02.png"}})

---

### 快捷键一览表
![01]({{"/static/picture/sublime-11.png"}})