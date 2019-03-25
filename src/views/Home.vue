<template>
  <div class="home">
    <div id="pc-menu" class="hidden-md-and-down">
      <home-nav></home-nav>
    </div>
    <div id="phone-menu" class="hidden-md-and-up">
      <div id="menu-switch">
      </div>
      <div class="top-draw">
        <menu-for-phone></menu-for-phone>
      </div>
    </div>
      <div>
        <div class="operation">
          <span class="return-top-btn" @click="returnTop()">Top</span>
        </div>
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
        >
        <router-view></router-view>
        </transition>
      </div>
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
      returnTop(){
        window.scrollTo(0,0)
      },
      getArchieves() {
        this.$axios
          .get("http://120.78.122.146:18090/archieves")
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
        this.$axios.get('http://120.78.122.146:18090/articles')
          .then(res => {
            res = res.data
            console.log("articles", res.data)
            if (res.success) {
              this.$store.commit("setArticles", res.data)
            } else {
              console.log("retrieve articles error")
            }
          })
          .catch(err => {
            console.log("error occured=>", err)
          })
      },
      setArticles() {
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
  #phone-menu {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 50%;
    height: 100%;
    margin-left: -50%;
    /*z-index: 100;*/
  }

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

  .operation {
    position: fixed;
    bottom: 50px;
    left: 50px;
  }

  .operation .return-top-btn {
    display: block;
    width: 50px;
    height: 50px;
    border: none;
    line-height: 50px;
    border-radius: 50%;
    font-size: 15px;
    text-align: center;
    align-items: center;
    background-color: #91A0B3;
    box-shadow: .1em .1em .3em grey;
  }

  .operation .return-top-btn:hover {
    background-color: #718093;
    box-shadow: .05em .05em .1em #718093;
    cursor: pointer;
  }

  @media screen and (max-width: 997px){
    .operation {
      position: fixed;
      bottom: 5px;
      left: 5px;
    }
  }
</style>