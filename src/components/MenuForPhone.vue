<template>
    <div>
        <el-menu
                default-active="2"
                class="el-menu-vertical"
                @open="handleOpen"
                @close="handleClose">
            <el-menu-item index="1">
                <router-link :to="{name:'welcome'}">Home</router-link>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">归档</template>
                <el-menu-item v-for="(archieve,index) in archieves" :key="index">
                    {{archieve.date}}( {{archieve.summary}} )
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
        name: "MenuForPhone",
        data: function () {
            return {
            }
        },
        computed:{
          archieves:{
              get() {
                  return this.$store.state.archieves
              },
              set(val) {
              }
          }
        },
        methods: {
            handleClose() {

            },
            handleOpen() {

            }
        },
        mounted: function () {
            this.archieves=this.$store.getters.archieves
        }
    }
</script>

<style scoped>
    .el-menu-vertical > * {
        border-bottom: 1px solid #DDD;
    }

    .el-menu-vertical a {
        text-decoration: none;
        color: blue
    }

    .el-menu-item:hover {
        background-color: cornflowerblue;
    }
</style>