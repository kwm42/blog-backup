---
title: Vue中json-server的使用
date: 2018-11-16 11:21:54
tags:
---

# Vue中json-server的使用

2018-11-16

Vue中json-server的使用



## 前言

在开发中我们经常会遇到后端和前端一起开发的时候，但是有时候后端的小伙伴还没写好，我们前端写好了之后无法进行数据的测试，那怎么办呢？难道干等着吗？肯定不可能，在 Vue 中，我们可以利用 json-server 来实现数据的模拟。

## 安装

- 1. 命令行输入

```
npm install json-server -g
```
 然后在命令行输入
```
json-server --version
```
出现版本号就可以了。

## 使用

- 1. 在项目 src 目录下新建一个 mock 文件夹，在 mock 文件夹里新建 db.json 用来存放我们的数据，在 db.json 中输入以下内容：

 ```
     {
       "news":[
         {
           "title":"title1",
           "content":"content1"
         },
         {
           "title":"title2",
           "content":"content2"
         },
         {
           "title":"title3",
           "content":"content3"
         },
         {
           "title":"title4",
           "content":"content4"
         },
         {
           "title":"title5",
           "content":"content5"
         },
         {
           "title":"title1",
           "content":"content1"
         }
       ]
     }
 ```

- 1. 在命令行输入

  ```
  json-server --watch ./src/mock/db.json
  ```

  出现如下输出即成功

  ```
  \{^_^}/ hi!
    
  Loading ./src/mock/db.json
  Done
    
  Resources
  http://localhost:3000/news
    
  Home
  http://localhost:3000
    
  Type s + enter at any time to create a snapshot of the database
  Watching...
  ```

  这时候你就可以访问 <localhost:3000> 来访问你的数据了，而其中的news数据会被解析成可以访问的路径，访问 <localhost:3000:news> 就可以得到 news 的数据了。

## mock.js 的使用

我们通常会使用 mock.js 来配合 json-server 使用，用来生成随机数据

- 1. 安装

     ```
     npm install mockjs --save
     ```

     在 package.json 中的 dependencies 中可以看到多了一个 mockjs 的依赖。

- 1. 使用 mock

     在 mock 目录下新建 mock.js ，在其中输入如下内容

     ```
     // 引入mockjs
     var Mock=require("mockjs");
     
     module.exports=function () {
       // 数据定义
       var data={
         news:[]
       };
     
       // 批量生成数据
       for(var i=0;i<10;++i){
         data.news.push({
           id:i,
           title:Mock.Random.ctitle(), //随机中文标题
           content:Mock.Random.cparagraph(10),  //随机中文段落
           time:Mock.Random.date("yyyy-MM-dd HH:mm:ss") //随机时间,格式按照字符串给的格式
         })
       }
     
       return data;
     };
     ```

     在命令行输入

     ```
     json-server ./src/mock/mock.js
     ```

     输出如下：

     ```
     \{^_^}/ hi!
          
     Loading ./src/mock/mock.js
     Done
          
     Resources
     http://localhost:3000/news
          
     Home
     http://localhost:3000
          
     Type s + enter at any time to create a snapshot of the database
     ```

     然后我们就可以在 <localhost:3000> 访问数据了，同样的，其中的 news 会被解析成可访问的路径。

     效果如下：

     ![json-server](https://github.com/kwm42/markdownPictures/raw/master/json-server/json-server-running.png)

     ![news 数据](https://github.com/kwm42/markdownPictures/raw/master/json-server/json-server-news.png)

## 在 Vue 项目中访问接口

我们在项目中想要直接通过 ajax 的方式来获取数据，但是操作的时候你会发现失败了，原因就是 javascript 的同源策略，不允许跨域请求，所以我们得到了以下的错误信息：

> Access to XMLHttpRequest at ‘localhost:3000/news’ from origin ‘[http://localhost:8080'](http://localhost:8080'/) has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.

那么怎么才能让它成功访问呢？我们需要进行一些配置。

- 1. 修改 index.js

     找到 config/index.js 文件，不同的 vue 版本好像有点不同，2.0 的应该和我一样。

     找到 proxyTable: {} 这个配置，作如下修改：

     ```
     proxyTable: {
       '/api/':{
         target:'http://localhost:3000',
           changeOrigin:true,
           pathRewrite:{
             '^/api':''
           }
        }
     }
     ```

     我们定义了一个 api 属性，他的目标地址就是json-server 的地址，changeOrigin:true 改变源。

- 1. 同时启动 vue 和 json-server

     要让他们同时运行才能成功，打开 package.json 文件，在 scripts 部分添加最后两行：

     ```
     "mock": "json-server ./src/mock/mock.js",
     "mockdev": "npm run mock | npm run dev"
     ```

     mock 是我们启动 json-server 的命令，前面也已经使用过了，文件地址需要根据你自己的文件地址来修改一下，如果你是和我之前的操作一样的话就不用改了。

     需要注意的是 mockdev 的命令，”npm run mock | npm run dev” 意思是两个操作都要做，网上大部分写的都是用 ‘&’ 来连接，但是在我电脑上失败了，经过一番 google ，才知道 windows 下要使用 ‘|’ 来连接两个命令，如果你是 linux 或者苹果那就试一试 && || 等等，总会有一个是成功的。

     修改完成后文件如下：

     ```
     "scripts": {
         "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
         "start": "npm run dev",
         "unit": "jest --config test/unit/jest.conf.js --coverage",
         "e2e": "node test/e2e/runner.js",
         "test": "npm run unit && npm run e2e",
         "build": "node build/build.js",
         "mock": "json-server ./src/mock/mock.js",
         "mockdev": "npm run mock | npm run dev"
       },
     ```

     如果你用的是 webstorm 的话可以修改一下 run configurations ，这样比较方便，不改也问题不大。

- 1. 在 Vue 中获取接口数据

     直接在 HelloWorld.vue 中测试一下，新增如下方法：

     ```
     methods:{
           getNews:function () {
             this.$axios.get('/api/news')
               .then(res=>{
                 console.log(res);
               })
               .catch(err=>{
                 console.log(err);
               })
           }
         }
     ```

     其中 axios 代替了之前的 vue-resource ，用来进行网络请求，没有用过的话可以安装一下，网上教程很多

     ```
     <template>
       <div class="hello">
         <p>hello world</p>
         <button @click='getNews()'>获取新闻</button>
       </div>
     </template>
     ```

     效果如下：

     ![运行结果](https://github.com/kwm42/markdownPictures/raw/master/json-server/axios-get-news.png)

## 结语

这次和小伙伴一起做一个项目，结果一直没有给我接口，连接口文档都没有，只好自己写了个文档，然后用 mock 模拟一下数据才能维持生活这样子。。。