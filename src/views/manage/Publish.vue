<template>
  <div>
    <el-form id="form">
      <el-form-item label="title">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="description">
        <el-input v-model="description"></el-input>
      </el-form-item>
      <el-form-item label="content">
        <mavon-editor v-model="content" ref="mdeditor" :ishljs="true"/>
      </el-form-item>
      <el-form-item>
        <el-button variant="info" @click="postArticle()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Publish",
    data: function () {
      return {
        title: '',
        description: '',
        content: '',
      }
    },
    computed: {
      html: function () {
        return this.$refs.mdeditor.d_render
      }
    },
    methods: {
      postArticle() {
        var params = {
          title: this.title,
          description: this.description,
          content: this.html
        }
        this.$axios.post('/api/articles', params)
          .then(res => {
            res = res.data
            if (res.success) {
              this.postSuccess();
            } else {
              this.postFailed();
            }
          })
          .catch(err => {
            console.log(res.data)
          })
      },
      postSuccess() {
        this.$message({
          message: '发表成功',
          type: 'success'
        })
      },
      postFailed() {
        this.$message.error("发表失败")
      }
    }
  }
</script>

<style scoped>
  #form {
    width: 70%;
    margin: auto;
  }
</style>