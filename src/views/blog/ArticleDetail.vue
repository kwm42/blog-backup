<template>
  <div class="outer-wrapper">
    <div class="detail-wrapper">
      <div>
        <h1 class="title">{{article.title}}</h1>
        <span>{{article.createTime}}</span>
        <span>{{article.author}}</span>
      </div>
      <div v-html="article.content" class="mt20 detail">

      </div>
      <div class="comment">
        <Comment></Comment>
      </div>
      <div class="space"></div>
    </div>
  </div>
</template>

<script>
  import Comment from "../../components/Comment";

  export default {
    name: "ArticleDetail",
    // props:['article'],
    data: function () {
      return {
        id: this.$route.params.id,
        show: true,
      }
    },
    computed:{
      article:function () {
        return this.$store.state.article
      }
    },
    components: {Comment},
    methods: {
    },
    mounted: function () {
    }
  };
</script>

<style scoped>
  @import url('../../static/css/article.css');
  .out-wrapper{
    padding: 10px;

  }

  .detail-wrapper {
    border-radius: 5px;
    width: 60%;
    padding-left: 10px;
    padding-right: 10px;
    margin: auto;
    background: var(--translucent-white);
  }

  .comment {
    margin-top: 40px;
  }

  .space {
    height: 100px;
  }

  @media screen and (max-width: 997px) {
    .out-wrapper{
      width: 100%;
      overflow: hidden;
    }
    .detail-wrapper {
      width: 90%;
      margin: auto;
      background: var(--translucent-white);
    }

    .title {
      margin: 0px;
      padding: 0px;
    }
  }
</style>