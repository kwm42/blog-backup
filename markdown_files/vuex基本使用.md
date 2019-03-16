---
title: vuex基本使用
date: 2018-11-14 09:12:45
tags:
---

# vuex的基本使用

2018-11-14

vuex的基本使用



### 1.首先构建一个 vue 应用

参考[这篇文章](https://kwm42.github.io/2018/06/07/vue-js%E5%9F%BA%E7%A1%80%E5%BC%80%E5%8F%91/)，从安装到使用 vue-cli 构建的过程都记录下来的。

### 2.安装 Vuex

这里只讨论使用 vue-cli 构建的应用，附上我的运行环境：

node — v10.6.0
vue — 2.9.6
npm — 6.1.0

>
> "dependencies": {
> "vue": "^2.5.2",
> "vue-router": "^3.0.1"
> }

执行如下命令

```
install vuex --save
```
成功后再查看一下 package.json 可以看到

> “dependencies”: {
> “vue”: “^2.5.2”,
> “vue-router”: “^3.0.1”,
> “vuex”: “^3.0.1”
> }
>

这样就安装好了

### 3.在项目中引入 vuex ###
 * 1.在项目根目录 src 下新建一个 store 文件夹，然后在里面新建一个 store.js 用来存放我们的 uex 数据和操作。
 * 2.在 store.js 里面添加如下代码

 ```javascript
 import Vuex from 'vuex'
 import Vue from 'vue'
 
 Vue.use(Vuex);
 
 const store = new Vuex.Store({
 state: {
 name: "张三",
 age: 20
 },
 getters: {
 name(state) {
 return state.name;
 },
 age(state) {
 return state.age;
 }
 },
 mutations: {
 set_name(state, name) {
 state.name = name;
 },
 set_age(state, age) {
 state.age = age;
 }
 }
 });
 
 export default store;
 
 ```

- 3.修改 main.js 中的内容

```
import store from './store/store.js'
new Vue({
  el: '#app',
  router,
  store, // 添加仓库
  components: { App },
  template: '<App/>'
});
```

然后在浏览器中就可以看到 vuex 成功引入了：
![img](https://github.com/kwm42/markdownPictures/raw/master/vuex/vuex_devtool.png)

### 4.vuex 各个部分是什么用的？

- state

这是你存放数据的地方，在你的应用中，组件之间共享的数据就可以放在这里，就像一个仓库一样。后续可以通过 state 来获取你的应用数据。

比如这样：

```
methods:{
    get_name:function () {
      alert(this.$store.state.name);//会弹出‘张三’
    }
  }
```

- getters

相当于 get 、set 方法的 get ，会返回state中的数据，我们一般不直接通过 state 来获取和设置数据，那样代码会很难看，所以通过 getters 来获取数据。

例子：

```
methods: {
      get_name: function () {
        alert(this.$store.getters.name);
      }
    }
```

效果和上面是一样的。

- mutations

和 getters 相反，他相当于 set 方法，但是注意，不能想上面那样直接通过 mutations 来调用，而是通过 commit 方法，commit 意思就是提交，mutations 更像是注册事件，而通过 commit 方法就可以来 「提交并处理」，所以，如果我们要给修改属性 name，name我们可以这么做：

```
this.$store.commit('set_name','李四');
```

其中 ‘set_name’ 是函数名，而 ‘李四’ 是参数，如果没有参数的话也可以不写。

还可以通过使用对象风格的提交方式，对象要包含 type 表示提交的函数：

```
this.$store.commit({
	type:'set_name',
	name:'李四'
});
//由于 name 是对象的属性，要修改 store.js 里的 set_name 方法
//这里整个对象都会作为载荷传给 mutations 。
set_name(state, payload) {
	state.name = payload.name;
}
```

- actions

action 类似于 mutation，不同在于：

- action 提交的是 mutation，而不是直接变更状态。
- action 可以包含任意异步操作。

- modules

这是数据子模块，如果是普通的应用应该用不上，里面的写法和 store 是一样的，都包含 state、getters、mutations 和 actions 。
