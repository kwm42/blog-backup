<template>
    <div>
        <ul id="menu">
            <li>
                <a href="#page1">Section 1</a>
            </li>
            <li>
                <a href="#page2">Section 2</a>
            </li>
            <li>
                <a href="#page3">Section 3</a>
            </li>
        </ul>
        <full-page :options="options" id="fullpage">
            <div class="section page1">
                <div>
                    <img src="../assets/logo.png" alt="" class="animated infinite bounce">
                    <el-button @click="goBlog()">go articles</el-button>
                </div>
            </div>
            <div class="section page2">
            </div>
            <div class="section page3">
                <h3>Section 3</h3>
            </div>
        </full-page>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                options: {
                    menu: '#menu',
                    navigation: true,
                    anchors: ['page1', 'page2', 'page3'],
                    // sectionsColor: ['#1bcee6', '#ee1a59', '#EFDDEF']
                }
            }
        },
        methods: {
            goBlog(){
                this.$router.push({name:'list'})
            }
        }
    }
</script>

<style scoped>
    #menu {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 70;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        letter-spacing: 1px;
        font-size: 1.1em
    }

    .page1 div img{
        display: block;
        margin: auto;
    }

    .page1{
        background-image: url("../static/img/welcome_bg1.jpg");
        background-size: cover;
    }
    .page2{
        background-image: url("../static/img/welcome_bg2.jpg");
        background-size: cover;
    }
    .page3{
        background-image: url("../static/img/welcome_bg3.jpg");
        background-size: cover;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #2f3542;
        text-decoration: none;
    }
</style>