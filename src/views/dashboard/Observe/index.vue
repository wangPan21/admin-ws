<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12" :offset="0">
        <Search></Search>
      </el-col>
      <el-col :span="12" :offset="0">
        <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "./Search";
import Category from "./Category";
export default {
  data() {
    return {};
  },
  components: {
    Search,
    Category,
  },
};
</script>

<style>
</style>