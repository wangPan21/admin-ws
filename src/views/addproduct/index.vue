<template>
  <div class="app-container">
    <!-- {{ this.$route.params.id }} -->
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" />
      </el-form-item>
      <el-form-item label="浏览量">
        <el-input v-model="form.lookAfter" />
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="form.state" />
      </el-form-item>
      <el-form-item label="浏览时间">
        <el-input v-model="form.lookTime" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>


// import Qs from 'qs';

export default {
  data() {
    return {
      form: {
        id: "1",
        title: "",
        author: "",
        lookAfter: "",
        state: '',
        lookTime: ""

      }
    }
  },
  
  methods: {
    // onsubmit(){
    //   var vm=this;
    //   this.axios({
    //     methods:'POST',
    //     url:'....//',
    //     data:vm.from
    //   }).then(function(res){
    //     vm.$router.push('/table')
    //   })
    // },
    onSubmit() {
      var vm = this;
      this.axios({
        method:'POST',
        url:'https://mock.presstime.cn/mock/6452294d5bbac3001ab78299/example/path',
        // transformRequest:[function (data){
        //   return Qs.stringify(data)
        // }],
        data:vm.product,
      }).then(function(res){
        vm.$router.push('/table')
      }
      )
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

