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
          <!--<router-link :to="{name:'article-detail',params:{id:article.id}}">-->
          <!--<h2>{{article.title}}</h2>-->
          <!--</router-link>-->
          <h2>
            <a @click="handleClick(article.id)">{{article.title}}</a>
          </h2>
        </div>
        <div class="description item">{{article.description }}</div>
        <div class="meta">
          <span class="fl">{{article.createTime}}</span>
          <span class="fr">KWM</span>
        </div>
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
          var date = this.$route.params.date
          if (date == undefined) {
            return this.$store.state.articles
          } else {
            return this.$store.state.articles.filter((ele) => {
              var d = ele.createTime
              if (!d) return false;
              return (d.indexOf(date) >= 0);
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
      handleClick(id) {
        this.$axios.get('http://120.78.122.146:18090/articles/' + id)
          .then(res => {
            res = res.data
            // console.log("load articles success", res.data)
            this.$store.commit('setArticle', res.data)
          })
          .then(() => {
            // this.$router.push({name: 'article-detail', params: {id: id}})
            this.$router.push('/blog/detail/'+id)
            window.scrollTo(0,0)
          })
      }
    },
    mounted() {
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
    color: #006;
    text-decoration: none;
  }

  .box-card a:hover {
    color: blue;
  }

  .description{
    min-height: 60px;
    color: black;
    font-size: 15px;
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