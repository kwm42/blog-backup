<template>
    <div>
        <div id="bg"></div>
        <div id="wrapper">
            <Home></Home>
        </div>
    </div>
</template>

<script>
    import Home from '@/views/Home'
    export default {
        name: "Blog",
        components:{ Home }
    }
</script>

<style scoped>
    #bg{
        position: fixed;
        z-index: -100;
        /* background-image: url(https://source.unsplash.com/random/1920x1080); */
        background-image: url("../static/img/bg.jpg");
        opacity: .7;
        width: 100%;
        top: 0px;
        left: 0px;
        height: 100%;
        background-size: cover;
    }
</style>