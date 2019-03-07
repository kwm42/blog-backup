<template>
    <div class="home">
        <home-nav></home-nav>
        <transition enter-active-class="animated pulse"
                    leave-active-class="animated fadeOut"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

    import HomeNav from "../components/HomeNav";

    export default {
        name: 'home',
        components: {HomeNav}
    }
</script>
