<template>
    <div>
        <div class="top">
            <el-input placeholder="请输入姓名" v-model="username">
                <template slot="prepend">Name:</template>
            </el-input>
            <el-input placeholder="请输入email" v-model="email">
                <template slot="prepend">Email:</template>
            </el-input>
            <!-- <el-input placeholder="请输入" v-model="input3">
                <template slot="prepend">Http://</template>
            </el-input> -->
        </div>
        <div class="content">
            <div>
                <label class="fl"><i>comment here:</i></label>
            </div>
            <el-input type="textarea" v-model="content"></el-input>
        </div>
        <div class="operation">
            <el-button type="primary">提交</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Comment",
        data:function(){
            return {
                email:'',
                username:'',
                content:''
            }
        }
    }
</script>

<style scoped>
    .top {
        display: flex;
        flex-direction: row;
        margin: auto;
    }

    .top > * {
        margin: auto 5px;
    }

    .content {
        margin: 10px 5px;
    }

    .operation > * {
        float: left;
        width: 100px;
        margin-left: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
</style>