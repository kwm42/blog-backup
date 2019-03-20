<template>
  <div class="home">
    <div id="pc-menu" class="hidden-md-and-down">
      <home-nav></home-nav>
    </div>
    <div id="phone-menu" class="hidden-md-and-up">
      <div id="menu-switch">
        <icon-base>
          <Close/>
        </icon-base>
        <span class="switch" @click="show=true" v-show="!show">open</span>
        <span class="switch" @click="show=false" v-show="show">close</span>
      </div>
      <div v-show="show" class="top-draw">
        <menu-for-phone></menu-for-phone>
      </div>
    </div>
    <transition
        enter-active-class="animated pulse"
        leave-active-class="animated fadeOut"
        mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import HomeNav from "../components/HomeNav.vue";
  import MenuForPhone from "../components/MenuForPhone.vue";
  import IconBase from "../components/IconBase.vue";
  import Close from "../components/icons/Close.vue";

  export default {
    name: "home",
    components: {HomeNav, MenuForPhone, IconBase, Close},
    data: function () {
      return {
        show: false
      };
    },
    methods: {
      getArchieves() {
        this.$axios
          .get("/api/archieves")
          .then(res => {
            res = res.data;
            console.log("archieve", res);
            if (res.success) {
              this.$store.commit("setArchieves", res.data);
            } else {
              console.log("retrieve archieve failed");
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      getArticles() {
        this.$axios.get('/api/articles')
            .then(res=>{
                res=res.data
                console.log("articles",res.data)
                if(res.success){
                    this.$store.commit("setArticles",res.data)
                }else{
                    console.log("retrieve articles error")
                }
            })
            .catch(err=>{
                console.log("error occured=>",err)
        })
      },
      setArticles(){
        var articleList = [
          {
            title: "title1",
            description: "description1",
            content: "content1",
            create_time: "2019/01/20"
          }, {
            title: "title2",
            description: "description2",
            content: "content2",
            create_time: "2019/02/20"
          }, {
            title: "title3",
            description: "description3",
            content: "content3",
            create_time: "2019/03/20"
          }, {
            title: "title4",
            description: "description4",
            content: "content4",
            create_time: "2019/04/20"
          }, {
            title: "title4",
            description: "description4",
            content: "content4",
            create_time: "2019/04/20"
          }
        ];
        this.$store.commit("setArticles", articleList)
      }
    },
    mounted() {
      this.getArchieves();
      this.getArticles();
      // this.setArticles();
    }
  };
</script>

<style scoped>
  .switch {
    position: fixed;
    top: 0px;
    left: 0px;
    border: 0px;
    background: transparent;
    z-index: 10;
  }

  .el-button + .el-button {
    margin-left: 0px;
  }
</style>