---
layout: vue.js
title: 入门
date: 2019-06-07 10:17:08
tags:
---

# Vue.js基础开发

2018-06-07

Vue.js基础开发



### 一 .什么是vue？

 vue 是一个渐进式的前端框架，上手简单，用vue开发响应式网页是一个很好的选择。vue是一个组件式的前端框架，采用由下至上的开发步骤，可以利用它编写可复用的组件，这对于开发者来说是个好消息。

 vue采用MVVN模型(Model-View-ViewModel)，和之前的MVC模式有些不同，它的核心是对于视图层和数据的绑定，专注于数据，可以让开发更高效。

 更多具体的信息可以访问[官方网站](https://cn.vuejs.org/)。

### 二 .搭建开发环境

##### 1.安装node.js 

 vue 所需要的依赖等需要通过 node.js 下载，所以我们应该先下载node，我用的是archlinux，如果你和我一样，那么你只需要在命令行输入一下命令：

```
pacman -S nodejs
```

如果你是其他的linux系统，那么你可以使用形如下面的语句来安装：

```
apt-get install nodejs
yum install -y nodejs
```

具体详细情况请根据自己的系统，可以上网搜索下载方式。

 windows用户可以登录[官网](http://nodejs.cn/)下载安装包。

 网上有许多类似的教程，不会也可以上网搜索。

 打开命令行输入以下命令，出现版本好即安装成功。

```
melon@kwm:~ % node -v
v10.4.0
```

##### 2.安装npm

 arch安装方法如下：

```
pacman -S npm
```

 其他系统可以上网搜索下载方式。

 打开命令行输入以下命令，出现版本好即安装成功。

```
melon@kwm:~ % npm -v
6.1.0
```

 有时候安装完npm时候下载速度会特别慢，这时候我们可以执行一下命令设置使用国内的淘宝源：

```
npm config set registry https://registry.npm.taobao.org
```

 然后在从淘宝源里下载 cnpm ：

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

 一般我们还是使用 npm 命令下载安装，不过有时候 npm 命令安装失败或者速度实在太慢的时候我们可以使用 cnpm 命令来代替。

##### 3.安装vue-cli

 利用 npm 命令安装 vue-cli ：

```
npm install -g vue-cli
```

 输入 vue -V 如果出现版本号即表示安装成功

```
melon@kwm:~ % vue -V
2.9.5
```

##### 4.安装webpack

 webpack 是一个很好用的模块打包工具，他可以把你编写好的代码打包然后浏览器就能是被出来。

 安装 webpack 的命令如下：

```
npm install -g webpack
```

 同样的，输入 webpack -v，出现版本号：

```
melon@kwm:~ % webpack -v
4.10.2
```

------

 至此为止，创建一个vue项目的准备工作已经差不多做完了，接下来我们来创建一个vue项目。

## 三 .创建第一个vue项目

##### 1.在你的硬盘创建一个文件夹

 选择一个空文件夹用来存放你的第一个vue项目，你可以新建一个，这里我选择家目录下的 vue_test/ 作为我的项目路径，首先进入 目录：

```
melon@kwm:~ % cd vue_test 
melon@kwm:~/vue_test % pwd
/home/melon/vue_test         <-- 完整路径
```

##### 2. 初始化项目

 输入以下命令：

```
vue init webpack first_vue
```

 然后会出现以下选项：

```
melon@kwm:~/vue_test % vue init webpack first_vue

⠦ downloading template
? Project name first_vue                   // 项目名字
? Project description A Vue.js project     // 项目描述
? Author melon                             // 作者
? Vue build standalone					   // 项目模板
? Install vue-router? Yes                  // vue路由，后面会讲到，推荐安装
? Use ESLint to lint your code? No         // 代码规范的东东
? Set up unit tests Yes                    // 单元测试 
? Pick a test runner jest                  // 大概是一个测试工具的东东，没用过。。。
? Setup e2e tests with Nightwatch? Yes     //  e2e 测试
? Should we run `npm install` for you after the project has been created? (recommended) npm         //安装项目的依赖，直接选 npm install ，后面也要安装的

   vue-cli · Generated "first_vue".


# Installing project dependencies ... //安装依赖中
```

 稍等一会就会出现如下提示，表示项目初始化成功：

```
# Project initialization finished!
# ========================

To get started:

  cd first_vue
  npm run dev
  
Documentation can be found at https://vuejs-templates.github.io/webpack


melon@kwm:~/vue_test %
```

 接下按照提示输入命令，编译打包完成后告诉我们可以在浏览器的本地端口访问项目啦：

```
melon@kwm:~/vue_test % cd first_vue 
melon@kwm:~/vue_test/first_vue % npm run dev

> first_vue@1.0.0 dev /home/melon/vue_test/first_vue
> webpack-dev-server --inline --progress --config build/webpack.dev.conf.js

 95% emitting                                                                        

 DONE  Compiled successfully in 2007ms                                            下午9:53:15

 I  Your application is running here: http://localhost:8080
```

 打开浏览器，输入地址 [http://localhost:8080](http://localhost:8080/) 就可以访问我们的项目了。

