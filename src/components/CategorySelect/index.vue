<template>
  <div class="">
    <!-- 三级联动组件 -->
    <el-form
      :inline="true"
      class="demo-form-inline"
      style="display: flex; justify-content: space-evenly"
      v-model="reFrom"
    >
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="reFrom.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in list1"
            :key="item.id"
            :disabled="show"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="reFrom.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="item1.name"
            :value="item1.id"
            v-for="(item1, index) in list2"
            :key="item1.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="reFrom.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="item2.name"
            :value="item2.id"
            v-for="(item2, index) in list3"
            :key="item2.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      reFrom: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  props: ["show"],
  mounted() {
    this.getCategory1List();
  },
  methods: {
    //获取1级分类的接口
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1();
      if (result.code == 200) {
        this.list1 = result.data;
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    //当1级分类变化时，获取2级分类
    async handler1() {
      //清空2级、3级分类
      this.list2 = [];
      this.list3 = [];
      this.reFrom.category2Id = "";
      this.reFrom.category3Id = "";
      //解构出1级分类的id   level:便于区分到底是几级id，打标记
      const { category1Id } = this.reFrom;
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      let result = await this.$API.attr.reqCategory2(category1Id);
      if (result.code == 200) {
        this.list2 = result.data;
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    //当2级分类变化时，获取3级分类
    async handler2() {
      //清空3级分类
      this.list3 = [];
      this.reFrom.category3Id = "";
      //解构出2级分类的id   level:便于区分，打标记
      const { category2Id } = this.reFrom;
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });
      let result = await this.$API.attr.reqCategory3(category2Id);
      if (result.code == 200) {
        this.list3 = result.data;
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    handler3() {
      //解构出三级分类的id   level:便于区分，打标记
      const { category3Id } = this.reFrom;
      // 获取三级分类的id
      this.$emit("getCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
};
</script>

<style>
</style>