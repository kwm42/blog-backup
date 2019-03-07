<template>
    <div>
        <el-menu :default-active="activeIndex" class="menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
                <router-link :to="{name:'welcome'}">Home</router-link>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">归档</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
                <router-link :to="{name:'list'}">所有文章</router-link>
            </el-menu-item>
            <el-menu-item index="4">
                <a href="http://github.com/kwm42" target="_blank">Github</a>
            </el-menu-item>
            <el-menu-item index="5">
                <router-link :to="{name:'aboutme'}">关于我</router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "HomeNav",
        data: function () {
            return {
                activeIndex: '1'
            }
        }
    }
</script>

<style scoped>
    .menu li a{
        width: 100%;
        height: 100%;
        display: inline-block;
        text-decoration: none;
    }
</style>