<template>
    <div>
        <div class="selector">
            <strong>每页显示</strong>
            <el-select v-model="pageSize">
                <el-option label="2" value="2"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="10" value="10"></el-option>
                <el-option label="20" value="20"></el-option>
            </el-select>
            <strong>条数据</strong>
        </div>
        <div class="article-list">
            <el-card class="box-card"
                     shadow="hover"
                     body-style="background:#f1f2f6"
                     :key="index"
                     v-for="(article,index) in articles">
                <div slot="header">
                    <router-link :to="{name:'article-detail',params:{id:article.id}}">
                        <h2>{{article.title}}</h2>
                    </router-link>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div v-for="o in 2" :key="o" class="text item">
                    {{'列表内容 ' + article.description }}
                </div>
            </el-card>
        </div>
        <div class="navigation">

        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleList",
        data:function () {
            return {
                articles:[
                    {
                        id:1,
                        title:'title1',
                        description:'文章1的表述'
                    },{
                        id:2,
                        title:'title2',
                        description:'文章2的表述'
                    },{
                        id:3,
                        title:'title3',
                        description:'文章3的表述'
                    },
                ],
                pageSize:10, //default size
            }
        },
        watch:{
            pageSize:function () {
                alert('pageSize changed')
            }
        }
    }
</script>

<style scoped>
    .selector {
        float: right;
    }
    .selector div{
        width: 80px;
    }
    .selector > *{
        margin: 5px;
    }
    .article-list{
        width: 60%;
        margin: auto;
    }
    .box-card{
        margin: 20px auto;
    }
    .box-card a{
        text-decoration: none;
    }
    .box-card a:hover{
        color: blue;
    }
</style>