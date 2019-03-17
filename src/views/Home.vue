<template>
    <div class="home">
        <div id="pc-menu" class="hidden-md-and-down">
            <home-nav></home-nav>
        </div>
        <div id="phone-menu" class="hidden-md-and-up">
            <div id="menu-switch">
                <el-button class="switch" @click="show=true" v-show="!show">open</el-button>
                <el-button class="switch" @click="show=false" v-show="show">close</el-button>
                <span>KWM's blog</span>
            </div>
            <div v-show="show">
                <menu-for-phone></menu-for-phone>
            </div>
        </div>
        <transition enter-active-class="animated pulse"
                    leave-active-class="animated fadeOut"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

    import HomeNav from "../components/HomeNav";
    import MenuForPhone from "../components/MenuForPhone";

    export default {
        name: 'home',
        components: {HomeNav,MenuForPhone},
        data:function(){
          return {
            show:false
          }
        },
        methods:{
        }
    }
</script>

<style scoped>
    #phone-menu{
        /*position: absolute;*/
        /*margin-left: -100%;*/
    }
    #menu-switch{
        text-align: left;
    }
</style>