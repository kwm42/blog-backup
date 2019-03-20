<template>
  <div>
    <div v-if="errMsg!=null">{{errMsg}}</div>
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
      <el-card
          class="box-card"
          shadow="hover"
          body-style="background:#f1f2f6"
          :key="index"
          v-for="(article,index) in articles"
      >
        <div slot="header">
          <router-link :to="{name:'article-detail',params:{id:article.id}}">
            <h2>{{article.title}}</h2>
          </router-link>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div v-for="o in 2" :key="o" class="text item">{{'列表内容 ' + article.description }}</div>
      </el-card>
    </div>
    <div class="navigation"></div>
  </div>
</template>

<script>
  export default {
    name: "ArticleList",
    data: function () {
      return {
        pageSize: 10, //default size
        errMsg: null
      };
    },
    computed: {
      articles: {
        get() {
          var date=this.$route.params.date
          if (date==undefined){
            return this.$store.state.articles
          }else{
            return this.$store.state.articles.filter((ele)=>{
              var d=ele.createTime
              if(!d) return false;
              return  (d.indexOf(date)>=0);
            })
          }
        },
        set(val) {

        }
      }
    },
    watch: {
      pageSize: function () {
        alert("pageSize changed");
      }
    },
    methods: {
      getArticleList() {
        this.$axios.get('/api/articles')
          .then(res => {
            res = res.data
            console.log('articles', res.data)
            // this.articles = res.data
          })
          .catch(err => {
            console.log(err)
          })

      },
      getArticlesByArchieve() {
        let date=this.$route.params.date
        if(date==undefined){
          console.error("no date params")
        }else{
          this.$axios.get('/api/archieve/'+date)
            .then(res=>{
              res=res.data
              console.log('articles',res.data)
              // this.articles=res.data
            })
            .catch(err=>{
              console.error("retrieve articles error")
            })
        }
      }
    },
    mounted() {
      // let date=this.$route.params.date
      // if(date==undefined){
      //   this.getArticleList();
      // }else{
      //   console.log("date",date)
      //   this.getArticlesByArchieve();
      // }
    }
  };
</script>

<style scoped>
  .selector {
    float: right;
  }

  .selector div {
    width: 80px;
  }

  .selector > * {
    margin: 5px;
  }

  .article-list {
    width: 60%;
    margin: auto;
  }

  .box-card {
    margin: 20px auto;
  }

  .box-card a {
    text-decoration: none;
  }

  .box-card a:hover {
    color: blue;
  }

  @media screen and (max-width: 997px) {
    .article-list {
      width: 90%;
      margin: auto;
    }

    .selector {
      display: none;
    }
  }
</style>