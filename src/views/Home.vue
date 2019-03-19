<template>
    <div class="home">
        <!-- <div id="pc-menu" class="hidden-md-and-down" style="display:none">
            <home-nav></home-nav>
        </div> -->
        <div id="phone-menu" class="hidden-md-and-up">
            <div id="menu-switch">
                <span class="switch" @click="show=true" v-show="!show">open</span>
                <span class="switch" @click="show=false" v-show="show">close</span>
            </div>
            <div v-show="show" class="top-draw">
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
    .switch{
        position: fixed;
        top:0px;
        left:0px;
        border: 0px;
        background: transparent;
        z-index: 10;
    }
    .el-button+.el-button{
        margin-left: 0px;
    }
</style>