<template>
  <div class="" style="margin: 20px 0px; padding: 5px 0px">
    <el-card>
      <CategorySelect @getCategoryId="getCategoryId" :show="!showButton"></CategorySelect>
    </el-card>
    <el-card style="margin: 20px 0px 0px">
      <div v-show="showButton">
        <el-button
          type="primary"
          style="margin: 10px 0px 20px"
          :disabled="!reFrom.category3Id"
          @click="addArrt"
          >添加属性</el-button
        >

        <el-table style="width: 100%" :data="AttrList" border>
          <el-table-column label="序号" width="100" align="center" type="index">
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="属性值列表"
            align="center"
            width="400"
            style="display: flex; justify-content: space-around"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(i, index) in row.attrValueList"
                :key="i.id"
                >{{ i.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                style="margin: 0px 20px 0px 0px"
                icon="el-icon-edit"
                size="mini"
                @click="updataAttr(row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                style="margin: 0px 0px 0px 0px"
                icon="el-icon-delete"
                size="mini"
                @click="showButton = false"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加属性|修改属性的解构 -->
      <div v-show="!showButton">
        <el-form
          :inline="true"
          ref="form"
          label-width="100px"
          :model="attrInfo"
        >
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              style="margin: 0px 0px 0px 10px"
              :disabled="!attrInfo.attrName"
              @click="addAttrValue"
              >添加属性值</el-button
            >
            <el-button @click="showButton = true">取消</el-button>
          </el-form-item>
        </el-form>

        <!-- 列表 -->
        <el-table style="width: 100%" border :data="attrInfo.attrValueList">
          <el-table-column label="序号" width="100" align="center" type="index">
          </el-table-column>

          <el-table-column prop="prop" label="属性值名称" align="center">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性名称"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span v-else @click="toEdit(row, $index)">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`删除属性值 ${row.valueName}`"
                @onConfirm="delValueList"
                @onCancel="cancelList"
              >
                <el-button
                  type="danger"
                  style="margin: 0px"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-form-item> -->
        <el-button
          type="primary"
          label="right"
          style="margin: 20px 0px 0px 10px"
          @click="addOrUpdataAttr"
          :disabled="attrInfo.attrValueList.length<1"
          >保存</el-button
        >
        <el-button
          style="margin: 20px 0px 0px 10px"
          label="right"
          @click="showButton = true"
          >取消</el-button
        >
        <!-- </el-form-items> -->
      </div>
    </el-card>
  </div>
</template>
  
<script>
//深拷贝数据
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "Attr",
  data() {
    return {
      reFrom: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      showButton: true,
      AttrList: [],

      //收集新增属性|修改属性使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [], //属性值ID
        categoryId: 0, //三级ID
        categoryLevel: 0, //服务器区分几级ID
      },
    };
  },

  methods: {
    // 自定义事件回调
    getCategoryId({ categoryId, level }) {
      //区分三级分类的id，以及父组件存储数据
      if (level == 1) {
        this.reFrom.category1Id = categoryId;
        this.reFrom.category2Id = "";
        this.reFrom.category3Id = "";
      } else if (level == 2) {
        this.reFrom.category2Id = categoryId;
        this.reFrom.category3Id = "";
      } else {
        //三级分类的id有了就可以发送请求
        this.reFrom.category3Id = categoryId;
        this.getAttrlist();
      }
    },

    //获取平台属性的数据
    async getAttrlist() {
      //解构出category1id,category2Id,category3Id
      const { category1Id, category2Id, category3Id } = this.reFrom;
      let result = await this.$API.attr.reqAttrlist(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.AttrList = result.data;
      } else {
        return Promise.reject(new Error("faile"));
      }
    },

    //添加属性值事件
    addAttrValue() {
      //向属性值的数组里面添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true, //给每一个属性值添加一个标记，切换查看模式，每条数据都是独自的
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },

    //添加属性按钮事件
    addArrt() {
      this.showButton = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 0,
      };
    },

    //修改按钮事件
    updataAttr(row) {
      this.showButton = false;
      //由于数据结构中存在对象数组里面嵌套数组，数组里面嵌套对象，因此需要使用深拷贝来解决
      this.attrInfo = cloneDeep(row);
      //添加flag标记 forEach用于遍历this.attrInfo.attrValueList数组中的每个元素，并对每个元素执行特定的操作——设置item.flag为false并打印row。
      this.attrInfo.attrValueList.forEach((item) => {
        //vue无法探测普通新增property(属性)，$set作用是向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
        //第一个参数是：对象 第二个参数：属性， 第三个参数是：属性的值
        this.$set(item, "flag", false);
      });
    },

    //失去焦点切换查看模式
    toLook(row) {
      // row.valueName.trim()的作用是删除row.valueName字符串的前后空白字符，然后检查结果是否为空字符串如果为空字符串，则不执行if块中的代码；否则，执行if块中的代码
      if (row.valueName.trim() == "") {
        this.$message({
          type: "error",
          center: true,
          message: "属性值不能为空，请重新填写",
        });
      }
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) return;
      row.flag = false;
    },

    //点击span的修改并自动聚焦
    toEdit(row, index) {
      row.flag = true;
      //$nextTick：确保input节点渲染完毕后才会执行一次，不加$nextTick就会出现点击span后无法立即获得input，无法实现聚焦效果
      this.$nextTick(() => {
        //获取input节点，打上节点的好处是可以区分点击的是哪一个DOM，实现聚焦效果
        this.$refs[index].focus();
      });
    },

    //修改按钮 删除属性值  (注意版本是否一致)
    delValueList(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    //修改按钮 取消删除属性值  (注意版本是否一致)
    cancelList() {
      this.$message({
        type:"success",
        message:"您已取消操作",
        center: true,
      })
    },

    //添加属性值 保存按钮
    async addOrUpdataAttr(){
      //整理参数：1，如果用户添加很多属性，属性值为空的不应该提交给服务器
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item =>{
        //过滤掉属性值不是空的字段
        if (item.valueName!= "") {
          delete item.flag;
          return true;
        }
      })
      //发送API请求
      try {
        await this.$API.attr.reqSavelist(this.attrInfo);
        this.getAttrlist();
        this.$message({
          type:"success",
          message:"保存成功",
          center:true,
        });
        this.showButton = true;
      } catch (error) {
        this.$message({
          type:"error",
          message:"保存失败",
          center:true,
        });
        // return Promise.reject(new Error('faile'));
      }
    },
  },
};
</script>
  
  <style>
</style>