<template>
    <div class="detail-wrapper">
        <div>
            <h1 class="title">{{article.title}}</h1>
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
                article:{}
            }
        },
        components:{ Comment },
        methods:{
            getArticleDetail(){
                this.$axios.get('/api/articles/'+this.id)
                    .then(res=>{
                        res=res.data
                        if(res.success){
                            this.article=res.data
                        }
                    })
            }
        },
        mounted:function(){
            this.getArticleDetail();
        }
    }
</script>

<style scoped>
    .detail-wrapper{
        width: 60%;
        margin: auto;
        background: var(--translucent-white);
    }
    .comment{
        margin-top: 40px;
    }
    .space{
        height: 100px;
    }
    @media screen and (max-width: 997px){
        .detail-wrapper{
            width: 100%;
            margin: auto;
            background: var(--translucent-white);
        }
        .title{
            margin: 0px;
            padding: 0px;
        }
    }
</style>