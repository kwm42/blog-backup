<template>
    <div class="hidden-md-and-down">
        <el-menu :default-active="activeIndex" class="pc-menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
                <router-link :to="{name:'welcome'}">Home</router-link>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">归档</template>
                <el-menu-item v-for="(archieve,index) in archieves" :key="index">
                    <router-link :to="{name:'archieve-list',params:{date:archieve.date}}">
                        {{archieve.date}}({{archieve.summary}})
                    </router-link>
                </el-menu-item>
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
                activeIndex: '3',
            }
        },
        computed: {
            archieves:function () {
                return this.$store.state.archieves
            }
        },
        methods: {
            handleSelect() {
            }
        }
    }
</script>

<style scoped>
    .pc-menu li a {
        width: 100%;
        height: 100%;
        display: inline-block;
        text-decoration: none;
    }

    .pc-menu a {
        text-decoration: none
    }
</style>