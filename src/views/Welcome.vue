<template>
    <div id="wrapper">
        <div class="main-title">
            <div class="logo">
                <img src="../../src/assets/logo.png" alt="logo">
            </div>
            <div class="link">
                <span><router-link :to="{name:'list'}">blog</router-link></span>
                <span><router-link :to="{name:'aboutme'}">aboutme</router-link></span>
                <span><a href="http://github.com/kwm42">github</a></span>
            </div>
        </div>
        <vue-particles
            class="particles"
            color="#efefef"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="8"
            linesColor="#dedede"
            :lineLinked="false"
            :moveSpeed="3"
            :hoverEffect="false"
            :clickEffect="false"
        >
        </vue-particles>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style scoped>

    #wrapper{
        position: relative;
        height: 100%;
        align-items: center;
        display: flex;
        background-color: #70a1ff;
        /*background-color: brown;*/
        justify-content: center;
    }
    .particles{
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .main-title{
        z-index: 100;
        width: 50%;
        height:200px;
        text-align: center;
        align-items: center;
    }
    .logo{
        display: block;
        margin: auto;
        width: 100px;
        height:100px;
    }
    .logo > img{
        width: 100%;
        height:100%;
    }
    .link{
        margin-top: 10px;
    }
    .link > span{
        margin: 10px;
        font-size: 25px;
    }
    .link a{
        text-decoration: none;
        color: #EEE;
    }
    .link a:hover{
        text-decoration: none;
        text-shadow: 0px 0px 5px #ccc;
    }
</style>