<template>
    <div id="wrapper">
        <span>about me</span>
        <div id="self">
            <p>name: KWM42</p>
            <p>email: kwm2596123568@gmail.com</p>
            <p>school: FuZhou University</p>
            <p>目前是一名大三学生，不过技术不怎么样，常使用 Java、Vue.js、<del>C++</del>，希望成为一名 Java 开发工程师。</p>
            <p>github: <a href="https://github.com/kwm42">kwm42</a></p>
        </div>
        <div>
            <h3 style="text-align: left">say something to me</h3>
            <Comment></Comment>
        </div>
    </div>
</template>

<script>
    import Comment from '../../components/Comment'
    export default {
        name: "AboutMe",
        components:{ Comment }
    }
</script>

<style scoped>
    #wrapper{
        width: 70%;
        height: 500px;
        padding: 10px 100px 0px 100px ;
        background-color: var(--translucent-white);
        margin: 20px auto;
        overflow-x: hidden;
    }
    #self{
        width:100%;
        border-left: 3px solid grey;
        text-align: left;
        padding-left: 10px;
    }
    @media screen and (max-width: 997px){
        #wrapper{
            width: 100%;
            margin: 0px;
            padding: 0px;
        }
    }
</style>