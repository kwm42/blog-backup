<template>
    <div id="wrapper">
        <h2>about me</h2>
        <div >
            <p>name: kwm</p>
            <p>email: kwm2596123568@gmail.com</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AboutMe"
    }
</script>

<style scoped>
    #wrapper{
        width: 70%;
        padding: 10px 100px 0px 100px ;
        background-color: var(--translucent-white);
        margin: 20px auto;
    }
    #wrapper > div{
        width:100%;
        border-left: 3px solid grey;
    }
</style>