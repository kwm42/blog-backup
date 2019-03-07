<template>
    <div class="detail-wrapper">
        <div class="mt20">
            <h1>{{article.title}}</h1>
            <span>{{article.createTime}}</span>
            <span>{{article.author}}</span>
        </div>
        <div v-html="article.content" class="mt20"></div>
        <div class="comment">
            <Comment></Comment>
        </div>
        <div class="space"></div>
    </div>
</template>

<script>
    import Comment from '../../components/Comment'
    export default {
        name: "ArticleDetail",
        // props:['article'],
        data:function () {
            return {
                id:this.$route.params.id,
                article:{
                    title:'title',
                    description:'description',
                    createTime:'2018-01-01',
                    author:'kwm',
                    content:"<h2 class=\"heading\" data-id=\"heading-0\">new 的作用</h2>\n" +
                        "<p>我们先来通过两个例子来了解 <code>new</code> 的作用</p>\n" +
                        "<pre><code class=\"hljs js copyable\" lang=\"js\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">Test</span>(<span class=\"hljs-params\">name</span>) </span>{\n" +
                        "  <span class=\"hljs-keyword\">this</span>.name = name\n" +
                        "}\n" +
                        "Test.prototype.sayName = <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n" +
                        "    <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-keyword\">this</span>.name)\n" +
                        "}\n" +
                        "<span class=\"hljs-keyword\">const</span> t = <span class=\"hljs-keyword\">new</span> Test(<span class=\"hljs-string\">'yck'</span>)\n" +
                        "<span class=\"hljs-built_in\">console</span>.log(t.name) <span class=\"hljs-comment\">// 'yck'</span>\n" +
                        "t.sayName() <span class=\"hljs-comment\">// 'yck'</span>\n" +
                        "<span class=\"copy-code-btn\">复制代码</span></code></pre><p>从上面一个例子中我们可以得出这些结论：</p>\n" +
                        "<ul>\n" +
                        "<li><strong><code>new</code> 通过构造函数 <code>Test</code> 创建出来的实例可以访问到构造函数中的属性</strong></li>\n" +
                        "<li><strong><code>new</code> 通过构造函数 <code>Test</code> 创建出来的实例可以访问到构造函数原型链中的属性，也就是说通过 <code>new</code> 操作符，实例与构造函数通过原型链连接了起来</strong></li>\n" +
                        "</ul>\n" +
                        "<p>但是当下的构造函数 <code>Test</code> 并没有显式 <code>return</code> 任何值（默认返回 <code>undefined</code>），如果我们让它返回值会发生什么事情呢？</p>\n" +
                        "<pre><code class=\"hljs js copyable\" lang=\"js\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">Test</span>(<span class=\"hljs-params\">name</span>) </span>{\n" +
                        "  <span class=\"hljs-keyword\">this</span>.name = name\n" +
                        "  <span class=\"hljs-keyword\">return</span> <span class=\"hljs-number\">1</span>\n" +
                        "}\n" +
                        "<span class=\"hljs-keyword\">const</span> t = <span class=\"hljs-keyword\">new</span> Test(<span class=\"hljs-string\">'yck'</span>)\n" +
                        "<span class=\"hljs-built_in\">console</span>.log(t.name) <span class=\"hljs-comment\">// 'yck'</span>\n" +
                        "<span class=\"copy-code-btn\">复制代码</span></code></pre><p>虽然上述例子中的构造函数中返回了 <code>1</code>，但是这个返回值并没有任何的用处，得到的结果还是和之前的例子完全一样。</p>\n" +
                        "<p>那么通过这个例子，我们又可以得出一个结论：</p>\n" +
                        "<ul>\n" +
                        "<li><strong>构造函数如果返回原始值（虽然例子中只有返回了 1，但是你可以试试其他的原始值，结果还是一样的），那么这个返回值毫无意义</strong></li>\n" +
                        "</ul>\n" +
                        "<p>试完了返回原始值，我们再来试试返回对象会发生什么事情吧</p>\n" +
                        "<pre><code class=\"hljs js copyable\" lang=\"js\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">Test</span>(<span class=\"hljs-params\">name</span>) </span>{\n" +
                        "  <span class=\"hljs-keyword\">this</span>.name = name\n" +
                        "  <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-keyword\">this</span>) <span class=\"hljs-comment\">// Test { name: 'yck' }</span>\n" +
                        "  <span class=\"hljs-keyword\">return</span> { <span class=\"hljs-attr\">age</span>: <span class=\"hljs-number\">26</span> }\n" +
                        "}\n" +
                        "<span class=\"hljs-keyword\">const</span> t = <span class=\"hljs-keyword\">new</span> Test(<span class=\"hljs-string\">'yck'</span>)\n" +
                        "<span class=\"hljs-built_in\">console</span>.log(t) <span class=\"hljs-comment\">// { age: 26 }</span>\n" +
                        "<span class=\"hljs-built_in\">console</span>.log(t.name) <span class=\"hljs-comment\">// 'undefined'</span>\n" +
                        "<span class=\"copy-code-btn\">复制代码</span></code></pre><p>通过这个例子我们可以发现，虽然构造函数内部的 <code>this</code> 还是依旧正常工作的，但是当返回值为对象时，这个返回值就会被正常的返回出去。</p>\n" +
                        "<p>那么通过这个例子，我们再次得出了一个结论：</p>\n" +
                        "<ul>\n" +
                        "<li><strong>构造函数如果返回值为对象，那么这个返回值会被正常使用</strong></li>\n" +
                        "</ul>\n" +
                        "<blockquote class=\"warning\"><p>这两个例子告诉了我们一点，构造函数尽量不要返回值。因为返回原始值不会生效，返回对象会导致 new 操作符没有作用。\n" +
                        "</p></blockquote><p>通过以上几个例子，相信大家也大致了解了 <code>new</code> 操作符的作用了，接下来我们就来尝试自己实现 <code>new</code> 操作符。</p>\n" +
                        "<h2 class=\"heading\" data-id=\"heading-1\">自己实现 new 操作符</h2>\n" +
                        "<p>首先我们再来回顾下 <code>new</code> 操作符的几个作用</p>\n" +
                        "<ul>\n" +
                        "<li><code>new</code> 操作符会返回一个对象，所以我们需要在内部创建一个对象</li>\n" +
                        "<li>这个对象，也就是构造函数中的 <code>this</code>，可以访问到挂载在 <code>this</code> 上的任意属性</li>\n" +
                        "<li>这个对象可以访问到构造函数原型上的属性，所以需要将对象与构造函数链接起来</li>\n" +
                        "<li>返回原始值需要忽略，返回对象需要正常处理</li>\n" +
                        "</ul>\n" +
                        "<p>回顾了这些作用，我们就可以着手来实现功能了</p>\n" +
                        "<pre><code class=\"hljs js copyable\" lang=\"js\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">create</span>(<span class=\"hljs-params\">Con, ...args</span>) </span>{\n" +
                        "  <span class=\"hljs-keyword\">let</span> obj = {}\n" +
                        "  <span class=\"hljs-built_in\">Object</span>.setPrototypeOf(obj, Con.prototype)\n" +
                        "  <span class=\"hljs-keyword\">let</span> result = Con.apply(obj, args)\n" +
                        "  <span class=\"hljs-keyword\">return</span> result <span class=\"hljs-keyword\">instanceof</span> <span class=\"hljs-built_in\">Object</span> ? result : obj\n" +
                        "}\n" +
                        "<span class=\"copy-code-btn\">复制代码</span></code></pre><p>这就是一个完整的实现代码，我们通过以下几个步骤实现了它：</p>\n" +
                        "<ol>\n" +
                        "<li>首先函数接受不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用</li>\n" +
                        "<li>然后内部创建一个空对象 <code>obj</code></li>\n" +
                        "<li>因为 <code>obj</code> 对象需要访问到构造函数原型链上的属性，所以我们通过 <code>setPrototypeOf</code> 将两者联系起来。这段代码等同于 <code>obj.__proto__ = Con.prototype</code></li>\n" +
                        "<li>将 <code>obj</code> 绑定到构造函数上，并且传入剩余的参数</li>\n" +
                        "<li>判断构造函数返回值是否为对象，如果为对象就使用构造函数返回的值，否则使用 <code>obj</code>，这样就实现了忽略构造函数返回的原始值</li>\n" +
                        "</ol>\n" +
                        "<p>接下来我们来使用下该函数，看看行为是否和 <code>new</code> 操作符一致</p>\n" +
                        "<pre><code class=\"hljs js copyable\" lang=\"js\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">Test</span>(<span class=\"hljs-params\">name, age</span>) </span>{\n" +
                        "  <span class=\"hljs-keyword\">this</span>.name = name\n" +
                        "  <span class=\"hljs-keyword\">this</span>.age = age\n" +
                        "}\n" +
                        "Test.prototype.sayName = <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n" +
                        "    <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-keyword\">this</span>.name)\n" +
                        "}\n" +
                        "<span class=\"hljs-keyword\">const</span> a = create(Test, <span class=\"hljs-string\">'yck'</span>, <span class=\"hljs-number\">26</span>)\n" +
                        "<span class=\"hljs-built_in\">console</span>.log(a.name) <span class=\"hljs-comment\">// 'yck'</span>\n" +
                        "<span class=\"hljs-built_in\">console</span>.log(a.age) <span class=\"hljs-comment\">// 26</span>\n" +
                        "a.sayName() <span class=\"hljs-comment\">// 'yck'</span>\n" +
                        "<span class=\"copy-code-btn\">复制代码</span></code></pre><p>虽然实现代码只有寥寥几行，但是结果很完美</p>\n" +
                        "<p></p><figure><img class=\"lazyload\" data-src=\"https://user-gold-cdn.xitu.io/2019/3/3/1694413cdb54d305?imageView2/0/w/1280/h/960/ignore-error/1\" data-width=\"225\" data-height=\"225\"><figcaption></figcaption></figure><p></p>\n" +
                        "<h2 class=\"heading\" data-id=\"heading-2\">最后</h2>\n" +
                        "<p>我们通过这篇文章重学了 <code>new</code> 操作符，如果你还有什么疑问欢迎在评论区与我互动。</p>\n" +
                        "<p>我所有的系列文章都会在我的 <a target=\"_blank\" href=\"https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FKieSun%2FDream\" rel=\"nofollow noopener noreferrer\">Github</a> 中最先更新，有兴趣的可以关注下。今年主要会着重写以下三个专栏</p>\n" +
                        "<ul>\n" +
                        "<li>重学 JS</li>\n" +
                        "<li>React 进阶</li>\n" +
                        "<li>重写组件</li>\n" +
                        "</ul>\n" +
                        "<p>最后，觉得内容有帮助可以关注下我的公众号 「前端真好玩」咯，会有很多好东西等着你。</p>"
                }
            }
        },
        components:{ Comment }
    }
</script>

<style scoped>
    .detail-wrapper{
        width: 60%;
        margin: auto;
        background: rgba(241, 242, 246,.7);
    }
    .comment{
        margin-top: 40px;
    }
    .space{
        height: 100px;
    }
</style>