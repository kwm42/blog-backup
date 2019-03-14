<template>
    <div class="home">
        <div id="pc-menu" class="hidden-md-and-down">
            <home-nav></home-nav>
        </div>
        <div id="phone-menu" class="hidden-md-and-up">
            <menu-for-phone></menu-for-phone>
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
        components: {HomeNav,MenuForPhone}
    }
</script>

<style scoped>
    #phone-menu{
        position: absolute;
        /*margin-left: -100%;*/
    }

</style>